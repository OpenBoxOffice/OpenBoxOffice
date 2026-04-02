import { z } from "zod";

export const orgNameSchema = z
    .string()
    .trim()
    .min(1, "Organization name is required")
    .min(2, "Organization name must be at least 2 characters");

export const orgSlugSchema = z
    .string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be 50 characters or less")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens");

export const createOrgSchema = z.object({
    orgName: orgNameSchema,
    orgSlug: orgSlugSchema,
});

export type CreateOrgValues = z.infer<typeof createOrgSchema>;

export type SetupStep = "choice" | "create" | "join";

export function toSlug(name: string) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 50);
}
