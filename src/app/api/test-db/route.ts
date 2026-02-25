import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const start = Date.now();
        const count = await prisma.user.count();
        const end = Date.now();
        return NextResponse.json({ success: true, count, ms: end - start });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message });
    }
}
