import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export default async function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return (
        <div className="min-w-0">
            <h1>organization: {slug}</h1>
            <pre className="overflow-x-auto text-sm whitespace-pre-wrap break-all">{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}