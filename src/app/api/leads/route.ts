import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

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
    let score = 10; // base score for providing email
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

        // Deduplicate: don't create if same email+source within 24h
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

        // Send notification email for high-score leads
        if (score >= 50) {
            try {
                const { Resend } = await import("resend");
                const resend = new Resend(process.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: "Mindscape Analytics <noreply@mindscapeanalytics.com>",
                    to: ["contact@mindscapeanalytics.com"],
                    subject: `🔥 High-Value Lead [Score: ${score}] — ${data.name || data.email}`,
                    html: `
                        <div style="font-family: monospace; padding: 20px; background: #0a0a0a; color: #fff; border-radius: 12px;">
                            <h2 style="color: #22c55e;">NEW LEAD CAPTURED</h2>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Name:</strong> ${data.name || "N/A"}</p>
                            <p><strong>Company:</strong> ${data.company || "N/A"}</p>
                            <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
                            <p><strong>Source:</strong> ${data.source}</p>
                            <p><strong>Service:</strong> ${data.service || "N/A"}</p>
                            <p><strong>Score:</strong> ${score}/100</p>
                            <p><strong>Message:</strong> ${data.message || "N/A"}</p>
                        </div>
                    `,
                });
            } catch (emailError) {
                console.error("[LEAD_EMAIL_ERROR]", emailError);
            }
        }

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
