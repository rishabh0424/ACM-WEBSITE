"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const numStars = 800;
    let speed = 2;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Star {
      x: number;
      y: number;
      z: number;
      pz: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth - canvasWidth / 2;
        this.y = Math.random() * canvasHeight - canvasHeight / 2;
        this.z = Math.random() * canvasWidth;
        this.pz = this.z;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.z -= speed;

        if (this.z < 1) {
          this.z = canvasWidth;
          this.x = Math.random() * canvasWidth - canvasWidth / 2;
          this.y = Math.random() * canvasHeight - canvasHeight / 2;
          this.pz = this.z;
        }
      }

      draw(canvasWidth: number, canvasHeight: number) {
        if (!ctx) return; // 🔥 TypeScript safety

        const sx = (this.x / this.z) * canvasWidth / 2 + canvasWidth / 2;
        const sy = (this.y / this.z) * canvasHeight / 2 + canvasHeight / 2;

        const r = Math.max(0.1, (1 - this.z / canvasWidth) * 2.5);

        const px = (this.x / this.pz) * canvasWidth / 2 + canvasWidth / 2;
        const py = (this.y / this.pz) * canvasHeight / 2 + canvasHeight / 2;

        this.pz = this.z;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.lineWidth = r * 2;
        ctx.strokeStyle = `rgba(255,255,255,${1 - this.z / canvasWidth})`;
        ctx.stroke();
      }
    }

    const init = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update(canvas.width, canvas.height);
        star.draw(canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const dist = Math.abs(event.clientX - centerX);
      const maxDist = window.innerWidth / 2;

      speed = 2 + (1 - dist / maxDist) * 20;
    };

    // 🔥 Setup
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    init();
    animate();

    // 🔥 Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full"
    />
  );
};

const AnnouncementsHero = () => {
  const router = useRouter();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">

      <StarfieldCanvas />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />

      <motion.button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/20 transition-all"
        whileHover={{ x: -5, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>

      <div className="relative z-20 text-center p-6">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-sm"
        >
          <Bell className="h-4 w-4 text-blue-300" />
          <span className="text-sm font-medium text-gray-200">
            Stay Updated
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
        >
          Announcements
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg text-gray-400 mb-10"
        >
          Stay updated with the latest news, events, and opportunities from ACM Student Chapter
        </motion.p>
      </div>
    </div>
  );
};

export default AnnouncementsHero;
