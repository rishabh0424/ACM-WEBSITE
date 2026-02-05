'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Github, Linkedin, Twitter, Mail, Crown } from 'lucide-react'
import Image from 'next/image'
import { 
  fadeUp, 
  fadeUpDelayed, 
  staggerContainer, 
  cardVariant, 
  textReveal,
  parallaxSlow,
  hoverLift,
  hoverGlow,
  viewportConfig 
} from '@/lib/animations'
import { TeamOdyssey } from '@/components/ui/team-odyssey'
import KineticTeamHybrid from '@/components/ui/kinetic-team-hybrid'

interface OfficeMember {
  id: string
  name: string
  position: string
  image: string
  bio?: string
  social: {
    linkedin?: string
    github?: string
    twitter?: string
    email?: string
  }
}

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio?: string
  detailedInfo?: string
  responsibilities?: string[]
  lightningHue: number
  seniorCore: {
    name: string
    position: string
    image: string
  }[]
  juniorCore: {
    name: string
    position: string
    image: string
  }[]
  social: {
    linkedin?: string
    github?: string
    twitter?: string
    email?: string
  }
}

const officeMembers: OfficeMember[] = [
  {
    id: '01',
    name: 'Rajyavardhan',
    position: 'President',
    image: '/office-bearers/RAJYAVARDHAN.png',
    bio: 'Leading ACM chapter with vision and innovation',
    social: {
      linkedin: 'https://linkedin.com/in/rajyavardhan',
      github: 'https://github.com/rajyavardhan',
      email: 'president@acm.org'
    }
  },
  {
    id: '02',
    name: 'Tamanna Arora',
    position: 'Vice President',
    image: '/office-bearers/TAMANNA.png',
    bio: 'Supporting leadership and strategic initiatives',
    social: {
      linkedin: 'https://linkedin.com/in/tamannaarora',
      twitter: 'https://twitter.com/tamannaarora',
      email: 'vicepresident@acm.org'
    }
  },
  {
    id: '03',
    name: 'Ayush Swamy',
    position: 'Secretary',
    image: '/office-bearers/AYUSH.png',
    bio: 'Managing operations and communications',
    social: {
      linkedin: 'https://linkedin.com/in/ayushswamy',
      github: 'https://github.com/ayushswamy',
      email: 'secretary@acm.org'
    }
  },
  {
    id: '04',
    name: 'Bhakti',
    position: 'Treasurer',
    image: '/office-bearers/BHAKTI.png',
    bio: 'Overseeing financial planning and resources',
    social: {
      linkedin: 'https://linkedin.com/in/bhakti',
      email: 'treasurer@acm.org'
    }
  },
  {
    id: '05',
    name: 'Aditya Agrawal',
    position: 'Webmaster',
    image: '/office-bearers/ADITYA.png',
    bio: 'Managing digital presence and technology',
    social: {
      linkedin: 'https://linkedin.com/in/adityaagrawal',
      github: 'https://github.com/adityaagrawal',
      twitter: 'https://twitter.com/adityaagrawal',
      email: 'webmaster@acm.org'
    }
  }
]

