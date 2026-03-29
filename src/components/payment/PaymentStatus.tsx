/**
 * Simple status component that displays the current state of the payment setup process
 * Shows different states (idle, processing, succeeded, failed) with appropriate
 * styling and accessibility features for screen readers.
 */
import React from 'react';

type Status = 'idle' | 'processing' | 'succeeded' | 'failed';

export const PaymentStatus: React.FC<{ status: Status; message?: string }> = ({ status, message }) => {
  const color = status === 'succeeded' ? 'text-emerald-700' : status === 'failed' ? 'text-rose-700' : 'text-slate-600';
  const label =
    status === 'processing' ? 'Processing…' : status === 'succeeded' ? 'Saved!' : status === 'failed' ? 'Failed' : '—';
  return (
    <div className={`mt-3 text-sm ${color}`} aria-live="polite">
      <strong>{label}</strong>
      {message ? ` — ${message}` : ''}
    </div>
  );
};
