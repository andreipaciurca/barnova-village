'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ghost, Laugh, MessageSquareQuote } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SarcasticToggleProps {
  initialValue: boolean;
}

export function SarcasticToggle({ initialValue }: SarcasticToggleProps) {
  const [isSarcastic, setIsSarcastic] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleSarcasticMode = async () => {
    setIsLoading(true);
    const newValue = !isSarcastic;
    
    try {
      const response = await fetch('/api/v1/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'sarcastic_mode',
          value: newValue,
        }),
      });

      if (response.ok) {
        setIsSarcastic(newValue);
        // Ne asigurăm că datele de pe server sunt actualizate prin reîmprospătare
        router.refresh();
      }
    } catch (error) {
      console.error('Error toggling sarcastic mode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleSarcasticMode}
      disabled={isLoading}
      className={`
        relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl 
        transition-all duration-300 transform-gpu overflow-hidden border border-white/10
        ${isSarcastic 
          ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' 
          : 'bg-primary/5 text-primary hover:bg-primary/10'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      title={isSarcastic ? "Mod Sarcastic: Activat" : "Activează Modul Sarcastic"}
    >
      <motion.div
        animate={{ 
          rotate: isSarcastic ? [0, -10, 10, -10, 10, 0] : 0,
          scale: isSarcastic ? [1, 1.2, 1] : 1
        }}
        transition={{ 
          duration: 0.5, 
          repeat: isSarcastic ? Infinity : 0, 
          repeatDelay: 5 
        }}
      >
        {isSarcastic ? (
          <Laugh className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <MessageSquareQuote className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </motion.div>
      
      {/* Decorative pulse for active state */}
      {isSarcastic && (
        <span className="absolute inset-0 rounded-2xl ring-2 ring-purple-500 animate-pulse opacity-50" />
      )}
    </motion.button>
  );
}
