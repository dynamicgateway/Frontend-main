/**
 * Stripe loader singleton — prevents recreating the Stripe object on rerenders
 * This ensures we have a single Stripe instance throughout the app lifecycle
 * and avoids unnecessary API calls to Stripe's servers.
 */
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe() {
  if (!stripePromise) {
    const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!pk) {
      // Fail early with a clear message in dev
      // (In prod you'd likely log to observability)

      console.error('Missing VITE_STRIPE_PUBLISHABLE_KEY');
    }
    stripePromise = loadStripe(pk);
  }
  return stripePromise;
}
