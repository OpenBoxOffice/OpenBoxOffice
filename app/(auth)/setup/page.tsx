"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import { AuthCard } from "@/components/auth";
import { authClient } from "@/app/lib/auth-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { SetupStep } from "./_components/schema";
import { StepChoice } from "./_components/step-choice";
import { StepCreate } from "./_components/step-create";
import { StepJoin } from "./_components/step-join";

const STEP_CONTENT: Record<SetupStep, { title: string; description: string }> = {
    choice: {
        title: "Set up your organization",
        description: "Create a new organization or join an existing one.",
    },
    create: {
        title: "Create an organization",
        description: "Set a name and URL for your organization.",
    },
    join: {
        title: "Join an organization",
        description: "Accept your invitation to get started.",
    },
};

export default function SetupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const invitationId = searchParams.get("invitationId");
    const verified = searchParams.get("verified");

    const [step, setStep] = useState<SetupStep>(invitationId ? "join" : "choice");

    const { data: sessionData, isPending: isSessionPending } = authClient.useSession();
    const activeOrganizationId = sessionData?.session?.activeOrganizationId;

    useEffect(() => {
        if (!isSessionPending && !sessionData) {
            router.replace("/login");
        }
    }, [isSessionPending, router, sessionData]);

    useEffect(() => {
        if (!isSessionPending && activeOrganizationId) {
            router.replace("/home");
        }
    }, [activeOrganizationId, isSessionPending, router]);

    const { title, description } = STEP_CONTENT[step];

    return (
        <AuthCard
            title={title}
            description={description}
            className="max-w-md"
            onBack={step !== "choice" ? () => setStep("choice") : undefined}
        >
            {verified === "1" && step === "choice" ? (
                <Alert variant="success">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Email verified!</AlertTitle>
                    <AlertDescription>
                        Your email has been successfully verified. You can now set up your organization.
                    </AlertDescription>
                </Alert>
            ) : null}
            {isSessionPending ? (
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </div>
            ) : (
                <>
                    {step === "choice" && (
                        <StepChoice
                            onCreateChoice={() => setStep("create")}
                            onJoinChoice={() => setStep("join")}
                        />
                    )}
                    {step === "create" && <StepCreate />}
                    {step === "join" && <StepJoin invitationId={invitationId} />}
                </>
            )}
        </AuthCard>
    );
}
