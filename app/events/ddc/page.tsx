'use client'

import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, Users, Trophy } from 'lucide-react'
import { useRef } from 'react'
import { ElectricCard } from '@/components/ui/electric-card'

export default function DDCPage() {
  const router = useRouter()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const pastEvents = [
    {
      year: '2024',
      title: 'DDC 2024: AI Revolution',
      image: '/photos/60462c4f-82bb-4ed1-8efa-524485c96a7f.jpg',
      participants: 500,
      projects: 120,
      winners: [
        { place: '1st', team: 'Team Alpha', project: 'AI-powered healthcare solution revolutionizing patient care.' },
        { place: '2nd', team: 'Team Beta', project: 'Blockchain supply chain management ensuring transparency.' },
        { place: '3rd', team: 'Team Gamma', project: 'Smart city IoT platform for sustainable living.' }
      ]
    },
    {
      year: '2023',
      title: 'DDC 2023: Web3 Future',
      image: '/photos/683accf2-2b49-427b-95a8-d56ccfb1a276.jpg',
      participants: 450,
      projects: 100,
      winners: [
        { place: '1st', team: 'Team Delta', project: 'Decentralized social media platform with privacy focus.' },
        { place: '2nd', team: 'Team Epsilon', project: 'NFT marketplace for digital artists and creators.' },
        { place: '3rd', team: 'Team Zeta', project: 'Web3 gaming platform with play-to-earn mechanics.' }
      ]
    },
    {
      year: '2022',
      title: 'DDC 2022: Cloud Native',
      image: '/photos/6b525cdc-95f9-444d-a91e-e4c61b1c3710.jpg',
      participants: 400,
      projects: 85,
      winners: [
        { place: '1st', team: 'Team Eta', project: 'Serverless microservices architecture for e-commerce.' },
        { place: '2nd', team: 'Team Theta', project: 'Container orchestration platform for DevOps teams.' },
        { place: '3rd', team: 'Team Iota', project: 'Cloud-native monitoring and analytics dashboard.' }
      ]
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-dark-base text-white">
      {/* Back Button */}
      <motion.button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
      </motion.button>

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/photos/9725b0dd-d87c-473d-8982-9ced99f553b7.jpg"
            alt="DDC"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-base/80 via-dark-base/60 to-dark-base" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
              Flagship Event
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-8xl md:text-9xl font-display font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #22D3EE, #F8FAFC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DDC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl text-text-body font-light mb-12"
          >
            Design & Development Challenge
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 text-text-muted"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>48 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>500+ Participants</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>Hybrid Event</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-5xl font-display font-bold mb-6 text-white">
                About DDC
              </h2>
              <p className="text-xl text-text-body leading-relaxed mb-6">
                The Design & Development Challenge is our premier 48-hour hackathon that brings together the brightest minds in technology to solve real-world problems.
              </p>
              <p className="text-lg text-text-muted leading-relaxed">
                Participants work in teams to design, develop, and pitch innovative solutions across various domains including AI, Web Development, Mobile Apps, and IoT. With mentorship from industry experts and exciting prizes, DDC has become the most anticipated tech event of the year.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 rounded-3xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/photos/9aeb34e2-359d-4b5f-b127-5a2705ab9f8e.jpg"
                alt="DDC Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Past Events */}
      <section className="relative py-32 px-6 bg-dark-elevated/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-display font-bold text-center mb-20"
          >
            <span className="gradient-text">Past Events</span>
          </motion.h2>

          <div className="space-y-32">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <motion.div
                    className={`${index % 2 === 1 ? 'md:order-2' : ''}`}
                    whileHover={{ x: index % 2 === 1 ? 10 : -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold mb-6">
                      {event.year}
                    </div>
                    <h3 className="text-4xl font-display font-bold text-white mb-6">
                      {event.title}
                    </h3>
                    <div className="flex gap-8 mb-6">
                      <div>
                        <div className="text-3xl font-bold text-cyan-400">{event.participants}</div>
                        <div className="text-sm text-text-muted">Participants</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-cyan-400">{event.projects}</div>
                        <div className="text-sm text-text-muted">Projects</div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className={`relative h-96 rounded-3xl overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}
                    initial={{ opacity: 0, scale: 0.8, rotateY: index % 2 === 1 ? -15 : 15 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.05, rotateY: index % 2 === 1 ? -5 : 5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Winners Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-base via-cyan-950/20 to-yellow-950/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm mb-6">
              <Trophy className="w-4 h-4" />
              Champions
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold px-4">
              <span className="gradient-text">DDC Winners</span>
            </h2>
          </motion.div>

          <div className="space-y-32">
            {pastEvents.map((event, eventIndex) => (
              <div key={event.year}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold mb-4">
                    {event.year}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white px-4">
                    {event.title}
                  </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                  {event.winners.map((winner, index) => {
                    const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
                    const variants = ['swirl', 'hue', 'swirl'] as const;
                    return (
                      <motion.div
                        key={winner.team}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                      >
                        <ElectricCard
                          variant={variants[index]}
                          color={colors[index]}
                          badge={winner.place + ' Place'}
                          title={winner.team}
                          description={winner.project}
                          width="18rem"
                          aspectRatio="3 / 4"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
