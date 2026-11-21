"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  messages: Message[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello—I am Jobjab's studio assistant. Ask about the **37 indexed production systems**: **6 Flagship UI builds**, **11 Quant & Perp DEX trading bots**, **10 SaaS/Fintech/AI platforms**, or **10 Confidential Web3 / Zama FHEVM protocols**.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage = text.trim();
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setIsLoading(true);
      setIsOpen(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) throw new Error("Failed to fetch response");

        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Studio desk connection timed out. You can still browse all 37 systems on `/projects` or reach Jobjab directly at `peejabh@gmail.com`.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return (
    <ChatContext.Provider value={{ isOpen, setIsOpen, messages, isLoading, sendMessage, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
