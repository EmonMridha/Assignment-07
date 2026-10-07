
import { cookies } from 'next/headers';
import Link from 'next/link';

interface Complaint {
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'ASSIGNED' | 'RESOLVED' | 'REJECTED';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    createdAt: string;
    area?: { name: string };
    user?: { name: string; email: string };
    resolution?: string | null;
}

const statusStyles: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    ASSIGNED: 'bg-blue-100 text-blue-800 border-blue-200',
    RESOLVED: 'bg-green-100 text-green-800 border-green-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
};

const priorityStyles: Record<string, string> = {
    LOW: 'bg-slate-100 text-slate-700',
    MEDIUM: 'bg-amber-100 text-amber-700',
    HIGH: 'bg-orange-100 text-orange-700',
    CRITICAL: 'bg-red-100 text-red-700',
};

const Complaints = async () => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/complaint`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store"
    });

    const result = await res.json();
    const complaints: Complaint[] = result.data || [];

    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                        All Complaints
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        Track the status of all submitted complaints by peoples
                    </p>
                </div>
                <span className="self-start rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 sm:self-auto">
                    {complaints.length} Total
                </span>
            </div>

            {/* Empty state */}
            {complaints.length === 0 ? (
                <div className="rounded-lg border border-dashed bg-card p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                        <svg
                            className="h-7 w-7 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-base font-semibold">
                        No complaints yet
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        No complaints yet
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {complaints.map((complaint) => (
                        <div
                            key={complaint.id}
                            className="group rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <h3 className="font-semibold text-base sm:text-lg line-clamp-2">
                                    {complaint.title}
                                </h3>
                                <span
                                    className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[complaint.status] ||
                                        'bg-slate-100 text-slate-700 border-slate-200'
                                        }`}
                                >
                                    {complaint.status}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                                {complaint.description}
                            </p>

                            {/* Meta */}
                            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                {complaint.priority && (
                                    <span
                                        className={`rounded px-2 py-0.5 font-medium ${priorityStyles[complaint.priority] ||
                                            'bg-slate-100 text-slate-700'
                                            }`}
                                    >
                                        {complaint.priority}
                                    </span>
                                )}

                                {complaint.area?.name && (
                                    <span className="text-muted-foreground">
                                        📍 {complaint.area.name}
                                    </span>
                                )}

                                <span className="text-muted-foreground">
                                    🕒{' '}
                                    {new Date(complaint.createdAt).toLocaleDateString(
                                        'en-US',
                                        {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        }
                                    )}
                                </span>
                            </div>

                            {/* Resolution (if any) */}
                            {complaint.resolution && (
                                <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3">
                                    <p className="text-xs font-medium text-green-800">
                                        Resolution
                                    </p>
                                    <p className="mt-1 text-sm text-green-700 line-clamp-2">
                                        {complaint.resolution}
                                    </p>
                                </div>
                            )}
                            <Link
                                href={`/dashboard/complaints/${complaint.id}`}
                                className="my-4 inline-block bg-black text-white p-1 rounded-2xl text-sm px-3 cursor-pointer hover:bg-slate-800 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Complaints;