'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export default function AcmChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', content: 'Hi! I\'m the ACM Assistant. Ask me anything about our chapter, events, or how to join!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: messages.length, role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim(), history: messages })
      });

      const data = await response.json();
      const assistantMessage: Message = {
        id: messages.length + 1,
        role: 'assistant',
        content: data.response || 'Sorry, I couldn\'t process that. Please try again.'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: messages.length + 1,
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Ultra Modern Floating Button */}
      <motion.div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 shadow-2xl flex items-center justify-center overflow-hidden group"
          whileHover={{ scale: 1.15, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Glass Morphism Layer */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-2xl" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-2xl" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl opacity-60"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
        
        {/* Floating Particles */}
        {!isOpen && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{ top: '50%', left: '50%' }}
                animate={{
                  x: [0, Math.cos(i * 120) * 30, 0],
                  y: [0, Math.sin(i * 120) * 30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.8, rotateX: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-w-md"
            style={{ perspective: 1000 }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-[2rem] blur-2xl opacity-30"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative bg-gradient-to-b from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
              {/* Animated Mesh Gradient */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-600/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 p-4 sm:p-5">
                {/* Animated Orbs */}
                <motion.div
                  className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl"
                  animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl"
                  animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                      <Bot className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" strokeWidth={2.5} />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">ACM AI Assistant</h3>
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <p className="text-white/90 text-xs font-medium">Always Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Messages Area */}
              <div className="h-[350px] sm:h-[420px] overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 50 : -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: index * 0.03 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <motion.div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                      </motion.div>
                    )}
                    
                    <motion.div
                      className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl relative overflow-hidden ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white rounded-br-md'
                          : 'bg-gray-800/80 text-gray-100 rounded-bl-md border border-white/10 backdrop-blur-xl'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {msg.role === 'user' && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20"
                          animate={{ x: [-100, 100] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      <p className="relative z-10 text-xs sm:text-sm leading-relaxed">{msg.content}</p>
                      <p className={`relative z-10 text-[10px] sm:text-xs mt-1 sm:mt-1.5 flex items-center gap-1 ${
                        msg.role === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </motion.div>
                    
                    {msg.role === 'user' && (
                      <motion.div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: -10 }}
                      >
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className="flex gap-3 justify-start"
                  >
                    <motion.div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <div className="bg-gray-800/80 rounded-2xl rounded-bl-md px-4 py-2 sm:px-5 sm:py-3 border border-white/10 backdrop-blur-xl shadow-xl">
                      <div className="flex gap-1.5 sm:gap-2">
                        <motion.div 
                          className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full" 
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} 
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} 
                        />
                        <motion.div 
                          className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full" 
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} 
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} 
                        />
                        <motion.div 
                          className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full" 
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} 
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* Input Area */}
              <div className="relative p-3 sm:p-4 bg-gradient-to-t from-gray-900/95 to-gray-900/80 border-t border-white/10 backdrop-blur-xl">
                {/* Glow Line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <div className="flex gap-2 sm:gap-3">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask me anything..."
                      className="w-full bg-gray-800/60 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30 transition-all backdrop-blur-xl shadow-inner"
                      disabled={isLoading}
                    />
                    {/* Input Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-xl -z-10"
                      animate={{ opacity: input ? 0.5 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <motion.button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 text-white rounded-2xl px-4 py-3 sm:px-5 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Button Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: [-100, 200] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <Send className="relative z-10 w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </motion.button>
                </div>
                
                <motion.p 
                  className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3 text-center flex items-center justify-center gap-1 sm:gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Sparkles className="w-3 h-3" />
                  Powered by ACM AI
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
