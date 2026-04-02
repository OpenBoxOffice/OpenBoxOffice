import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function authProxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session) return NextResponse.redirect(new URL('/home', request.url))

    return NextResponse.next();
}
