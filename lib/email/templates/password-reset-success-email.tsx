import { Text } from "@react-email/components";
import { EmailTemplate } from "@/lib/email/template";

interface PasswordResetSuccessEmailProps {
    loginUrl: string;
    name?: string | null;
    baseUrl: string;
}

export function PasswordResetSuccessEmail({ loginUrl, name, baseUrl }: PasswordResetSuccessEmailProps) {
    return (
        <EmailTemplate
            preview="Your password was changed"
            heading="Password updated"
            ctaLabel="Sign in"
            ctaUrl={loginUrl}
            baseUrl={baseUrl}
        >
            <Text style={{ margin: "0 0 16px" }}>
                {name ? `Hi ${name},` : "Hi there,"}
            </Text>
            <Text style={{ margin: "0 0 16px" }}>
                Your password has been successfully changed.
            </Text>
            <Text style={{ margin: "0" }}>
                If you didn't make this change, please reset your password immediately or contact support.
            </Text>
        </EmailTemplate>
    );
}
