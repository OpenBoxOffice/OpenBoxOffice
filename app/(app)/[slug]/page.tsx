import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export default async function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return (
        <div className="p-4">
            <h1>organization: {slug}</h1>
            <h1>session information: {JSON.stringify(session)}</h1>
        </div>
    );
}