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
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 border border-[#2f7d4d] bg-[#08120c] px-4 py-2.5 text-xs font-semibold text-[#39ff7a] transition-colors hover:border-[#39ff7a] hover:bg-[#0d1c13]"
          >
            {isOpen ? (
              <>
                <X className="h-4 w-4" />
                <span>[CLOSE_DESK]</span>
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 text-[#ffb000]" />
                <span>ai&gt; ASK JOBJAB AI</span>
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
            className="fixed bottom-20 right-6 z-40 flex h-[540px] w-[min(92vw,420px)] flex-col border border-[#2f7d4d] bg-[#08120c] text-[#c9eed6]"
          >
            <div className="flex items-center justify-between border-b border-[#193826] bg-[#0c1911] px-4 py-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#39ff7a]">
                  GEMINI-2.5 // STUDIO_DESK_DAEMON
                </p>
                <p className="text-xs font-medium text-[#ebfff2]">37 Shipped Systems Indexed</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Dismiss AI assistant"
                className="p-1.5 text-[#6ca380] transition-colors hover:text-[#39ff7a]"
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
                        ? "border-[#39ff7a] bg-[#0d1c13] text-[#ebfff2]"
                        : "border-[#193826] bg-[#050a07] text-[#c9eed6]"
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
                            className="inline-flex items-center gap-0.5 font-medium text-[#39ff7a] underline underline-offset-2 hover:text-[#ffb000]"
                          >
                            {children}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ),
                        code: ({ children }) => (
                          <code className="border border-[#193826] bg-[#0d1c13] px-1 py-0.5 text-[11px] text-[#ffb000]">
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
                  <div className="flex items-center gap-2 border border-[#193826] bg-[#050a07] px-3.5 py-2.5 text-xs text-[#39ff7a]">
                    <span>QUERYING_INDEX</span>
                    <span className="term-cursor inline-block h-3 w-1.5 bg-[#39ff7a]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length < 3 && !isLoading && (
              <div className="border-t border-[#193826] bg-[#060f0b] px-4 py-2.5">
                <p className="mb-1.5 text-[10px] uppercase tracking-[0.12em] text-[#6ca380]">
                  quick_prompts
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="border border-[#193826] bg-[#0d1c13] px-2.5 py-1 text-left text-[11px] text-[#c9eed6] transition-colors hover:border-[#39ff7a] hover:text-[#39ff7a]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-[#193826] bg-[#050a07] p-3"
            >
              <span className="text-xs font-semibold text-[#39ff7a]">ai&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about bots, SaaS, Flagships, or FHEVM..."
                className="flex-1 bg-transparent px-1 py-1 text-xs text-[#ebfff2] placeholder:text-[#6ca380] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="flex h-7 w-7 items-center justify-center bg-[#39ff7a] text-[#041108] transition-colors hover:bg-[#22e563] disabled:cursor-not-allowed disabled:opacity-45"
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
