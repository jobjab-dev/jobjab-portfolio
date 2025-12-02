"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
                "glass-card rounded-xl p-6 transition-all duration-300",
                hoverable && "hover:shadow-2xl hover:shadow-purple-500/20",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
