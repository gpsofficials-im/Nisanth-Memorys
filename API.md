# 🔌 API Documentation

## Base URL
```
http://localhost:5000
```

## Headers
All requests accept:
```
Content-Type: application/json
CORS: Enabled
```

---

## Endpoints

### 1. Health Check
Verify the server is running.

**Endpoint:**
```
GET /health
```

**Response (200 OK):**
```json
{
  "status": "Server is running",
  "baseDir": "F:/BestFriends"
}
```

**Example:**
```bash
curl http://localhost:5000/health
```

---

### 2. Get All Files
Fetch all folders and files from base directory.

**Endpoint:**
```
GET /api/files
```

**Response (200 OK):**
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
          "name": "beach_video.mp4",
          "type": "video",
          "path": "Memories2024/beach_video.mp4"
        },
        {
          "name": "notes.txt",
          "type": "document",
          "path": "Memories2024/notes.txt"
        }
      ]
    },
    {
      "folder": "Adventures",
      "fileCount": 8,
      "files": [...]
    }
  ]
}
```

**Response (404 Not Found):**
```json
{
  "error": "Base directory not found",
  "path": "F:/BestFriends",
  "data": []
}
```

**Response (500 Server Error):**
```json
{
  "error": "Failed to read files",
  "message": "Permission denied",
  "data": []
}
```

**Query Parameters:** None

**Example:**
```bash
curl http://localhost:5000/api/files

# Using jq to prettify (Linux/Mac)
curl http://localhost:5000/api/files | jq
```

---

### 3. Preview File
Stream a file for preview in the browser.

**Endpoint:**
```
GET /api/preview/:folder/:filename
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder` | string | Yes | Folder name (no slashes) |
| `filename` | string | Yes | File name with extension |

**Response (200 OK):**
Binary file content with appropriate Content-Type header

**Response (400 Bad Request):**
```json
{
  "error": "Folder and filename required"
}
```

**Response (404 Not Found):**
```json
{
  "error": "File not found"
}
```

**Response (403 Forbidden):**
```json
{
  "error": "Access denied: Path outside base directory"
}
```

**Content Types Served:**
- Images: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
- Videos: `video/mp4`, `video/webm`, `video/x-msvideo`, `video/quicktime`
- Audio: `audio/mpeg`, `audio/wav`
- Documents: `application/pdf`

**Headers:**
```
Content-Type: [appropriate MIME type]
Cache-Control: public, max-age=3600
```

**Examples:**
```bash
# View an image in browser
curl -o ./photo.jpg http://localhost:5000/api/preview/Memories2024/photo1.jpg

# View video in browser (use in <video> tag)
# http://localhost:5000/api/preview/Memories2024/beach_video.mp4
```

---

### 4. Download File
Download a file to user's device.

**Endpoint:**
```
GET /api/file/:folder/:filename
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder` | string | Yes | Folder name (no slashes) |
| `filename` | string | Yes | File name with extension |

**Response (200 OK):**
File download with `Content-Disposition: attachment` header

**Response (400 Bad Request):**
```json
{
  "error": "Folder and filename required"
}
```

**Response (404 Not Found):**
```json
{
  "error": "File not found"
}
```

**Response (403 Forbidden):**
```json
{
  "error": "Access denied: Path outside base directory"
}
```

**Headers:**
```
Content-Disposition: attachment; filename="photo1.jpg"
Content-Type: application/octet-stream
```

**Examples:**
```bash
# Download a file
curl -O http://localhost:5000/api/file/Memories2024/photo1.jpg

# Download with custom name
curl -o my_photo.jpg http://localhost:5000/api/file/Memories2024/photo1.jpg
```

---

## File Types

The backend automatically detects file types:

### Image Types
- `.jpg`, `.jpeg` → `image`
- `.png` → `image`
- `.gif` → `image`
- `.webp` → `image`
- `.bmp` → `image`
- `.svg` → `image`

### Video Types
- `.mp4` → `video`
- `.webm` → `video`
- `.avi` → `video`
- `.mov` → `video`
- `.mkv` → `video`
- `.flv` → `video`

### Audio Types
- `.mp3` → `audio`
- `.wav` → `audio`
- `.flac` → `audio`
- `.aac` → `audio`
- `.ogg` → `audio`

### Document Types
- `.pdf` → `document`
- `.doc`, `.docx` → `document`
- `.txt` → `document`
- `.xlsx` → `document`
- `.pptx` → `document`

### Default
- Any other type → `file`

---

## Error Handling

### Error Status Codes

| Code | Meaning | Scenario |
|------|---------|----------|
| 200 | OK | Request successful |
| 400 | Bad Request | Missing required parameters |
| 403 | Forbidden | Path traversal detected / Access denied |
| 404 | Not Found | File or directory not found |
| 500 | Server Error | Unexpected error |

### Error Format

All errors return JSON:
```json
{
  "error": "Error description",
  "message": "Optional detailed message (dev mode only)"
}
```

### Security Errors

The backend prevents directory traversal attacks:

```bash
# These requests will fail:
# GET /api/file/../../Windows/System32/config
# GET /api/preview/../../../etc/passwd
# GET /api/file/folder/../../../file.txt

