import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request });

    if (token?.token) {
        return NextResponse.next();
    }

    const isOnLoginPage = request.nextUrl.pathname.startsWith("/auth/login");

    const loginUrl = new URL("/auth/login", request.url);

    if (!isOnLoginPage) {
        loginUrl.searchParams.set(
            "callbackUrl",
            request.nextUrl.pathname + request.nextUrl.search
        );
    }

    return NextResponse.redirect(loginUrl);
}
