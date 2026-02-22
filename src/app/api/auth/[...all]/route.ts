import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export const POST = async (req: Request) => {
    try {
        return await handler.POST(req);
    } catch (e: any) {
        console.error("[AUTH_API_POST_CRASH]", e.message);
        return new Response(JSON.stringify({ error: "Internal Server Error during Auth Transaction" }), { status: 500 });
    }
};

export const GET = async (req: Request) => {
    try {
        return await handler.GET(req);
    } catch (e: any) {
        console.error("[AUTH_API_GET_CRASH]", e.message);
        return new Response(JSON.stringify({ error: "Internal Server Error during Auth Query" }), { status: 500 });
    }
};
