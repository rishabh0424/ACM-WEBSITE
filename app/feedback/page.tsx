"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";

const EyeBall = ({ size = 48, pupilSize = 16, maxDistance = 10, eyeColor = "white", pupilColor = "black", isBlinking = false }: any) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
    const angle = Math.atan2(deltaY, deltaX);
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div ref={eyeRef} className="rounded-full flex items-center justify-center transition-all duration-150" style={{ width: `${size}px`, height: isBlinking ? '2px' : `${size}px`, backgroundColor: eyeColor, overflow: 'hidden' }}>
      {!isBlinking && <div className="rounded-full" style={{ width: `${pupilSize}px`, height: `${pupilSize}px`, backgroundColor: pupilColor, transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`, transition: 'transform 0.1s ease-out' }} />}
    </div>
  );
};

const Pupil = ({ size = 12, maxDistance = 5, pupilColor = "black" }: any) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;
    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
    const angle = Math.atan2(deltaY, deltaX);
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
  };

  const pupilPosition = calculatePupilPosition();

  return <div ref={pupilRef} className="rounded-full" style={{ width: `${size}px`, height: `${size}px`, backgroundColor: pupilColor, transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`, transition: 'transform 0.1s ease-out' }} />;
};

export default function FeedbackPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 150);
      }, Math.random() * 4000 + 3000);
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));
    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Thank you for your feedback!");
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]">
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-r from-blue-600/80 via-blue-700/40 to-transparent p-12 text-white overflow-hidden lg:w-1/2">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-cyan-400/10 rounded-full blur-3xl" />
        
        <div className="relative z-20 mt-20">
          <h3 className="text-4xl font-bold mb-4">We Value Your Opinion</h3>
          <p className="text-blue-100 text-lg">Help us improve by sharing your thoughts</p>
        </div>

        <div className="relative z-10 flex items-end justify-center h-[400px]">
          <div className="relative" style={{ width: '550px', height: '400px' }}>
            <div ref={purpleRef} className="absolute bottom-0 transition-all duration-700" style={{ left: '70px', width: '180px', height: isTyping ? '440px' : '400px', backgroundColor: '#6C3FF5', borderRadius: '10px 10px 0 0', zIndex: 1, transform: isTyping ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)` : `skewX(${purplePos.bodySkew || 0}deg)`, transformOrigin: 'bottom center' }}>
              <div className="absolute flex gap-8 transition-all duration-700" style={{ left: `${45 + purplePos.faceX}px`, top: `${40 + purplePos.faceY}px` }}>
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlinking} />
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlinking} />
              </div>
            </div>
            <div ref={blackRef} className="absolute bottom-0 transition-all duration-700" style={{ left: '240px', width: '120px', height: '310px', backgroundColor: '#2D2D2D', borderRadius: '8px 8px 0 0', zIndex: 2, transform: `skewX(${blackPos.bodySkew || 0}deg)`, transformOrigin: 'bottom center' }}>
              <div className="absolute flex gap-6 transition-all duration-700" style={{ left: `${26 + blackPos.faceX}px`, top: `${32 + blackPos.faceY}px` }}>
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlinking} />
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlinking} />
              </div>
            </div>
            <div ref={orangeRef} className="absolute bottom-0 transition-all duration-700" style={{ left: '0px', width: '240px', height: '200px', zIndex: 3, backgroundColor: '#FF9B6B', borderRadius: '120px 120px 0 0', transform: `skewX(${orangePos.bodySkew || 0}deg)`, transformOrigin: 'bottom center' }}>
              <div className="absolute flex gap-8 transition-all duration-200" style={{ left: `${82 + (orangePos.faceX || 0)}px`, top: `${90 + (orangePos.faceY || 0)}px` }}>
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
              </div>
            </div>
            <div ref={yellowRef} className="absolute bottom-0 transition-all duration-700" style={{ left: '310px', width: '140px', height: '230px', backgroundColor: '#E8D754', borderRadius: '70px 70px 0 0', zIndex: 4, transform: `skewX(${yellowPos.bodySkew || 0}deg)`, transformOrigin: 'bottom center' }}>
              <div className="absolute flex gap-6 transition-all duration-200" style={{ left: `${52 + (yellowPos.faceX || 0)}px`, top: `${40 + (yellowPos.faceY || 0)}px` }}>
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
              </div>
              <div className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200" style={{ left: `${40 + (yellowPos.faceX || 0)}px`, top: `${88 + (yellowPos.faceY || 0)}px` }} />
            </div>
          </div>
        </div>
        
        <div className="relative z-20">
          <p className="text-blue-100 text-sm">Your feedback helps us create better experiences</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-8 relative overflow-hidden w-full lg:w-1/2">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <div className="absolute top-20 right-20 size-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 size-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <button onClick={() => router.back()} className="fixed top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 hover:bg-white/10 transition-all z-50 text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span className="text-white">Back</span>
        </button>

        <div className="w-full max-w-[480px] relative z-10 px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Share Your Feedback
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">We'd love to hear your thoughts</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Name
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setIsTyping(true)} onBlur={() => setIsTyping(false)} required className="w-full h-12 sm:h-14 px-4 sm:px-5 text-sm sm:text-base bg-gray-800/60 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all backdrop-blur-sm" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Email
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-12 sm:h-14 px-4 sm:px-5 text-sm sm:text-base bg-gray-800/60 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all backdrop-blur-sm" placeholder="your@email.com" />
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Message
              </label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-gray-800/60 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all resize-none backdrop-blur-sm" placeholder="Share your thoughts..." />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full h-12 sm:h-14 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 rounded-xl text-white font-bold hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/30 active:scale-[0.98]">
              {isSubmitting ? "Sending..." : (<><Send className="w-4 h-4 sm:w-5 sm:h-5" />Send Feedback</>)}
            </button>
          </form>
          
          <p className="text-center text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6">We typically respond within 24 hours</p>
        </div>
      </div>
    </div>
  );
}
