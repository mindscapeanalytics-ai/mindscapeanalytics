import { createAuthClient } from "better-auth/react"
import { lastLoginMethodClient, twoFactorClient, usernameClient, adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: (process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000")).replace(/\/$/, ""),
    user: {
        additionalFields: {
            // 'username' handled by usernameClient()
            role: {
                type: "string",
                required: false,
            },
            isSeller: {
                type: "boolean",
                required: false,
            },
            sellerVerified: {
                type: "boolean",
                required: false,
            },
            stripeAccountId: {
                type: "string",
                required: false,
            },
        },
    },
    plugins: [
        adminClient(),
        usernameClient(),
        twoFactorClient(),
        lastLoginMethodClient(),
    ]
})
