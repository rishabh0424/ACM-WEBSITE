import { Variants } from 'framer-motion'

// Optimized easing curves
export const easing = [0.25, 0.46, 0.45, 0.94] // easeOutQuart
export const springConfig = { type: "spring", stiffness: 100, damping: 20 }

// Simplified section animations
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: easing 
    }
  }
}

export const fadeUpDelayed: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: easing,
      delay: 0.2
    }
  }
}

// Optimized stagger animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Simplified card animations
export const cardVariant: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: easing 
    }
  }
}

// Simple text reveal
export const textReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: easing 
    }
  }
}

// Minimal parallax
export const parallaxSlow: Variants = {
  hidden: { y: 0 },
  visible: { 
    y: -10,
    transition: { 
      duration: 0.8, 
      ease: easing 
    }
  }
}

// Optimized hover states
export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 }
}

export const hoverGlow = {
  boxShadow: "0 10px 25px rgba(0, 212, 255, 0.15)",
  transition: { duration: 0.2 }
}

// Optimized viewport settings
export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: "-50px"
}