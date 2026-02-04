"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Award, Lightbulb } from "lucide-react";
import {
  staggerContainer,
  cardVariant,
  textReveal,
  viewportConfig,
} from "@/lib/animations";
import { HorizontalMarquee } from "@/components/ui/horizontal-marquee";

const EventsSection = () => {
  // ACM event images - using local photos
  const eventImages = [
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
  ];

  const stats = [
    { icon: Calendar, label: "Annual Events", value: "50+" },
    { icon: Users, label: "Participants", value: "1000+" },
    { icon: Award, label: "Hackathons", value: "12+" },
    { icon: Lightbulb, label: "Workshops", value: "30+" },
  ];

  return (
    <section id="events" className="relative overflow-hidden bg-transparent">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-transparent" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-display font-bold mb-6"
            variants={textReveal}
          >
            <span className="gradient-text">Events & Workshops</span>
          </motion.h2>
          <motion.p
            className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
            variants={textReveal}
          >
            Explore our vibrant community through hackathons, workshops, and
            tech talks that shape the future of computing.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="glass-card p-6 text-center hover:border-accent-blue/40 transition-all duration-300"
                variants={cardVariant}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-accent-cyan" />
                <div className="text-3xl font-display font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Horizontal Marquee - Full Screen */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <HorizontalMarquee images={eventImages} />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={cardVariant}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/events'}
          >
            View All Events
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
