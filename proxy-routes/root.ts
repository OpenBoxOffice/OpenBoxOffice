import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function rootProxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) return NextResponse.redirect(new URL('/login', request.url))

    // side tangent: i'm more of a /home kinda guy than a /dashboard kinda guy
    // note that we NEVER .next() the request, "/" should never be accessible to the user
    // *THE ABOVE ONLY APPLIES IF WE ARE ON SELF HOSTED!!!!!!!! (BIG EXCLAMATION POINT!!!)
    return NextResponse.redirect(new URL('/home', request.url));
}
