import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export default function useFetchFiles() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE}/api/files`);
      
      if (response.data.success) {
        setFiles(response.data.data || []);
        setError(null);
      } else {
        setFiles([]);
        setError(response.data.error || 'Failed to fetch files');
      }
    } catch (err) {
      console.error('Error fetching files:', err);
      setError(err.message);
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
    
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchFiles, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return { files, isLoading, error, refetch: fetchFiles };
}
