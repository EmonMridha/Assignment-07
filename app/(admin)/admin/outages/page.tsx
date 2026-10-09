import { cookies } from 'next/headers';

interface Outage {
    id: string;
    title: string;
    type: string;
    status: string;
    priority: string;
    zone: { name: string };
}

const AdminOutagesPage = async () => {
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
            <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Outages</h1>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {outages.map((o) => (
                    <div key={o.id} className="rounded-xl border bg-card p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <h2 className="font-semibold">{o.title}</h2>
                            <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium">
                                {o.status}
                            </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span>Zone: {o.zone?.name}</span>
                            <span>Type: {o.type}</span>
                            <span>Priority: {o.priority}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOutagesPage;