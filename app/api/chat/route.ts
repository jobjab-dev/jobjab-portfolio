import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { portfolioData } from "@/lib/portfolio-data";

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "Gemini API key is not configured in this environment, but all 16 shipped builds are linked directly on `/projects` or via `peejabh@gmail.com`.",
      },
      { status: 500 }
    );
  }

  try {
    const { message } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are the studio assistant for ${portfolioData.owner} (${portfolioData.handle}), ${portfolioData.role}.
Answer visitor questions strictly from the verified portfolio data below.

**Portfolio Index:**
${JSON.stringify(portfolioData, null, 2)}

**Instructions:**
1. Be direct, technically crisp, and concise.
2. When referencing any project, include its exact live demo URL or GitHub link from the data above.
3. Highlight both interactive frontend craft (Next.js 16, React 19 SSE/useOptimistic, Web Audio DSP, CSS Matrix Canvas, TanStack Virtual Radar, Astro 7 SSR) and confidential Web3 work (Zama FHEVM $5k Winner fhevm-react-template, ZipherLaunch, Monad World, Paylink, Zadiction, etc.).
4. Never fabricate claims, dates, clients, or unverified metrics. If unavailable, direct the visitor to peejabh@gmail.com or /contact.

User: ${message}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { reply: "Unable to reach the AI assistant right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
