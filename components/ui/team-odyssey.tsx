import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CosmicParallaxBg } from '@/components/ui/parallax-cosmic-background';
import Image from 'next/image';

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

interface TeamOdysseyProps {
  teamName: string;
  teamDescription: string;
  lightningHue: number;
  seniorCore: TeamMember[];
  juniorCore: TeamMember[];
  onClose: () => void;
}

export const TeamOdyssey: React.FC<TeamOdysseyProps> = ({
  teamName,
  teamDescription,
  seniorCore,
  juniorCore,
  onClose,
}) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 w-full bg-black text-white overflow-hidden">
      {/* Close Button */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <X className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white transition-colors" />
        <span className="text-sm md:text-base font-medium text-white/70 group-hover:text-white transition-colors">Back</span>
      </motion.button>

      {/* Hero Section with Cosmic Background */}
      <div className="relative w-full h-96 overflow-hidden">
        <CosmicParallaxBg 
          head={teamName}
          text={teamDescription}
          loop={true}
          className="w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 24rem)' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
          }
          div::-webkit-scrollbar-thumb {
            background: rgba(34, 211, 238, 0.5);
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: rgba(34, 211, 238, 0.8);
          }
        `}</style>

        {/* Senior Core Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full space-y-8 mb-20"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Senior Core
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seniorCore.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/60 transition-all"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-400">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 text-center">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-400 font-semibold text-center">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Junior Core Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full space-y-8"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Junior Core
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {juniorCore.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/60 transition-all"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-400">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 text-center">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-400 font-semibold text-center">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
