export default function DashboardLoading() {
    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <div className="h-7 w-56 animate-pulse rounded bg-muted sm:h-8 sm:w-64" />
                <div className="h-4 w-40 animate-pulse rounded bg-muted sm:w-48" />
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-lg border bg-card p-5 shadow-sm"
                    >
                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                        <div className="mt-3 h-8 w-16 animate-pulse rounded bg-muted" />
                    </div>
                ))}
            </div>

            {/* Recent Outages Skeleton */}
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <div className="h-6 w-40 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                </div>

                <div className="divide-y rounded-lg border bg-card">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                            <div className="flex gap-3">
                                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                                <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-end">
                    <div className="h-9 w-36 animate-pulse rounded-md bg-muted" />
                </div>
            </section>
        </div>
    );
}