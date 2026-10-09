import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Outage {
  id: string;
  type: 'SCHEDULED' | 'UNEXPECTED';
  title: string;
  description: string | null;
  cause: string | null;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  status: 'SCHEDULED' | 'ACTIVE' | 'RESOLVED' | 'CANCELLED';
  priority: string;
  zoneId: string;
  createdById: string;
  assignedToId: string | null;
  assignedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  zone: {
    id: string;
    name: string;
    code: string;
    description: string | null;
  };
  createdBy: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

const statusStyles: Record<string, string> = {
  SCHEDULED: 'bg-blue-100 text-blue-800 border-blue-200',
  ACTIVE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  RESOLVED: 'bg-green-100 text-green-800 border-green-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200',
};

const formatDate = (date: string) =>
  new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const OutageDetails = async ({ params }: PageProps) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/v1/outage/${id}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    }
  );

  if (!res.ok) return notFound();

  const result = await res.json();
  const outage: Outage = result.data;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <Link
        href="/dashboard/outages"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
      >
        ← Back to Outages
      </Link>

      {/* Header */}
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl font-bold sm:text-2xl">{outage.title}</h1>
          <span
            className={`self-start shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
              statusStyles[outage.status] ||
              'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {outage.status}
          </span>
        </div>

        {outage.description && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {outage.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded bg-slate-100 px-2 py-1 font-medium">
            {outage.type}
          </span>
          <span className="rounded bg-slate-100 px-2 py-1 font-medium">
            Priority: {outage.priority}
          </span>
        </div>
      </div>

      {/* Zone */}
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold sm:text-lg">Zone</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Name
            </dt>
            <dd className="mt-1 text-sm">{outage.zone.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Code
            </dt>
            <dd className="mt-1 text-sm">{outage.zone.code}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Description
            </dt>
            <dd className="mt-1 text-sm">
              {outage.zone.description || '—'}
            </dd>
          </div>
        </dl>
      </div>

      {/* Timing */}
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold sm:text-lg">Timing</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Start Time
            </dt>
            <dd className="mt-1 text-sm">{formatDate(outage.startTime)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              End Time
            </dt>
            <dd className="mt-1 text-sm">
              {outage.endTime ? formatDate(outage.endTime) : 'Not set'}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Duration
            </dt>
            <dd className="mt-1 text-sm">
              {outage.duration ? `${outage.duration} minutes` : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Cause
            </dt>
            <dd className="mt-1 text-sm">{outage.cause || '—'}</dd>
          </div>
        </dl>
      </div>

      {/* Assignment */}
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold sm:text-lg">Assignment</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Assigned To
            </dt>
            <dd className="mt-1 truncate font-mono text-xs">
              {outage.assignedToId || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Assigned At
            </dt>
            <dd className="mt-1 text-sm">
              {outage.assignedAt ? formatDate(outage.assignedAt) : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Completed At
            </dt>
            <dd className="mt-1 text-sm">
              {outage.completedAt ? formatDate(outage.completedAt) : '—'}
            </dd>
          </div>
        </dl>
      </div>

      {/* Created By */}
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold sm:text-lg">Created By</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Name
            </dt>
            <dd className="mt-1 text-sm">{outage.createdBy.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Email
            </dt>
            <dd className="mt-1 text-sm">{outage.createdBy.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Role
            </dt>
            <dd className="mt-1 text-sm">{outage.createdBy.role}</dd>
          </div>
        </dl>
      </div>

      {/* Reference IDs */}
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold sm:text-lg">Reference IDs</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Outage ID
            </dt>
            <dd className="mt-1 truncate font-mono text-xs">{outage.id}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Zone ID
            </dt>
            <dd className="mt-1 truncate font-mono text-xs">{outage.zoneId}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Created At
            </dt>
            <dd className="mt-1 text-sm">{formatDate(outage.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">
              Updated At
            </dt>
            <dd className="mt-1 text-sm">{formatDate(outage.updatedAt)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default OutageDetails;