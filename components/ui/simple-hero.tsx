"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Component() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { title: "Our Journey", description: "Discover the story of our ACM chapter and the milestones we've achieved together." },
    { title: "Past Events", description: "Explore the workshops, seminars, and conferences that shaped our community." },
    { title: "Hackathons", description: "Join our competitive coding events and build innovative solutions with fellow developers." },
    { title: "Become a Member", description: "Take the next step and join our thriving community of tech enthusiasts and innovators." },
    { title: "What We're Building", description: "See the cutting-edge projects and initiatives driving our chapter forward." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ 
            opacity: 0,
            scale: 0.8
          }}
          animate={{ 
            opacity: 1,
            scale: 1
          }}
          exit={{ 
            opacity: 0,
            scale: 1.2
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.87, 0, 0.13, 1]
          }}
          className="absolute inset-0"
        >
        </motion.div>
      </AnimatePresence>

      {/* Floating Geometric Shapes */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border border-blue-400/30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              rotateZ: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center max-w-5xl w-full overflow-hidden px-2">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${currentSlide}`}>
              <motion.h1 
                initial={{ 
                  y: 200,
                  rotateX: -90,
                  opacity: 0,
                  filter: "blur(10px)"
                }}
                animate={{ 
                  y: 0,
                  rotateX: 0,
                  opacity: 1,
                  filter: "blur(0px)"
                }}
                exit={{ 
                  y: -200,
                  rotateX: 90,
                  opacity: 0,
                  filter: "blur(10px)"
                }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.5
                }}
                className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white mb-4 sm:mb-6 md:mb-8 leading-tight px-2"
                style={{ 
                  textShadow: "0 0 30px rgba(59,130,246,0.5)",
                  transformStyle: "preserve-3d",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto"
                }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_100%]"
                >
                  {slides[currentSlide].title}
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ 
                  scale: 0,
                  rotateY: -180,
                  opacity: 0
                }}
                animate={{ 
                  scale: 1,
                  rotateY: 0,
                  opacity: 1
                }}
                exit={{ 
                  scale: 0,
                  rotateY: 180,
                  opacity: 0
                }}
                transition={{ 
                  duration: 1,
                  ease: "backOut",
                  delay: 0.8
                }}
                className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-200 font-light max-w-4xl mx-auto px-2 sm:px-4"
                style={{ 
                  transformStyle: "preserve-3d",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto"
                }}
              >
                {slides[currentSlide].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 sm:gap-4 z-10 px-2 sm:px-4 w-full max-w-full">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
              index === currentSlide 
                ? 'bg-blue-400 text-black' 
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            {slide.title}
          </button>
        ))}
      </div>

      {/* Glitch Effect Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        animate={{
          opacity: [0, 0.1, 0, 0.05, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3
        }}
        style={{
          background: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,0,255,0.1) 2px, rgba(255,0,255,0.1) 4px)"
        }}
      />
    </motion.div>
  );
}