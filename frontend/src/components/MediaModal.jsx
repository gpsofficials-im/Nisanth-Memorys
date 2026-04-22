import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, X, Play } from 'lucide-react';

const API_BASE = 'http://localhost:5000';

export default function MediaModal({ file, folder, onClose, onNext, onPrev, hasNext, hasPrev }) {
  const [isLoading, setIsLoading] = useState(true);

  const isVideo = file.type === 'video';
  const isImage = file.type === 'image';

  const mediaUrl = `${API_BASE}/api/preview/${folder}/${file.name}`;

  const handleDownload = () => {
    const downloadUrl = `${API_BASE}/api/file/${folder}/${file.name}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          <X size={24} />
        </motion.button>

        {/* Media container */}
        <motion.div
          className="relative max-w-4xl max-h-[90vh] w-full mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Loading skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl animate-pulse" />
          )}

          {/* Media */}
          {isImage && (
            <motion.img
              src={mediaUrl}
              alt={file.name}
              className="w-full h-auto rounded-xl object-cover"
              onLoad={() => setIsLoading(false)}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {isVideo && (
            <motion.div
              className="relative bg-black rounded-xl overflow-hidden"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <video
                src={mediaUrl}
                controls
                className="w-full h-auto"
                onLoadedData={() => setIsLoading(false)}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <Play size={48} className="text-white fill-white" />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Info bar */}
          <motion.div
            className="mt-4 flex items-center justify-between bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{file.name}</p>
              <p className="text-white/60 text-xs">{folder}</p>
            </div>

            {/* Action buttons */}
            <motion.button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              Download
            </motion.button>
          </motion.div>

          {/* Navigation buttons */}
          {hasPrev && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          )}

          {hasNext && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
