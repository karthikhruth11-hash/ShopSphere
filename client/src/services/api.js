import axios from 'axios';

const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const defaultBaseURL = isLocal ? 'http://localhost:5000/api' : '/api';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || defaultBaseURL,
  timeout: 5000
});

// Automatically attach JWT token from localStorage to requests
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;