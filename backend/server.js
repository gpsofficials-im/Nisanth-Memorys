const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_DIR = process.env.BASE_DIR || 'F:/BestFriends';

// Middleware
app.use(cors());
app.use(express.json());

// Security: Normalize and validate paths
const normalizePath = (filePath) => {
  const normalized = path.normalize(filePath);
  const resolved = path.resolve(normalized);
  const baseResolved = path.resolve(BASE_DIR);
  
  // Prevent directory traversal
  if (!resolved.startsWith(baseResolved)) {
    throw new Error('Access denied: Path outside base directory');
  }
  
  return resolved;
};

// API ENDPOINT: Get all files from BASE_DIR
app.get('/api/files', (req, res) => {
  try {
    // Check if BASE_DIR exists
    if (!fs.existsSync(BASE_DIR)) {
      return res.status(404).json({
        error: 'Base directory not found',
        path: BASE_DIR,
        data: []
      });
    }

    const result = [];
    const items = fs.readdirSync(BASE_DIR, { withFileTypes: true });

    // Read all folders and their files
    items.forEach(item => {
      if (item.isDirectory()) {
        const folderPath = path.join(BASE_DIR, item.name);
        
        try {
          const files = fs.readdirSync(folderPath, { withFileTypes: true });
          const fileList = files
            .filter(file => file.isFile())
            .map(file => ({
              name: file.name,
              type: getFileType(file.name),
              path: `${item.name}/${file.name}`
            }));

          if (fileList.length > 0) {
            result.push({
              folder: item.name,
              fileCount: fileList.length,
              files: fileList
            });
          }
        } catch (err) {
          console.error(`Error reading folder ${item.name}:`, err.message);
        }
      }
    });

    res.json({
      success: true,
      baseDir: BASE_DIR,
      totalFolders: result.length,
      data: result
    });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({
      error: 'Failed to read files',
      message: error.message,
      data: []
    });
  }
});

// Helper: Determine file type
function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  const videoExts = ['.mp4', '.webm', '.avi', '.mov', '.mkv', '.flv'];
  const audioExts = ['.mp3', '.wav', '.flac', '.aac', '.ogg'];
  const docExts = ['.pdf', '.doc', '.docx', '.txt', '.xlsx', '.pptx'];

  if (imageExts.includes(ext)) return 'image';
  if (videoExts.includes(ext)) return 'video';
  if (audioExts.includes(ext)) return 'audio';
  if (docExts.includes(ext)) return 'document';
  return 'file';
}

// API ENDPOINT: Get file preview URL
app.get('/api/file/:folder/:filename', (req, res) => {
  try {
    const { folder, filename } = req.params;
    
    // Validate inputs
    if (!folder || !filename) {
      return res.status(400).json({ error: 'Folder and filename required' });
    }

    const filePath = normalizePath(path.join(BASE_DIR, folder, filename));

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Return file stream
    res.download(filePath);
  } catch (error) {
    console.error('Download Error:', error.message);
    res.status(403).json({ error: error.message });
  }
});

// API ENDPOINT: Get file for preview (for images/videos)
app.get('/api/preview/:folder/:filename', (req, res) => {
  try {
    const { folder, filename } = req.params;
    
    const filePath = normalizePath(path.join(BASE_DIR, folder, filename));

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set appropriate content type
    const ext = path.extname(filename).toLowerCase();
    const contentType = getContentType(ext);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    res.sendFile(filePath);
  } catch (error) {
    console.error('Preview Error:', error.message);
    res.status(403).json({ error: error.message });
  }
});

// Helper: Get content type
function getContentType(ext) {
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.avi': 'video/x-msvideo',
    '.mov': 'video/quicktime',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.pdf': 'application/pdf'
  };
  return types[ext] || 'application/octet-stream';
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', baseDir: BASE_DIR });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║   🎨 Best Friends Gallery Backend Server 🎨   ║
╠════════════════════════════════════════════════╣
║  Server: http://localhost:${PORT}                  ║
║  Base Directory: ${BASE_DIR.padEnd(26)} ║
║  Environment: ${process.env.NODE_ENV.padEnd(31)} ║
╚════════════════════════════════════════════════╝
  `);
});
