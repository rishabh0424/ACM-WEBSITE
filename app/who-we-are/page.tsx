"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Users, Target, Rocket, Award } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedHeroBackground } from "@/components/ui/animated-hero-background";

export default function WhoWeArePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const images = [
    "/photos/20762853-f930-46f7-84d0-2f23c6e4f373.jpg",
    "/photos/5a075dd4-e8f4-4734-b1f8-b0b1709b2aeb.jpg",
    "/photos/60462c4f-82bb-4ed1-8efa-524485c96a7f.jpg",
    "/photos/683accf2-2b49-427b-95a8-d56ccfb1a276.jpg",
    "/photos/6b525cdc-95f9-444d-a91e-e4c61b1c3710.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto-swipe effect
  useEffect(() => {
    const autoSwipe = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(autoSwipe);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  const values = [
    { icon: Users, title: "Community First", desc: "Building connections that last" },
    { icon: Target, title: "Innovation", desc: "Pushing boundaries in tech" },
    { icon: Rocket, title: "Growth", desc: "Continuous learning journey" },
    { icon: Award, title: "Excellence", desc: "Striving for the best" },
  ];

  // ... rest of your component
  return (
    <div ref={containerRef} className="bg-dark-base min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedHeroBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "linear-gradient(135deg, #0a0e1a 0%, #1a2332 100%)",
          }}
      
        />
        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <motion.button
            onClick={() => router.back()}
            className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-dark-card/80 backdrop-blur-md border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 hover:border-blue-400/50 transition-all"
            whileHover={{ x: -5, scale: 1.05 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <ArrowLeft className="w-5 h-5" />
            BACK
          </motion.button>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 blue-text-gradient mt-16 sm:mt-0"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
          >
            Who We Are
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A community of innovators, creators, and tech enthusiasts shaping the future
          </motion.p>
        </motion.div>

        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-blue-500/20 rounded-lg"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              rotateZ: [0, 360],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </section>

      {/* Ultra Modern Image Slider Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            {/* Ultra Modern Slider with Parallax */}
            <motion.div
              className="relative w-full lg:w-1/2 max-w-3xl"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Main Image Container with Glow */}
              <div className="relative">
                {/* Animated Glow Effect */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black touch-pan-y">
                  {/* Main Image with Advanced Transitions */}
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.2, x: 100, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8, x: -100, filter: "blur(20px)" }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.16, 1, 0.3, 1],
                      scale: { duration: 0.6 },
                      filter: { duration: 0.5 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = offset.x * velocity.x;
                      if (swipe < -10000) {
                        setCurrentImage((prev) => (prev + 1) % images.length);
                      } else if (swipe > 10000) {
                        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
                      }
                    }}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                  >
                    <img
                      src={images[currentImage]}
                      alt={`Gallery ${currentImage + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 mix-blend-overlay" />
                  </motion.div>

                  {/* Sleek Navigation Arrows - Hidden on Mobile */}
                  <motion.button
                    onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hidden md:flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all z-10 group"
                    whileHover={{ scale: 1.1, x: -4 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hidden md:flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all z-10 group"
                    whileHover={{ scale: 1.1, x: 4 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>

                  {/* Modern Counter Badge */}
                  <motion.div 
                    className="absolute top-4 sm:top-6 right-4 sm:right-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white text-xs sm:text-sm font-semibold z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-blue-400">{currentImage + 1}</span>
                    <span className="text-white/50 mx-1">/</span>
                    <span className="text-white/70">{images.length}</span>
                  </motion.div>

                  {/* Swipe Indicator for Mobile */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/70 text-xs z-10 md:hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span>Swipe</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Modern Thumbnail Strip with Parallax */}
              <motion.div 
                className="relative mt-4 sm:mt-6 px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                  {images.map((img, index) => {
                    const isActive = index === currentImage;
                    const distance = Math.abs(index - currentImage);
                    
                    return (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className="relative flex-shrink-0 group snap-center"
                        animate={{
                          scale: isActive ? 1 : 0.85,
                          opacity: isActive ? 1 : 0.5,
                        }}
                        whileHover={{ scale: isActive ? 1.05 : 0.9, opacity: 1 }}
                        whileTap={{ scale: 0.85 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl overflow-hidden ${
                          isActive ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-black" : ""
                        }`}>
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {!isActive && (
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                          )}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 border-2 border-blue-500"
                              layoutId="activeThumbnail"
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="mt-3 sm:mt-4 h-0.5 sm:h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentImage + 1) / images.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Content with Stagger Animation */}
            <motion.div
              className="w-full lg:w-1/2 space-y-6"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.h3 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Building Tomorrow's Tech Leaders
              </motion.h3>
              <motion.p 
                className="text-base sm:text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Since our inception, we've been dedicated to fostering a community where
                innovation thrives and knowledge is shared freely. Our journey has been
                marked by countless workshops, hackathons, and collaborative projects.
              </motion.p>
              <motion.p 
                className="text-base sm:text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                We believe in hands-on learning, mentorship, and creating opportunities
                for every member to grow and excel in their tech journey.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section className="py-32 overflow-hidden">
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-20 text-white px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Core Values
        </motion.h2>

        <div className="flex gap-8 px-8 overflow-x-auto pb-8 scrollbar-hide">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="min-w-[350px] h-[400px] glass-card p-8 relative group"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <value.icon className="w-16 h-16 text-blue-400 mb-6 relative z-10" />
              
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                {value.title}
              </h3>
              
              <p className="text-gray-300 text-lg relative z-10">
                {value.desc}
              </p>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vertical Reveal Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto space-y-32">
          {[
            {
              title: "500+ Active Members",
              desc: "A thriving community of passionate developers, designers, and innovators",
            },
            {
              title: "200+ Events Hosted",
              desc: "From workshops to hackathons, we create opportunities for growth",
            },
            {
              title: "50+ Projects Launched",
              desc: "Real-world solutions built by our talented community members",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-8xl md:text-9xl font-bold text-blue-500/10 absolute -top-20 left-0"
                initial={{ x: -100 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
              >
                0{index + 1}
              </motion.div>
              
              <div className="relative z-10 glass-card p-12">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {stat.title}
                </h3>
                <p className="text-xl text-gray-300">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Be part of something bigger. Join our community today.
          </p>
          <Link href="/#join">
            <motion.button
              className="btn-primary text-lg px-12 py-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Join ACM Now
            </motion.button>
          </Link>
        </motion.div>
      </section>
      </div>
    </div>
  );
}
