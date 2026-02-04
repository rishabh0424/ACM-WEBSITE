'use client'

import { useEffect, useRef } from 'react'

const LiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameCount = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes: any[] = []
    for (let i = 0; i < 15; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      })
    }

    const animate = () => {
      frameCount.current++
      
      if (frameCount.current % 4 !== 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.fillStyle = 'rgba(9, 9, 11, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current

      nodes.forEach((node) => {
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          node.vx += dx * 0.00005
          node.vy += dy * 0.00005
        }

        node.x += node.vx
        node.y += node.vy
        node.vx *= 0.99
        node.vy *= 0.99

        if (node.x < 0) node.x = canvas.width
        if (node.x > canvas.width) node.x = 0
        if (node.y < 0) node.y = canvas.height
        if (node.y > canvas.height) node.y = 0

        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        
        // Enhanced blue gradient for nodes
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 4)
        gradient.addColorStop(0, 'rgba(37, 99, 235, 1)') // Bright blue core
        gradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.8)') // Medium blue
        gradient.addColorStop(0.7, 'rgba(96, 165, 250, 0.5)') // Light blue
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0.2)') // Cyan edge
        ctx.fillStyle = gradient
        ctx.fill()
      })

      for (let i = 0; i < nodes.length; i += 2) {
        for (let j = i + 2; j < nodes.length; j += 2) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 60) {
            const opacity = (1 - distance / 60) * 0.25
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            
            // Enhanced blue gradient for connection lines
            const lineGradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            lineGradient.addColorStop(0, `rgba(37, 99, 235, ${opacity * 0.8})`) // Deep blue
            lineGradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity})`) // Medium blue  
            lineGradient.addColorStop(1, `rgba(34, 211, 238, ${opacity * 0.6})`) // Bright cyan
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 1.2
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1629 50%, #1a2332 100%)' }}
    />
  )
}

export default LiveBackground