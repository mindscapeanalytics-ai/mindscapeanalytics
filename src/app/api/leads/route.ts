import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { notifyAdmin } from "@/lib/notifications";

const leadSchema = z.object({
    email: z.string().email("Invalid email"),
    name: z.string().optional(),
    company: z.string().optional(),
    phone: z.string().optional(),
    source: z.string().default("website"),
    service: z.string().optional(),
    message: z.string().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
});

function scoreLead(data: z.infer<typeof leadSchema>): number {
    let score = 10; // base score
    if (data.name) score += 15;
    if (data.company) score += 25;
    if (data.phone) score += 20;
    if (data.service) score += 15;
    if (data.message && data.message.length > 50) score += 15;
    return Math.min(score, 100);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = leadSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid data", details: validation.error.format() },
                { status: 400 }
            );
        }

        const data = validation.data;

        // Deduplicate
        const existingLead = await prisma.lead.findFirst({
            where: {
                email: data.email,
                source: data.source,
                createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
            },
        });

        if (existingLead) {
            return NextResponse.json({
                success: true,
                message: "Lead already captured",
                leadId: existingLead.id,
            });
        }

        const score = scoreLead(data);

        const lead = await prisma.lead.create({
            data: {
                email: data.email,
                name: data.name || null,
                company: data.company || null,
                phone: data.phone || null,
                source: data.source,
                service: data.service || null,
                message: data.message || null,
                score,
                metadata: (data.metadata || {}) as any,
            },
        });

        // AUTOMATE NOTIFICATIONS (shared utility)
        await notifyAdmin({
            title: score >= 50 ? '🔥 HIGH-VALUE LEAD CAPTURED' : '🚀 NEW LEAD CAPTURED',
            name: data.name || 'Anonymous',
            email: data.email,
            company: data.company,
            phone: data.phone,
            service: data.service,
            message: data.message,
            score,
            color: score >= 50 ? 0xff4500 : 0x00ff00 // Red-Orange for hot, Green for new
        });

        return NextResponse.json({
            success: true,
            leadId: lead.id,
            score,
        });
    } catch (error) {
        console.error("[LEAD_CAPTURE_ERROR]", error);
        return NextResponse.json(
            { error: "Failed to capture lead" },
            { status: 500 }
        );
    }
}
