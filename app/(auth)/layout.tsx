import { Logo } from "@/components/branding";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-5xl flex-col gap-6">
                <Link href="/" className="self-center">
                    <Logo variant="text" theme="dark" size={45} />
                </Link>
                {children}
            </div>
        </div>
    );
}
