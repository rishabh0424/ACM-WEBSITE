'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Users, ArrowRight } from 'lucide-react'

export default function EventsPage() {
  const router = useRouter()

  const events = [
    {
      id: 'ddc',
      title: 'DDC',
      fullTitle: 'Design & Development Challenge',
      description: '48-hour hackathon bringing together the brightest minds to solve real-world problems',
      image: '/photos/20762853-f930-46f7-84d0-2f23c6e4f373.jpg',
      color: 'cyan',
      participants: '500+',
      duration: '48 Hours'
    },
    {
      id: 'infuturum',
      title: 'Infuturum',
      fullTitle: 'Innovation for the Future',
      description: 'Annual tech symposium featuring keynotes, workshops, and networking with industry leaders',
      image: '/photos/5a075dd4-e8f4-4734-b1f8-b0b1709b2aeb.jpg',
      color: 'purple',
      participants: '1000+',
      duration: '3 Days'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-base text-white">
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
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-display font-bold mb-6 gradient-text"
          >
            Our Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-text-muted max-w-3xl mx-auto"
          >
            Explore our flagship events that bring together innovation, learning, and community
          </motion.p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onClick={() => router.push(`/events/${event.id}`)}
                className="group relative h-[600px] rounded-3xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                {/* Background Image */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/80 to-transparent`} />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  <motion.div
                    className={`inline-block self-start px-4 py-2 rounded-full mb-4 ${
                      event.color === 'cyan' 
                        ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-400' 
                        : 'bg-purple-500/20 border border-purple-500/30 text-purple-400'
                    }`}
                  >
                    <span className="text-sm font-semibold tracking-wider uppercase">
                      Flagship Event
                    </span>
                  </motion.div>

                  <h2 className="text-6xl font-display font-bold mb-4 text-white">
                    {event.title}
                  </h2>
                  <p className="text-xl text-text-muted mb-4">{event.fullTitle}</p>
                  <p className="text-text-body mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-6 mb-6 text-text-muted">
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-5 h-5 ${event.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} />
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className={`w-5 h-5 ${event.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} />
                      <span>{event.participants}</span>
                    </div>
                  </div>

                  <motion.div
                    className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
