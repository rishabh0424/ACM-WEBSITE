'use client'

import { useState, useEffect } from "react";

interface AmazonQPromptProps {
  message: string;
  targetSelector: string;
}

export default function AmazonQPrompt({ message, targetSelector }: AmazonQPromptProps) {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({ top: 100, left: 100 });

  useEffect(() => {
    const updatePosition = () => {
      const target = document.querySelector(targetSelector);
      if (target) {
        const targetRect = target.getBoundingClientRect();
        setPosition({
          top: targetRect.top - 40 + window.scrollY,
          left: targetRect.left + targetRect.width / 2,
        });
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    const timer = setTimeout(() => setVisible(false), 5000);
    const hideOnClick = () => setVisible(false);
    document.addEventListener("click", hideOnClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", hideOnClick);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [targetSelector]);

  if (!visible) return null;

  return (
    <div
      className="animate-bounce"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translateX(-50%)",
        fontSize: "2rem",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      ⬆ {message}
    </div>
  );
}
