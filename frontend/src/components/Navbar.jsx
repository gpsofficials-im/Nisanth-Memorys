import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  Menu,
  LogOut,
} from 'lucide-react';

export default function Navbar({ onMenuToggle, userName = 'Friend' }) {
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <motion.nav
      className="h-20 bg-gradient-to-r from-slate-900/60 via-slate-800/60 to-slate-900/60 backdrop-blur-xl border-b border-cyan-500/20 px-6 flex items-center justify-between sticky top-0 z-30"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Left: Menu & Search */}
      <div className="flex items-center gap-4">
        <motion.button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={24} />
        </motion.button>

        {/* Search Bar */}
        <motion.div
          className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 hover:border-cyan-500/60 transition-all"
          whileHover={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' }}
        >
          <Search size={20} className="text-cyan-400" />
          <input
            type="text"
            placeholder="Search memories..."
            className="bg-transparent text-white placeholder-white/50 outline-none w-48"
          />
        </motion.div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
        >
          <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
            <Bell size={24} />

            {/* Notification badge */}
            {notificationCount > 0 && (
              <motion.div
                className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {notificationCount}
              </motion.div>
            )}
          </button>
        </motion.div>

        {/* Profile Avatar */}
        <motion.div
          className="flex items-center gap-3 pl-4 border-l border-white/10"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white cursor-pointer hover:shadow-lg hover:shadow-cyan-500/50 transition-shadow"
            whileHover={{ scale: 1.15, rotate: 5 }}
          >
            👧
          </motion.div>
          <div className="hidden sm:flex flex-col">
            <p className="text-sm font-semibold text-white">{userName}</p>
            <p className="text-xs text-white/50">Premium</p>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
