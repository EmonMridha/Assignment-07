'use client';

import { useState } from 'react';
import Link from 'next/link';

const PayPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/payments/checkout', { method: 'POST' });
      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || 'Failed to start payment');
        return;
      }

      const url = result.data?.url || result.data?.sessionUrl;
      if (!url) {
        setError('No payment URL returned');
        return;
      }

      window.location.href = url;
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-4 sm:p-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
      >
        ← Back
      </Link>

      <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-white">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>

        <h1 className="mt-4 text-xl font-bold sm:text-2xl">
          Pay Your Electricity Bill
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Secure payment powered by Stripe
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Redirecting to Stripe...' : 'Pay Bill'}
        </button>
      </div>
    </div>
  );
};

export default PayPage;