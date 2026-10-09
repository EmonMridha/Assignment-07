'use client';

import { useState } from 'react';
import Link from 'next/link';

const VerifyPage = () => {
    const [sessionId, setSessionId] = useState('');
    const [month, setMonth] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        if (!sessionId.trim() || !month.trim()) {
            setError('Both fields are required');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, month }),
            });

            const data = await res.json();

            setResult({
                success: res.ok && data.success,
                message: data.message || 'Unknown response',
            });
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

            <div>
                <h1 className="text-xl font-bold sm:text-2xl">Verify Payment</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Enter your session ID and bill month to confirm payment
                </p>
            </div>

            <form
                onSubmit={handleVerify}
                className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm sm:p-6"
            >
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {result && (
                    <div
                        className={`rounded-lg border p-3 text-sm ${result.success
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : 'border-red-200 bg-red-50 text-red-700'
                            }`}
                    >
                        {result.message}
                    </div>
                )}

                <div className="space-y-1.5">
                    <label htmlFor="sessionId" className="block text-sm font-medium">
                        Session ID <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="sessionId"
                        type="text"
                        value={sessionId}
                        onChange={(e) => setSessionId(e.target.value)}
                        placeholder="cs_test_..."
                        className="w-full rounded-lg border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="month" className="block text-sm font-medium">
                        Bill Month <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="month"
                        type="text"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        placeholder="e.g. 2026-02"
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? 'Verifying...' : 'Verify Payment'}
                </button>
            </form>
        </div>
    );
};

export default VerifyPage;