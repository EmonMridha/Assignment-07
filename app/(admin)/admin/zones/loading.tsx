export default function AdminZonesLoading() {
    return (
        <div className="space-y-6">
            <div className="h-7 w-24 animate-pulse rounded bg-muted sm:h-8 lg:h-9" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-xl border bg-card p-5 shadow-sm">
                        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                        <div className="mt-2 h-3 w-24 animate-pulse rounded bg-muted" />
                        <div className="mt-2 h-3 w-16 animate-pulse rounded bg-muted" />
                    </div>
                ))}
            </div>
        </div>
    );
}