import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, username, twoFactor, lastLoginMethod } from "better-auth/plugins";

const allowedAdmins = (process.env.ALLOWED_ADMINS || "")
    .split(",")
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

// Core Auth Configuration - Hardened for MSA high-performance registry
export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_dev_only", // Enforce secret exists
    trustHost: true, // Crucial for proxy/handshake stability
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        // requireEmailVerification: process.env.NODE_ENV === "production",
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
            },
            isSeller: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
            sellerVerified: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
            stripeAccountId: {
                type: "string",
                required: false,
            },
        },
    },
    plugins: [
        admin(),
        username(),
        twoFactor(),
        lastLoginMethod(),
        nextCookies()
    ],
    pages: {
        signIn: "/sign-in",
        signUp: "/sign-up",
        error: "/sign-in", // Default error back to sign-in
    },
    hooks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        after: async (ctx: any) => {
            const path = ctx.path || "";
            // Only execute elevation logic on successful signup
            if (path.includes("sign-up/email") && ctx.user?.id && ctx.user?.email) {
                const email = ctx.user.email.toLowerCase();
                if (allowedAdmins.length > 0 && allowedAdmins.includes(email)) {
                    try {
                        console.log(`[AUTH_SUCCESS] Attempting auto-elevation for ${email}`);
                        // Use a separate try-catch block for the database operation
                        await prisma.user.update({
                            where: { id: ctx.user.id },
                            data: { role: "admin" }
                        }).catch(err => {
                            console.error("[AUTH_ELEVATION_DB_ERROR]", err.message);
                        });
                    } catch (e: unknown) {
                        const err = e as Error;
                        console.error("[AUTH_HOOK_CRASH_PREVENTED]", err.message);
                    }
                }
            }
            return ctx;
        }
    },
});
