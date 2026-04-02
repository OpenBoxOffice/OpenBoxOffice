"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
    email: z.email("Enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordValues>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(forgotPasswordSchema),
    });

    async function onSubmit(values: ForgotPasswordValues) {
        clearErrors("root");

        const { error } = await authClient.requestPasswordReset({
            email: values.email,
            redirectTo: "/reset-password",
        });

        if (error) {
            setError("root", {
                type: "server",
                message: error.message || "Unable to send reset email right now",
            });
            return;
        }

        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                    If that email exists as an account, a reset link has been sent. Check
                    your email inbox.
                </p>
            </div>
        );
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
                    autoFocus
                    {...register("email")}
                />
                {errors.email ? (
                    <p className="text-xs text-destructive">
                        {errors.email.message}
                    </p>
                ) : null}
            </div>
            {errors.root?.message ? (
                <p className="text-xs text-destructive">
                    {errors.root.message}
                </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                Send reset link
                {isSubmitting ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : null}
            </Button>
        </form>
    );
}
