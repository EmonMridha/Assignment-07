import { cookies } from 'next/headers';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

const TechnicianHomePage = async () => {
  const user = await getCurrentUser();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/outage`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  const result = await res.json();
  const totalOutages = result.data?.length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
          Technician Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome, {user?.name}
        </p>
      </div>

      <div className="rounded-lg border bg-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Total Outages</p>
        <p className="mt-2 text-3xl font-bold">{totalOutages}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/technician/outages"
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          View Outages
        </Link>
        <Link
          href="/technician/outages/create"
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          + Create Outage
        </Link>
      </div>
    </div>
  );
};

export default TechnicianHomePage;