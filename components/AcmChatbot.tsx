'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import ChatComponent, { ChatConfig, UiConfig, Message as ChatMessage } from '@/components/ui/chat-interface';

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

  const chatConfig: ChatConfig = {
    leftPerson: {
      name: 'ACM Assistant',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=acm'
    },
    rightPerson: {
      name: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
    },
    messages: messages.map((msg, idx) => ({
      id: msg.id,
      sender: msg.role === 'assistant' ? 'left' : 'right',
      type: 'text',
      content: msg.content,
      maxWidth: 'max-w-sm',
      loader: { enabled: idx > 0, duration: 800 }
    } as ChatMessage))
  };

  const uiConfig: UiConfig = {
    containerWidth: 400,
    containerHeight: 500,
    backgroundColor: '#0F1629',
    autoRestart: false,
    loader: { dotColor: '#3B82F6' },
    linkBubbles: {
      backgroundColor: '#1A2332',
      textColor: '#60A5FA',
      iconColor: '#60A5FA',
      borderColor: '#2563EB'
    },
    leftChat: {
      backgroundColor: '#1A2332',
      textColor: '#CBD5E1',
      borderColor: 'rgba(37, 99, 235, 0.2)',
      showBorder: true,
      nameColor: '#60A5FA'
    },
    rightChat: {
      backgroundColor: '#2563EB',
      textColor: '#FFFFFF',
      borderColor: '#3B82F6',
      showBorder: false,
      nameColor: '#60A5FA'
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-accent-blue to-cyan-500 shadow-glow-blue flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <div className="bg-dark-elevated border border-border-blue rounded-2xl shadow-premium overflow-hidden">
              <div className="bg-gradient-to-r from-accent-blue to-cyan-500 p-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-white" />
                <h3 className="text-white font-semibold">ACM Assistant</h3>
              </div>
              
              <ChatComponent config={chatConfig} uiConfig={uiConfig} />
              
              <div className="p-3 bg-dark-elevated border-t border-border-blue flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-dark-card border border-border-blue rounded-xl px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-br from-accent-blue to-cyan-500 text-white rounded-xl px-3 py-2 hover:shadow-glow-blue disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
