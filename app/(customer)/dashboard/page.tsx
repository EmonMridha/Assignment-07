import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { Outage } from "@/types/outage";
import { cookies } from "next/headers";
import Link from "next/link";

const DashboardPage = async () => {
    const user = await getCurrentUser();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/outage`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store"
    });

    const result = await res.json();
    const outages: Outage[] = result.data || [];

    // Stats (adjust based on your API)
    const stats = [
        { label: "Total Outages", value: outages.length }
    ];

    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                    Customer Dashboard
                </h1>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Welcome, {user?.name}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-lg border bg-card p-5 shadow-sm transition hover:shadow-md"
                    >
                        <p className="text-sm text-muted-foreground">
                            {stat.label}
                        </p>
                        <p className="mt-2 text-3xl font-bold">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Outages */}
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold sm:text-xl">
                        Recent Outages
                    </h2>
                    <Link
                        href="/dashboard/outages"
                        className="text-sm font-medium text-sky-600 hover:underline"
                    >
                        View All
                    </Link>
                </div>

                <div className="divide-y rounded-lg border bg-card">
                    {outages.length === 0 ? (
                        <p className="p-4 text-sm text-muted-foreground">
                            No recent outages found.
                        </p>
                    ) : (
                        outages.slice(0, 3).map((outage) => (
                            <div
                                key={outage.id}
                                className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <h3 className="font-semibold truncate">
                                    {outage.title}
                                </h3>
                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground sm:gap-3">
                                    <span>Zone: {outage.zone.name}</span>
                                    <span>Status: {outage.status}</span>
                                    <span>Priority: {outage.priority}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* View All Button */}
                <div className="mt-4 flex justify-end">
                    <Link
                        href="/dashboard/outages"
                        className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                        View All Outages
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;