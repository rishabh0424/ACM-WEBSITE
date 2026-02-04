"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  if (!images || images.length === 0) {
    return <div className="text-white text-center p-8">No images provided</div>;
  }

  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });
  
  return (
    <div
      className={cn(
        "w-full h-screen overflow-hidden relative",
        className,
      )}
      style={{ 
        perspective: "1800px",
        backgroundColor: "#000000"
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          style={{
            width: "2800px",
            height: "2800px",
            position: "relative",
          }}
        >
          <div
            style={{
              transform: "rotateX(50deg) rotateZ(-45deg)",
              transformStyle: "preserve-3d",
              position: "absolute",
              top: "25%",
              left: "65%",
              width: "100%",
              height: "100%",
            }}
            className="grid grid-cols-4 gap-12"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ 
                  y: colIndex % 2 === 0 ? [0, 120, 0] : [0, -120, 0]
                }}
                transition={{
                  duration: colIndex % 2 === 0 ? 16 : 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                key={`marquee-col-${colIndex}`}
                className="flex flex-col gap-8"
              >
                {subarray.map((image, imageIndex) => (
                  <motion.div
                    key={`img-${colIndex}-${imageIndex}`}
                    whileHover={{ 
                      scale: 1.08,
                      z: 60,
                      transition: { duration: 0.3 }
                    }}
                    className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-gray-800/50"
                    style={{
                      width: "100%",
                      height: "420px",
                      backgroundColor: "#1a1a1a",
                    }}
                  >
                    <img
                      src={image}
                      alt={`Event ${colIndex * chunkSize + imageIndex + 1}`}
                      className="w-full h-full object-cover"
                      style={{
                        display: "block",
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
