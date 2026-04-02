import Link from "next/link";
import { AuthCard } from "@/components/auth";
import { RegisterForm } from "./_components/register-form";

export default function SignupPage() {
    return (
        <AuthCard
            title="Create your account"
            description="We'll get you into an organization right after signup."
            footer={
                <p className="text-sm text-muted-foreground text-center">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            }
        >
            <RegisterForm />
        </AuthCard>
    );
}
