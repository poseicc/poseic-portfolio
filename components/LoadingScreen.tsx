import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const messages = [
  'Başlatılıyor...',
  'Arayüz yükleniyor...',
  'Projeler hazırlanıyor...',
  'Son dokunuşlar...',
  'poseic hizmetinde! 🚀',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Progress: 0 → 100 in ~3.5s
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slow at start, fast in middle, slow at end
        const remaining = 100 - prev;
        const increment = prev < 100 ? 0.8 : prev < 80 ? 1.1 : 0.3;
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Status messages changing
  useEffect(() => {
    const thresholds = [0, 20, 45, 70, 95];
    const idx = thresholds.findLastIndex(t => progress >= t);
    setMsgIndex(Math.max(0, idx));
  }, [progress]);

  // When progress hits 100, wait a bit then exit
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 900);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [progress]);

  const letters = 'poseic'.split('');

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center select-none"
        >
          {/* POSEIC harfleri */}
          <div className="flex gap-1 md:gap-2 mb-12">
            {letters.map((letter, i) => {
              // Her harf sırayla dolacak
              const letterProgress = Math.max(0, Math.min(100, (progress - i * (100 / letters.length)) * (letters.length / (100 - (letters.length - 1) * (100 / letters.length) * 0.5))));
              const fillPercent = Math.max(0, Math.min(100, (progress / 100 - i / letters.length) * letters.length * 100));

              return (
                <div key={i} className="relative" style={{ display: 'inline-block' }}>
                  {/* Boş harf (outline) */}
                  <span
                    className="block font-display font-bold tracking-tight"
                    style={{
                      fontSize: 'clamp(3rem, 10vw, 7rem)',
                      color: 'transparent',
                      WebkitTextStroke: '1.5px rgba(255,255,255,0.15)',
                      lineHeight: 1,
                    }}
                  >
                    {letter}
                  </span>

                  {/* Dolan harf (clip ile) */}
                  <span
                    className="absolute inset-0 block font-display font-bold tracking-tight overflow-hidden"
                    style={{
                      fontSize: 'clamp(3rem, 10vw, 7rem)',
                      color: 'white',
                      WebkitTextStroke: '0px',
                      lineHeight: 1,
                      clipPath: `inset(${100 - Math.min(100, fillPercent)}% 0 0 0)`,
                      transition: 'clip-path 0.05s linear',
                    }}
                  >
                    {letter}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress barlar */}
          <div className="flex gap-2 mb-8">
            {[...Array(6)].map((_, i) => {
              const barFill = Math.max(0, Math.min(100, (progress - i * (100 / 6)) * (6 / 100) * 100));
              return (
                <div
                  key={i}
                  className="h-[2px] w-10 md:w-14 bg-white/10 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${barFill}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Status text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-white/40 text-xs font-mono tracking-widest uppercase"
            >
              {messages[msgIndex]}
            </motion.p>
          </AnimatePresence>

          {/* Yüzde */}
          <p className="mt-3 text-white/20 text-xs font-mono">
            {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};