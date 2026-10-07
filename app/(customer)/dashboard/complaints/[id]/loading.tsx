export default function ComplaintDetailsLoading() {
    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
            {/* Back link */}
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />

            {/* Header Card */}
            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="h-7 w-3/4 animate-pulse rounded bg-muted sm:h-8 sm:w-2/3" />
                    <div className="h-7 w-24 animate-pulse rounded-full bg-muted" />
                </div>

                <div className="mt-4 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
            </div>

            {/* Details Grid */}
            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <div className="h-6 w-48 animate-pulse rounded bg-muted" />

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-full animate-pulse rounded bg-muted" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Resolution Card */}
            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <div className="h-6 w-32 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-16 w-full animate-pulse rounded-lg bg-muted" />
            </div>
        </div>
    );
}