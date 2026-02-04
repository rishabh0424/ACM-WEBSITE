"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle" | "arc";

interface FlipCardProps {
    src: string;
    index: number;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, index, target }: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 30,
                damping: 25,
                mass: 1.5,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
            }}
            className="cursor-pointer"
        >
            <motion.div 
                className="relative h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-800 border border-gray-700"
                whileHover={{ 
                    scale: 1.5, 
                    rotateY: 360,
                    zIndex: 50
                }}
                transition={{ duration: 0.6 }}
            >
                <img
                    src={src}
                    alt={`hero-${index}`}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
            </motion.div>
        </motion.div>
    );
}

const TOTAL_IMAGES = 20;

const IMAGES = [
    "/photos/20762853-f930-46f7-84d0-2f23c6e4f373.jpg",
    "/photos/5a075dd4-e8f4-4734-b1f8-b0b1709b2aeb.jpg",
    "/photos/60462c4f-82bb-4ed1-8efa-524485c96a7f.jpg",
    "/photos/683accf2-2b49-427b-95a8-d56ccfb1a276.jpg",
    "/photos/6b525cdc-95f9-444d-a91e-e4c61b1c3710.jpg",
    "/photos/9725b0dd-d87c-473d-8982-9ced99f553b7.jpg",
    "/photos/9aeb34e2-359d-4b5f-b127-5a2705ab9f8e.jpg",
    "/photos/c4dd6a71-ce88-42ae-9430-78118975cc27.jpg",
    "/photos/c73682aa-1f39-40f8-adbb-5549c7f8b064.jpg",
    "/photos/DSC_0161.JPG",
    "/photos/DSC_0163.JPG",
    "/photos/DSC_0179.JPG",
    "/photos/20762853-f930-46f7-84d0-2f23c6e4f373.jpg",
    "/photos/5a075dd4-e8f4-4734-b1f8-b0b1709b2aeb.jpg",
    "/photos/60462c4f-82bb-4ed1-8efa-524485c96a7f.jpg",
    "/photos/683accf2-2b49-427b-95a8-d56ccfb1a276.jpg",
    "/photos/6b525cdc-95f9-444d-a91e-e4c61b1c3710.jpg",
    "/photos/9725b0dd-d87c-473d-8982-9ced99f553b7.jpg",
    "/photos/9aeb34e2-359d-4b5f-b127-5a2705ab9f8e.jpg",
    "/photos/c4dd6a71-ce88-42ae-9430-78118975cc27.jpg",
];

export default function IntroAnimation() {
    const [phase, setPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isInView) return;
        
        const timer1 = setTimeout(() => setPhase("line"), 1000);
        const timer2 = setTimeout(() => setPhase("circle"), 6000);
        const timer3 = setTimeout(() => setPhase("arc"), 11000);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [isInView]);

    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-transparent overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-20" />
            <div className="flex h-full w-full flex-col items-center justify-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={phase === "circle" ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2"
                >
                    <h1 className="text-2xl font-medium tracking-tight text-white md:text-4xl">
                        Why Choose ACM?
                    </h1>
                    <p className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-400">
                        INNOVATION & EXCELLENCE
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={phase === "arc" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                        Join Our Community
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 max-w-lg leading-relaxed">
                        Experience hands-on learning, networking, and cutting-edge projects <br className="hidden md:block" />
                        with passionate developers and tech enthusiasts.
                    </p>
                </motion.div>

                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (phase === "scatter") {
                            target = scatterPositions[i];
                        } else if (phase === "line") {
                            const lineSpacing = 70;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else if (phase === "circle") {
                            const minDimension = Math.min(containerSize.width, containerSize.height);
                            const circleRadius = Math.min(minDimension * 0.35, 350);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            target = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                                scale: 1,
                                opacity: 1,
                            };
                        } else if (phase === "arc") {
                            const isMobile = containerSize.width < 768;
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;
                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);
                            const currentArcAngle = startAngle + (i * step);
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            target = {
                                x: Math.cos(arcRad) * arcRadius,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
