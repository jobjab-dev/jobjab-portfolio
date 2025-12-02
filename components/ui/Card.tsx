"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    hoverable?: boolean;
}

export function Card({ children, className, hoverable = true, ...props }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hoverable ? { scale: 1.02, y: -5 } : {}}
            transition={{ duration: 0.3 }}
            className={cn(
                "bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 transition-all duration-300",
                hoverable && "hover:border-[#F5E147]/50 hover:shadow-[0_0_30px_-10px_rgba(245,225,71,0.3)]",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
