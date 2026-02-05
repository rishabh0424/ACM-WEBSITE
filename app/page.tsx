'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LightningText from '@/components/ui/lightning-text'
import IntroAnimation from '@/components/IntroAnimation'
import LiveBackground from '@/components/LiveBackground'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'
import Navbar from '@/components/Navbar'
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import { DomainsSection } from '@/components/ui/domains-section'
import AboutSection3 from '@/components/ui/about-section'
import TeamSection from '@/components/sections/TeamSection'
import EventsSection from '@/components/sections/EventsSection'
import JoinSection from '@/components/sections/JoinSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [showLightning, setShowLightning] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [introComplete, setIntroComplete] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const hasSeenIntro = localStorage.getItem('acm-intro-seen')
    if (hasSeenIntro) {
      return
    }
    
    setIntroComplete(false)
    setShowLightning(true)
    const timer = setTimeout(() => {
      setShowLightning(false)
      setShowIntro(true)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setIntroComplete(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('acm-intro-seen', 'true')
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      {showLightning && <LightningText onSkip={() => setShowLightning(false)} />}
      
      {introComplete && (
        <>
          <LiveBackground />
          <AnimatedShaderBackground />
        </>
      )}
      
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {introComplete && (
        <div className="relative z-10">
          <Navbar />
          <main className="space-y-0">
            <section id="hero" className="min-h-screen">
              <ParticleTextEffect words={["WELCOME TO", "ACM FAMILY", "INNOVATE", "CREATE", "INSPIRE"]} />
            </section>
            <section id="why-choose-us" className="h-screen">
              <WhyChooseUsSection />
            </section>
            <section id="about" className="min-h-screen">
              <AboutSection3 />
            </section>
            <section id="domains" className="min-h-screen bg-transparent">
              <DomainsSection />
            </section>
            <section id="team" className="min-h-screen bg-transparent relative z-20">
              <TeamSection />
            </section>
            <section id="events" className="bg-transparent">
              <EventsSection />
            </section>
            <section id="join" className="min-h-screen">
              <JoinSection />
            </section>
          </main>
          <Footer />
        </div>
      )}
    </div>
  )
}