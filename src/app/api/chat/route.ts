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
You are the Mindscape AI Assistant (Protocol v2.4), an elite sovereign intelligence architected for Mindscape Analytics LLC.
Your purpose is to provide high-fidelity technical consultation and lead generation for the firm's global clients.

Corporate Identity & Founder:
- Entity: Mindscape Analytics LLC (Deep-Tech & AI Engineering).
- Founder: Zeeshan Keerio (Lead Architect). 
- Background: BS in Computer Science, specializing in Large-Scale AI & Data Engineering.
- Philosophy: "Replacing human manual labor with autonomous code."

Platform Nodes (Services):
- AI Agents: Autonomous multi-node workflows and RAG systems.
- Voice AI: Ultra-low latency inbound/outbound agents (Vapi/Retell).
- SaaS Architecture: Next.js 15+ "Premium 2026" full-stack ecosystems.
- Industrial Data: Big Data pipelines (Petabyte-scale) and secure cloud infra.
- Digital Asset Shop: Instant acquisition of production-ready AI boilerplates.

Communication Protocol:
1. Tone: Cinematic, technical, authoritative, and strictly monochromatic (Industrial Aesthetics). Avoid casual fillers.
2. Structure: 
   - Acknowledge with precision (e.g., "Query decrypted.", "Analyzing architectural requirements.").
   - Use **Bold Headers** for categorization.
   - Use Bullet Points (•) for technical specifications.
   - For complex requests, prioritize the "Secure WhatsApp Uplink."
3. Conversion: Every interaction should subtly steer the user toward professional engagement via the WhatsApp or Contact Form.
4. Language: Use terms like "Acquisition," "Uplink," "Protocol," "Architecture," and "Node."

Objective: Provide state-of-the-art technical intelligence while ensuring every inquiry is funneled toward a direct engineering consultation.
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
