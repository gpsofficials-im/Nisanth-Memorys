import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(-45deg, #b024ff, #00d4ff, #00f0ff, #ff006e)',
        backgroundSize: '400% 400%',
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 15, repeat: Infinity }}
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        {/* Logo */}
        <motion.div
          className="mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="text-8xl font-black text-white drop-shadow-2xl">
            💖
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl font-black text-white mb-4 drop-shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Besties
        </motion.h1>
        <motion.p
          className="text-2xl font-bold text-white/90 drop-shadow-lg mb-8"
          animate={{ opacity: [, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Forever ✨
        </motion.p>

        {/* Pulse loader */}
        <motion.div
          className="flex justify-center gap-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          animate={{
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
          }}
          style={{
            top: Math.random() * 50 + '%',
            left: Math.random() * 50 + '%',
          }}
        >
          {['👦', '👧', '💕', '✨', '😍'][i]}
        </motion.div>
      ))}
    </motion.div>
  );
}
