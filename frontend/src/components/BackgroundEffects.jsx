import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(-45deg, #1a0033 0%, #001a4d 25%, #001a3d 50%, #0d0033 75%, #1a0033 100%)`,
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />

      {/* Animated gradient mesh blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '10%', left: '-10%' }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{ bottom: '10%', right: '-5%' }}
      />

      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-15"
        animate={{
          x: [0, 50, -100, 0],
          y: [0, -100, 50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{ top: '50%', right: '5%' }}
      />

      {/* Parallax mouse follow glow */}
      <motion.div
        className="absolute w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-10"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 100,
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* CSS animations */}
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
