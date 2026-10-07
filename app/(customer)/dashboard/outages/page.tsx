import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { Outage } from "@/types/outage";
import { cookies } from "next/headers";

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
    const outages = await result.data;

    return (
        <div className="space-y-4 p-4 sm:p-6 lg:p-8">
            <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                Customer Dashboard
            </h1>

            <div className="space-y-1">
                <p className="text-sm text-muted-foreground sm:text-base">
                    Welcome, {user?.name}
                </p>
                <p className="truncate text-sm sm:text-base">
                    Email: {user?.email}
                </p>
            </div>

            <section>
                <h2 className="text-lg font-semibold sm:text-xl">
                    Recent Outages
                </h2>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {outages.map((outage: Outage) => (
                        <div
                            key={outage.id}
                            className="rounded-lg border p-4 transition hover:shadow-md"
                        >
                            <h3 className="font-semibold truncate">
                                {outage.title}
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground truncate">
                                Zone: {outage.zone.name}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                                    {outage.status}
                                </span>
                                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                                    {outage.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;