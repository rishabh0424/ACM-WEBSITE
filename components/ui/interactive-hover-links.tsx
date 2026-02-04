'use client'

import { motion } from "framer-motion";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface InteractiveHoverLinksProps {
  links?: typeof INTERACTIVE_LINKS;
}

export function InteractiveHoverLinks({ links = INTERACTIVE_LINKS }: InteractiveHoverLinksProps) {
  return (
    <section className="py-24 px-4 md:px-8 md:py-32 w-full bg-zinc-950">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-light text-zinc-400 tracking-wide mb-4">Navigation</h2>
          <div className="w-12 h-px bg-zinc-700 mx-auto"></div>
        </div>
        {links.map((link, _index) => (
          <Link key={link.heading} {...link} />
        ))}
      </div>
    </section>
  );
}

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
}

function Link({ heading, imgSrc, subheading, href }: LinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  return (
    <motion.a
      href={href}
      ref={ref}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-zinc-800 py-8 transition-all duration-300 hover:border-zinc-600 md:py-12"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-light text-zinc-400 transition-colors duration-300 group-hover:text-zinc-50 md:text-7xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-sm text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300 font-light tracking-wide">
          {subheading}
        </span>
      </div>

      <motion.img
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover shadow-lg md:h-48 md:w-64 right-20 top-1/2 -translate-y-1/2"
        alt={`Image representing ${heading}`}
      />
      <div className="overflow-hidden">
        <motion.div
          variants={{
            initial: {
              x: "100%",
              opacity: 0,
            },
            whileHover: {
              x: "0%",
              opacity: 1,
            },
          }}
          transition={{ type: "spring" }}
          className="relative z-10 p-4"
        >
          <ArrowRight className="size-6 text-zinc-50 md:size-8" />
        </motion.div>
      </div>
    </motion.a>
  );
}

export const INTERACTIVE_LINKS = [
  {
    heading: "About",
    subheading: "Learn about our ACM chapter",
    imgSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    href: "#about",
  },
  {
    heading: "Domains",
    subheading: "Explore our technical focus areas",
    imgSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    href: "#domains",
  },
  {
    heading: "Team",
    subheading: "Meet our amazing members",
    imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    href: "#team",
  },
  {
    heading: "Events",
    subheading: "Join our workshops and activities",
    imgSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    href: "#events",
  },
  {
    heading: "Join",
    subheading: "Become part of our community",
    imgSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    href: "#join",
  },
];