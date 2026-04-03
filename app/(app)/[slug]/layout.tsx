import { OrganizationShell } from "./_components/organization-shell";

export default async function OrganizationLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <OrganizationShell slug={slug}>
            {children}
        </OrganizationShell>
    );
}