import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon } from 'lucide-react';

const API_BASE = 'http://localhost:5000';

export default function FileCard({ file, folder, index, onClick }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isVideo = file.type === 'video';
  const isImage = file.type === 'image';

  const thumbnailUrl = isImage ? `${API_BASE}/api/preview/${folder}/${file.name}` : null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
      },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="relative group cursor-pointer h-48 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
    >
      {/* Background image/video thumbnail */}
      {isImage ? (
        <motion.img
          src={thumbnailUrl}
          alt={file.name}
          className="w-full h-full object-cover"
          onLoad={() => setIsImageLoaded(true)}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      ) : isVideo ? (
        <motion.div
          className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center">
            <Play className="text-cyan-400 mb-2" size={32} />
            <p className="text-white/70 text-xs">Video</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center">
            <ImageIcon className="text-cyan-400 mb-2" size={32} />
            <p className="text-white/70 text-xs">File</p>
          </div>
        </motion.div>
      )}

      {/* Overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4"
        variants={overlayVariants}
        initial="hidden"
        whileHover="visible"
      >
        {/* File info */}
        <div className="mb-3">
          <p className="text-white font-semibold text-sm truncate">{file.name}</p>
          <p className="text-white/60 text-xs">{folder}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <motion.button
            className="flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium text-sm hover:from-cyan-400 hover:to-blue-400 transition-all flex items-center justify-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View
          </motion.button>
          <motion.button
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⬇️
          </motion.button>
        </div>
      </motion.div>

      {/* Video badge */}
      {isVideo && (
        <motion.div
          className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2"
          whileHover={{ scale: 1.1 }}
        >
          <Play size={16} className="text-white fill-white" />
        </motion.div>
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
