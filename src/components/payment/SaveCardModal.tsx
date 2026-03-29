/**
 * Modal version of the Save Card page for integration with employer dashboard
 * Converts the page component into a reusable modal with proper open/close functionality,
 * maintaining all the payment setup logic while providing a better UX for dashboard integration.
 */
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getStripe } from '../../lib/stripe';
import { SetupPaymentForm } from './SetupPaymentForm';
// import { useSetSetupIntentMutation } from '@/apis/core/payment';

interface SaveCardModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (args: { setupIntentId: string; paymentMethodId?: string }) => void;
}

export const SaveCardModal: React.FC<SaveCardModalProps> = ({ open, onClose, onSuccess }) => {
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [setSetupIntent, { data: setupIntentData, isLoading: isSetSetupIntentLoading }] = useSetSetupIntentMutation();
  // Reset state when modal opens
  React.useEffect(() => {
    if (open) {
      setClientSecret(null);
      setError(null);
      setIsLoading(true);
    }
  }, [open]);

  // Fetch client secret when modal opens
  React.useEffect(() => {
    if (!open) return;

    let mounted = true;
    const ac = new AbortController();

    (async () => {
      try {
        const client_secret = 'client_secret';
        if (!mounted) return;
        setClientSecret(client_secret);
        setIsLoading(false);
      } catch (err) {
        if (!mounted) return;
        const msg = err instanceof Error ? err.message : 'Failed to start payment setup.';
        setError(msg);
        setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
      ac.abort();
    };
  }, [open]);

  const appearance: StripeElementsOptions['appearance'] = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0f172a', // slate-900 (optional tweak)
    },
  };

  const handleSuccess = (args: { setupIntentId: string; paymentMethodId?: string }) => {
    onSuccess?.(args);
    onClose();
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '400px',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="h2">
          Add Payment Method
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          disabled={isLoading}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {error ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="error.main" variant="body2">
              {error}
            </Typography>
            <Button variant="outlined" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
              Try Again
            </Button>
          </Box>
        ) : isLoading || !clientSecret ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 2 }}>
            <CircularProgress size={40} />
            <Typography variant="body2" color="text.secondary">
              Loading payment form…
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your payment details are securely handled by Stripe.
            </Typography>

            <Elements stripe={getStripe()} options={{ clientSecret, appearance, loader: 'auto' }}>
              <SetupPaymentForm
                onSucceeded={handleSuccess}
                onFailed={(message) => {
                  console.warn('Setup failed:', message);
                }}
              />
            </Elements>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
