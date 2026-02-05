'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import Image from 'next/image';

/* ---------- Types ---------- */

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  instagram?: string;
}

interface KineticTeamHybridProps {
  members: TeamMember[];
  title?: string;
  subtitle?: string;
}

/* ---------- Main Component ---------- */

export default function KineticTeamHybrid({ members, title = "Leadership", subtitle = "Office Bearers '26" }: KineticTeamHybridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set(e.clientX + 20); 
    mouseY.set(e.clientY + 20);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full cursor-default bg-transparent px-4 py-12 md:px-6 md:py-16 text-neutral-200"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.03),transparent_70%)]" />

      <div className="mx-auto max-w-6xl">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 flex flex-col gap-3 md:gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-blue-400">
              {title} <span className="text-blue-500">Council</span>
            </h1>
          </div>
          <div className="h-px flex-1 bg-blue-500/20 mx-8 hidden md:block" />
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
            {subtitle}
          </p>
        </motion.header>

        <div className="flex flex-col">
          {members.map((member, index) => (
            <TeamRow
              key={member.id}
              data={member}
              index={index}
              isActive={activeId === member.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>
      </div>

      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {activeId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative h-64 w-80 overflow-hidden rounded-xl border border-yellow-500/20 bg-neutral-900 shadow-2xl"
              >
                <Image
                  src={members.find((t) => t.id === activeId)?.image || ''}
                  alt="Preview"
                  fill
                  className="h-full w-full object-cover"
                />
                
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-white/80">Active</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

/* ---------- Row Component ---------- */

function TeamRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}: {
  data: TeamMember;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
}) {
  const isDimmed = isAnyActive && !isActive;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isDimmed ? 0.3 : 1, 
        y: 0,
        backgroundColor: isActive && isMobile ? 'rgba(251,191,36,0.05)' : 'transparent'
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      className={`group relative border-t border-yellow-500/10 transition-colors duration-500 last:border-b active:bg-blue-500/5 ${
        isMobile ? 'cursor-pointer' : 'cursor-pointer hover:bg-blue-500/5'
      }`}
    >
      <div 
        className="relative z-10 flex flex-col py-5 md:py-6 lg:py-10"
        onClick={(e) => {
          if (isMobile) {
            const target = e.target as HTMLElement;
            if (target.closest('.toggle-icon')) {
              setActiveId(isActive ? null : data.id);
            } else if (isActive && data.instagram) {
              window.open(data.instagram, '_blank');
            } else if (!isActive) {
              setActiveId(data.id);
            }
          } else if (data.instagram) {
            window.open(data.instagram, '_blank');
          }
        }}
      >
        
        <div className="flex items-baseline gap-3 md:gap-4 lg:gap-12 pl-2 md:pl-0 transition-transform duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4">
          <span className="font-mono text-[10px] md:text-xs text-yellow-600 min-w-[18px] md:min-w-[24px]">
            0{index + 1}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-medium tracking-tight text-neutral-400 transition-colors duration-300 group-hover:text-yellow-400">
            {data.name}
          </h2>
        </div>

        <div className="mt-2 md:mt-3 flex items-center justify-between pl-7 md:pl-8 lg:pl-12 pr-2 md:pr-0">
          <span className="text-[11px] md:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-blue-400 transition-colors group-hover:text-cyan-400">
            {data.role}
          </span>
          
          <button 
            className="toggle-icon block md:hidden text-yellow-500 p-2 hover:text-yellow-400 transition-colors" 
            onClick={(e) => {
              e.stopPropagation();
              setActiveId(isActive ? null : data.id);
            }}
            aria-label={isActive ? "Collapse" : "Expand"}
          >
            {isActive ? <Minus size={20} /> : <Plus size={20} />}
          </button>

          <motion.div
             animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
             className="hidden md:block text-yellow-400"
          >
             <ArrowUpRight size={24} strokeWidth={1.5} className="lg:w-7 lg:h-7" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-yellow-500/5"
          >
            <div className="p-3 md:p-4">
              <div className="relative w-full overflow-hidden rounded-lg border border-blue-500/20" style={{ paddingBottom: '56.25%' }}>
                <Image 
                  src={data.image} 
                  alt={data.name} 
                  className="absolute inset-0 w-full h-full object-contain bg-gray-900" 
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                   <p className="text-[10px] md:text-xs uppercase tracking-widest text-blue-400 font-bold">{data.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export { KineticTeamHybrid };
