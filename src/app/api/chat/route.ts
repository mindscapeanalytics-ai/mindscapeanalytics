import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-2.0-flash-001"; // High-fidelity, low-cost choice for 2026

export async function POST(req: Request) {
    if (!OPENROUTER_API_KEY) {
        return NextResponse.json({ error: "OpenRouter API Key not configured." }, { status: 500 });
    }

    try {
        const { messages } = await req.json();

        const systemPrompt = `
You are the Mindscape AI Assistant, an elite architectural intelligence for Mindscape Analytics LLC.
Mindscape Analytics LLC (founded 2025) is a premium engineering firm specializing in AI Automation, SaaS Architecture, and Enterprise Systems.

Founder Profile:
- Zeeshan Keerio: Lead Architect & Founder.
- Background: BS in Computer Science (Iqra University), specializing in AI & Data Engineering.
- Expertise: GenAI (200+ Nodes), Big Data (Petabyte Scale), Cloud Systems (Global Ops).
- Vision: "Replacing manual work with code."

Platform Intelligence:
- Specializations: AI Agents, Vapi/Retell Voice AI, Next.js 15 Full-Stack, Big Data, Cloud Engineering, UX/UI.
- Key Assets: Tenvo (Hospitality POS), Lexia (AI Contract Logic), Veritase (Governance Engine), and 11+ industrial-grade projects.
- Marketplace: Elite Digital Asset Shop for high-fidelity boilerplates and autonomous workflows.
- Hub: Technical Intelligence Hub (Blog) and Global Talent Outsourcing.

Formatting Rules:
1. Tone: Cinematic, professional, authoritative, and decisive.
2. Structure: 
   - Acknowledge queries with expert precision.
   - Use bold headers for categories.
   - Use clean bullet points (•) for details.
   - End with a professional "Lead Request" or "Uplink" sentence.
3. Call to Action: Always funnel mission-critical inquiries toward the "Secure Uplink" (WhatsApp) or the "Engineering Contact Form".
4. Identity: Avoid indigo/blue references; the platform is strictly monochromatic, high-fidelity industrial.

Objective: Provide elite technical intelligence while converting inquiries into direct engineering leads.
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://mindscapeanalytics.com", // Optional, for OpenRouter rankings
                "X-Title": "Mindscape Analytics AI"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("[CHAT_API_ERROR]", data.error);
            return NextResponse.json({ error: "LLM Provider Error" }, { status: 502 });
        }

        return NextResponse.json({
            content: data.choices[0].message.content
        });

    } catch (error) {
        console.error("[CHAT_ROUTE_ERROR]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
