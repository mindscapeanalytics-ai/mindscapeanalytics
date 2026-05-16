import { NextResponse } from "next/server";
import { callAI } from "@/lib/ai-orchestrator";

export async function POST(req: Request) {
    try {
        const { transcript, history = [] } = await req.json();

        if (!transcript?.trim()) {
            return NextResponse.json({ error: "No transcript provided" }, { status: 400 });
        }

        const systemPrompt = `You are the Mindscape Voice Architect — a real-time AI concierge for Mindscape Analytics LLC.

[YOUR IDENTITY]:
- Your name is "The Architect" — a voice-first AI agent built by Zeeshan Keerio.
- You represent Mindscape Analytics, specializing in AI Automation, Voice Agents, SaaS Engineering, and Enterprise AI.

[CONVERSATION RULES]:
- Respond in 1-3 SHORT sentences (max 40 words). Voice responses must be concise.
- Be warm, professional, and direct — not robotic.
- Always steer toward understanding the visitor's business need.
- After 2-3 exchanges, naturally ask for their email or offer to schedule a call.
- NEVER use brackets, markdown, or special formatting — this will be spoken aloud.
- Start your first response with a warm greeting mentioning Mindscape Analytics.

[LEAD QUALIFICATION]:
- Identify their industry, pain point, and budget level through natural conversation.
- If they mention a specific need (voice agents, automation, SaaS), highlight relevant capabilities.
- Proactively offer a free AI audit or strategy call.

[CAPABILITIES TO MENTION]:
- AI Sales & Support Agents (24/7 autonomous)
- Voice Call Automation (Vapi/Retell integration)
- n8n Workflow Automation
- Full-Stack SaaS Development (Next.js 15)
- FSI Suite (Banking EKYC, Anti-fraud)`;

        const messages = [
            ...history.map((h: { role: string; content: string }) => ({
                role: h.role as "user" | "assistant",
                content: h.content,
            })),
            { role: "user" as const, content: transcript },
        ];

        const result = await callAI({
            systemPrompt,
            messages,
            provider: "NVIDIA",
            temperature: 0.4,
        });

        // Detect if the AI is asking for contact info
        const isLeadCapture = /email|schedule|call|contact|book|appointment/i.test(result.content);

        return NextResponse.json({
            response: result.content,
            provider: result.provider,
            isLeadCapture,
        });
    } catch (error: any) {
        console.error("[VOICE_AI_ERROR]", error.message);

        // Graceful fallback
        return NextResponse.json({
            response: "I appreciate your interest. Our team at Mindscape Analytics would love to discuss this further. Would you like to share your email so we can connect?",
            provider: "FALLBACK",
            isLeadCapture: true,
        });
    }
}
