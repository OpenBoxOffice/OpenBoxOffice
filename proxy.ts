import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as proxyRoutes from "@/proxy-routes";

const isHosted = process.env.HOSTED === "true";

export function proxy(request: NextRequest) {
    switch (request.nextUrl.pathname) {
        case "/":
            if (!isHosted) {
                return proxyRoutes.rootProxy(request);
            }

            return NextResponse.next();
        case "/login":
        case "/signup":
            return proxyRoutes.authProxy(request);
        default:
            return NextResponse.next();
    }
}

export const config = {
    matcher: ["/"],
};
