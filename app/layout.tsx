import type { Metadata } from "next";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";
import ChatWidget from "@/components/ai/ChatWidget";

export const metadata: Metadata = {
  title: "Jobjab — Creative Technologist & Design Engineer",
  description:
    "Architectural engineering portfolio of Jobjab (jobjab-dev): 6 interactive full-stack flagship interfaces and 10 confidential Web3 & Zama FHEVM protocols.",
  keywords: [
    "Creative Technologist",
    "Design Engineer",
    "Next.js",
    "React 19",
    "Web Audio API",
    "Zama FHEVM",
    "Web3",
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
    <html lang="en">
      <body className="antialiased">
        <ChatProvider>
          {children}
          <ChatWidget />
        </ChatProvider>
      </body>
    </html>
  );
}
