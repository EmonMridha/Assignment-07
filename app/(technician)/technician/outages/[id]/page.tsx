import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

interface Outage {
    id: string;
    title: string;
    description: string | null;
    cause: string | null;
    type: string;
    status: string;
    priority: string;
    startTime: string;
    endTime: string | null;
    duration: number | null;
    zone: { name: string; code: string };
    createdBy: { name: string; email: string };
}

const formatDate = (date: string) =>
    new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

const OutageDetailPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/outage/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
    });

    if (!res.ok) return notFound();
    const result = await res.json();
    const outage: Outage = result.data;

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <Link
                href="/technician/outages"
                className="text-sm text-muted-foreground hover:underline"
            >
                ← Back to Outages
            </Link>

            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <h1 className="text-xl font-bold sm:text-2xl">{outage.title}</h1>
                {outage.description && (
                    <p className="mt-2 text-sm text-muted-foreground">{outage.description}</p>
                )}

                <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="text-xs uppercase text-muted-foreground">Type</dt>
                        <dd className="mt-1 text-sm">{outage.type}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase text-muted-foreground">Status</dt>
                        <dd className="mt-1 text-sm">{outage.status}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase text-muted-foreground">Priority</dt>
                        <dd className="mt-1 text-sm">{outage.priority}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase text-muted-foreground">Cause</dt>
                        <dd className="mt-1 text-sm">{outage.cause || '—'}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase text-muted-foreground">Start Time</dt>
                        <dd className="mt-1 text-sm">{formatDate(outage.startTime)}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase text-muted-foreground">End Time</dt>
                        <dd className="mt-1 text-sm">
                            {outage.endTime ? formatDate(outage.endTime) : '—'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase text-muted-foreground">Duration</dt>
                        <dd className="mt-1 text-sm">
                            {outage.duration ? `${outage.duration} min` : '—'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase text-muted-foreground">Zone</dt>
                        <dd className="mt-1 text-sm">
                            {outage.zone?.name} ({outage.zone?.code})
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase text-muted-foreground">Created By</dt>
                        <dd className="mt-1 text-sm">{outage.createdBy?.name}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default OutageDetailPage;