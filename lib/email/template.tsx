import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface EmailTemplateProps {
    preview: string;
    heading: string;
    children: React.ReactNode;
    ctaLabel?: string;
    ctaUrl?: string;
    baseUrl: string;
}

const colors = {
    background: "#fafafa",
    card: "#ffffff",
    border: "#e5e5e5",
    text: "#171717",
    muted: "#737373",
    accent: "#000000",
};

export function EmailTemplate({
    preview,
    heading,
    children,
    ctaLabel,
    ctaUrl,
    baseUrl,
}: EmailTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>{preview}</Preview>
            <Body
                style={{
                    backgroundColor: colors.background,
                    color: colors.text,
                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    margin: "0",
                    padding: "40px 16px",
                }}
            >
                <Container
                    style={{
                        backgroundColor: colors.card,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "8px",
                        margin: "0 auto",
                        maxWidth: "480px",
                    }}
                >
                    <Section style={{ padding: "32px" }}>
                        <Img
                            src={`${baseUrl}/logo-text.svg`}
                            alt="OpenBoxOffice"
                            width={156}
                            height={32}
                            style={{
                                margin: "0 0 24px",
                            }}
                        />
                        <Heading
                            style={{
                                fontSize: "24px",
                                fontWeight: "600",
                                lineHeight: "1.3",
                                margin: "0 0 24px",
                            }}
                        >
                            {heading}
                        </Heading>
                        <Section
                            style={{
                                color: colors.text,
                                fontSize: "15px",
                                lineHeight: "1.6",
                            }}
                        >
                            {children}
                        </Section>
                        {ctaLabel && ctaUrl ? (
                            <Button
                                href={ctaUrl}
                                style={{
                                    backgroundColor: colors.accent,
                                    borderRadius: "6px",
                                    color: "#ffffff",
                                    display: "inline-block",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    marginTop: "24px",
                                    padding: "10px 16px",
                                    textDecoration: "none",
                                }}
                            >
                                {ctaLabel}
                            </Button>
                        ) : null}
                    </Section>
                    <Hr
                        style={{
                            borderColor: colors.border,
                            margin: "0",
                        }}
                    />
                    <Section style={{ padding: "20px 32px" }}>
                        <Text
                            style={{
                                color: colors.muted,
                                fontSize: "12px",
                                lineHeight: "1.5",
                                margin: "0",
                            }}
                        >
                            Community ticketing for event organizers.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
