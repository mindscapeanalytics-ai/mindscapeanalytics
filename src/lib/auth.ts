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
    baseURL: (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, ""),
    secret: process.env.BETTER_AUTH_SECRET,
    trustHost: true,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            // 'username' is handled by the username() plugin
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
    logger: {
        level: "debug", // Protocol-level observability for 422/500 diagnostics
    },
    plugins: [
        admin(),
        username(),
        twoFactor(),
        lastLoginMethod(),
        nextCookies()
    ],
    hooks: {
        after: async (ctx: any) => {
            try {
                if (!ctx) return;
                const path = ctx.path || "";

                // Only execute elevation logic on successful signup
                if (path.includes("sign-up/email") && ctx.user?.id && ctx.user?.email) {
                    const email = ctx.user.email.toLowerCase();
                    if (allowedAdmins.length > 0 && allowedAdmins.includes(email)) {
                        console.log(`[AUTH_SUCCESS] Initializing admin handshake for ${email}`);
                        await prisma.user.update({
                            where: { id: ctx.user.id },
                            data: { role: "admin" }
                        }).catch(err => {
                            console.error("[AUTH_ELEVATION_DB_ERROR] Registry rejection:", err.message);
                        });
                    }
                }
            } catch (e: unknown) {
                const err = e as Error;
                console.error("[AUTH_HOOK_ERROR] Stream integrity protected:", err.message);
            }
            return ctx;
        }
    },
});
