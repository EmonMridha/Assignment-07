import { getCurrentUser } from "@/lib/auth/getCurrentUser";

const DashboardPage = async () => {

    const user = await getCurrentUser(); // getting current user info
    return (
        <div className="space-y-2 p-4 sm:p-6">
            <h1 className="text-xl font-bold sm:text-2xl">
                Customer Dashboard
            </h1>

            <p className="text-sm text-muted-foreground sm:text-base">
                Welcome, {user?.name}
            </p>

            <p className="truncate text-sm sm:text-base">
                Email: {user?.email}
            </p>
        </div>
    );
};

export default DashboardPage;