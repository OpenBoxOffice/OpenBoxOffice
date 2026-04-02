import Link from "next/link";
import { AuthCard } from "@/components/auth";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <AuthCard
            title="Reset your password"
            description="We will email you a link to choose a new password."
            footer={
                <p className="text-sm text-muted-foreground text-center">
                    <Link
                        href="/login"
                        className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                        Back to sign in
                    </Link>
                </p>
            }
        >
            <ForgotPasswordForm />
        </AuthCard>
    );
}
