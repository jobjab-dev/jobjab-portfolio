"use client";

import { Code2, Cpu, Database, Globe } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

const skills = [
    {
        icon: Code2,
        title: "Confidential Smart Contracts",
        description: "Pioneering privacy-first dApps using Zama's FHEVM and encrypted on-chain logic",
    },
    {
        icon: Database,
        title: "DeFi & GameFi Architecture",
        description: "Building complex protocols, from AMMs and Fair Launch platforms to on-chain gaming",
    },
    {
        icon: Globe,
        title: "Full Stack Web3",
        description: "End-to-end development using Next.js, Solidity, Hardhat, and modern frontend frameworks",
    },
    {
        icon: Cpu,
        title: "Emerging Ecosystems",
        description: "Early adopter building on Monad, Morph L2, and other cutting-edge blockchains",
    },
];

export default function About() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-16">
                {/* Hero */}
                <section className="py-20 sm:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl sm:text-6xl font-heading font-bold mb-6">
                                About <span className="gradient-text">Me</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Passionate Web3 developer focused on Privacy-Preserving Technologies,
                                FHE, and building the next generation of decentralized applications.
                            </p>
                        </div>

                        {/* Bio */}
                        <div className="mb-20">
                            <Card className="p-8 sm:p-12 max-w-4xl mx-auto">
                                <p className="text-lg leading-relaxed mb-6">
                                    I'm a Full Stack Web3 Developer with a deep focus on <strong>Privacy-Preserving Technologies</strong> and <strong>Fully Homomorphic Encryption (FHE)</strong>.
                                    I specialize in building confidential decentralized applications using <strong>Zama's FHEVM stack</strong>, pushing the boundaries of what's possible on-chain.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    My experience spans across building innovative protocols like private lotteries and fair launch platforms,
                                    to immersive on-chain gaming experiences on emerging networks like <strong>Monad</strong> and <strong>Morph L2</strong>.
                                    I'm passionate about creating secure, scalable, and user-friendly dApps that bring real privacy and utility to users.
                                </p>
                            </Card>
                        </div>

                        {/* Skills */}
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-12">
                                Expertise
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {skills.map((skill, index) => {
                                    const Icon = skill.icon;
                                    return (
                                        <div key={skill.title}>
                                            <Card className="p-6 h-full">
                                                <div className="flex items-start space-x-4">
                                                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                                        <Icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-heading font-semibold mb-2">
                                                            {skill.title}
                                                        </h3>
                                                        <p className="text-muted-foreground">
                                                            {skill.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
