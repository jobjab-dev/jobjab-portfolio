"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, ArrowUpRight, ArrowRight } from "lucide-react";
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
      setPastHero(window.scrollY > 420);
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
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 border border-[#121110]/25 bg-[#171837] px-4 py-3 text-sm font-medium text-[#eeeef5] shadow-lg transition-colors hover:bg-[#1e2049]"
          >
            {isOpen ? (
              <>
                <X className="h-4 w-4" />
                <span>Close Desk</span>
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 text-[#ea681d]" />
                <span>Ask Jobjab AI</span>
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-6 z-50 flex h-[540px] w-[min(92vw,400px)] flex-col border border-[#121110]/25 bg-[#f4f0e8] text-[#121110] proof-shadow"
          >
            <div className="flex items-center justify-between border-b border-[#e8e3dd]/20 bg-[#171837] px-4 py-3.5 text-[#eeeef5]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#e6d4b6]">
                  STUDIO DESK ASSISTANT · GEMINI 2.5
                </p>
                <p className="text-sm font-medium">37 Shipped Systems Indexed</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Dismiss AI assistant"
                className="p-1.5 text-[#e8e3dd]/75 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="custom-scrollbar flex-1 space-y-3.5 overflow-y-auto p-4 text-sm">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#171837] text-[#f6f2eb]"
                        : "border border-[#121110]/15 bg-[#fbf9f5] text-[#121110]"
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
                            className="inline-flex items-center gap-0.5 font-medium text-[#ea681d] underline underline-offset-2 hover:text-[#c74f0e]"
                          >
                            {children}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ),
                        code: ({ children }) => (
                          <code className="bg-[#e8e3dd] px-1 py-0.5 font-mono text-xs text-[#171837]">
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
                  <div className="flex items-center gap-2 border border-[#121110]/15 bg-[#fbf9f5] px-3.5 py-2.5 font-mono text-xs text-[#5a544d]">
                    <span>Querying index</span>
                    <span className="inline-block h-1.5 w-1.5 animate-pulse bg-[#ea681d]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length < 3 && !isLoading && (
              <div className="border-t border-[#121110]/10 bg-[#efebe4] px-4 py-2.5">
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#5a544d]">
                  Quick Prompts
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="border border-[#121110]/20 bg-[#f6f2eb] px-2.5 py-1 text-left text-xs text-[#121110] transition-colors hover:border-[#ea681d] hover:bg-[#ea681d]/10"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-[#121110]/15 bg-[#f6f2eb] p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about bots, SaaS, Flagships, or FHEVM..."
                className="flex-1 bg-transparent px-2 py-1.5 text-sm text-[#121110] placeholder:text-[#5a544d] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ea681d] text-[#121110] transition-colors hover:bg-[#d85a12] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
