# 🎨 React Components Reference

## Component Architecture

```
App (Main Container)
├── BackgroundEffects (Static Background)
├── SplashScreen (Initial Loading)
├── Layout (Flex Container)
│   ├── Sidebar (Left Navigation)
│   ├── Main (Right Content)
│   │   ├── Navbar (Top Bar)
│   │   └── Gallery (Main Content)
│   │       ├── FileCard (Grid Items)
│   │       ├── MediaModal (Lightbox)
│   │       └── UploadZone (Upload Area)
```

---

## 1. App.jsx

**Main Application Component**

### Props
None (Root component)

### State
```javascript
const [showSplash, setShowSplash] = useState(true);
const [activeTab, setActiveTab] = useState('home');
const [sidebarOpen, setSidebarOpen] = useState(false);
const [isMobile, setIsMobile] = useState(false);
```

### Key Features
- Manages overall app state
- Handles window resize for responsive design
- Manages splash screen display
- Renders main layout

### Hooks Used
- `useState` - State management
- `useEffect` - Window resize listener
- `useFetchFiles` - API data fetching

### Key Functions
- `handleResize()` - Detects mobile vs desktop
- `setActiveTab()` - Changes active navigation tab
- `setSidebarOpen()` - Toggle sidebar on mobile

---

## 2. SplashScreen.jsx

**Initial Loading Screen**

### Props
```javascript
{
  onComplete: function // Called after splash duration
}
```

### State
```javascript
const [showContent, setShowContent] = useState(false);
```

### Features
- **Duration**: 3.5 seconds
- **Content Fade**: 2 seconds
- **Logo Animation**: Rotating 💖 emoji
- **Particles**: 5 floating emojis
- **Background**: Animated gradient

### Animations
```javascript
// Main container
animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
transition={{ duration: 15, repeat: Infinity }}

// Logo rotation
animate={{ rotate: 360 }}
transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}

// Floating particles
animate={{
  x: Math.random() * 200 - 100,
  y: Math.random() * 200 - 100,
  opacity: [0, 1, 0],
}}
```

### Styling
- Background: Neon gradient (purple, blue, cyan, pink)
- Text: White with drop shadow
- Loader: 3 pulsing dots

---

## 3. BackgroundEffects.jsx

**Animated Background Layer**

### Props
None

### Features
- **Gradient Mesh**: 3 animated colored blobs
- **Particles**: 15 floating dots
- **Mouse Follow**: Cyan glow follows cursor
- **Parallax**: Smooth parallax motion

### Animations
```javascript
// Blob 1 (Purple/Blue)
animate={{
  x: [0, 100, -50, 0],
  y: [0, -50, 100, 0],
}}
transition={{ duration: 20, repeat: Infinity }}

// Blob 2 (Cyan/Blue)
animate={{
  x: [0, -100, 50, 0],
  y: [0, 100, -50, 0],
}}
transition={{ duration: 25, repeat: Infinity, delay: 1 }}

// Mouse glow
animate={{
  x: mousePosition.x - 128,
  y: mousePosition.y - 128,
}}
transition={{ type: 'spring', damping: 30 }}
```

### Styling
- Position: Fixed, full screen, pointer-events: none
- Blend-mode: Screen/Overlay capable
- Z-index: Behind all content

---

## 4. Navbar.jsx

**Top Navigation Bar**

### Props
```javascript
{
  onMenuToggle: function,     // Mobile menu toggle
  userName: string            // Display name
}
```

### State
```javascript
const [notificationCount, setNotificationCount] = useState(3);
```

### Components
- **Menu Button**: Mobile-only, toggles sidebar
- **Search Bar**: Text input with icon
- **Notification Bell**: Animated badge
- **Profile Avatar**: User emoji, clickable

### Features
- Sticky positioning (top: 0)
- Animated entrance
- Responsive (hide search on mobile)
- Notification badge with pulse animation

### Styling
- Background: Gradient with backdrop blur
- Border: Cyan glow (0.2 opacity)
- Height: 80px (5rem)

---

## 5. Sidebar.jsx

**Left Navigation Panel**

### Props
```javascript
{
  activeTab: string,          // Current active tab
  onTabChange: function,      // Tab change handler
  isMobile: boolean,          // Mobile mode flag
  isOpen: boolean,            // Sidebar open state
  onClose: function           // Close handler
}
```

### Menu Items
```javascript
[
  { id: 'home', label: 'Home', icon: Home },
  { id: 'photos', label: 'Photos', icon: Image },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'uploads', label: 'Uploads', icon: Upload },
  { id: 'settings', label: 'Settings', icon: Settings }
]
```

