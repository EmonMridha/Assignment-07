import { cookies } from 'next/headers';

interface Zone {
    id: string;
    name: string;
    code: string;
    isActive: boolean;
}

const AdminZonesPage = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/zone`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
    });

    const result = await res.json();
    const zones: Zone[] = result.data || [];

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Zones</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {zones.map((z) => (
                    <div key={z.id} className="rounded-xl border bg-card p-5 shadow-sm">
                        <h2 className="font-semibold">{z.name}</h2>
                        <p className="mt-1 text-xs text-muted-foreground">Code: {z.code}</p>
                        <p className="mt-1 text-xs">{z.isActive ? 'Active' : 'Inactive'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminZonesPage;