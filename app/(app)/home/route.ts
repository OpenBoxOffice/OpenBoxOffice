import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import db from "@/app/lib/db";
import { organization } from "@/db/schema/auth";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const activeOrganizationId = session.session.activeOrganizationId;

    if (!activeOrganizationId) {
        return NextResponse.redirect(new URL("/setup", request.url));
    }

    // overhead, so we just avoid that w/ a direct query
    const [org] = await db
        .select({ slug: organization.slug })
        .from(organization)
        .where(eq(organization.id, activeOrganizationId))
        .limit(1);

    if (!org) {
        return NextResponse.redirect(new URL("/setup", request.url));
    }

    return NextResponse.redirect(new URL(`/${org.slug}`, request.url));
}
