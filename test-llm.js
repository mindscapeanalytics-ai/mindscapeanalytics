
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

async function testGemini() {
    console.log("Testing Gemini API...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GOOGLE_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Hello, 1+1=" }] }]
            })
        });
        const data = await response.json();
        console.log("Gemini Response Status:", response.status);
        if (data.candidates) {
            console.log("Gemini SUCCESS:", data.candidates[0].content.parts[0].text);
        } else {
            console.log("Gemini FAILURE:", data);
        }
    } catch (e) {
        console.error("Gemini Error:", e.message);
    }
}

async function testOpenRouter() {
    console.log("\nTesting OpenRouter API...");
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENROUTER_KEY}`
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-001",
                messages: [{ role: "user", content: "Hello, 1+1=" }]
            })
        });
        const data = await response.json();
        console.log("OpenRouter Response Status:", response.status);
        if (data.choices) {
            console.log("OpenRouter SUCCESS:", data.choices[0].message.content);
        } else {
            console.log("OpenRouter FAILURE:", data);
        }
    } catch (e) {
        console.error("OpenRouter Error:", e.message);
    }
}

testGemini().then(testOpenRouter);
