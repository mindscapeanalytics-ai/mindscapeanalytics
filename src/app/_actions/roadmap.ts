"use server";

import { callAI } from "@/lib/ai-orchestrator";

export async function generateAutomationRoadmap(description: string) {
    // Detect if the input is a URL
    const isUrl = description.match(/https?:\/\/[^\s]+/);
    
    const systemPrompt = `
You are the "Mindscape Strategic Architect" (MSA-01). 
You are powered by industrial-grade LLM infrastructure.

[TASK]: 
${isUrl ? "Analyze the provided URL and identify specific high-ROI automation opportunities." : "Analyze the user's manual process and design an Agentic Automation Roadmap."}

[CONTEXT]: Mindscape Analytics LLC specializes in n8n, AI Agents, Voice Call agents, and Enterprise SaaS.

[OUTPUT_FORMAT]:
1. **STRATEGIC_AUDIT**: Short summary of the current state.
2. **AUTOMATION_NODES**: 3 high-impact agents to deploy (e.g., "Agent_Delta: 24/7 Voice Setter").
3. **EFFICIENCY_GAINS**: Projected ROI and hours saved.
4. **ARCHITECT_VERDICT**: Final recommendation.

[CONSTRAINTS]:
- Use monospaced headers.
- Professional, technical, and high-velocity tone.
- Keep it under 300 words.
`;

    try {
        const result = await callAI({
            systemPrompt,
            prompt: isUrl ? `Analyze this website: ${description}` : `Analyze this process: ${description}`,
            provider: "GOOGLE", // Use Google Gemini as primary
            model: "gemini-3-flash", // Use 2026 low-cost intelligent model
        });

        return { success: true, roadmap: result.content };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
