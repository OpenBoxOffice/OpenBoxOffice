"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const resetPasswordSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((value) => value.password === value.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const invalidMessage = useMemo(() => {
        if (error === "INVALID_TOKEN" || error === "TOKEN_EXPIRED") {
            return "This reset link is invalid or expired. Request a fresh one.";
        }

        if (!token) {
            return "A valid reset token is required to choose a new password.";
        }

        return null;
    }, [error, token]);

    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordValues>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(resetPasswordSchema),
    });

    async function onSubmit(values: ResetPasswordValues) {
        if (!token) {
            return;
        }

        clearErrors("root");

        const { error: resetError } = await authClient.resetPassword({
            newPassword: values.password,
            token,
        });

        if (resetError) {
            setError("root", {
                type: "server",
                message: resetError.message || "Unable to reset password",
            });
            return;
        }

        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className="space-y-4 text-sm text-muted-foreground">
                <p>Your password has been updated, and you can now sign in with your new password.</p>
                <Button asChild className="w-full">
                    <Link href="/login">Continue to sign in</Link>
                </Button>
            </div>
        );
    }

    if (invalidMessage) {
        return (
            <div className="space-y-4 text-sm text-muted-foreground">
                <p>{invalidMessage}</p>
                <Link
                    href="/forgot-password"
                    className="inline-block text-foreground font-medium hover:text-primary transition-colors"
                >
                    Request another reset link
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="password">New password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        className="pr-9"
                        autoFocus
                        {...register("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
                {errors.password ? (
                    <p className="text-xs text-destructive">
                        {errors.password.message}
                    </p>
                ) : null}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Repeat your new password"
                        autoComplete="new-password"
                        className="pr-9"
                        {...register("confirmPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm((value) => !value)}
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {showConfirm ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
                {errors.confirmPassword ? (
                    <p className="text-xs text-destructive">
                        {errors.confirmPassword.message}
                    </p>
                ) : null}
            </div>
            {errors.root?.message ? (
                <p className="text-xs text-destructive">
                    {errors.root.message}
                </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                Set new password
                {isSubmitting ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : null}
            </Button>
        </form>
    );
}
