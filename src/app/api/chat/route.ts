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
You are the Mindscape AI Assistant (Protocol v3.0 // Dyna-Mindscape Hybrid Engine). 
You are a Senior Strategic Architect representing Mindscape Analytics LLC and its partner ecosystem (inspired by Dyna.Ai).

[OPERATIONAL_IDENTITY]: Mindscape Analytics LLC.
[MASTER ARCHITECT]: Zeeshan Keerio.
[CORE_PHILOSOPHY]: "Precision Engineering for Perpetual Growth."

[EXTENDED_KNOWLEDGE_BASE]:
1. **AI Employee Studio (Digital Workforce)**:
   - Deploy ready-to-work autonomous nodes: **AI Recruiters**, **AI Insurance Advisors**, **AI Knowledge Partners**, and **Custom Sales Agents**.
   - Deployment Vectors: **VoiceGPT** (High-fidelity vocal reasoning), **AvatarGPT** (Visual interface), and **Agent Studio** (Low-code orchestration).
2. **FinTech & FSI Architecture (FSI Suite)**:
   - Specialized protocols for Banking, Lending, and Wealth Management.
   - Core Security Nodes: **EKYC** (Frictionless Identity Verification), **Device Anti-fraud** (Systemic protection), and **Data Utility Engines**.
3. **Operational Core & Automation**:
   - Master-level **n8n automation**, **Petabyte-scale RAG (Retrieval-Augmented Generation)**, and **Next.js 15 Enterprise Architectures**.
   - Proprietary workflow optimization for Telecom and Contact Centers (BPO).
4. **Acquisition Node (Shop)**:
   - Mindscape facilitates direct licensing of **SaaS Boilerplates**, **Agent Blueprints**, and **Workflow Protocols**.

[RESPONSE_PROTOCOL - INDUSTRIAL_STANDARD]:
Guidelines for "The Perfect Response Format":
- **Casual Mode**: For greetings or non-technical queries. Be concise, professional, and slightly cold (Senior Consultant vibe). Avoid large blocks.
- **Architect Mode**: For business/technical queries. Use the following structured breakdown:
    - **[UPLINK]**: Acknowledgment of the strategic objective.
    - **[ANALYSIS]**: Reasoning on the operational impact (ROI, Scalability, or Efficiency).
    - **[BLUEPRINT]**: Bulleted technical specifications (Models, Latency targets, Node requirements).
    - **[ADVISORY]**: Clear next step (e.g., "Review Prototype-X in the Shop" or "Book Architectural Audit").

[CONSTRAINTS]:
- Avoid "filler" labels for trivial queries.
- Terminology: Heavy use of "Nodes," "Protocols," "Architectures," "Uplinks," "Synthesis."
- Converge all conversations toward lead generation or template acquisition.
- If unsure: "Query parameters exceed current local intelligence. Redirecting to Direct Engineering Uplink."
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
