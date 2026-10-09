import { getCurrentUser } from '@/lib/auth/getCurrentUser';

const TechnicianProfilePage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Profile</h1>

      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">Name</dt>
            <dd className="mt-1 text-sm">{user?.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">Email</dt>
            <dd className="mt-1 text-sm">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-muted-foreground">Role</dt>
            <dd className="mt-1 text-sm">{user?.role}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default TechnicianProfilePage;