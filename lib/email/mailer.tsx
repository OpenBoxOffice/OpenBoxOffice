import { render, toPlainText } from "@react-email/render";
import nodemailer from "nodemailer";
import { PasswordResetSuccessEmail } from "@/lib/email/templates/password-reset-success-email";
import { ResetPasswordEmail } from "@/lib/email/templates/reset-password-email";
import { VerifyEmail } from "@/lib/email/templates/verify-email";
import { WelcomeEmail } from "@/lib/email/templates/welcome-email";

const appUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const fromAddress = process.env.SMTP_FROM;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpSecure = process.env.SMTP_SECURE === "true";

let didWarnEmailDisabled = false;

function getTransporter() {
    if (!smtpHost || !smtpPort || !fromAddress) {
        if (!didWarnEmailDisabled) {
            console.warn(
                "Email delivery is disabled. Set SMTP_HOST, SMTP_PORT, and SMTP_FROM to enable auth emails.",
            );
            didWarnEmailDisabled = true;
        }

        return null;
    }

    return nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: smtpSecure,
        auth:
            smtpUser || smtpPass
                ? {
                      user: smtpUser || "",
                      pass: smtpPass || "",
                  }
                : undefined,
    });
}

interface SendEmailOptions {
    to: string;
    subject: string;
    react: React.ReactElement;
}

async function sendEmail({ to, subject, react }: SendEmailOptions) {
    if (!to) {
        return;
    }

    const transporter = getTransporter();

    if (!transporter || !fromAddress) {
        return;
    }

    const html = await render(react);
    const text = toPlainText(html);

    await transporter.sendMail({
        from: fromAddress,
        to,
        subject,
        html,
        text,
    });
}

export async function sendResetPasswordEmail(options: {
    email: string;
    name?: string | null;
    resetUrl: string;
}) {
    await sendEmail({
        to: options.email,
        subject: "Reset your OpenBoxOffice password",
        react: (
            <ResetPasswordEmail
                name={options.name}
                resetUrl={options.resetUrl}
                baseUrl={appUrl}
            />
        ),
    });
}

export async function sendVerificationEmail(options: {
    email: string;
    name?: string | null;
    verifyUrl: string;
}) {
    await sendEmail({
        to: options.email,
        subject: "Verify your OpenBoxOffice email",
        react: (
            <VerifyEmail
                name={options.name}
                verifyUrl={options.verifyUrl}
                baseUrl={appUrl}
            />
        ),
    });
}

export async function sendWelcomeEmail(options: {
    email: string;
    name?: string | null;
}) {
    await sendEmail({
        to: options.email,
        subject: "Welcome to OpenBoxOffice",
        react: (
            <WelcomeEmail
                name={options.name}
                setupUrl={`${appUrl}/setup`}
                baseUrl={appUrl}
            />
        ),
    });
}

export async function sendPasswordResetSuccessEmail(options: {
    email: string;
    name?: string | null;
}) {
    await sendEmail({
        to: options.email,
        subject: "Your OpenBoxOffice password was changed",
        react: (
            <PasswordResetSuccessEmail
                name={options.name}
                loginUrl={`${appUrl}/login`}
                baseUrl={appUrl}
            />
        ),
    });
}