### Features
- **Mobile Overlay**: Dark backdrop when open
- **Active Indicator**: Neon glow on active item
- **Smooth Transitions**: Slide animation
- **Status Badge**: Green breathing dot

### Animations
```javascript
// Sidebar slide (mobile)
animate={isMobile ? { x: isOpen ? 0 : -400 } : {}}

// Active indicator glow
animate={{ 
  boxShadow: ['0 0 10px ...', '0 0 20px ...'] 
}}
transition={{ duration: 1.5, repeat: Infinity }}

// Menu item hover
whileHover={{ x: 4 }}
```

### Styling
- Width: 320px (desktop), full-height (mobile)
- Background: Gradient with transparency
- Border: Cyan glow (left side)

---

## 6. Gallery.jsx

**Main Content Display**

### Props
```javascript
{
  activeTab: string,          // Current tab
  files: array,               // File data from API
  isLoading: boolean          // Loading state
}
```

### State
```javascript
const [selectedFile, setSelectedFile] = useState(null);
const [selectedFileIndex, setSelectedFileIndex] = useState(0);
const [selectedFolder, setSelectedFolder] = useState(null);
const [filteredFiles, setFilteredFiles] = useState([]);
```

### View Modes
1. **Home**: Folder cards overview
2. **Photos**: Image grid
3. **Videos**: Video grid
4. **Uploads**: Upload interface
5. **Settings**: (Placeholder)

### Home View
- Grid of folder cards
- File count and type breakdown
- Preview with floating icons
- Open folder button

### Photos/Videos View
- Responsive grid (1-4 columns)
- File cards with hover effects
- Full-screen modal on click
- Previous/next navigation

### Features
- Real-time filtering by tab
- File type detection
- Loading skeleton
- Empty state messages
- Lazy loading ready

### Styling
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Spacing: 4px gaps
- Responsive padding

---

## 7. FileCard.jsx

**Individual File Thumbnail**

### Props
```javascript
{
  file: object,               // File data
  folder: string,             // Folder name
  index: number,              // Grid position
  onClick: function           // Click handler
}
```

### File Object
```javascript
{
  name: string,       // Filename with extension
  type: string,       // 'image', 'video', etc
  path: string        // Relative path
}
```

### Features
- **Hover Zoom**: Scale image on hover
- **Dark Overlay**: Shows on hover
- **Action Buttons**: View/Download
- **Type Badge**: Video icon for videos
- **Glow Effect**: Inset box-shadow

### Animations
```javascript
// Container entrance (staggered)
variants={{
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05 }
  }
}}

// Image zoom
whileHover={{ scale: 1.1 }}

// Overlay fade
initial="hidden"
whileHover="visible"
```

### Styling
- Height: 192px (h-48)
- Border-radius: 0.75rem
- Border: Cyan glow (0.2 opacity)
- Hover: Cyan glow increases (0.5 opacity)

---

## 8. MediaModal.jsx

**Full-Screen File Viewer**

### Props
```javascript
{
  file: object,               // File to display
  folder: string,             // File folder
  onClose: function,          // Close handler
  onNext: function,           // Next file
  onPrev: function,           // Previous file
  hasNext: boolean,           // Show next button
  hasPrev: boolean            // Show prev button
}
```

### Features
- **Full-Screen Overlay**: Dark background with blur
- **Responsive Content**: Max width 4xl
- **Navigation Buttons**: Left/right arrows
- **Download Button**: Save file to device
- **File Info**: Name and folder display
- **Click Outside**: Close on backdrop click
- **Video Support**: Built-in video controls

### File Types Supported
- **Images**: jpg, png, gif, webp, etc
- **Videos**: mp4, webm, avi, mov, mkv, flv
- **Default**: File type icon placeholder

### Animations
```javascript
// Backdrop fade
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}

// Content scale
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.9, opacity: 0 }}
```

### Styling
- Backdrop: Black 90% opacity with blur
- Modal: Rounded corners, proper spacing
- Buttons: Cyan gradient, glow on hover
- Info Bar: Semi-transparent gradient

---

## 9. UploadZone.jsx

**Drag & Drop Upload Interface**

### Props
```javascript
{
  onFilesSelected: function   // File selection callback
}
```

### State
```javascript
const [isDragging, setIsDragging] = useState(false);
const [uploadStatus, setUploadStatus] = useState(null);
const fileInputRef = useRef(null);
```

### Features
- **Drag & Drop**: Visual feedback
- **File Input**: Hidden input triggered by button
- **Status Messages**: Success/error notifications
- **Icon Animation**: Scales on drag enter
- **Animated Border**: Dashed, glowing on active

