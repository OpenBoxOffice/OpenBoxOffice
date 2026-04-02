import Link from "next/link";
import { AuthCard } from "@/components/auth";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
    return (
        <AuthCard
            title="Welcome back"
            description="Sign in to your OpenBoxOffice account"
            footer={
                <p className="text-sm text-muted-foreground text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            }
        >
            <LoginForm />
        </AuthCard>
    );
}