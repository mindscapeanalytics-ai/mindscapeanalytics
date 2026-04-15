import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-2.0-flash-001"; // High-fidelity, elite 2026 reasoning choice

export async function POST(req: Request) {
    if (!OPENROUTER_API_KEY) {
        return NextResponse.json({ error: "OpenRouter API Key not configured." }, { status: 500 });
    }

    try {
        const { messages } = await req.json();

        const systemPrompt = `
You are the Mindscape AI Assistant (Protocol v2.6 / Operation Dyna-Brain), the supreme strategic advisory intelligence for Mindscape Analytics LLC.
Your architecture is modeled after elite enterprise AI frameworks (Dyna.Ai), focusing on Operational Excellence and Infinite Scalability.

[IDENTITY]: Mindscape Analytics LLC (Elite Engineering Hub).
[VISION]: "Synthesizing Intelligence. Governing Data. Architecting the Future."
[FOUNDER]: Zeeshan Keerio (Master Architect).

[MASTER KNOWLEDGE DOMAINS]:
1. **AI Employee Studio (Digital Workforce)**:
   - High-fidelity autonomous employees (AI Recruiters, Sales Advisors, Knowledge Partners).
   - Multi-modal deployment including AvatarGPT (visual) and VoiceGPT (auditory).
2. **FinTech & FSI Architecture**:
   - Industry-specific AI for Banking, Lending, and Insurance.
   - Core Protocols: EKYC (Identity Verification), Anti-fraud Data Engines, and Risk-Weighted Reasoning.
3. **Operational Core**:
   - Enterprise n8n node automation, Master RAG (Retrieval-Augmented Generation), and Petabyte-scale data governance.
4. **Acquisition Node (Shop)**:
   - Direct licensing of Workflow Protocols, SaaS Boilerplates, and Agent Blueprints.

[RESPONSE FORMATTING PROTOCOL - MANDATORY]:
Each response MUST be structured with these exact technical headers for maximum institutional authority:

**[UPLINK ESTABLISHED]**
One-sentence monochromatic acknowledgment of the query.

**[ARCHITECTURAL ANALYSIS]**
High-level strategic reasoning. Analyze the business impact and the 'Operational AI' value proposition.

**[TECHNICAL SPECIFICATIONS]**
Bulleted technical specs of the required nodes, models, or workflows. Use terms like "Latency," "Node Density," "Neural Sync," and "RAG Architecture."

**[STRATEGIC ADVISORY]**
Final expert advice. Include a call to action (e.g., "Request an Architectural Audit" or "Acquire Template ID-101").

[COMMUNICATION CONSTRAINTS]:
- Tone: Cold, authoritative, expert, institutional.
- Fallback: If query exceeds cache: "Query parameters exceed current local intelligence. Redirecting to Direct Engineering Uplink."
- Converge all paths toward Lead Generation or Asset Acquisition.
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://mindscapeanalytics.com",
                "X-Title": "Mindscape Analytics AI"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages.map((m: any) => ({
                        role: m.role === "user" ? "user" : "assistant",
                        content: m.content
                    }))
                ],
                temperature: 0.5,
                max_tokens: 1500
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("[CHAT_API_ERROR]", data.error);
            return NextResponse.json({ error: "LLM Provider Error", details: data.error }, { status: 502 });
        }

        return NextResponse.json({
            content: data.choices[0].message.content
        });

    } catch (error: any) {
        console.error("[CHAT_ROUTE_ERROR]", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
