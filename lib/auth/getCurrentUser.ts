import { cookies } from "next/headers"
import { CurrentUser } from "./auth.types";

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
    const cookieStore = await cookies();

    // getting the accessToken from the cookies in browser
    const accessToken = await cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return null;
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store'
    });

    if (!res.ok) {
        return null;
    }

    const result = await res.json()

    return result.data as CurrentUser;
}