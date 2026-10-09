import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

const PaymentSuccessPage = async ({ searchParams }: PageProps) => {
  const { session_id } = await searchParams;

  return (
    <div className="mx-auto max-w-md space-y-6 p-4 sm:p-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mt-4 text-xl font-bold sm:text-2xl">
          Payment Completed
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Copy the session ID below and verify your payment.
        </p>

        {session_id ? (
          <div className="mt-4 rounded-lg border bg-muted p-3">
            <p className="text-xs uppercase text-muted-foreground">
              Session ID
            </p>
            <p className="mt-1 break-all font-mono text-xs">{session_id}</p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-red-600">
            No session ID found in URL.
          </p>
        )}

        <Link
          href="/dashboard/payments/verify"
          className="mt-6 inline-block w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Go to Verify Payment
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;