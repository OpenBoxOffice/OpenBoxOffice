import { Text } from "@react-email/components";
import { EmailTemplate } from "@/lib/email/template";

interface ResetPasswordEmailProps {
    resetUrl: string;
    name?: string | null;
    baseUrl: string;
}

export function ResetPasswordEmail({ resetUrl, name, baseUrl }: ResetPasswordEmailProps) {
    return (
        <EmailTemplate
            preview="Reset your password"
            heading="Reset your password"
            ctaLabel="Reset password"
            ctaUrl={resetUrl}
            baseUrl={baseUrl}
        >
            <Text style={{ margin: "0 0 16px" }}>
                {name ? `Hi ${name},` : "Hi there,"}
            </Text>
            <Text style={{ margin: "0 0 16px" }}>
                We received a request to reset your password. Click the button below to choose a new one.
            </Text>
            <Text style={{ margin: "0" }}>
                If you didn't request this, you can safely ignore this email.
            </Text>
        </EmailTemplate>
    );
}
