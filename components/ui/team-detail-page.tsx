'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CosmicParallaxBg } from '@/components/ui/parallax-cosmic-background'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

interface TeamDetailPageProps {
  teamName: string
  teamRole: string
  seniorCore: Array<{ name: string; position: string; image: string }>
  juniorCore: Array<{ name: string; position: string; image: string }>
}

export default function TeamDetailPage({
  teamName,
  teamRole,
  seniorCore,
  juniorCore,
}: TeamDetailPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section with Cosmic Background */}
      <div className="relative w-full h-screen overflow-hidden">
        <CosmicParallaxBg 
          head={teamName}
          text={teamRole}
          loop={true}
          className="w-full h-full"
        />
      </div>

      {/* Senior Core Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Senior Core
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seniorCore.map((member, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-blue-400">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-semibold">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Junior Core Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Junior Core
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {juniorCore.map((member, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-400">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm font-semibold">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