const kineticMembers = officeMembers.map(m => ({
  id: m.id,
  name: m.name,
  role: m.position,
  image: m.image,
  instagram: m.id === '01' ? 'https://www.instagram.com/_rajyavardhan_rathore_/' :
             m.id === '02' ? 'https://www.instagram.com/tamanna_arora54' :
             m.id === '03' ? 'https://www.instagram.com/ayush_swamy' :
             m.id === '04' ? 'https://www.instagram.com/bhakttiix' :
             m.id === '05' ? 'https://www.instagram.com/__.aditya_agrawal' : undefined
}))

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'We are',
    role: 'PR TEAM',
    image: 'https://picsum.photos/150/150?random=1',
    bio: 'Leading innovation in AI and machine learning research',
    detailedInfo: 'The PR Team manages all public relations and communications for ACM.',
    lightningHue: 200,
    seniorCore: [
      { name: 'Senior Core 1', position: 'PR Lead', image: 'https://picsum.photos/150/150?random=11' },
      { name: 'Senior Core 2', position: 'Media Manager', image: 'https://picsum.photos/150/150?random=12' },
    ],
    juniorCore: [
      { name: 'Junior Core 1', position: 'Content Writer', image: 'https://picsum.photos/150/150?random=13' },
      { name: 'Junior Core 2', position: 'Social Media', image: 'https://picsum.photos/150/150?random=14' },
    ],
    social: {
      linkedin: 'https://linkedin.com/in/alexchen',
      github: 'https://github.com/alexchen',
      twitter: 'https://twitter.com/alexchen',
      email: 'alex@acm.org'
    }
  },
  {
    id: '2',
    name: 'We are',
    role: 'Research',
    image: 'https://picsum.photos/150/150?random=2',
    bio: 'Full-stack developer passionate about web technologies',
    detailedInfo: 'The Research Team explores cutting-edge technologies.',
    lightningHue: 270,
    seniorCore: [
      { name: 'Senior Core 1', position: 'Research Head', image: 'https://picsum.photos/150/150?random=21' },
      { name: 'Senior Core 2', position: 'AI Specialist', image: 'https://picsum.photos/150/150?random=22' },
    ],
    juniorCore: [
      { name: 'Junior Core 1', position: 'Research Assistant', image: 'https://picsum.photos/150/150?random=23' },
      { name: 'Junior Core 2', position: 'Data Analyst', image: 'https://picsum.photos/150/150?random=24' },
    ],
    social: {
      linkedin: 'https://linkedin.com/in/sarahrodriguez',
      github: 'https://github.com/sarahrodriguez',
      email: 'sarah@acm.org'
    }
  },
  {
    id: '3',
    name: 'We are',
    role: 'Tech',
    image: 'https://picsum.photos/150/150?random=3',
    bio: 'Cybersecurity expert and competitive programming champion',
    detailedInfo: 'The Tech Team builds and maintains all technical infrastructure.',
    lightningHue: 180,
    seniorCore: [
      { name: 'Senior Core 1', position: 'Tech Lead', image: 'https://picsum.photos/150/150?random=31' },
      { name: 'Senior Core 2', position: 'Full Stack Dev', image: 'https://picsum.photos/150/150?random=32' },
    ],
    juniorCore: [
      { name: 'Junior Core 1', position: 'Frontend Dev', image: 'https://picsum.photos/150/150?random=33' },
      { name: 'Junior Core 2', position: 'Backend Dev', image: 'https://picsum.photos/150/150?random=34' },
    ],
    social: {
      linkedin: 'https://linkedin.com/in/marcusjohnson',
      github: 'https://github.com/marcusjohnson',
      twitter: 'https://twitter.com/marcusjohnson'
    }
  },
  {
    id: '4',
    name: 'We are',
    role: 'Design',
    image: 'https://picsum.photos/150/150?random=4',
    bio: 'UI/UX designer creating intuitive digital experiences',
    detailedInfo: 'The Design Team crafts beautiful and functional experiences.',
    lightningHue: 320,
    seniorCore: [
      { name: 'Senior Core 1', position: 'Design Lead', image: 'https://picsum.photos/150/150?random=41' },
      { name: 'Senior Core 2', position: 'UI Designer', image: 'https://picsum.photos/150/150?random=42' },
    ],
    juniorCore: [
      { name: 'Junior Core 1', position: 'UX Designer', image: 'https://picsum.photos/150/150?random=43' },
      { name: 'Junior Core 2', position: 'Graphic Designer', image: 'https://picsum.photos/150/150?random=44' },
    ],
    social: {
      linkedin: 'https://linkedin.com/in/emilyzhang',
      github: 'https://github.com/emilyzhang',
      email: 'emily@acm.org'
    }
  },
  {
    id: '5',
    name: 'We are',
    role: 'Management',
    image: 'https://picsum.photos/150/150?random=5',
    bio: 'Building community through workshops and tech talks',
    detailedInfo: 'The Management Team ensures smooth operations and strategic planning.',
    lightningHue: 140,
    seniorCore: [
      { name: 'Senior Core 1', position: 'Manager', image: 'https://picsum.photos/150/150?random=51' },
      { name: 'Senior Core 2', position: 'Operations Lead', image: 'https://picsum.photos/150/150?random=52' },
    ],
    juniorCore: [
      { name: 'Junior Core 1', position: 'Coordinator', image: 'https://picsum.photos/150/150?random=53' },
      { name: 'Junior Core 2', position: 'Assistant', image: 'https://picsum.photos/150/150?random=54' },
    ],
    social: {
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/davidkim',
      email: 'david@acm.org'
    }
  },
  {
    id: '6',
    name: 'We are',
    role: 'Social Media',
    image: 'https://picsum.photos/150/150?random=6',
    bio: 'Data scientist exploring the frontiers of machine learning',
    detailedInfo: 'The Social Media Team manages our online presence.',
    lightningHue: 40,
    seniorCore: [
      { name: 'Senior Core 1', position: 'Social Media Lead', image: 'https://picsum.photos/150/150?random=61' },
      { name: 'Senior Core 2', position: 'Content Creator', image: 'https://picsum.photos/150/150?random=62' },
    ],
    juniorCore: [
      { name: 'Junior Core 1', position: 'Community Manager', image: 'https://picsum.photos/150/150?random=63' },
      { name: 'Junior Core 2', position: 'Engagement Specialist', image: 'https://picsum.photos/150/150?random=64' },
    ],
    social: {
      linkedin: 'https://linkedin.com/in/priyapatel',
      github: 'https://github.com/priyapatel',
      email: 'priya@acm.org'
    }
  }
]

