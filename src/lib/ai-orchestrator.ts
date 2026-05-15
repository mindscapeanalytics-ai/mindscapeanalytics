/**
 * Mindscape AI Orchestrator // 2026 Edition
 * 
 * Unified interface for NVIDIA NIM, Google Gemini, and OpenRouter.
 * Optimized for high-fidelity reasoning and cost-efficiency.
 */

export type AIProvider = "NVIDIA" | "GOOGLE" | "OPENROUTER";

export interface AIResponse {
    content: string;
    provider: AIProvider;
    model: string;
}

export async function callAI({
    prompt,
    systemPrompt = "You are the Strategic AI Architect for Mindscape Analytics. Provide industrial-grade, concise, and actionable intelligence.",
    provider = "NVIDIA",
    model,
    temperature = 0.2,
}: {
    prompt: string;
    systemPrompt?: string;
    provider?: AIProvider;
    model?: string;
    temperature?: number;
}): Promise<AIResponse> {
    
    // 1. NVIDIA NIM (Primary for Logic/Reasoning)
    if (provider === "NVIDIA") {
        const apiKey = process.env.NVIDIA_NIM_API_KEY;
        const targetModel = model || "mistralai/mistral-large-3-675b-instruct-2512";
        
        try {
            const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: targetModel,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: prompt }
                    ],
                    temperature,
                    max_tokens: 2048,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    content: data.choices[0].message.content,
                    provider: "NVIDIA",
                    model: targetModel
                };
            }
        } catch (e) {
            console.error("NVIDIA NIM Fallback triggered", e);
        }
    }

    // 2. GOOGLE GEMINI (Primary for Multimodal/Long Context)
    if (provider === "GOOGLE" || provider === "NVIDIA") { // Fallback to Google if NVIDIA fails
        const apiKey = process.env.GOOGLE_AI_STUDIO_API;
        const targetModel = model || "gemini-1.5-pro-latest";
        
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `${systemPrompt}\n\n${prompt}` }] }],
                    generationConfig: { temperature }
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    content: data.candidates[0].content.parts[0].text,
                    provider: "GOOGLE",
                    model: targetModel
                };
            }
        } catch (e) {
            console.error("Google Gemini Fallback triggered", e);
        }
    }

    // 3. OPENROUTER (High-Speed Global Router / Absolute Fallback)
    const orApiKey = process.env.OPENROUTER_API_KEY;
    const orModel = model || "meta-llama/llama-3.1-405b-instruct";
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${orApiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://mindscapeanalytics.com",
            "X-Title": "Mindscape Analytics",
        },
        body: JSON.stringify({
            model: orModel,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            temperature,
        }),
    });

    const data = await response.json();
    return {
        content: data.choices[0].message.content,
        provider: "OPENROUTER",
        model: orModel
    };
}
