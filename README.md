# 🎨 Besties Forever 😉(●'◡'●) - Premium Media Gallery

A stunning, full-stack web application combining a premium animated media gallery UI with a dynamic local file explorer system. Perfect for organizing and sharing memories with style!

## ✨ Features

### 🎯 Core Features
- **Real-time File System Integration**: Automatically reads and displays files from `F:/BestFriends`
- **Premium UI/UX**: Dark theme with neon gradients, glassmorphism, and smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Category Tabs**: Filter photos, videos, and uploads
- **Fullscreen Viewer**: Beautiful modal for previewing images and videos
- **Drag & Drop Upload**: Intuitive upload interface
- **Secure Backend**: Path validation and directory traversal prevention

### 🌈 Visual Features
- Animated gradient mesh background
- Floating particles and emoji animations
- Glowing neon elements and borders
- Smooth card hover effects with zoom
- Glass-morphism effects with backdrop blur
- Pulse loaders and skeleton screens
- Light reflection effects
- Ripple button animations

### 🛠️ Technical Stack
- **Frontend**: React 18 + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **File System**: Native fs and path modules
- **API**: RESTful endpoints with security

---

## 📦 Project Structure

```
BST/
├── backend/
│   ├── server.js           # Express server with API endpoints
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment configuration
│
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   │   ├── SplashScreen.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Gallery.jsx
    │   │   ├── FileCard.jsx
    │   │   ├── MediaModal.jsx
    │   │   ├── UploadZone.jsx
    │   │   └── BackgroundEffects.jsx
    │   ├── hooks/         # Custom React hooks
    │   │   └── useFetchFiles.js
    │   ├── App.jsx        # Main app component
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    ├── package.json       # Frontend dependencies
    ├── tailwind.config.js # Tailwind configuration
    ├── postcss.config.js  # PostCSS configuration
    └── .env              # Frontend environment

```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Windows** (for F: drive access)

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment** (`.env` already configured):
```
PORT=5000
BASE_DIR=F:\JOEE😉(●'◡'●)
NODE_ENV=development
```

4. **Start the backend server**:
```bash
npm start
```

Expected output:
```
╔════════════════════════════════════════════════╗
║   🎨 Besties Gallery Backend Server 🎨   ║
╠════════════════════════════════════════════════╣
║  Server: http://localhost:5000                  ║
║  Base Directory: F:\JOEE😉(●'◡'●)                ║
║  Environment: development                       ║
╚════════════════════════════════════════════════╝
```

### Frontend Setup

1. **Open a new terminal and navigate to frontend**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the React development server**:
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 🔌 API Endpoints

### 1. Get All Files
```
GET /api/files
```

**Response**:
```json
{
  "success": true,
  "baseDir": "F:/BestFriends",
  "totalFolders": 3,
  "data": [
    {
      "folder": "Memories2024",
      "fileCount": 15,
      "files": [
        {
          "name": "photo1.jpg",
          "type": "image",
          "path": "Memories2024/photo1.jpg"
        },
        {
          "name": "video1.mp4",
          "type": "video",
          "path": "Memories2024/video1.mp4"
        }
      ]
    }
  ]
}
```

### 2. Preview File
```
GET /api/preview/:folder/:filename
```

Returns the file with appropriate content type for preview.

### 3. Download File
```
GET /api/file/:folder/:filename
```

Downloads the file to the user's device.

### 4. Health Check
```
GET /health
```

---

## 📝 Supported File Types

### Images
- `.jpg`, `.jpeg`
- `.png`
- `.gif`
- `.webp`
- `.bmp`
- `.svg`

### Videos
- `.mp4`
- `.webm`
- `.avi`
- `.mov`
- `.mkv`
- `.flv`

### Audio
- `.mp3`, `.wav`, `.flac`, `.aac`, `.ogg`

### Documents
- `.pdf`, `.doc`, `.docx`, `.txt`, `.xlsx`, `.pptx`

