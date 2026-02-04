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

  const [currentImage, setCurrentImage] = useState(0);

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
  }, []);

  const images = [
    "/photos/20762853-f930-46f7-84d0-2f23c6e4f373.jpg",
    "/photos/5a075dd4-e8f4-4734-b1f8-b0b1709b2aeb.jpg",
    "/photos/60462c4f-82bb-4ed1-8efa-524485c96a7f.jpg",
    "/photos/683accf2-2b49-427b-95a8-d56ccfb1a276.jpg",
    "/photos/6b525cdc-95f9-444d-a91e-e4c61b1c3710.jpg",
  ];

  const values = [
    { icon: Users, title: "Community First", desc: "Building connections that last" },
    { icon: Target, title: "Innovation", desc: "Pushing boundaries in tech" },
    { icon: Rocket, title: "Growth", desc: "Continuous learning journey" },
    { icon: Award, title: "Excellence", desc: "Striving for the best" },
  ];

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
            className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-dark-card/80 backdrop-blur-md border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 hover:border-blue-400/50 transition-all"
            whileHover={{ x: -5, scale: 1.05 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>

          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-6 blue-text-gradient"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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

      {/* 3D Rotating Album Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-32 text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.h2>

          <div className="flex flex-col md:flex-row items-start justify-center gap-20">
            {/* 3D Rotating Album */}
            <motion.div
              className="relative w-full md:w-1/2 max-w-md h-[350px] md:h-[400px] flex-shrink-0"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div 
                className="relative w-full h-full flex items-center justify-center"
                style={{ 
                  perspective: "1500px",
                  transformStyle: "preserve-3d"
                }}
              >
                {images.map((img, index) => {
                  const angle = (360 / images.length) * (index - currentImage);
                  const isActive = index === currentImage;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute w-full h-full cursor-pointer"
                      initial={false}
                      animate={{
                        rotateY: angle,
                        scale: isActive ? 1 : 0.65,
                        opacity: isActive ? 1 : 0.3,
                        zIndex: isActive ? 10 : 1,
                      }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                      onClick={() => setCurrentImage(index)}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-500/30 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${img})`,
                          transform: "translateZ(280px)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation Dots */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImage
                        ? "bg-blue-500 w-8"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="w-full md:w-1/2 space-y-6 mt-16 md:mt-0"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-white mb-4">
                Building Tomorrow's Tech Leaders
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Since our inception, we've been dedicated to fostering a community where
                innovation thrives and knowledge is shared freely. Our journey has been
                marked by countless workshops, hackathons, and collaborative projects.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We believe in hands-on learning, mentorship, and creating opportunities
                for every member to grow and excel in their tech journey.
              </p>
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