const TeamCard = ({ member, index, onClick }: { member: TeamMember; index: number; onClick: () => void }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    email: Mail
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-pointer"
      variants={cardVariant}
      viewport={viewportConfig}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="relative p-6 md:p-10 rounded-3xl backdrop-blur-md bg-gray-900/20 border border-gray-800/50 hover:border-blue-500/60 transition-all duration-500 h-full overflow-hidden"
        whileHover={{ 
          scale: 1.02,
          rotateY: 5,
          rotateX: 5,
          z: 50
        }}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {/* Animated Lightning Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />

        {/* Electric Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)',
              '0 0 40px rgba(96, 165, 250, 0.4), inset 0 0 30px rgba(96, 165, 250, 0.2)',
              '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Thunder Particles - Desktop Only */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 hidden md:block"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              y: [0, 100],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Profile Image */}
        <div className="relative mb-6 flex justify-center">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glowing Ring */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 p-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-full h-full rounded-full bg-black" />
            </div>
            
            {/* Profile Picture */}
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-transparent">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80px, 112px"
              />
            </div>
          </motion.div>
        </div>

        {/* Member Info */}
        <div className="text-center mb-4 md:mb-6">
          <motion.h3 
            className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-blue-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {member.name}
          </motion.h3>
          <p className="text-blue-400 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">
            {member.role}
          </p>
          {member.bio && (
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">
              {member.bio}
            </p>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-3 md:space-x-4">
          {Object.entries(member.social).map(([platform, url]) => {
            const IconComponent = socialIcons[platform as keyof typeof socialIcons]
            if (!IconComponent || !url) return null

            return (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-900/50 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400/60 hover:bg-blue-400/10 transition-all duration-300"
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={`${member.name}'s ${platform}`}
              >
                <IconComponent size={14} className="md:w-4 md:h-4" />
              </motion.a>
            )
          })}
        </div>

        {/* 3D Depth Overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            transform: 'translateZ(10px)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function TeamSection() {
  const ref = useRef(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // Floating particles with parallax
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
  }))

  return (
    <>
    <motion.section 
      id="team" 
      className="py-8 md:py-20 bg-transparent relative overflow-visible min-h-screen" 
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={fadeUp}
    >
      {/* Animated Background Particles */}
      <motion.div variants={parallaxSlow} className="hidden md:block">
        {particles.slice(0, 6).map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-neon-blue/10"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight px-4"
            variants={textReveal}
          >
            <span className="text-gray-100">Meet Our </span>
            <motion.span
              className="gradient-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Team
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="text-base md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light px-4"
            variants={fadeUpDelayed}
          >
            Passionate leaders driving innovation and building the future of tech. 
            Meet the visionaries behind our thriving ACM community.
          </motion.p>
        </motion.div>

        {/* Office Bearers Section */}
        <div className="w-full overflow-hidden">
          <KineticTeamHybrid members={kineticMembers} title="Leadership" subtitle="Office Bearers '24" />
        </div>

        {/* Divider */}
        <motion.div
          className="relative h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-16 md:mb-20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Team Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Core Team</h3>
          <p className="text-sm md:text-base text-gray-400">Dedicated teams working across different domains</p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} onClick={() => setSelectedMember(member)} />
          ))}
        </motion.div>

        {/* Join Team CTA */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUpDelayed}
        >
          <motion.button
            className="px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold text-base md:text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            whileHover={{ 
              ...hoverLift,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Leadership Team
          </motion.button>
        </motion.div>
      </div>
    </motion.section>

    {/* Team Detail Modal */}
    <AnimatePresence>
      {selectedMember && (
        <TeamOdyssey
          teamName={selectedMember.role}
          teamDescription={selectedMember.detailedInfo || ''}
          lightningHue={selectedMember.lightningHue}
          seniorCore={selectedMember.seniorCore}
          juniorCore={selectedMember.juniorCore}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </AnimatePresence>
    </>
  )
}