# Error response:
{
  "error": "Access denied: Path outside base directory"
}
```

---

## Request & Response Examples

### Example 1: Fetch All Files

**Request:**
```bash
curl -X GET http://localhost:5000/api/files
```

**Response:**
```json
{
  "success": true,
  "baseDir": "F:/BestFriends",
  "totalFolders": 2,
  "data": [
    {
      "folder": "Memories",
      "fileCount": 3,
      "files": [
        {
          "name": "sunset.jpg",
          "type": "image",
          "path": "Memories/sunset.jpg"
        },
        {
          "name": "dance.mp4",
          "type": "video",
          "path": "Memories/dance.mp4"
        },
        {
          "name": "notes.txt",
          "type": "document",
          "path": "Memories/notes.txt"
        }
      ]
    }
  ]
}
```

---

### Example 2: Preview Image

**Request:**
```bash
curl http://localhost:5000/api/preview/Memories/sunset.jpg > sunset.jpg
```

**Response:**
```
[Binary image data]
Headers:
  Content-Type: image/jpeg
  Cache-Control: public, max-age=3600
```

---

### Example 3: Download File

**Request:**
```bash
curl -O http://localhost:5000/api/file/Memories/sunset.jpg
```

**Response:**
```
[Binary image data]
Headers:
  Content-Disposition: attachment; filename="sunset.jpg"
  Content-Type: application/octet-stream
```

---

### Example 4: Error - File Not Found

**Request:**
```bash
curl http://localhost:5000/api/file/NonExistent/fake.jpg
```

**Response (404):**
```json
{
  "error": "File not found"
}
```

---

## Rate Limiting

Currently: **No rate limiting** (can be added for production)

For production, consider adding:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Authentication

Currently: **None** (open API)

For production security, add:
```javascript
// Example: API Key authentication
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

---

## Pagination

Not currently implemented, but can be added:

```bash
# Future endpoint example
GET /api/files?page=1&limit=50
```

---

## Filtering

Not currently implemented, but can be added:

```bash
# Future endpoint examples
GET /api/files?type=image
GET /api/files?type=video
GET /api/files?folder=Memories
```

---

## CORS Headers

The server includes CORS headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Caching Strategy

- **Preview files**: 1 hour cache (`max-age=3600`)
- **API responses**: No cache headers (always fresh)

---

## Real-World Usage Examples

### JavaScript/Fetch

```javascript
// Fetch all files
fetch('http://localhost:5000/api/files')
  .then(res => res.json())
  .then(data => console.log(data));

// View image
const imageUrl = 'http://localhost:5000/api/preview/Memories/photo.jpg';
document.querySelector('img').src = imageUrl;

// Download file
const downloadUrl = 'http://localhost:5000/api/file/Memories/photo.jpg';
const link = document.createElement('a');
link.href = downloadUrl;
link.download = 'photo.jpg';
link.click();
```

### Python

```python
import requests

# Fetch all files
response = requests.get('http://localhost:5000/api/files')
data = response.json()
print(data)

# Download file
url = 'http://localhost:5000/api/file/Memories/photo.jpg'
response = requests.get(url)
with open('photo.jpg', 'wb') as f:
    f.write(response.content)
```

### cURL

```bash
# Get all files
curl http://localhost:5000/api/files

# Preview image (in terminal)
curl http://localhost:5000/api/preview/Memories/photo.jpg > photo.jpg

# Download file
curl -O http://localhost:5000/api/file/Memories/photo.jpg

# With verbose output
curl -v http://localhost:5000/api/files
```

---

## Database Integration

To add database support (future enhancement):

```javascript
// Example: MongoDB
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  folder: String,
  type: String,
  size: Number,
  uploadedAt: Date,
  metadata: Object
});

const File = mongoose.model('File', fileSchema);
```

---

## GraphQL Alternative

Could be implemented with Apollo Server:

```graphql
type Query {
  files: [Folder!]!
  file(folder: String!, filename: String!): File!
}

type Folder {
  name: String!
  fileCount: Int!
  files: [File!]!
}

type File {
  name: String!
  type: FileType!
  path: String!
}

enum FileType {
  IMAGE
  VIDEO
  AUDIO
  DOCUMENT
  FILE
}
```

---

## Version History

### v1.0.0 (Current)
- GET /api/files
- GET /api/preview/:folder/:filename
- GET /api/file/:folder/:filename
- GET /health

### Future (v1.1.0+)
- Pagination
- Filtering
- Search
- File metadata
- Upload endpoint
- Delete endpoint
- User authentication

---

## Troubleshooting API Calls

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5000
```
**Solution**: Ensure backend is running (`npm start`)

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: CORS is enabled, check backend console for errors

### 404 Not Found
```
{
  "error": "Endpoint not found"
}
```
**Solution**: Check endpoint path and HTTP method

### File Not Found
```
{
  "error": "File not found"
}
```
**Solution**: 
- Verify file exists in F:/BestFriends
- Check folder and filename spelling
- Use forward slashes only

### Permission Denied
```
{
  "error": "Access denied: Path outside base directory"
}
```
**Solution**: Path traversal detected - stick to valid files

---

## Performance Metrics

Typical response times:
- `/health`: < 1ms
- `/api/files` (0-100 files): 10-50ms
- `/api/files` (100-1000 files): 50-200ms
- `/api/preview` (image): 10-200ms
- `/api/file` (download): Depends on file size

---

## API Monitoring

Monitor these metrics in production:
- Request count per endpoint
- Response times
- Error rates (4xx, 5xx)
- File access patterns
- Bandwidth usage

---

## Support & Contact

For API issues:
1. Check server console output
2. Enable debug logging
3. Check network tab in browser DevTools
4. Review error response JSON

---

**API Documentation Complete! 🎉**

For more info, check: `README.md` | `QUICKSTART.md` | `SETUP.md`
