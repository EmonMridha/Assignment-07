export default function OutageDetailLoading() {
    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />

            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <div className="h-7 w-2/3 animate-pulse rounded bg-muted sm:h-8" />
                <div className="mt-3 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                </div>

                <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}