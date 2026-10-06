'use server'

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (state: { success: boolean, message: string }, formData: FormData) => {

    const email = formData.get('userEmail');
    const password = formData.get('userPassword')

    const payload = {
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: result.message || 'Login failed'
        };
    }

    const cookieStore = await cookies();

    // setting accessToken in browser cookies
    cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    })

    // setting refreshToken in browser cookies
    cookieStore.set('refreshToken', result.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        path: '/'
    })

    const user = await getCurrentUser();

    if (!user) {
        return {
            success: false,
            message: "User not found"
        };
    }

    cookieStore.set("userRole", user.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: '/'
    })

    if (user.role === "ADMIN") {
        redirect('/admin');
    }

    if (user.role === "TECHNICIAN") {
        redirect("/provider");
    }

    if (user.role === "CUSTOMER") {
        redirect("/dashboard")
    }

    return {
        success: true,
        message: result.message || "Login successful",
    };
}

export const registerAction = async (state: { success: boolean, message: string }, formData: FormData) => {

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password')

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return {
            success: false,
            message: "Invalid form data"
        };
    }

    const payload = {
        name,
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: result.message || 'Registration failed'
        };
    }

    return {
        success: true,
        message: result.message || "Registration successful"
    }
}

export const logoutAction = async () => {
    const cookieStore = await cookies();

    const accessToken = await cookieStore.get('accessToken')?.value;

    if (accessToken) {
        await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/logout`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
    }

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("userRole")

    redirect("/login")
}