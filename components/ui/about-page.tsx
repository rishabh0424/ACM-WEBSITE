"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface AboutPageProps {
  achievements?: Array<{ label: string; value: string }>
}

const defaultAchievements = [
  { label: "Active Members", value: "500+" },
  { label: "Projects Completed", value: "150+" },
  { label: "Events Hosted", value: "200+" },
  { label: "Industry Partners", value: "25+" },
]

export default function AboutPage({
  achievements = defaultAchievements,
}: AboutPageProps) {
  return (
    <div className="min-h-screen bg-black text-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            <span className="gradient-text">About ACM</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
            ACM Student Chapter is a passionate community dedicated to advancing computing 
            education and empowering the next generation of technology leaders.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-20">
          <Image
            className="rounded-3xl object-cover w-full h-[300px] md:h-[500px]"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop"
            alt="ACM Student Chapter Community"
            width={1200}
            height={600}
            priority
          />
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-6">
              The ACM <span className="gradient-text">ecosystem</span> brings together students, technology, and innovation.
            </h2>
          </div>
          <div className="space-y-6 text-gray-400">
            <p className="text-lg leading-relaxed">
              ACM Student Chapter is evolving to be more than just a club. We support an entire ecosystem — 
              from workshops to hackathons and platforms helping students and professionals innovate together.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-500 hover:to-cyan-500 text-black font-semibold border-0"
            >
              <Link href="#join" className="inline-flex items-center gap-2">
                <span>Join Our Community</span>
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Large Image */}
          <div className="lg:flex-1">
            <Image
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
              alt="ACM Workshop and Learning"
              className="rounded-2xl object-cover w-full h-[400px] lg:h-full"
              width={800}
              height={600}
            />
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-6 lg:flex-1">
            
            {/* Innovation Hub Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop"
                  alt="Hackathon and Innovation"
                  className="h-full w-full object-cover"
                  width={600}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-400 mb-3">Innovation Hub</h3>
                <p className="text-gray-200 mb-4 leading-relaxed">
                  Our hackathons and workshops drive innovation, creativity, and hands-on learning experiences.
                </p>
                <Button
                  variant="outline"
                  className="border-green-400/50 text-green-400 hover:bg-green-400/10 hover:border-green-300"
                >
                  Explore Events
                </Button>
              </div>
            </motion.div>

            {/* Future Skills Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop"
                  alt="Technology and Development"
                  className="h-full w-full object-cover"
                  width={600}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-green-400 mb-2">Future-Ready Skills</h3>
                <p className="text-gray-100 text-sm font-medium">
                  Building technical expertise in AI, web development, cybersecurity, and emerging technologies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              className="text-center p-6 rounded-2xl bg-gray-900/20 border border-gray-800/50"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl font-bold text-green-400 mb-2">{achievement.value}</div>
              <div className="text-gray-200 font-medium">{achievement.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}