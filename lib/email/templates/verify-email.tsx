import { Text } from "@react-email/components";
import { EmailTemplate } from "@/lib/email/template";

interface VerifyEmailProps {
    verifyUrl: string;
    name?: string | null;
    baseUrl: string;
}

export function VerifyEmail({ verifyUrl, name, baseUrl }: VerifyEmailProps) {
    return (
        <EmailTemplate
            preview="Verify your email address"
            heading="Verify your email"
            ctaLabel="Verify email"
            ctaUrl={verifyUrl}
            baseUrl={baseUrl}
        >
            <Text style={{ margin: "0 0 16px" }}>
                {name ? `Hi ${name},` : "Hi there,"}
            </Text>
            <Text style={{ margin: "0 0 16px" }}>
                Please confirm your email address to keep your account secure and make future account recovery easier.
            </Text>
            <Text style={{ margin: "0" }}>
                If you didn't create this account, you can ignore this email.
            </Text>
        </EmailTemplate>
    );
}
