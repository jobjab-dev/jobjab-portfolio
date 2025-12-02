"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, LineChart, Wallet, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PriceTicker } from "@/components/ui/PriceTicker";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-background relative">
        <PriceTicker />

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative z-10">
            <div className="text-center space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#F5E147]/10 border border-[#F5E147]/50 text-[#F5E147]"
              >
                <Activity className="w-4 h-4" />
                <span className="text-sm font-mono font-bold tracking-wide">STATUS: ONLINE & BUILDING</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold leading-tight tracking-tight"
              >
                DECENTRALIZED
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E147] to-orange-500">
                  FUTURE
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-mono"
              >
                // Architechting secure smart contracts & privacy-first dApps.
                <br />
                Specialized in Zama FHEVM, Monad, and EVM ecosystems.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/projects">
                  <Button variant="primary" size="lg" className="group min-w-[160px] bg-[#F5E147] text-black hover:bg-[#F5E147]/90 border-none">
                    <LineChart className="mr-2 w-5 h-5" />
                    Portfolio
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="min-w-[160px] border-muted-foreground/20 hover:bg-muted/10">
                    <Code2 className="mr-2 w-5 h-5" />
                    Contact Me
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Stats / Market Overview */}
        <section className="py-16 bg-muted/10 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "TOTAL PROJECTS", value: "8+", icon: Wallet, trend: "+2 this month" },
                { label: "AWARDS WON", value: "1", icon: Sparkles, trend: "$5,000 Prize" },
                { label: "EXP. LEVEL", value: "Lvl. 3", icon: LineChart, trend: "Senior Dev" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl hover:border-[#F5E147]/50 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-muted group-hover:bg-[#F5E147]/20 transition-colors">
                      <stat.icon className="w-6 h-6 text-muted-foreground group-hover:text-[#F5E147]" />
                    </div>
                    <span className="text-xs font-mono text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
