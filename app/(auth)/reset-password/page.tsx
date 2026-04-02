import Link from "next/link";
import { AuthCard } from "@/components/auth";
import { ResetPasswordForm } from "./reset-password-form";

export default function ResetPasswordPage() {
    return (
        <AuthCard
            title="Choose a new password"
            description="Set a new password for OpenBoxOffice."
            footer={
                <p className="text-sm text-muted-foreground text-center">
                    Need a new link?{" "}
                    <Link
                        href="/forgot-password"
                        className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                        Request reset email
                    </Link>
                </p>
            }
        >
            <ResetPasswordForm />
        </AuthCard>
    );
}
