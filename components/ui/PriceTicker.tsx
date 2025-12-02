"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export function PriceTicker() {
    const [prices, setPrices] = useState<Array<{ symbol: string; price: string; change: string; up: boolean }>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,ripple,cardano,avalanche-2,chainlink,dogecoin,polkadot&vs_currencies=usd&include_24hr_change=true"
                );
                const data = await response.json();

                const formattedPrices = [
                    { id: "bitcoin", symbol: "BTC" },
                    { id: "ethereum", symbol: "ETH" },
                    { id: "solana", symbol: "SOL" },
                    { id: "binancecoin", symbol: "BNB" },
                    { id: "ripple", symbol: "XRP" },
                    { id: "cardano", symbol: "ADA" },
                    { id: "avalanche-2", symbol: "AVAX" },
                    { id: "chainlink", symbol: "LINK" },
                    { id: "dogecoin", symbol: "DOGE" },
                    { id: "polkadot", symbol: "DOT" },
                ].map((coin) => {
                    const coinData = data[coin.id];
                    if (!coinData) return null;

                    const change = coinData.usd_24h_change;
                    const isUp = change >= 0;

                    return {
                        symbol: coin.symbol,
                        price: coinData.usd.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }),
                        change: `${isUp ? "+" : ""}${change.toFixed(2)}%`,
                        up: isUp,
                    };
                }).filter((item) => item !== null) as Array<{ symbol: string; price: string; change: string; up: boolean }>;

                setPrices(formattedPrices);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch prices:", error);
                setLoading(false);
            }
        };

        fetchPrices();
        // Refresh every 60 seconds
        const interval = setInterval(fetchPrices, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return null;

    return (
        <div className="w-full bg-[#F5E147] border-y border-black/10 overflow-hidden py-2 z-40 relative">
            <div className="flex select-none">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex items-center whitespace-nowrap"
                >
                    {[...prices, ...prices, ...prices].map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center mx-6 space-x-2 text-black font-mono font-bold"
                        >
                            <span>{item.symbol}</span>
                            <span>${item.price}</span>
                            <span
                                className={`flex items-center text-sm ${item.up ? "text-green-700" : "text-red-600"
                                    }`}
                            >
                                {item.up ? (
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                ) : (
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                )}
                                {item.change}
                            </span>
                            <span className="text-black/20 mx-2">|</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

