# 🚀 Quick Start Guide

## One-Command Setup (Windows PowerShell)

### Option 1: Automatic Setup Script

Create a file named `setup.ps1` in the BST folder and run:

```powershell
# Install backend dependencies
cd .\backend
npm install
cd ..

# Install frontend dependencies
cd .\frontend
npm install
cd ..

echo "✅ Setup complete! Run: npm run start:all"
```

Then run:
```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

### Option 2: Manual Quick Start

**Terminal 1 (Backend)**:
```bash
cd backend
npm install
npm start
```

**Terminal 2 (Frontend)**:
```bash
cd frontend
npm install
npm start
```

---

## 📋 Checklist Before Running

- [ ] Node.js installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] F:/BestFriends folder exists
- [ ] Add some files to F:/BestFriends (test files)
- [ ] Port 5000 is available (backend)
- [ ] Port 3000 is available (frontend)

---

## 🧪 Testing the Application

### 1. Test Backend API

Open your browser and visit:
```
http://localhost:5000/health
```

Should return:
```json
{
  "status": "Server is running",
  "baseDir": "F:/BestFriends"
}
```

### 2. Test File Fetching

Visit:
```
http://localhost:5000/api/files
```

Should return JSON with your folder structure.

### 3. Test Frontend

Open:
```
http://localhost:3000
```

You should see:
1. Splash screen with animated logo
2. Main gallery interface
3. Your folders and files

---

## 🎨 Create Test Files

To test the gallery, create some test files:

```bash
# Windows PowerShell
mkdir "F:\BestFriends\Memories"
mkdir "F:\BestFriends\Adventures"
mkdir "F:\BestFriends\Celebrations"

# Copy or create sample files
# (Download some sample images from the internet and add them)
```

---

## 📱 Common Commands

```bash
# Start both servers (from root directory)
# Terminal 1:
cd backend && npm start

# Terminal 2:
cd frontend && npm start

# Build for production (frontend)
cd frontend
npm run build

# Clear node_modules and reinstall
rm -r node_modules
npm install
```

---

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
BASE_DIR=F:/BestFriends
NODE_ENV=development
```

### Frontend (.env) - Optional
```
REACT_APP_API_BASE=http://localhost:5000
```

---

## ✅ Verification Steps

1. **Backend Running**:
   - Console shows: "Besties Gallery Backend Server 🎨"
   - Port 5000 is active

2. **Frontend Running**:
   - Browser opens http://localhost:3000
   - Splash screen appears

3. **Files Loading**:
   - After splash screen fades
   - Folders appear in gallery
   - Files load in grid

4. **Interactions Work**:
   - Click folder to view files
   - Click file to open modal
   - Scroll is smooth
   - Animations are fluid

---

## 🆘 Need Help?

### Error: Port 5000/3000 Already in Use
```bash
# Find process on port
netstat -ano | findstr :5000

# Kill it (replace PID)
taskkill /PID 12345 /F
```

### Error: Cannot find F:/BestFriends
- Create the folder: `mkdir F:\BestFriends`
- Add some test files
- Or change BASE_DIR in .env

### Error: EACCES (Permission Denied)
- Check folder permissions
- Run terminal as administrator
- Restart the servers

### Error: Module Not Found
```bash
# Reinstall dependencies
npm install --legacy-peer-deps
```

### Slow Performance
- Reduce number of animations in Tailwind config
- Lower polling frequency (useFetchFiles.js)
- Clear browser cache

---

## 🎬 What's Next?

After getting everything running:

1. **Customize Theme**: Edit colors in `tailwind.config.js`
2. **Add Your Files**: Place your photos/videos in F:/BestFriends
3. **Customize Animations**: Modify Framer Motion settings
4. **Deploy**: Use Vercel (frontend) + Heroku (backend)

---

## 📌 Default Settings

| Setting | Value | File |
|---------|-------|------|
| Backend Port | 5000 | .env |
| Frontend Port | 3000 | package.json |
| Base Directory | F:/BestFriends | .env |
| Polling Interval | 5 seconds | useFetchFiles.js |
| Splash Duration | 3.5 seconds | SplashScreen.jsx |

---

**You're all set! Enjoy your premium media gallery! 🎉💖**
