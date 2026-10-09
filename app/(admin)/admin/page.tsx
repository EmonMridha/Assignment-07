import { cookies } from 'next/headers';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

const AdminHome = async () => {
    const user = await getCurrentUser();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const [outagesRes, complaintsRes] = await Promise.all([
        fetch(`${process.env.BACKEND_API_URL}/api/v1/outage`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: 'no-store',
        }),
        fetch(`${process.env.BACKEND_API_URL}/api/v1/complaint`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: 'no-store',
        }),
    ]);

    const outagesData = await outagesRes.json();
    const complaintsData = await complaintsRes.json();

    const totalOutages = outagesData.data?.length ?? 0;
    const totalComplaints = complaintsData.data?.length ?? 0;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                    Admin Dashboard
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">Welcome, {user?.name}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">Total Outages</p>
                    <p className="mt-2 text-3xl font-bold">{totalOutages}</p>
                </div>
                <div className="rounded-lg border bg-card p-5 shadow-sm">
                    <p className="text-sm text-muted-foreground">Total Complaints</p>
                    <p className="mt-2 text-3xl font-bold">{totalComplaints}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;