import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

interface Complaint {
    id: string;
    userId: string;
    outageId: string | null;
    title: string;
    description: string;
    status: 'PENDING' | 'ASSIGNED' | 'RESOLVED' | 'REJECTED';
    resolvedAt: string | null;
    resolution: string | null;
    createdAt: string;
    updatedAt: string;
}

const statusStyles: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    ASSIGNED: 'bg-blue-100 text-blue-800 border-blue-200',
    RESOLVED: 'bg-green-100 text-green-800 border-green-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
};

const formatDate = (date: string) =>
    new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

const ComplaintDetails = async ({ params }: PageProps) => {
    const { id } = await params;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/v1/complaint/${id}`,
        {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: "no-store"
        }
    );

    if (!res.ok) return notFound();

    const result = await res.json();
    const complaint: Complaint = result.data;

    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
            {/* Back link */}
            <Link
                href="/dashboard/complaints"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
            >
                ← Back to Complaints
            </Link>

            {/* Header Card */}
            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h1 className="text-xl font-bold sm:text-2xl">
                        {complaint.title}
                    </h1>
                    <span
                        className={`self-start shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
                            statusStyles[complaint.status] ||
                            'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                    >
                        {complaint.status}
                    </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {complaint.description}
                </p>
            </div>

            {/* Details Grid */}
            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <h2 className="text-base font-semibold sm:text-lg">
                    Complaint Information
                </h2>

                <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="text-xs font-medium uppercase text-muted-foreground">
                            Complaint ID
                        </dt>
                        <dd className="mt-1 truncate font-mono text-xs sm:text-sm">
                            {complaint.id}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-xs font-medium uppercase text-muted-foreground">
                            User ID
                        </dt>
                        <dd className="mt-1 truncate font-mono text-xs sm:text-sm">
                            {complaint.userId}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-xs font-medium uppercase text-muted-foreground">
                            Linked Outage ID
                        </dt>
                        <dd className="mt-1 truncate font-mono text-xs sm:text-sm">
                            {complaint.outageId || (
                                <span className="text-muted-foreground">—</span>
                            )}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-xs font-medium uppercase text-muted-foreground">
                            Created At
                        </dt>
                        <dd className="mt-1 text-sm">
                            {formatDate(complaint.createdAt)}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-xs font-medium uppercase text-muted-foreground">
                            Last Updated
                        </dt>
                        <dd className="mt-1 text-sm">
                            {formatDate(complaint.updatedAt)}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-xs font-medium uppercase text-muted-foreground">
                            Resolved At
                        </dt>
                        <dd className="mt-1 text-sm">
                            {complaint.resolvedAt ? (
                                formatDate(complaint.resolvedAt)
                            ) : (
                                <span className="text-muted-foreground">
                                    Not resolved yet
                                </span>
                            )}
                        </dd>
                    </div>
                </dl>
            </div>

            {/* Resolution Card */}
            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <h2 className="text-base font-semibold sm:text-lg">
                    Resolution
                </h2>

                {complaint.resolution ? (
                    <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-4">
                        <p className="text-sm text-green-800">
                            {complaint.resolution}
                        </p>
                    </div>
                ) : (
                    <p className="mt-3 text-sm text-muted-foreground">
                        This complaint has not been resolved yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ComplaintDetails;