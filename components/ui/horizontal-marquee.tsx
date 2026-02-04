"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export const HorizontalMarquee = ({ images }: { images: string[] }) => {
  const duplicatedImages = useMemo(() => {
    const repeated = [];
    for (let i = 0; i < 6; i++) {
      repeated.push(...images);
    }
    return repeated;
  }, [images]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-dark-base">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-base to-transparent z-10 pointer-events-none" />
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-base to-transparent z-10 pointer-events-none" />

      {/* Multi-row marquee stack */}
      <div className="flex flex-col justify-center h-full gap-6 py-12">
        {/* Row 1 - Left to Right */}
        <motion.div
          className="flex gap-6 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {duplicatedImages.map((img, i) => (
            <div
              key={`row1-${i}`}
              className="relative flex-shrink-0 w-[480px] h-[320px] rounded-2xl overflow-hidden border border-border-subtle hover:border-accent-cyan/50 transition-all duration-300 group"
            >
              <img
                src={img}
                alt={`Event ${(i % images.length) + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>

        {/* Row 2 - Right to Left */}
        <motion.div
          className="flex gap-6 will-change-transform"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {duplicatedImages.map((img, i) => (
            <div
              key={`row2-${i}`}
              className="relative flex-shrink-0 w-[480px] h-[320px] rounded-2xl overflow-hidden border border-border-subtle hover:border-accent-blue/50 transition-all duration-300 group"
            >
              <img
                src={img}
                alt={`Event ${(i % images.length) + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>

        {/* Row 3 - Left to Right */}
        <motion.div
          className="flex gap-6 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {duplicatedImages.map((img, i) => (
            <div
              key={`row3-${i}`}
              className="relative flex-shrink-0 w-[480px] h-[320px] rounded-2xl overflow-hidden border border-border-subtle hover:border-accent-violet/50 transition-all duration-300 group"
            >
              <img
                src={img}
                alt={`Event ${(i % images.length) + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