### Events Handled
- `onDragEnter`: Set isDragging = true
- `onDragLeave`: Set isDragging = false
- `onDrop`: Handle file drop
- `onChange`: Handle file input

### Styling
- Border: 2px dashed cyan (0.4 opacity)
- Padding: 2rem (32px)
- Border-radius: 1rem
- Hover: Border opacity increases

---

## 10. useFetchFiles.js

**Custom React Hook for API Calls**

### Returns
```javascript
{
  files: array,               // File data
  isLoading: boolean,         // Loading state
  error: string|null,         // Error message
  refetch: function           // Manual refresh
}
```

### Features
- **Automatic Polling**: Every 5 seconds
- **Error Handling**: Sets error state
- **Loading State**: Initial load indicator
- **Manual Refresh**: refetch() function
- **Cleanup**: Clears interval on unmount

### HTTP Library
- **Axios**: Promise-based HTTP client
- **Base URL**: http://localhost:5000

### Implementation
```javascript
const fetchFiles = async () => {
  try {
    setIsLoading(true);
    const response = await axios.get(`${API_BASE}/api/files`);
    if (response.data.success) {
      setFiles(response.data.data || []);
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

// Set up polling interval
const interval = setInterval(fetchFiles, 5000);
```

---

## Component Props Type Reference

### File Object
```typescript
interface File {
  name: string;           // "photo.jpg"
  type: string;           // "image" | "video" | "audio" | "document" | "file"
  path: string;           // "Memories/photo.jpg"
}
```

### Folder Object
```typescript
interface Folder {
  folder: string;         // "Memories2024"
  fileCount: number;      // 15
  files: File[];          // Array of files
}
```

### API Response
```typescript
interface ApiResponse {
  success: boolean;
  baseDir: string;
  totalFolders: number;
  data: Folder[];
}
```

---

## Animation Patterns Used

### Entrance Animation (Framer Motion)
```javascript
motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
```

### Hover Effects
```javascript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Continuous Loop
```javascript
animate={{ y: [0, -10, 0] }}
transition={{ 
  duration: 3, 
  repeat: Infinity, 
  ease: 'easeInOut' 
}}
```

### Stagger Children
```javascript
variants={{
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}}
```

---

## Event Handlers Pattern

```javascript
// Click handler
onClick={() => handleFileClick(file, folder)}

// Drag handlers
onDragEnter={handleDragEnter}
onDragLeave={handleDragLeave}
onDrop={handleDrop}

// Input change
onChange={handleInputChange}
```

---

## Responsive Breakpoints

```javascript
// Tailwind CSS breakpoints used:
// sm: 640px   - Small phones
// md: 768px   - Tablets
// lg: 1024px  - Desktops
// xl: 1280px  - Large screens

// Example usage:
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
```

---

## Performance Optimization Tips

1. **Memoization**: Wrap expensive components
   ```javascript
   const FileCard = React.memo(({ file, folder, index, onClick }) => ...)
   ```

2. **Lazy Loading**: Code splitting
   ```javascript
   const Gallery = lazy(() => import('./Gallery'));
   ```

3. **Virtual Scrolling**: For large lists
   ```javascript
   // Use react-window or react-virtual
   ```

4. **Image Optimization**: Use next/image
   ```javascript
   <Image src={url} alt="" width={300} height={300} />
   ```

---

## Component Customization Guide

### Change Default Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  neon: {
    purple: "#b024ff",
    blue: "#00d4ff",
    cyan: "#00f0ff",
    pink: "#ff006e",
  }
}
```

### Change Animation Durations
Edit individual components:
```javascript
transition={{ 
  duration: 0.5,  // Change this value
  repeat: Infinity 
}}
```

### Change Grid Layout
Edit `Gallery.jsx`:
```javascript
// From: grid-cols-4
// To: grid-cols-3 or grid-cols-5
className="grid grid-cols-3 gap-4"
```

---

## Testing Components

### Example Jest Test
```javascript
import { render, screen } from '@testing-library/react';
import FileCard from './FileCard';

test('displays file name', () => {
  const file = { name: 'test.jpg', type: 'image' };
  render(<FileCard file={file} folder="Test" index={0} />);
  expect(screen.getByText('test.jpg')).toBeInTheDocument();
});
```

---

## Debugging Tips

1. **React DevTools**: Inspect component tree
2. **Framer Motion DevTools**: Animation debugging
3. **Console Logs**: Track state changes
4. **Network Tab**: Monitor API calls
5. **Performance Tab**: Check frame rates

---

**Component Reference Complete! 🎨**

For more details, check file source code or API documentation.
