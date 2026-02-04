"use client";

import { Brain, Code, Shield, Smartphone, Database, Cpu } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function DomainsSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <motion.section 
      className="min-h-screen py-20 bg-transparent flex items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Domains</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore cutting-edge technology domains where ACM members innovate and excel
          </p>
        </motion.div>

        <motion.ul 
          className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"
          variants={containerVariants}
        >
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Brain className="h-4 w-4" />}
            title="Artificial Intelligence"
            description="Machine learning, deep learning, and AI research driving the future of technology."
            variants={itemVariants}
          />
          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Code className="h-4 w-4" />}
            title="Web Development"
            description="Full-stack development with modern frameworks, creating scalable web applications."
            variants={itemVariants}
          />
          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Shield className="h-4 w-4" />}
            title="Cybersecurity"
            description="Protecting digital assets and building secure systems for the modern world."
            variants={itemVariants}
          />
          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Smartphone className="h-4 w-4" />}
            title="Mobile Development"
            description="Native and cross-platform mobile apps for iOS and Android ecosystems."
            variants={itemVariants}
          />
          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Database className="h-4 w-4" />}
            title="Data Science"
            description="Big data analytics, visualization, and insights for data-driven decisions."
            variants={itemVariants}
          />
        </motion.ul>
      </div>
    </motion.section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  variants: any;
}

const GridItem = ({ area, icon, title, description, variants }: GridItemProps) => {
  return (
    <motion.li className={cn("min-h-[14rem] list-none", area)} variants={variants}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-800 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-gray-900/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-gray-700 bg-gray-800/50 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};
