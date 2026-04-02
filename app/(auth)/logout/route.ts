import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    // Invalidate the user's session (log out)
    await auth.api.signOut({
        headers: await headers()
    });

    // Redirect the user to the login page after logout
    return NextResponse.redirect(new URL("/login", request.url));
}