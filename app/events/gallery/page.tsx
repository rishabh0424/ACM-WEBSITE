'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

const ImageTrail = dynamic(() => import('@/components/ui/image-trail').then(mod => ({ default: mod.ImageTrail })), { ssr: false })

const images = [
  "/photos/20762853-f930-46f7-84d0-2f23c6e4f373.jpg",
  "/photos/5a075dd4-e8f4-4734-b1f8-b0b1709b2aeb.jpg",
  "/photos/60462c4f-82bb-4ed1-8efa-524485c96a7f.jpg",
  "/photos/683accf2-2b49-427b-95a8-d56ccfb1a276.jpg",
  "/photos/6b525cdc-95f9-444d-a91e-e4c61b1c3710.jpg",
  "/photos/9725b0dd-d87c-473d-8982-9ced99f553b7.jpg",
  "/photos/9aeb34e2-359d-4b5f-b127-5a2705ab9f8e.jpg",
  "/photos/c4dd6a71-ce88-42ae-9430-78118975cc27.jpg",
  "/photos/c73682aa-1f39-40f8-adbb-5549c7f8b064.jpg",
  "/photos/DSC_0161.JPG",
  "/photos/DSC_0163.JPG",
  "/photos/DSC_0179.JPG",
]

export default function GalleryPage() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="flex w-full h-screen justify-center items-center bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <ImageTrail containerRef={ref}>
          {images.map((url, index) => (
            <div
              key={index}
              className="flex relative overflow-hidden w-24 h-24 rounded-lg"
            >
              <img
                src={url}
                alt={`Trail image ${index + 1}`}
                className="object-cover absolute inset-0 hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </ImageTrail>
      </div>
      <div className="z-10 text-center">
        <h1 className="text-7xl md:text-9xl font-bold select-none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-8">
          GALLERY
        </h1>
        <Link href="/events/gallery/view">
          <motion.button
            className="group flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full font-medium text-lg mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>
      <Link href="/#events" className="absolute top-8 left-8 inline-flex items-center gap-2 text-white/60 hover:text-white z-20">
        <ArrowLeft size={20} />
        Back
      </Link>
    </div>
  )
}
