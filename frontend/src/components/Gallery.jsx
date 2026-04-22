import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileCard from './FileCard';
import MediaModal from './MediaModal';
import UploadZone from './UploadZone';
import { Loader } from 'lucide-react';

const API_BASE = 'http://localhost:5000';

const FRIEND_NAMES = ['👦 Alex', '👧 Emma', '💕 Sarah', '😍 Maya', '✨ Jordan'];

export default function Gallery({ activeTab, files, isLoading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [filteredFiles, setFilteredFiles] = useState([]);

  // Filter files based on active tab
  useEffect(() => {
    if (activeTab === 'uploads') {
      setFilteredFiles([]);
    } else if (activeTab === 'home') {
      setFilteredFiles(files);
    } else {
      // Filter by file type
      const allFiles = files.flatMap((folderData) =>
        folderData.files.map((file) => ({
          ...file,
          folderName: folderData.folder,
        }))
      );

      const filtered = allFiles.filter((file) => {
        if (activeTab === 'photos') return file.type === 'image';
        if (activeTab === 'videos') return file.type === 'video';
        return false;
      });

      setFilteredFiles(filtered);
    }
  }, [activeTab, files]);

  const handleFileClick = (file, folder, fileIndex) => {
    setSelectedFile(file);
    setSelectedFolder(folder);
    setSelectedFileIndex(fileIndex);
  };

  const handleNext = () => {
    const allFiles = filteredFiles.flatMap((item) =>
      item.files ? item.files : [item]
    );
    const nextIndex = (selectedFileIndex + 1) % allFiles.length;
    setSelectedFileIndex(nextIndex);
    const nextFile = allFiles[nextIndex];
    if (nextFile.folderName) {
      setSelectedFolder(nextFile.folderName);
      setSelectedFile(nextFile);
    } else {
      // Find the folder for this file
      const folder = files.find((f) => f.files?.includes(nextFile));
      if (folder) {
        setSelectedFolder(folder.folder);
        setSelectedFile(nextFile);
      }
    }
  };

  const handlePrev = () => {
    const allFiles = filteredFiles.flatMap((item) =>
      item.files ? item.files : [item]
    );
    const prevIndex = (selectedFileIndex - 1 + allFiles.length) % allFiles.length;
    setSelectedFileIndex(prevIndex);
    const prevFile = allFiles[prevIndex];
    if (prevFile.folderName) {
      setSelectedFolder(prevFile.folderName);
      setSelectedFile(prevFile);
    } else {
      const folder = files.find((f) => f.files?.includes(prevFile));
      if (folder) {
        setSelectedFolder(folder.folder);
        setSelectedFile(prevFile);
      }
    }
  };

  // Render home page with folder overview
  if (activeTab === 'home') {
    return (
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome banner */}
        <motion.div
          className="bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-600/30 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-8 overflow-hidden relative"
          whileHover={{ borderColor: 'rgba(0, 240, 255, 0.6)' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative z-10">
            <motion.h2
              className="text-4xl font-black text-white mb-3"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              Welcome Back, Besties! 😉(●'◡'●)
            </motion.h2>
            <p className="text-white/80 text-lg">
              Explore your precious memories and moments together. Your gallery has{' '}
              <span className="font-bold text-cyan-400">{files.reduce((acc, f) => acc + f.fileCount, 0)} memories</span>{' '}
              across <span className="font-bold text-cyan-400">{files.length} folders</span>.
            </p>
          </div>

          {/* Floating friend names */}
          {FRIEND_NAMES.map((name, i) => (
            <motion.div
              key={i}
              className="absolute text-sm font-bold text-white/60"
              animate={{
                x: Math.sin(Date.now() / 3000 + i) * 30,
                y: Math.cos(Date.now() / 3000 + i) * 30,
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
              style={{
                top: `${20 + i * 15}%`,
                right: `${10 + i * 10}%`,
              }}
            >
              {name}
            </motion.div>
          ))}
        </motion.div>

        {/* Folder grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <motion.div
              className="col-span-full flex items-center justify-center py-12"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Loader className="text-cyan-400" size={32} />
            </motion.div>
          ) : files.length === 0 ? (
            <motion.div
              className="col-span-full text-center py-12 text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg">No folders found. Create some memories! 📁</p>
            </motion.div>
          ) : (
            files.map((folderData, index) => (
              <motion.div
                key={folderData.folder}
                className="bg-gradient-to-br from-slate-800/60 via-slate-700/60 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all group cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1, duration: 0.4 },
                  },
                }}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8 }}
              >
                {/* Folder preview */}
                <div className="h-32 bg-gradient-to-br from-purple-600/30 to-blue-600/30 relative overflow-hidden">
                  {/* Grid pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    style={{
                      backgroundImage: 'linear-gradient(45deg, rgba(0, 240, 255, 0.2) 25%, transparent 25%)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Floating icons */}
                  {folderData.files.slice(0, 3).map((file, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl opacity-60"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: '50%',
                      }}
                    >
                      {file.type === 'image' ? '🖼️' : '🎬'}
                    </motion.div>
                  ))}
                </div>

                {/* Folder info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{folderData.folder}</h3>
                  <p className="text-white/60 text-sm mb-4">
                    {folderData.fileCount} file{folderData.fileCount !== 1 ? 's' : ''}
                  </p>

                  {/* File type breakdown */}
                  <div className="flex gap-2 mb-4">
                    {(() => {
                      const imageCount = folderData.files.filter((f) => f.type === 'image').length;
                      const videoCount = folderData.files.filter((f) => f.type === 'video').length;

                      return (
                        <>
                          {imageCount > 0 && (
                            <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/40">
                              📸 {imageCount}
                            </span>
                          )}
                          {videoCount > 0 && (
                            <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/40">
                              🎬 {videoCount}
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>

                  <motion.button
                    className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Open Folder
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    );
  }

  // Render uploads page
  if (activeTab === 'uploads') {
    return (
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <h2 className="text-3xl font-black text-white mb-4">Upload New Memories 📤</h2>
          <p className="text-white/70 mb-6">Share your favorite moments with your Besties! 😉</p>
        </div>

        <UploadZone onFilesSelected={(files) => console.log('Files selected:', files)} />

        {/* Tips */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-bold mb-3">💡 Tips for the best experience:</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>• Supported formats: JPG, PNG, GIF, MP4, WebM, and more</li>
            <li>• Organize files into folders for better categorization</li>
            <li>• High-resolution images will be displayed beautifully</li>
            <li>• Videos will play smoothly in the fullscreen viewer</li>
          </ul>
        </motion.div>
      </motion.div>
    );
  }

  // Render photos/videos gallery
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-white mb-2">
          {activeTab === 'photos' ? '📸 Photo Gallery' : '🎬 Video Collection'}
        </h2>
        <p className="text-white/70">
          {filteredFiles.length > 0
            ? `Viewing ${filteredFiles.length} ${activeTab === 'photos' ? 'photos' : 'videos'}`
            : `No ${activeTab === 'photos' ? 'photos' : 'videos'} found`}
        </p>
      </div>

      {isLoading ? (
        <motion.div
          className="flex items-center justify-center py-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Loader className="text-cyan-400" size={48} />
        </motion.div>
      ) : filteredFiles.length === 0 ? (
        <motion.div
          className="text-center py-12 text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg">No {activeTab === 'photos' ? 'photos' : 'videos'} found</p>
        </motion.div>
      ) : (
        // Gallery grid
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence>
            {(Array.isArray(filteredFiles[0]) ? filteredFiles.flat() : filteredFiles).map((file, index) => {
              const folder = selectedFolder || (file.folderName ? file.folderName : files.find((f) => f.files?.includes(file))?.folder);

              return (
                <FileCard
                  key={`${folder}-${file.name}`}
                  file={file}
                  folder={folder}
                  index={index}
                  onClick={() => handleFileClick(file, folder, index)}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Media Modal */}
      <AnimatePresence>
        {selectedFile && selectedFolder && (
          <MediaModal
            file={selectedFile}
            folder={selectedFolder}
            onClose={() => setSelectedFile(null)}
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={true}
            hasPrev={true}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
