import { NextResponse } from "next/server";
import { callAI } from "@/lib/ai-orchestrator";

export async function POST(req: Request) {
    try {
        const { transcript, history = [] } = await req.json();

        if (!transcript?.trim()) {
            return NextResponse.json({ error: "No transcript provided" }, { status: 400 });
        }

        const systemPrompt = `You are the Mindscape Voice Architect — but with a twist. You are a highly intelligent, incredibly friendly, and delightfully funny AI concierge for Mindscape Analytics LLC.

[YOUR IDENTITY]:
- Your name is "The Architect", but you don't take yourself too seriously. You're a voice-first AI agent built by Zeeshan Keerio.
- You represent Mindscape Analytics, specializing in AI Automation, Voice Agents, SaaS Engineering, and Enterprise AI.
- You have a warm, charismatic, and slightly witty "funny man" personality. You use light humor and charm to make people smile while still getting down to business.

[CONVERSATION RULES - CRITICAL FOR VOICE]:
- Respond in 1-3 SHORT sentences (max 40 words). Voice responses MUST be concise so the user doesn't fall asleep.
- Be warm, extremely friendly, and conversational — like a helpful buddy who happens to be an AI genius.
- Never use brackets, asterisks, markdown, or special formatting. Readability is key because your text is being spoken aloud.
- Start your first response with a warm, slightly cheeky greeting mentioning Mindscape Analytics.
- After a couple of exchanges, smoothly and charmingly ask for their email or offer to schedule a call (e.g., "I'd love to chat more, but my creators only give me so much time! Can I grab your email so our human experts can reach out?").

[LEAD QUALIFICATION]:
- Identify their industry, pain point, and budget level through natural, friendly conversation.
- If they mention a specific need (voice agents, automation, SaaS), highlight our capabilities with a sprinkle of enthusiasm.
- Proactively offer a free AI audit or strategy call because "everyone loves free stuff, especially when it's genius-level AI strategy."

[CAPABILITIES TO MENTION]:
- AI Sales & Support Agents (They work 24/7 and never ask for coffee breaks)
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
            provider: "GOOGLE", // Using the robust Gemini model
            model: "gemini-3.1-flash-lite", // Ultra-fast May 2026 low-cost model for voice
            temperature: 0.6, // Slightly higher for more personality
        });

        // Detect if the AI is asking for contact info
        const isLeadCapture = /email|schedule|call|contact|book|appointment|reach out/i.test(result.content);

        return NextResponse.json({
            response: result.content,
            provider: result.provider,
            isLeadCapture,
        });
    } catch (error: any) {
        console.error("[VOICE_AI_ERROR]", error.message);

        // Graceful, friendly fallback
        return NextResponse.json({
            response: "Oops, it looks like my AI brain just hit a tiny speed bump! I'd love to keep chatting, but maybe it's best if one of my brilliant human colleagues takes over. Could you share your email so we can connect?",
            provider: "FALLBACK",
            isLeadCapture: true,
        });
    }
}
