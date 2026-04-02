import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins/organization";
import db from "@/app/lib/db";
import { redisDel, redisGet, redisSet } from "@/app/lib/redis";
import * as schema from "@/db/schema/auth";
import {
    sendResetPasswordEmail,
    sendPasswordResetSuccessEmail,
    sendVerificationEmail,
    sendWelcomeEmail,
} from "@/lib/email/mailer";

export const auth = betterAuth({
    appName: "OpenBoxOffice",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await sendResetPasswordEmail({
                email: user.email,
                name: user.name,
                resetUrl: url,
            });
        },
        onPasswordReset: async ({ user }) => {
            await sendPasswordResetSuccessEmail({
                email: user.email,
                name: user.name,
            });
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        redirectAfterVerification: "/setup?verified=1",
        sendVerificationEmail: async ({ user, url }) => {
            await sendVerificationEmail({
                email: user.email,
                name: user.name,
                verifyUrl: url,
            });
        },
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await sendWelcomeEmail({
                        email: user.email,
                        name: user.name,
                    });
                },
            },
        },
    },
    plugins: [organization()],
    /* this allows for rate limiting and session storage via redis (fast!) */
    secondaryStorage: {
        get: async (key) => {
            return await redisGet(key);
        },
        set: async (key, value, ttl) => {
            await redisSet(key, value, ttl);
        },
        delete: async (key) => {
            await redisDel(key);
        },
    },
});
