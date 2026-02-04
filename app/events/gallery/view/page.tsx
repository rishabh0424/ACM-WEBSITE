"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const Canvas = dynamic(() => import("@react-three/fiber").then(mod => ({ default: mod.Canvas })), { ssr: false })
const OrbitControls = dynamic(() => import("@react-three/drei").then(mod => ({ default: mod.OrbitControls })), { ssr: false })
const ParticleSphere = dynamic(() => import("@/components/ui/3d-orbit-gallery").then(mod => ({ default: mod.ParticleSphere })), { ssr: false })

export default function GalleryView() {
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleSphere />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
      <Link href="/events/gallery" className="absolute top-8 left-8 inline-flex items-center gap-2 text-white/60 hover:text-white z-20 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
        <ArrowLeft size={20} />
        Back
      </Link>
    </div>
  )
}
