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
  { id: 1, name: 'Senior Core 1', position: 'Tech Lead', image: '/photos/9aeb34e2-359d-4b5f-b127-5a2705ab9f8e.jpg', defaultPos: { x: 0, y: 0, w: 4, h: 4 } },
  { id: 2, name: 'Senior Core 2', position: 'Full Stack Dev', image: '/photos/c4dd6a71-ce88-42ae-9430-78118975cc27.jpg', defaultPos: { x: 4, y: 0, w: 4, h: 4 } },
  { id: 3, name: 'Senior Core 3', position: 'Backend Lead', image: '/photos/c73682aa-1f39-40f8-adbb-5549c7f8b064.jpg', defaultPos: { x: 8, y: 0, w: 4, h: 4 } },
]

const juniorCore = [
  { name: 'Junior Core 1', position: 'Frontend Dev', image: 'https://picsum.photos/150/150?random=33' },
  { name: 'Junior Core 2', position: 'Backend Dev', image: 'https://picsum.photos/150/150?random=34' },
]

export default function TechTeamPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="relative w-full h-screen bg-black">
        <CosmicParallaxBg 
          head="TECH TEAM"
          text="Building the Future"
          loop={true}
        />
        <motion.button
          onClick={() => router.back()}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-semibold">Back</span>
        </motion.button>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Senior Core</h2>
          <p className="text-gray-400 text-lg">Experienced leaders</p>
        </motion.div>

        <div className="mb-20 h-96">
          <DynamicFrameLayout frames={seniorCore} className="" hoverSize={6} gapSize={4} />
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Junior Core</h2>
          <p className="text-gray-400 text-lg">Rising talents</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {juniorCore.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/60 transition-all"
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-400">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 text-center">{member.name}</h3>
              <p className="text-sm text-blue-400 font-semibold text-center">{member.position}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
