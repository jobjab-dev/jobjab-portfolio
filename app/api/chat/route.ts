import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { portfolioData } from "@/lib/portfolio-data";

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "Gemini API key is not configured in this environment, but all 37 shipped systems are indexed directly on `/projects` or you can reach Jobjab via `peejabh@gmail.com`.",
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
2. Cover all four engineering tracks accurately when relevant:
   - Track 01 (01–06): Interactive Frontend Runtimes (Next.js 16 SSE/useOptimistic, Web Audio DSP, CSS Matrix Canvas, TanStack Virtual Radar, Astro 7 SSR, Framer Motion).
   - Track 02 (07–17): Algorithmic Trading & Perp DEX Bots (Python async WebSockets, Hyperliquid, GRVT V2, Polymarket CLOB, Lighter, Aster VEGA, Nado + Link Signer, Apex Omni, Paradex Starknet, Backpack Ed25519, Pacifica Solana, ActiveLP Uniswap/PancakeSwap V3).
   - Track 03 (18–27): Production SaaS, Fintech & AI Platforms (JVAULT Base L2, POSkub & SM POS, Poskub Pay / paykub, FastCaption, Nudrub Marketplace, BOND Limit Orders, PaoPay, TikTok AI Pipeline, TryOn System, Dukira Trellis 3D API).
   - Track 04 (28–37): Confidential Web3 & Zama FHEVM Protocols ($5k Zama Bounty Winner fhevm-react-template, ZipherLaunch, Monad World, Zadiction, Paylink, Private Vote, FHEVM Example Hub, Zameme.fun, hello-fhevm-tutorial, Click on chain).
3. When a project has a 'liveUrl' or public 'githubUrl' in the data, include that exact URL. When 'isPrivateRepo' is true and no 'githubUrl' exists, state clearly that its source repository is private and visitors can request a walkthrough via /contact or peejabh@gmail.com (do NOT guess GitHub URLs for private repos).
4. Never fabricate trading PnL, volume metrics, APR, revenue, user counts, dates, or clients. If unavailable, direct the visitor to peejabh@gmail.com or /contact.

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
