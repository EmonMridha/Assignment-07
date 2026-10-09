'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OutageFormValues, outageSchema } from '@/lib/validations/outage.schema';


const CreateOutagePage = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(outageSchema),
        defaultValues: {
            type: 'SCHEDULED',
            title: '',
            description: '',
            cause: '',
            startTime: '',
            endTime: '',
            duration: '',
            priority: 'MEDIUM',
            zoneId: '',
            assignedToId: '',
        },
    });

    const titleLength = watch('title')?.length ?? 0;
    const descriptionLength = watch('description')?.length ?? 0;
    const type = watch('type');

    const onSubmit = async (values: OutageFormValues) => {
        setServerError(null);
        setSubmitting(true);

        try {
            const payload = {
                type: values.type,
                title: values.title,
                priority: values.priority,
                zoneId: values.zoneId,
                startTime: new Date(values.startTime).toISOString(),
                ...(values.description?.trim() && { description: values.description }),
                ...(values.cause?.trim() && { cause: values.cause }),
                ...(values.endTime?.trim() && {
                    endTime: new Date(values.endTime).toISOString(),
                }),
                ...(values.duration && { duration: Number(values.duration) }),
                ...(values.assignedToId?.trim() && {
                    assignedToId: values.assignedToId,
                }),
            };

            const res = await fetch('/api/outages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                setServerError(result.message || 'Failed to create outage');
                return;
            }

            router.push('/technician/outages');
            router.refresh();
        } catch {
            setServerError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <Link
                href="/technician/outages"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
            >
                ← Back to Outages
            </Link>

            <div>
                <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                    Create Outage
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Schedule a planned outage or log an unexpected one
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

                {/* Type */}
                <div className="space-y-1.5">
                    <label htmlFor="type" className="block text-sm font-medium">
                        Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="type"
                        {...register('type')}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    >
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="UNEXPECTED">Unexpected</option>
                    </select>
                    {errors.type && (
                        <p className="text-xs text-red-600">{errors.type.message}</p>
                    )}
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                    <label htmlFor="title" className="block text-sm font-medium">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="e.g. Scheduled maintenance in Mirpur"
                        {...register('title')}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    />
                    <div className="flex justify-between">
                        {errors.title ? (
                            <p className="text-xs text-red-600">{errors.title.message}</p>
                        ) : (
                            <span />
                        )}
                        <p className="text-xs text-muted-foreground">{titleLength}/120</p>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                    <label htmlFor="description" className="block text-sm font-medium">
                        Description <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Describe the outage..."
                        {...register('description')}
                        className="w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    />
                    <div className="flex justify-between">
                        {errors.description ? (
                            <p className="text-xs text-red-600">{errors.description.message}</p>
                        ) : (
                            <span />
                        )}
                        <p className="text-xs text-muted-foreground">
                            {descriptionLength}/1000
                        </p>
                    </div>
                </div>

                {/* Cause (UNEXPECTED only) */}
                {type === 'UNEXPECTED' && (
                    <div className="space-y-1.5">
                        <label htmlFor="cause" className="block text-sm font-medium">
                            Cause <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <input
                            id="cause"
                            type="text"
                            placeholder="e.g. Storm damage"
                            {...register('cause')}
                            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                        />
                    </div>
                )}

                {/* Start Time */}
                <div className="space-y-1.5">
                    <label htmlFor="startTime" className="block text-sm font-medium">
                        Start Time <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="startTime"
                        type="datetime-local"
                        {...register('startTime')}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    />
                    {errors.startTime && (
                        <p className="text-xs text-red-600">{errors.startTime.message}</p>
                    )}
                </div>

                {/* End Time */}
                <div className="space-y-1.5">
                    <label htmlFor="endTime" className="block text-sm font-medium">
                        End Time <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <input
                        id="endTime"
                        type="datetime-local"
                        {...register('endTime')}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                    <label htmlFor="duration" className="block text-sm font-medium">
                        Duration (minutes){' '}
                        <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <input
                        id="duration"
                        type="number"
                        min={1}
                        placeholder="e.g. 120"
                        {...register('duration')}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                {/* Priority */}
                <div className="space-y-1.5">
                    <label htmlFor="priority" className="block text-sm font-medium">
                        Priority
                    </label>
                    <select
                        id="priority"
                        {...register('priority')}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200"
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="CRITICAL">Critical</option>
                    </select>
                </div>

                {/* Zone ID */}
                <div className="space-y-1.5">
                    <label htmlFor="zoneId" className="block text-sm font-medium">
                        Zone ID <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="zoneId"
                        type="text"
                        placeholder="Paste the zone ID"
                        {...register('zoneId')}
                        className="w-full rounded-lg border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200 sm:text-sm"
                    />
                    {errors.zoneId && (
                        <p className="text-xs text-red-600">{errors.zoneId.message}</p>
                    )}
                </div>

                {/* Assigned To */}
                <div className="space-y-1.5">
                    <label htmlFor="assignedToId" className="block text-sm font-medium">
                        Assign To{' '}
                        <span className="text-muted-foreground">(optional, operator ID)</span>
                    </label>
                    <input
                        id="assignedToId"
                        type="text"
                        placeholder="Paste operator user ID"
                        {...register('assignedToId')}
                        className="w-full rounded-lg border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200 sm:text-sm"
                    />
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Link
                        href="/technician/outages"
                        className="rounded-lg border px-4 py-2 text-center text-sm font-medium transition hover:bg-muted"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? 'Creating...' : 'Create Outage'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateOutagePage;