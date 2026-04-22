import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Image,
  Video,
  Upload,
  Settings,
  Menu,
  X,
} from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange, isMobile, isOpen, onClose }) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'photos', label: 'Photos', icon: Image },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'uploads', label: 'Uploads', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    if (isMobile) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`${
          isMobile ? 'fixed left-0 top-0 h-full w-80 z-50' : 'w-80'
        } bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl border-r border-cyan-500/20 p-6 flex flex-col`}
        animate={isMobile ? { x: isOpen ? 0 : -400 } : {}}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Close button for mobile */}
        {isMobile && isOpen && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
        )}

        {/* Logo */}
        <motion.div
          className="mb-8 mt-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">�</span>
            <div>
              <h2 className="text-xl font-black text-white">Besties</h2>
              <p className="text-xs text-cyan-400">😉(●'◡'●)</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white'
                    : 'text-white/70 hover:text-white/90'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={isActive ? { rotate: 10 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={20} />
                </motion.div>
                <span className="font-semibold">{item.label}</span>

                {/* Active indicator glow */}
                {isActive && (
                  <motion.div
                    className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{ boxShadow: ['0 0 10px rgba(0, 240, 255, 0.8)', '0 0 20px rgba(0, 240, 255, 0.4)'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer stats */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4"
          whileHover={{ borderColor: 'rgba(0, 240, 255, 0.5)' }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-white/70 mb-2">Status</p>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <p className="text-sm font-semibold text-white">Ready</p>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
}
