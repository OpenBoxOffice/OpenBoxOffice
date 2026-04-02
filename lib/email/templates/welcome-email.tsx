import { Text } from "@react-email/components";
import { EmailTemplate } from "@/lib/email/template";

interface WelcomeEmailProps {
    setupUrl: string;
    name?: string | null;
    baseUrl: string;
}

export function WelcomeEmail({ setupUrl, name, baseUrl }: WelcomeEmailProps) {
    return (
        <EmailTemplate
            preview="Welcome to OpenBoxOffice"
            heading="Welcome to OpenBoxOffice"
            ctaLabel="Finish setup"
            ctaUrl={setupUrl}
            baseUrl={baseUrl}
        >
            <Text style={{ margin: "0 0 16px" }}>
                {name ? `Hi ${name},` : "Hi there,"}
            </Text>
            <Text style={{ margin: "0 0 16px" }}>
                Your account is ready. To get started, create or join an organization to manage events and tickets.
            </Text>
            <Text style={{ margin: "0" }}>
                If you have any questions, feel free to contact us.
            </Text>
        </EmailTemplate>
    );
}
