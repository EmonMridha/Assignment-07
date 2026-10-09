export default function AdminHomeLoading() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="h-7 w-56 animate-pulse rounded bg-muted sm:h-8 lg:h-9" />
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="rounded-lg border bg-card p-5 shadow-sm">
                        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                        <div className="mt-3 h-8 w-16 animate-pulse rounded bg-muted" />
                    </div>
                ))}
            </div>
        </div>
    );
}