"use client";

import { Mail, Github, Twitter, MessageCircle, Send } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

const contactMethods = [
    {
        icon: Mail,
        label: "Email",
        value: "peejabh@gmail.com",
        href: "mailto:peejabh@gmail.com",
    },
    {
        icon: Github,
        label: "GitHub",
        value: "@jobjab-dev",
        href: "https://github.com/jobjab-dev",
    },
    {
        icon: Twitter,
        label: "Twitter",
        value: "@jobjab_eth",
        href: "https://twitter.com/jobjab_eth",
    },
    {
        icon: Send,
        label: "Telegram",
        value: "@jobjab123",
        href: "https://t.me/jobjab123",
    },
];

export default function Contact() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-16">
                <section className="py-20 sm:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl sm:text-6xl font-heading font-bold mb-6">
                                Get in <span className="gradient-text">Touch</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Have a project in mind or want to collaborate? Feel free to reach out through any of these channels.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
                            {contactMethods.map((method, index) => {
                                const Icon = method.icon;
                                return (
                                    <a
                                        key={method.label}
                                        href={method.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Card className="p-6 cursor-pointer group">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground mb-1">
                                                        {method.label}
                                                    </div>
                                                    <div className="font-medium text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                        {method.value}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </a>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <Card className="p-12 max-w-2xl mx-auto">
                                <Send className="w-12 h-12 mx-auto mb-6 text-purple-600" />
                                <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
                                    Let's Build Something Amazing
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    I'm always interested in hearing about new projects and opportunities
                                    in the Web3 space. Whether you have a question or just want to say hi,
                                    I'll try my best to get back to you!
                                </p>
                                <a
                                    href="mailto:your.email@example.com"
                                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <Mail className="w-5 h-5 mr-2" />
                                    Send Email
                                </a>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
