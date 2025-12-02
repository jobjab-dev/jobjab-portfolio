"use client";

import { Trophy, Award, Star } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

const awards = [
    {
        icon: Trophy,
        title: "Zama Monthly Bounty Winner",
        date: "October 2025",
        description: "Won 1st Place ($5,000) in Zama's Monthly Bounty Track for building 'fhevm-react-template', a Universal FHEVM SDK for confidential dApps.",
    },
];

export default function Awards() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-16">
                <section className="py-20 sm:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl sm:text-6xl font-heading font-bold mb-6">
                                Awards & <span className="gradient-text">Recognition</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Achievements and recognition for contributions to the Web3 and blockchain ecosystem.
                            </p>
                        </div>

                        {/* Awards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {awards.map((award, index) => {
                                const Icon = award.icon;
                                return (
                                    <div key={award.title}>
                                        <Card className="p-6 h-full">
                                            <div className="flex items-start space-x-4">
                                                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="text-xl font-heading font-semibold">
                                                            {award.title}
                                                        </h3>
                                                        <span className="text-sm text-muted-foreground ml-2 flex-shrink-0">
                                                            {award.date}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted-foreground">
                                                        {award.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
