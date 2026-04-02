"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlugInput, type SlugStatus } from "../../../../components/auth/slug-input";
import { createOrgSchema, toSlug, type CreateOrgValues } from "./schema";

export function StepCreate() {
    const router = useRouter();
    const [slugEdited, setSlugEdited] = useState(false);
    const [checkedSlug, setCheckedSlug] = useState("");
    const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");
    const [pageError, setPageError] = useState<string | null>(null);

    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<CreateOrgValues>({
        resolver: zodResolver(createOrgSchema),
        defaultValues: { orgName: "", orgSlug: "" },
    });

    const orgName = useWatch({ control, name: "orgName" });
    const orgSlug = useWatch({ control, name: "orgSlug" });

    const isSlugFormatValid = Boolean(
        orgSlug && orgSlug.length >= 2 && /^[a-z0-9-]+$/.test(orgSlug),
    );

    const displaySlugStatus: SlugStatus = !isSlugFormatValid
        ? "idle"
        : checkedSlug === orgSlug
          ? slugStatus
          : "checking";

    useEffect(() => {
        if (orgName && !slugEdited) {
            setValue("orgSlug", toSlug(orgName), { shouldValidate: false });
        }
    }, [orgName, setValue, slugEdited]);

    useEffect(() => {
        if (!isSlugFormatValid || !orgSlug) return;

        const timer = setTimeout(async () => {
            const { data, error } = await authClient.organization.checkSlug({
                slug: orgSlug,
            });

            if (error?.code === "ORGANIZATION_SLUG_ALREADY_TAKEN") {
                setError("orgSlug", { message: "This URL is already taken" });
                setSlugStatus("taken");
                setCheckedSlug(orgSlug);
                return;
            }

            if (error) {
                setSlugStatus("error");
                setCheckedSlug(orgSlug);
                return;
            }

            setSlugStatus("available");
            setCheckedSlug(orgSlug);
            clearErrors("orgSlug");
        }, 500);

        return () => clearTimeout(timer);
    }, [orgSlug, clearErrors, isSlugFormatValid, setError]);

    async function onSubmit(values: CreateOrgValues) {
        setPageError(null);

        const { error } = await authClient.organization.create({
            name: values.orgName,
            slug: values.orgSlug,
        });

        if (error?.code === "ORGANIZATION_SLUG_ALREADY_TAKEN") {
            setError("orgSlug", {
                type: "server",
                message: "This organization URL is already taken",
            });
            setSlugStatus("taken");
            return;
        }

        if (error) {
            setPageError(error.message || "Failed to create organization");
            return;
        }

        router.push("/home");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="orgName">Organization name</Label>
                    <Input
                        id="orgName"
                        placeholder="Acme Theaters"
                        autoFocus
                        {...register("orgName")}
                    />
                    {errors.orgName && Boolean(orgName?.trim()) && (
                        <p className="text-xs text-destructive">
                            {errors.orgName.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="orgSlug">Organization URL</Label>
                    <SlugInput
                        id="orgSlug"
                        registration={register("orgSlug", {
                            onChange: () => setSlugEdited(true),
                        })}
                        displayStatus={displaySlugStatus}
                        error={errors.orgSlug?.message}
                    />
                </div>
            </div>

            {pageError && (
                <p className="text-sm text-destructive">{pageError}</p>
            )}

            <Button type="submit" disabled={isSubmitting || slugStatus !== "available"}>
                Create organization
                {isSubmitting && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
            </Button>
        </form>
    );
}
