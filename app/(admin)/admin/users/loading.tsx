export default function AdminUsersLoading() {
    return (
        <div className="space-y-6">
            <div className="h-7 w-24 animate-pulse rounded bg-muted sm:h-8 lg:h-9" />

            <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-muted">
                        <tr>
                            <th className="p-3 font-medium">Name</th>
                            <th className="p-3 font-medium">Email</th>
                            <th className="p-3 font-medium">Role</th>
                            <th className="p-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <tr key={i} className="border-b last:border-0">
                                <td className="p-3">
                                    <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                                </td>
                                <td className="p-3">
                                    <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                                </td>
                                <td className="p-3">
                                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                                </td>
                                <td className="p-3">
                                    <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}