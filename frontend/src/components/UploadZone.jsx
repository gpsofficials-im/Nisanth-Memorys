import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function UploadZone({ onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    // In a real app, you'd upload these files
    setUploadStatus({
      count: files.length,
      status: 'success',
    });

    // Reset status after 3 seconds
    setTimeout(() => setUploadStatus(null), 3000);

    onFilesSelected?.(files);
  };

  return (
    <motion.div
      className={`relative rounded-2xl border-2 border-dashed backdrop-blur-sm p-8 transition-all duration-300 ${
        isDragging
          ? 'border-cyan-400 bg-cyan-500/20'
          : 'border-cyan-500/40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-cyan-500/60'
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Upload icon */}
      <motion.div
        className="text-center mb-4"
        animate={isDragging ? { scale: 1.2, y: -10 } : { scale: 1, y: 0 }}
      >
        <motion.div
          className="inline-block p-4 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl mb-4"
          animate={{ rotate: isDragging ? 10 : 0, y: isDragging ? -5 : 0 }}
        >
          <Upload className="text-cyan-400" size={32} />
        </motion.div>
      </motion.div>

      {/* Text */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white mb-2">
          {isDragging ? '✨ Drop your memories! ✨' : 'Upload Memories'}
        </h3>
        <p className="text-white/70 text-sm">
          Drag and drop files here or{' '}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
          >
            browse
          </button>
        </p>
      </div>

      {/* Status message */}
      {uploadStatus && (
        <motion.div
          className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
            uploadStatus.status === 'success'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {uploadStatus.status === 'success' ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span className="text-sm font-medium">
            {uploadStatus.count} file{uploadStatus.count !== 1 ? 's' : ''} ready!
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
