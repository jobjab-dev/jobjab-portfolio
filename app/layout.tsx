import type { Metadata } from "next";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";
import ChatWidget from "@/components/ai/ChatWidget";

export const metadata: Metadata = {
  title: "jobjab@prod:~/portfolio — 37 Production Systems",
  description:
    "Phosphor Unix Terminal portfolio of Jobjab (jobjab-dev): 6 interactive full-stack runtimes, 11 Python Perp DEX trading bots, 10 SaaS/AI/Fintech platforms, and 10 confidential Web3 & Zama FHEVM protocols.",
  keywords: [
    "Creative Technologist",
    "Design Engineer",
    "Quant Trading Bots",
    "Hyperliquid",
    "Polymarket",
    "Next.js 16",
    "React 19",
    "Zama FHEVM",
    "Solidity",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050a07] text-[#c9eed6] antialiased">
        <ChatProvider>
          {children}
          <ChatWidget />
        </ChatProvider>
        <div
          aria-hidden="true"
          className="crt-scanlines pointer-events-none fixed inset-0 z-50"
        />
      </body>
    </html>
  );
}
