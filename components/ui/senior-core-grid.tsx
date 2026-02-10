'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface TeamMember {
  name: string
  position: string
  image: string
}

interface SeniorCoreGridProps {
  members: TeamMember[]
}

export function SeniorCoreGrid({ members }: SeniorCoreGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <motion.div
          key={`${member.name}-${index}`}
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
  )
}
