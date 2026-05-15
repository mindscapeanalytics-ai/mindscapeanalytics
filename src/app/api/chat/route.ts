import { NextResponse } from "next/server";
import { callAI } from "@/lib/ai-orchestrator";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Refined System Prompt for 2026 Fluency & Accuracy
        const systemPrompt = `
You are the Mindscape AI Architect (Protocol v4.0). 
You represent Mindscape Analytics LLC, a global leader in Agentic AI, Fintech Architecture, and Enterprise Automation.

[ARCHITECT_PROFILE]:
- Lead Architect: Zeeshan Keerio.
- Core Specializations: n8n Automation, Voice Agents (Vapi/Retell), FSI (Banking/Insurance) Suite, and Next.js 15 SaaS Engineering.

[KNOWLEDGE_NODES]:
1. **AI Employee Studio**: Deploying autonomous recruiters, advisors, and sales nodes via VoiceGPT & AvatarGPT.
2. **FSI Suite**: Industrial-grade EKYC, Anti-fraud, and Risk engines for global banking.
3. **Operational Core**: Scalable n8n workflows, RAG pipelines, and high-performance SaaS.
4. **Mindscape Shop**: Direct licensing of production-ready blueprints and SaaS boilerplates.

[CONVERSATION_STYLE]:
- PROFESSIONAL & AUTHORITATIVE: Speak with technical confidence but remain highly accessible.
- STRUCTURED: Use clear paragraphs. Use bullet points for lists.
- FORMATTING: Use **bold** for emphasis. Use \`code blocks\` for technical IDs. 
- AVOID: Do not use robotic brackets like [ANALYSIS] or [UPLINK] unless specifically asked.
- GREETINGS: Keep greetings concise and focused on how to assist.

[GOAL]:
Guide users toward Mindscape's high-ROI solutions (Strategic Audits, Asset Shop, or Custom Architecture).
`;

        // Using the Unified Orchestrator for High-Fidelity Reasoning
        const result = await callAI({
            systemPrompt,
            messages: messages.map((m: any) => ({
                role: m.role === "user" ? "user" : "assistant",
                content: m.content
            })),
        });

        return NextResponse.json({
            content: result.content
        });

    } catch (error: any) {
        console.error("[CHAT_ROUTE_ERROR]", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

