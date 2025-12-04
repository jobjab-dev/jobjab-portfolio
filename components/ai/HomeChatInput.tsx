"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export const HomeChatInput: React.FC = () => {
    const [input, setInput] = useState("");
    const { sendMessage } = useChat();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-xl mx-auto"
        >
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur-sm"></div>
                <div className="relative flex items-center bg-black rounded-2xl p-1">
                    <div className="pl-4 text-purple-400">
                        <Sparkles size={20} />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about me..."
                        className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 focus:outline-none py-3 px-4"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
