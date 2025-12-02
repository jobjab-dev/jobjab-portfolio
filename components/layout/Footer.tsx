"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail, Send } from "lucide-react";

const socialLinks = [  
    { icon: Github, href: "https://github.com/jobjab-dev", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/jobjab_eth", label: "Twitter" },
    { icon: Mail, href: "mailto:peejabh@gmail.com", label: "Email" },
    { icon: Send, href: "https://t.me/jobjab123", label: "Telegram" },
];

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center justify-center space-y-6">
                    {/* Social Links */}
                    <div className="flex items-center space-x-6">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                    aria-label={social.label}
                                >
                                    <Icon className="w-6 h-6" />
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} jobjab-portfolio. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
