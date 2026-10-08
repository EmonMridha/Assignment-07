'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComplaintFormValues, complaintSchema } from '@/lib/validations/complaint.schema';

const ComplainForm = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ComplaintFormValues>({
        resolver: zodResolver(complaintSchema),
        defaultValues: {
            title: '',
            description: '',
            outageId: '',
        },
    });

    const titleLength = watch('title')?.length ?? 0;
    const descriptionLength = watch('description')?.length ?? 0;

    const onSubmit = async (values: ComplaintFormValues) => {
        setServerError(null);
        setSubmitting(true);

        try {
            const payload = {
                title: values.title,
                description: values.description,
                ...(values.outageId && values.outageId.trim() !== ''
                    ? { outageId: values.outageId }
                    : {}),
            };

            const res = await fetch('/api/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                setServerError(result.message || 'Failed to submit complaint');
                return;
            }

            router.push('/dashboard/complaints');
            router.refresh();
        } catch {
            setServerError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6 lg:p-8">
            <Link
                href="/dashboard/complaints"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
            >
                ← Back to Complaints
            </Link>

            <div>
                <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                    Submit a Complaint
                </h1>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Report a power issue or outage in your area
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 rounded-xl border bg-card p-5 shadow-sm sm:p-6"
            >
                {serverError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {serverError}
                    </div>
                )}

                {/* Title */}
                <div className="space-y-1.5">
                    <label htmlFor="title" className="block text-sm font-medium">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="e.g. Power outage in Mirpur"
                        {...register('title')}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    />
                    <div className="flex justify-between">
                        {errors.title ? (
                            <p className="text-xs text-red-600">{errors.title.message}</p>
                        ) : (
                            <span />
                        )}
                        <p className="text-xs text-muted-foreground">
                            {titleLength}/120
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                    <label htmlFor="description" className="block text-sm font-medium">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        rows={5}
                        placeholder="Describe the problem in detail..."
                        {...register('description')}
                        className="w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    />
                    <div className="flex justify-between">
                        {errors.description ? (
                            <p className="text-xs text-red-600">
                                {errors.description.message}
                            </p>
                        ) : (
                            <span />
                        )}
                        <p className="text-xs text-muted-foreground">
                            {descriptionLength}/1000
                        </p>
                    </div>
                </div>

                {/* Outage ID */}
                <div className="space-y-1.5">
                    <label htmlFor="outageId" className="block text-sm font-medium">
                        Linked Outage ID{' '}
                        <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <input
                        id="outageId"
                        type="text"
                        placeholder="Paste outage ID if related to a specific outage"
                        {...register('outageId')}
                        className="w-full rounded-lg border bg-background px-3 py-2 font-mono text-xs outline-none transition focus:border-slate-800 focus:ring-2 focus:ring-slate-200 sm:text-sm"
                    />
                    {errors.outageId && (
                        <p className="text-xs text-red-600">{errors.outageId.message}</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Link
                        href="/dashboard/complaints"
                        className="rounded-lg border px-4 py-2 text-center text-sm font-medium transition hover:bg-muted"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? 'Submitting...' : 'Submit Complaint'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ComplainForm;