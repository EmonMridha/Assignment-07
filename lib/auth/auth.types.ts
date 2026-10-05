export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type CurrentUser = {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    role: UserRole;
    isActive: boolean;
    gcpId: string | null;
    createdAt: string;
    updatedAt: string;
};