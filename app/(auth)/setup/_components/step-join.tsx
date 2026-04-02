"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MailOpen } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";

interface StepJoinProps {
    invitationId: string | null;
}

export function StepJoin({ invitationId }: StepJoinProps) {
    const router = useRouter();
    const [pageError, setPageError] = useState<string | null>(null);
    const [isAccepting, setIsAccepting] = useState(false);

    async function handleAccept() {
        if (!invitationId) return;

        setPageError(null);
        setIsAccepting(true);

        const { error } = await authClient.organization.acceptInvitation({
            invitationId,
        });

        setIsAccepting(false);

        if (error) {
            setPageError(error.message || "Failed to accept invitation");
            return;
        }

        router.push("/home");
    }

    return (
        <div className="flex flex-col gap-4">
            {pageError && (
                <p className="text-sm text-destructive">{pageError}</p>
            )}

            {invitationId ? (
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <MailOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-medium">Invitation found</p>
                            <p className="text-sm text-muted-foreground">
                                Accept it to join your organization.
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleAccept} disabled={isAccepting}>
                        Accept invitation
                        {isAccepting && (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        )}
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 py-2 pb-6 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <MailOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">No invitation found</p>
                        <p className="text-sm text-muted-foreground">
                            Ask your team admin for an invitation link.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
