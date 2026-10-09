export default function TechnicianHomeLoading() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="h-7 w-56 animate-pulse rounded bg-muted sm:h-8 lg:h-9" />
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
            </div>

            <div className="rounded-lg border bg-card p-5 shadow-sm">
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-8 w-16 animate-pulse rounded bg-muted" />
            </div>

            <div className="flex flex-wrap gap-3">
                <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
                <div className="h-10 w-36 animate-pulse rounded-lg bg-muted" />
            </div>
        </div>
    );
}