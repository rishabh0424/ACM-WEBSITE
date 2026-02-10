'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Frame {
  id: number
  image: string
  defaultPos: { x: number; y: number; w: number; h: number }
  name: string
  position: string
}

interface FrameComponentProps {
  image: string
  width: number | string
  height: number | string
  className?: string
  showFrame: boolean
  isHovered: boolean
  name: string
  position: string
}

function FrameComponent({
  image,
  width,
  height,
  className = '',
  showFrame,
  isHovered,
  name,
  position,
}: FrameComponentProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out',
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-blue-400 font-semibold">{position}</p>
        </div>
      </div>
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({
  frames: initialFrames,
  className,
  showFrames = false,
  hoverSize = 6,
  gapSize = 4,
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const getRowSizes = () => {
    if (isMobile) return '1fr'
    if (hovered === null) return '1fr 1fr'
    const { row } = hovered
    return row === 0 ? '2fr 1fr' : '1fr 2fr'
  }

  const getColSizes = () => {
    if (isMobile) return '1fr'
    if (hovered === null) return '1fr 1fr 1fr 1fr'
    const { col } = hovered
    const sizes = [0, 1, 2, 3].map((c) => (c === col ? '2fr' : '1fr'))
    return sizes.join(' ')
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? 'top' : 'bottom'
    const horizontal = x <= 4 ? 'left' : x <= 8 ? 'center' : 'right'
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        display: 'grid',
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: 'grid-template-rows 0.4s ease, grid-template-columns 0.4s ease',
      }}
    >
      {frames.map((frame) => {
        const row = frame.defaultPos.y === 0 ? 0 : 1
        const col = Math.floor(frame.defaultPos.x / 4)
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

        return (
          <motion.div
            key={frame.id}
            className="relative"
            style={{
              transformOrigin,
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={() => !isMobile && setHovered({ row, col })}
            onMouseLeave={() => !isMobile && setHovered(null)}
          >
            <FrameComponent
              image={frame.image}
              width="100%"
              height="100%"
              className="absolute inset-0"
              showFrame={showFrames}
              isHovered={hovered?.row === row && hovered?.col === col}
              name={frame.name}
              position={frame.position}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export default DynamicFrameLayout
