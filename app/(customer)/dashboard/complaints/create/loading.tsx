export default function CreateComplaintLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Back link */}
      <div className="h-4 w-32 animate-pulse rounded bg-muted" />

      {/* Header */}
      <div className="space-y-2">
        <div className="h-7 w-56 animate-pulse rounded bg-muted sm:h-8" />
        <div className="h-4 w-72 animate-pulse rounded bg-muted" />
      </div>

      {/* Form */}
      <div className="space-y-5 rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
          <div className="flex justify-end">
            <div className="h-3 w-12 animate-pulse rounded bg-muted" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-28 w-full animate-pulse rounded-lg bg-muted" />
          <div className="flex justify-end">
            <div className="h-3 w-14 animate-pulse rounded bg-muted" />
          </div>
        </div>

        {/* Outage ID */}
        <div className="space-y-1.5">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted sm:w-20" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted sm:w-40" />
        </div>
      </div>
    </div>
  );
}