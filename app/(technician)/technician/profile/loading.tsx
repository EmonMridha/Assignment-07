export default function TechnicianProfileLoading() {
    return (
        <div className="space-y-6">
            <div className="h-7 w-32 animate-pulse rounded bg-muted sm:h-8 lg:h-9" />

            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}