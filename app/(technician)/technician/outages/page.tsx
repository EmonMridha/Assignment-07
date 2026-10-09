import { cookies } from 'next/headers';
import Link from 'next/link';

interface Outage {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  startTime: string;
  zone: { name: string };
}

const TechnicianOutagesPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/outage`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  const result = await res.json();
  const outages: Outage[] = result.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Outages</h1>
        <p className="mt-1 text-sm text-muted-foreground">All outages</p>
      </div>

      {outages.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-card p-10 text-center text-sm text-muted-foreground">
          No outages found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {outages.map((outage) => (
            <div
              key={outage.id}
              className="rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{outage.title}</h3>
                <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium">
                  {outage.status}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>Zone: {outage.zone?.name}</span>
                <span>Priority: {outage.priority}</span>
                <span>Type: {outage.type}</span>
              </div>

              <Link
                href={`/technician/outages/${outage.id}`}
                className="mt-4 inline-block rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
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

export default TechnicianOutagesPage;