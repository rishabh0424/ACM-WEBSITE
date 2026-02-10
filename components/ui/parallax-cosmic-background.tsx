'use client';

import React, { useEffect, useState } from 'react';

interface CosmicParallaxBgProps {
  head: string;
  text: string;
  loop?: boolean;
  className?: string;
}

const CosmicParallaxBg: React.FC<CosmicParallaxBgProps> = ({
  head,
  text,
  loop = true,
  className = '',
}) => {
  const [smallStars, setSmallStars] = useState<string>('');
  const [mediumStars, setMediumStars] = useState<string>('');
  const [bigStars, setBigStars] = useState<string>('');

  const generateStarBoxShadow = (count: number): string => {
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    return shadows.join(', ');
  };

  useEffect(() => {
    setSmallStars(generateStarBoxShadow(700));
    setMediumStars(generateStarBoxShadow(200));
    setBigStars(generateStarBoxShadow(100));

    document.documentElement.style.setProperty(
      '--animation-iteration',
      loop ? 'infinite' : '1'
    );
  }, [loop]);

  return (
    <div className={`cosmic-parallax-container absolute inset-0 w-full h-full overflow-hidden bg-black ${className}`}>
      <div 
        style={{ boxShadow: smallStars }}
        className="cosmic-stars"
      ></div>
      <div 
        style={{ boxShadow: mediumStars }}
        className="cosmic-stars-medium"
      ></div>
      <div 
        style={{ boxShadow: bigStars }}
        className="cosmic-stars-large"
      ></div>
      
      <div id="horizon">
        <div className="glow"></div>
      </div>
      <div id="earth"></div>
      
      <div id="title" className="text-white">{head.toUpperCase()}</div>
      <div id="subtitle">
        <span className="subtitle-part-1">ACM BENNETT UNIVERSITY</span>
      </div>
    </div>
  );
};

export { CosmicParallaxBg };
export default CosmicParallaxBg;
