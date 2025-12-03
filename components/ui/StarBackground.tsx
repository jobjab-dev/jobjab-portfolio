"use client";

import React, { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: {
        x: number;
        y: number;
    };
    alpha: number;
    fading: boolean;
}

const StarBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            const numStars = Math.floor((canvas.width * canvas.height) / 4000); // Density

            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    color: `rgba(255, 255, 255, ${Math.random()})`,
                    velocity: {
                        x: (Math.random() - 0.5) * 0.2,
                        y: (Math.random() - 0.5) * 0.2,
                    },
                    alpha: Math.random(),
                    fading: Math.random() > 0.5,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#020205"); // Deep Void
            gradient.addColorStop(1, "#0a0a1a"); // Dark Blue/Purple
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();

                // Move star
                star.x += star.velocity.x;
                star.y += star.velocity.y;

                // Wrap around screen
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                // Twinkle effect
                if (star.fading) {
                    star.alpha -= 0.005;
                    if (star.alpha <= 0.2) {
                        star.alpha = 0.2;
                        star.fading = false;
                    }
                } else {
                    star.alpha += 0.005;
                    if (star.alpha >= 1) {
                        star.alpha = 1;
                        star.fading = true;
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
};

export default StarBackground;
