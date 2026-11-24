import type { Metadata } from "next";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";
import ChatWidget from "@/components/ai/ChatWidget";

export const metadata: Metadata = {
  title: "Jobjab — Creative Technologist, Quant Systems & Web3 Studio",
  description:
    "Hand-painted anime cinema portfolio of Jobjab (jobjab-dev): 37 production systems spanning 6 interactive web runtimes, 11 Python Perp DEX trading bots, 10 SaaS/Fintech/AI platforms, and 10 Zama FHEVM Web3 protocols.",
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
      <body className="bg-[#0b0e13] text-[#dfd7c8] antialiased">
        <ChatProvider>
          {children}
          <ChatWidget />
        </ChatProvider>
      </body>
    </html>
  );
}
