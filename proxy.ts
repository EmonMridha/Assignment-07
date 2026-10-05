import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const userRole = request.cookies.get("userRole")?.value;

    const pathname = request.nextUrl.pathname;

    if (!accessToken) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    if (
        pathname.startsWith("/admin") &&
        userRole !== "ADMIN"
    ) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    if (
        pathname.startsWith("/provider") &&
        userRole !== "TECHNICIAN"
    ) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    if (
        pathname.startsWith("/dashboard") &&
        userRole !== "CUSTOMER"
    ) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/provider/:path*",
        "/dashboard/:path*",
    ],
};