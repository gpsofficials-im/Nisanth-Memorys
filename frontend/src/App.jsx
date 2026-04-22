import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Gallery from './components/Gallery';
import useFetchFiles from './hooks/useFetchFiles';
import './App.css';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { files, isLoading, error } = useFetchFiles();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background effects */}
      <BackgroundEffects />

      {/* Error notification */}
      {error && (
        <motion.div
          className="fixed top-4 right-4 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Main App Content */}
      {!showSplash && (
        <div className="flex h-screen overflow-hidden relative z-10">
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobile={isMobile}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main content */}
          <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
            {/* Navbar */}
            <Navbar
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              userName="Besties😉(●'◡'●)"
            />

            {/* Content area */}
            <main className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="p-6 lg:p-8 max-w-7xl mx-auto">
                <Gallery
                  activeTab={activeTab}
                  files={files}
                  isLoading={isLoading}
                />
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all z-30"
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveTab('uploads')}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        📤
      </motion.button>
    </div>
  );
}
