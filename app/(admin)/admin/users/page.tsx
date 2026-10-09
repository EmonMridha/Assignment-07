import { cookies } from 'next/headers';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

const AdminUsersPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/admin/users`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  const result = await res.json();
  const users: User[] = result.data || [];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Users</h1>

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
            {users.map((u) => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{u.isActive ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;