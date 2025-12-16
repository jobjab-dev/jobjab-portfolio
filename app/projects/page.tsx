"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const projects = [
    {
        title: "fhevm-react-template",
        description: "A template for building React applications with FHEVM (Zama) and Hardhat.",
        tags: ["FHEVM (Zama)", "Next.js", "React", "Tailwind CSS", "Solidity"],
        github: "https://github.com/jobjab-dev/fhevm-react-template",
        demo: "https://jobjab-fhevm-react-template-nextjs.vercel.app/",
        logo: null,
    },
    {
        title: "Monad World",
        description: "Web3 Idle-Game on Monad Testnet. MonadWorld is a Web3 project on the Monad blockchain featuring Lilnad NFTs as unique Soul-Bound Tokens (SBTs).",
        tags: ["Next.js", "TypeScript", "Solidity", "Prisma", "PostgreSQL", "Monad", "SBT/NFT"],
        github: "https://github.com/jobjab-dev/MonadWorld",
        demo: "https://www.monadworld.xyz/",
        logo: "https://www.monadworld.xyz/logo_no_bg.png",
    },
    {
        title: "Zadiction",
        description: "A transparent, linear-capped lottery AMM with dynamic odds and secure on-chain RNG powered by Zama FHEVM",
        tags: ["Solidity", "FHE", "TypeScript", "ethers.js"],
        github: "https://github.com/jobjab-dev/Zadiction",
        demo: "https://zadiction-nextjs.vercel.app/",
        logo: "https://bafybeifxneoifd3vnjvkgl7qme5q42bs2ronkqscnnpnkzxwmxbdizzbse.ipfs.w3s.link/logo_bg.png",
    },
    {
        title: "Click on chain",
        description: "Click Counter is a decentralized application (dApp) built on the Tea Sepolia Testnet.",
        tags: [, "React.js", "Solidity", "ethers.js"],
        github: "https://github.com/jobjab-dev/Clickonchain.xyz",
        demo: "https://www.clickonchain.xyz/",
        logo: "https://www.clickonchain.xyz/clicklogo.png",
    },
    {
        title: "Paylink",
        description: "A complete Web3 payment ecosystem built on Morph Layer 2 blockchain that enables seamless QR code-based payments with gasless transactions.",
        tags: ["Next.js", "TypeScript", "Solidity", "Morph L2", "QR Payments", "Gasless"],
        github: "https://github.com/jobjab-dev/PayLink",
        demo: "https://paylink-psi.vercel.app/",
        logo: null,
    },
    {
        title: "Private Vote",
        description: "Confidential Voting dApp using Zama's Fully Homomorphic Encryption(FHE).",
        tags: ["Next.js", "TypeScript", "Solidity", "Hardhat", "FHEVM (Zama)", "Confidential Voting", "Sepolia"],
        github: "https://github.com/jobjab-dev/Private-Vote-FHEVM",
        demo: "https://private-vote-fhevm-app.vercel.app/",
        logo: "https://private-vote-fhevm-app.vercel.app/images/logo.png",
    },
    {
        title: "hello-fhevm-tutorial",
        description: "The most beginner-friendly way to learn confidential blockchain development",
        tags: ["React", "Vite", "FHEVM (Zama)", "Solidity", "Hardhat"],
        github: "https://github.com/jobjab-dev/hello-fhevm-tutorial",
        demo: "https://hello-fhevm-tutorial.vercel.app/",
        logo: null,
    },
    {
        title: "Zameme.fun",
        description: "Zameme is a Privacy-First Fair Launch Platform for Meme Tokens using Zama's FHE (Fully Homomorphic Encryption) technology.",
        tags: ["FHEVM (Zama)", "Solidity", "Next.js", "Bonding Curve", "Fair Launch"],
        github: "https://github.com/jobjab-dev/Zameme",
        demo: "https://zameme-fun.vercel.app/",
        logo: "https://bafybeig3agemxeyv3alyk4jgjieecnl2qtj54kgnxsbm22oosyxxojmeyy.ipfs.w3s.link/Zameme_logo.png",
    },
    {
        title: "FHEVM Example Hub",
        description: "A CLI tool and web app for generating ready-to-use FHEVM smart contract examples. Quickly scaffold confidential voting, private auctions, and more.",
        tags: ["FHEVM (Zama)", "CLI", "TypeScript", "Solidity", "Hardhat", "Developer Tools"],
        github: "https://github.com/jobjab-dev/fhevm-example-hub",
        demo: "https://fhevm-example-hub-rho.vercel.app/",
        logo: "https://fhevm-example-hub-rho.vercel.app/android-chrome-192x192.png",
    },
    {
        title: "ZipherLaunch",
        description: "Confidential Token Launchpad & Private Auctions powered by Fully Homomorphic Encryption. Sealed-bid Dutch auctions with hidden bids and fair price discovery.",
        tags: ["FHEVM (Zama)", "Next.js", "Solidity", "Dutch Auction", "Private Bidding", "Token Launchpad"],
        github: "https://github.com/jobjab-dev/ZipherLaunch",
        demo: "https://zipher-launch.vercel.app/",
        logo: "https://zipher-launch.vercel.app/icon.png",
    },
];

export default function Projects() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-20 bg-background relative">

                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
                </div>

                <section className="py-20 sm:py-32 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl sm:text-6xl font-heading font-bold mb-6">
                                My <span className="gradient-text">Projects</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                A collection of Web3 projects showcasing smart contracts, DeFi protocols,
                                and decentralized applications built with cutting-edge technology.
                            </p>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <div key={project.title}>
                                    <Card className="p-6 h-full flex flex-col">
                                        {/* Logo */}
                                        <div className={`mb-4 flex items-center justify-center h-24 w-24 mx-auto ${!project.logo ? "rounded-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500" : ""}`}>
                                            {project.logo ? (
                                                <Image
                                                    src={project.logo}
                                                    alt={`${project.title} logo`}
                                                    width={96}
                                                    height={96}
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <span className="text-4xl font-bold text-white">
                                                    {project.title[0]}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-heading font-bold mb-3 text-center">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-4 flex-grow text-center">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-3">
                                            <a href={project.github} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    <Github className="w-4 h-4 mr-2" />
                                                    Code
                                                </Button>
                                            </a>
                                            <a href={project.demo} className="flex-1">
                                                <Button variant="primary" size="sm" className="w-full">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Demo
                                                </Button>
                                            </a>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
