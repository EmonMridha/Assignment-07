'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
            <h1 className="text-3xl font-bold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
                {error.message || 'An unexpected error occurred.'}
            </p>
            <button
                onClick={reset}
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
                Try Again
            </button>
        </div>
    );
}