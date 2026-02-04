'use client'

import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, Users, Award } from 'lucide-react'
import { useRef } from 'react'
import { ElectricCard } from '@/components/ui/electric-card'

export default function InfuturumPage() {
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
      title: 'Infuturum 2024: Future of AI',
      image: '/photos/c4dd6a71-ce88-42ae-9430-78118975cc27.jpg',
      attendees: 1200,
      workshops: 25,
      speakers: [
        { name: 'Dr. Sarah Chen', role: 'Keynote', bio: 'AI Research Lead at Google, pioneering neural networks.' },
        { name: 'Alex Kumar', role: 'Speaker', bio: 'CTO of TechVision, cloud architecture expert.' },
        { name: 'Maria Rodriguez', role: 'Speaker', bio: 'Blockchain innovator, founder of CryptoFuture.' }
      ]
    },
    {
      year: '2023',
      title: 'Infuturum 2023: Quantum Computing',
      image: '/photos/c73682aa-1f39-40f8-adbb-5549c7f8b064.jpg',
      attendees: 1000,
      workshops: 20,
      speakers: [
        { name: 'Dr. James Wilson', role: 'Keynote', bio: 'Quantum physicist at IBM, quantum computing pioneer.' },
        { name: 'Lisa Zhang', role: 'Speaker', bio: 'Quantum algorithms researcher at Microsoft.' },
        { name: 'Robert Taylor', role: 'Speaker', bio: 'Quantum hardware engineer, quantum supremacy expert.' }
      ]
    },
    {
      year: '2022',
      title: 'Infuturum 2022: Metaverse Era',
      image: '/photos/DSC_0161.JPG',
      attendees: 900,
      workshops: 18,
      speakers: [
        { name: 'Emily Parker', role: 'Keynote', bio: 'VR/AR pioneer at Meta, metaverse architect.' },
        { name: 'David Chen', role: 'Speaker', bio: '3D graphics expert, virtual worlds creator.' },
        { name: 'Sophie Martin', role: 'Speaker', bio: 'Digital fashion designer, metaverse entrepreneur.' }
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
            src="/photos/DSC_0163.JPG"
            alt="Infuturum"
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
            <span className="inline-block px-6 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
              Annual Symposium
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-8xl md:text-9xl font-display font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #F8FAFC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Infuturum
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl text-text-body font-light mb-12"
          >
            Innovation for the Future
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 text-text-muted"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>3 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>1000+ Attendees</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>Campus Wide</span>
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
                About Infuturum
              </h2>
              <p className="text-xl text-text-body leading-relaxed mb-6">
                Infuturum is our flagship annual tech symposium that brings together students, industry leaders, and innovators for three days of learning and networking.
              </p>
              <p className="text-lg text-text-muted leading-relaxed">
                Featuring keynote speeches from tech giants, hands-on workshops, panel discussions, and networking sessions, Infuturum provides a platform to explore emerging technologies and connect with the tech community. It's where ideas meet innovation.
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
                src="/photos/DSC_0179.JPG"
                alt="Infuturum Event"
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
                    <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-6">
                      {event.year}
                    </div>
                    <h3 className="text-4xl font-display font-bold text-white mb-6">
                      {event.title}
                    </h3>
                    <div className="flex gap-8 mb-6">
                      <div>
                        <div className="text-3xl font-bold text-purple-400">{event.attendees}</div>
                        <div className="text-sm text-text-muted">Attendees</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-purple-400">{event.workshops}</div>
                        <div className="text-sm text-text-muted">Workshops</div>
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

      {/* Best Speakers Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-base via-purple-950/20 to-pink-950/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2.5s' }} />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm mb-6">
              <Award className="w-4 h-4" />
              Featured Speakers
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold px-4">
              <span className="gradient-text">Infuturum Speakers</span>
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
                  <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-4">
                    {event.year}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white px-4">
                    {event.title}
                  </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                  {event.speakers.map((speaker, index) => {
                    const colors = ['#8B5CF6', '#A855F7', '#C084FC'];
                    const variants = ['hue', 'swirl', 'hue'] as const;
                    return (
                      <motion.div
                        key={speaker.name}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                      >
                        <ElectricCard
                          variant={variants[index]}
                          color={colors[index]}
                          badge={speaker.role}
                          title={speaker.name}
                          description={speaker.bio}
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
