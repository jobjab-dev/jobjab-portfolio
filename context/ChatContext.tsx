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
        { role: "assistant", content: "Greetings! I am the AI assistant for this portfolio. I can tell you about Jobjab's projects, skills, and experience. How can I help?" },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage = text.trim();
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        // If chat is closed, open it when sending a message (e.g. from home input)
        if (!isOpen) {
            setIsOpen(true);
        }

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
                { role: "assistant", content: "I seem to have lost connection with the mothership. Please try again later." },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, isOpen]);

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
