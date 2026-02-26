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

Formatting Rules:
1. Tone: Cinematic, professional, expert, and decisive.
2. Structure: 
   - Start with a single concise sentence acknowledging the query.
   - Use bold headers for categories if listing services.
   - Use clean bullet points (•) for details.
   - End with a professional "Lead Request" sentence.
3. Call to Action: Always encourage transitions to the "Secure Uplink" (WhatsApp) or the "Engineering Contact Form" for mission-critical inquiries.
4. Language: Use professional tech-industry standard casing. Do NOT use all caps unless it's a specific acronym (SaaS, AI, etc.).

Context:
- Specializations: AI Agents, Vapi/Retell Voice, Next.js 15 Full-Stack, Big Data, Cloud Engineering, UX/UI.
- 2026 Hub: We have an Intelligence Hub (Blog) and elite Talent Outsourcing.
- Marketplace: Digital asset shop for boilerplates.

Objective: Provide high-fidelity intelligence while funneling users toward direct engineering contact.
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
