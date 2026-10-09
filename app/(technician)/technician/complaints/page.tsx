import { cookies } from 'next/headers';

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

const TechnicianComplaintsPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/complaint`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  const result = await res.json();
  const complaints: Complaint[] = result.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Complaints</h1>
        <p className="mt-1 text-sm text-muted-foreground">All complaints</p>
      </div>

      {complaints.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-card p-10 text-center text-sm text-muted-foreground">
          No complaints found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {complaints.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{c.title}</h3>
                <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium">
                  {c.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnicianComplaintsPage;