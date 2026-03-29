/**
 * Main payment form component that renders the Stripe Payment Element
 * Handles the setup confirmation process using stripe.confirmSetup(),
 * manages form states (loading, disabled, error, success), and provides
 * callbacks for success/failure scenarios.
 */
import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import { PaymentStatus } from './PaymentStatus';

export type SetupPaymentFormProps = {
  onSucceeded?: (args: { setupIntentId: string; paymentMethodId?: string }) => void;
  onFailed?: (message: string) => void;
};

export const SetupPaymentForm: React.FC<SetupPaymentFormProps> = ({ onSucceeded, onFailed }) => {
  const stripe = useStripe();
  const elements = useElements();

  // Debug: Log available payment methods
  React.useEffect(() => {
    if (stripe) {
      console.log('Stripe instance loaded:', stripe);
    }
  }, [stripe]);

  const [status, setStatus] = React.useState<'idle' | 'processing' | 'succeeded' | 'failed'>('idle');
  const [message, setMessage] = React.useState<string | undefined>();

  const options: StripePaymentElementOptions = React.useMemo(
    () => ({
      layout: 'accordion',
      fields: { billingDetails: 'auto' },
      paymentMethodOrder: [
        'card',
        'link',
        'us_bank_account',
        'affirm',
        'afterpay_clearpay',
        'klarna',
        'cashapp',
        'apple_pay',
        'google_pay',
        'wechat_pay',
      ],
      // matches the nice stacked list (Card, Google Pay, etc.)
      // You can add fields: { billingDetails: 'auto' } if you want Stripe to collect more
    }),
    []
  );

  const onSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return; // still loading

      setStatus('processing');
      setMessage(undefined);

      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        // If Stripe needs to redirect for 3DS, it will only do so if necessary.
        // We provide a return_url for safety, though with 'if_required' it often stays in-place.
        confirmParams: { return_url: window.location.origin + '/billing/saved' },
        redirect: 'if_required',
      });

      if (error) {
        // error.type can be 'card_error' | 'validation_error' | 'invalid_request_error' | etc.
        const userMessage = error.message || 'Something went wrong confirming your card.';
        setStatus('failed');
        setMessage(userMessage);
        onFailed?.(userMessage);
        return;
      }

      if (!setupIntent) {
        setStatus('failed');
        setMessage('No SetupIntent returned.');
        onFailed?.('No SetupIntent returned.');
        return;
      }

      switch (setupIntent.status) {
        case 'succeeded': {
          setStatus('succeeded');
          setMessage('Your card has been saved.');
          onSucceeded?.({ setupIntentId: setupIntent.id, paymentMethodId: setupIntent.payment_method as string });
          break;
        }
        case 'requires_action': {
          // Rare with redirect:'if_required'; means further action still needed
          setStatus('failed');
          setMessage('Further authentication is required. Please try again.');
          onFailed?.('Requires additional authentication.');
          break;
        }
        default: {
          setStatus('failed');
          setMessage(`Unexpected status: ${setupIntent.status}`);
          onFailed?.(`Unexpected status: ${setupIntent.status}`);
        }
      }
    },
    [stripe, elements, onFailed, onSucceeded]
  );

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">
      <label className="block text-sm font-medium text-slate-700">Payment method</label>
      <div className="rounded-md border border-slate-200 p-3">
        <PaymentElement options={options} />
      </div>

      <button
        type="submit"
        disabled={!stripe || status === 'processing'}
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        aria-disabled={!stripe || status === 'processing'}
      >
        {status === 'processing' ? 'Saving…' : 'Save card'}
      </button>

      <PaymentStatus status={status} message={message} />
    </form>
  );
};
