import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { portfolioData } from "@/lib/portfolio-data";

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
    if (!apiKey) {
        return NextResponse.json(
            { reply: "I'm sorry, I can't access my brain right now. (Missing API Key)" },
            { status: 500 }
        );
    }

    try {
        const { message } = await req.json();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      You are an AI assistant for ${portfolioData.owner}'s portfolio website.
      Your goal is to answer visitor questions based strictly on the information provided below.
      
      **Website Data:**
      ${JSON.stringify(portfolioData, null, 2)}
      
      **Instructions:**
      1. Be helpful, professional, and concise.
      2. If the user asks about projects, skills, or background, use the provided data.
      3. If the answer is not in the data, politely say you don't know but suggest checking the relevant page (e.g., Contact or About).
      4. Do NOT make up facts.
      5. Keep the tone friendly and welcoming.
      
      User: ${message}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { reply: "I'm encountering some technical difficulties. Please try again." },
            { status: 500 }
        );
    }
}
