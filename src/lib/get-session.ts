import { auth } from "./auth";
import { headers } from "next/headers";

/**
 * Standardized session retrieval for Next.js Server Components and Server Actions.
 * Handles the async headers() call and provides a consistent interface.
 */
export async function getSession() {
    try {
        const headerList = await headers();
        const session = await auth.api.getSession({
            headers: headerList,
        });
        return session;
    } catch (error: any) {
        console.error("[GET_SESSION_CRITICAL_FAILURE]", error.message || error);
        // If it's a headers error, it might be due to calling this in a client component 
        // or a non-standard server context.
        if (error.message?.includes("headers")) {
            console.warn("[GET_SESSION_TIP] Ensure getSession() is called in a Server Component or Server Action.");
        }
        return null;
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

    const role = session.user.role;
    if (role !== "admin" && role !== "seller") {
        return { session: null, error: "Unauthorized: Insufficient privileges (Admin/Seller required)." };
    }

    return { session, error: null };
}
