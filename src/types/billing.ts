/**
 * Types shared across the payment save flow
 * Defines the contract between frontend and backend for SetupIntent operations
 * and error handling structures.
 */
export type SetupIntentCreateResponse = {
  clientSecret: string; // e.g., seti_..._secret_...
};

export type ApiErrorShape = {
  message: string;
  code?: string;
  status?: number;
};
