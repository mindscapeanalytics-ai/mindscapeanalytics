import { auth } from "./auth";
import { headers } from "next/headers";

/**
 * Standardized session retrieval for Next.js Server Components and Server Actions.
 * Handles the async headers() call, provides a consistent interface.
 */
export async function getSession() {
    try {
        const headerList = await headers();
        const session = await auth.api.getSession({
            headers: headerList,
        });
        return session;
    } catch (error) {
        const err = error as any;

        // Next.js internal error for dynamic rendering - must be re-thrown
        if (err.digest?.includes("DYNAMIC_SERVER_USAGE") || err.name === "DynamicServerError") {
            throw error;
        }

        console.error("[GET_SESSION_FAILURE]", err.message || err);

        if (err.message?.includes("connect") || err.message?.includes("ECONNREFUSED") || err.message?.includes("timeout")) {
            console.warn("[GET_SESSION_TIP] Database appears unreachable. Check connections.");
        }
        return null; // Return null so the UI can decide how to handle it
    }
}

/**
 * Higher-order helper for required admin/seller sessions.
 */
export async function getRequiredSession() {
    const session = await getSession();
    if (!session || !session.user) {
        return { session: null, error: "Unauthorized: No valid session detected." };
    }

    const user = session.user as any;
    const isAdmin = user.role === "admin";
    const isSeller = user.role === "seller" || user.isSeller;

    if (!isAdmin && !isSeller) {
        return { session: null, error: "Unauthorized: Insufficient privileges (Admin/Seller required)." };
    }

    return { session, error: null };
}
