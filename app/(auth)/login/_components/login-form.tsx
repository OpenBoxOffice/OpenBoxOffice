"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/app/lib/auth-client";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
    email: z.email({ message: "Enter a valid email address" }),
    password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(values: LoginValues) {
        clearErrors("root");

        const { error } = await authClient.signIn.email({
            email: values.email,
            password: values.password,
        });

        if (error?.code === "INVALID_EMAIL_OR_PASSWORD") {
            setError("root", {
                type: "server",
                message: "Invalid email or password",
            });
            return;
        }

        if (error) {
            setError("root", {
                type: "server",
                message: error.message || "Unable to sign in right now",
            });
            return;
        }

        const { data: organizations, error: orgsError } = await authClient.organization.list();

        if (orgsError || !organizations || organizations.length === 0) {
            router.push("/setup");
            return;
        }

        await authClient.organization.setActive({
            organizationId: organizations[0].id,
        });

        router.push("/home");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href="/forgot-password"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register("password")}
                />
                {errors.password && (
                    <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
            </div>
            {errors.root?.message && (
                <p className="text-xs text-destructive">{errors.root.message}</p>
            )}
            <Button type="submit" className="w-full mt-1" disabled={isSubmitting}>
                Sign in {isSubmitting && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
            </Button>
        </form>
    );
}
