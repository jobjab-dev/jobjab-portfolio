"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowUpRight, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "@/context/ChatContext";

const SUGGESTED_PROMPTS = [
  "Walk me through your 6 flagship builds",
  "Tell me about your Perp DEX trading bots",
  "What SaaS & AI platforms have you built?",
  "Tell me about the $5,000 Zama FHEVM award",
];

const ChatWidget: React.FC = () => {
  const pathname = usePathname();
  const { isOpen, setIsOpen, messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [pastHero, setPastHero] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const heroReel = document.getElementById("hero-reel");
      if (heroReel) {
        setPastHero(heroReel.getBoundingClientRect().bottom <= window.innerHeight * 0.9);
      } else {
        setPastHero(window.scrollY > 420);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const showFloatingTrigger = isOpen || pathname !== "/" || pastHero;

  return (
    <>
      <AnimatePresence>
        {showFloatingTrigger && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close studio AI assistant" : "Open studio AI assistant"}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 border border-[#f8f1e3]/20 bg-[#11151e] px-4 py-2.5 text-xs font-medium text-[#f8f1e3] transition-colors hover:border-[#ec7a26] hover:text-[#ec7a26]"
          >
            {isOpen ? (
              <>
                <X className="h-3.5 w-3.5" />
                <span>Close Desk</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-[#ec7a26]" />
                <span>Ask Studio AI</span>
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-6 z-40 flex h-[540px] w-[min(92vw,410px)] flex-col border border-[#f8f1e3]/20 bg-[#11151e] text-[#dfd7c8]"
          >
            <div className="flex items-center justify-between border-b border-[#f8f1e3]/14 bg-[#0b0e13] px-4 py-3.5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ec7a26]">
                  STUDIO DESK · GEMINI 2.5
                </p>
                <p className="font-editorial text-lg font-medium text-[#f8f1e3]">
                  37 Production Systems Indexed
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Dismiss AI assistant"
                className="p-1.5 text-[#9da4b4] transition-colors hover:text-[#f8f1e3]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="custom-scrollbar flex-1 space-y-3.5 overflow-y-auto p-4 text-xs leading-relaxed">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] border px-3.5 py-2.5 leading-relaxed ${
                      msg.role === "user"
                        ? "border-[#ec7a26]/50 bg-[#23170d] text-[#f8f1e3]"
                        : "border-[#f8f1e3]/14 bg-[#0b0e13] text-[#dfd7c8]"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>,
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 font-medium text-[#ec7a26] underline underline-offset-2 hover:text-[#f8f1e3]"
                          >
                            {children}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ),
                        code: ({ children }) => (
                          <code className="border border-[#f8f1e3]/14 bg-[#171d29] px-1 py-0.5 font-mono text-[11px] text-[#82c4e6]">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 border border-[#f8f1e3]/14 bg-[#0b0e13] px-3.5 py-2.5 font-mono text-[11px] text-[#ec7a26]">
                    <span>Querying index...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length < 3 && !isLoading && (
              <div className="border-t border-[#f8f1e3]/14 bg-[#0b0e13] px-4 py-2.5">
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#9da4b4]">
                  Suggested
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="border border-[#f8f1e3]/14 bg-[#11151e] px-2.5 py-1 text-left text-[11px] text-[#dfd7c8] transition-colors hover:border-[#ec7a26] hover:text-[#f8f1e3]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-[#f8f1e3]/14 bg-[#0b0e13] p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about bots, SaaS, Flagships, or FHEVM..."
                className="flex-1 bg-transparent px-2 py-1 text-xs text-[#f8f1e3] placeholder:text-[#9da4b4] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ec7a26] text-[#120d08] transition-colors hover:bg-[#d86919] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
