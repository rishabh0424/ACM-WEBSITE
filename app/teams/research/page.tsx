'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CosmicParallaxBg } from '@/components/ui/parallax-cosmic-background'
import { DynamicFrameLayout } from '@/components/ui/dynamic-frame-layout'

const seniorCore = [
  { id: 1, name: 'Senior Core 1', position: 'Research Head', image: '/photos/6b525cdc-95f9-444d-a91e-e4c61b1c3710.jpg', defaultPos: { x: 0, y: 0, w: 4, h: 4 } },
  { id: 2, name: 'Senior Core 2', position: 'AI Specialist', image: '/photos/9725b0dd-d87c-473d-8982-9ced99f553b7.jpg', defaultPos: { x: 4, y: 0, w: 4, h: 4 } },
  { id: 3, name: 'Senior Core 3', position: 'Data Scientist', image: '/photos/9aeb34e2-359d-4b5f-b127-5a2705ab9f8e.jpg', defaultPos: { x: 8, y: 0, w: 4, h: 4 } },
  { id: 4, name: 'Senior Core 4', position: 'Research Lead', image: '/photos/c4dd6a71-ce88-42ae-9430-78118975cc27.jpg', defaultPos: { x: 0, y: 4, w: 4, h: 4 } },
]

const juniorCore = [
  { name: 'Junior Core 1', position: 'Research Assistant', image: 'https://picsum.photos/150/150?random=23' },
  { name: 'Junior Core 2', position: 'Data Analyst', image: 'https://picsum.photos/150/150?random=24' },
]

export default function ResearchTeamPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="relative w-full h-screen bg-black">
        <CosmicParallaxBg 
          head="RESEARCH TEAM"
          text="Innovation and Discovery"
          loop={true}
        />
        <motion.button
          onClick={() => router.back()}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-all text-xs md:text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={16} />
          <span className="font-semibold hidden sm:inline">Back</span>
        </motion.button>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Senior Core</h2>
          <p className="text-gray-400 text-sm md:text-lg">Experienced leaders</p>
        </motion.div>

        <div className="mb-12 md:mb-20 h-auto md:h-96">
          <DynamicFrameLayout frames={seniorCore} className="" hoverSize={6} gapSize={4} />
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Junior Core</h2>
          <p className="text-gray-400 text-sm md:text-lg">Rising talents</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {juniorCore.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 md:p-6 hover:border-blue-400/60 transition-all"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-2 border-blue-400">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-base md:text-lg font-bold text-white mb-1 text-center">{member.name}</h3>
              <p className="text-xs md:text-sm text-blue-400 font-semibold text-center">{member.position}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
