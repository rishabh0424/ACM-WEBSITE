'use client'

import { motion } from "framer-motion"
import { forwardRef, ReactNode } from "react"

interface TimelineContentProps {
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  animationNum: number
  timelineRef: React.RefObject<HTMLElement>
  customVariants?: any
  className?: string
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

const TimelineContent = forwardRef<HTMLElement, TimelineContentProps>(
  ({ children, as = "div", animationNum, customVariants, className, ...props }, ref) => {
    const Component = motion[as as keyof typeof motion] as any

    const defaultVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
        },
      }),
    }

    return (
      <Component
        ref={ref}
        custom={animationNum}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={customVariants || defaultVariants}
        className={className}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

TimelineContent.displayName = "TimelineContent"

export { TimelineContent }