---

## 🎨 Customization

### Change Base Directory

Edit `backend/.env`:
```
BASE_DIR=D:/MyPhotos
```

### Customize Theme Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  neon: {
    purple: "#b024ff",  // Change these values
    blue: "#00d4ff",
    cyan: "#00f0ff",
    pink: "#ff006e",
  },
}
```

### Modify Animations

All animations are in `frontend/tailwind.config.js` under `keyframes` and `animation` sections.

---

## 🔒 Security Features

- ✅ **Path Normalization**: Prevents directory traversal attacks
- ✅ **Access Control**: Restricts access to BASE_DIR only
- ✅ **Error Handling**: Graceful error messages
- ✅ **Input Validation**: All paths validated before file access
- ✅ **Permission Checks**: Respects system file permissions

---

## 📱 Mobile Responsiveness

The app includes:
- ✅ Responsive grid (1-4 columns based on screen size)
- ✅ Mobile-friendly sidebar (slides from left)
- ✅ Touch-optimized buttons and interactions
- ✅ Bottom navigation for mobile
- ✅ Swipe gestures support (via Framer Motion)

---

## 🚀 Features & Components

### SplashScreen
Beautiful animated splash screen with:
- Rotating emoji logo
- Pulsing text
- Animated gradient background
- Floating particles
- 3.5-second display duration

### Sidebar
Navigation menu with:
- Home, Photos, Videos, Uploads, Settings tabs
- Neon glow on active tab
- Smooth hover animations
- Mobile-responsive (slides in/out)
- Status indicator

### Navbar
Top navigation bar with:
- Glowing search bar
- Animated notification bell
- Profile avatar with badge
- Responsive menu toggle

### Gallery
Main content area with:
- Home: Folder overview with statistics
- Photos: Image grid with filtering
- Videos: Video grid with filtering
- Uploads: Drag & drop upload zone

### FileCard
Individual file display with:
- Thumbnail preview (for images)
- File type icons
- Hover zoom effect
- Dark overlay with action buttons
- Video/image badges

### MediaModal
Fullscreen file viewer with:
- Full image/video display
- Previous/next navigation
- Download button
- File information
- Loading skeleton
- Click outside to close

### BackgroundEffects
Visual enhancements with:
- Animated gradient mesh
- Floating blobs
- Particle effects
- Mouse-following glow
- Parallax motion

### UploadZone
Drag & drop upload interface with:
- Drag over animation
- Animated upload icon
- Success feedback
- Browse button
- Status messages

---

## 🔄 Real-time Updates

The frontend automatically polls the backend every 5 seconds for file changes. When files are added/removed from F:/BestFriends, the UI updates automatically without manual refresh.

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process (if needed) - Windows
taskkill /PID <PID> /F
```

### F:/BestFriends not found
- Ensure the folder exists or modify BASE_DIR in `.env`
- Check folder permissions
- Use forward slashes (/) in paths

### Images not loading
- Check API is running: http://localhost:5000/health
- Verify file permissions
- Ensure images are in supported formats

### CORS errors
- Backend has CORS enabled by default
- If issues persist, check browser console for detailed errors

---

## 📊 Performance Tips

1. **Large media files**: Lazy loading is handled automatically
2. **Many files**: Virtual scrolling is built into grid
3. **Network**: Polling interval can be adjusted in `useFetchFiles.js`
4. **Animations**: Reduce motion if system is slow

---

## 🎯 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Image compression before preview
- [ ] Video thumbnail generation
- [ ] User authentication
- [ ] File sharing links
- [ ] Favorites/starred files
- [ ] Advanced search and filtering
- [ ] Dark/light theme toggle
- [ ] Custom background images
- [ ] Batch operations

---

## 📄 License

MIT License - Feel free to use and modify!

---

## 💖 Made with Love  

Built with attention to detail for the Besties who deserve the best gallery! 

**Happy memories! 🎉✨**
