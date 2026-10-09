export default function AdminComplaintsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-7 w-40 animate-pulse rounded bg-muted sm:h-8 lg:h-9" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}