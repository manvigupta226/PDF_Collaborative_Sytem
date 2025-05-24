import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pdf-collaborative-sytem-1.onrender.com', // Update with your localhost URL while using on local
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
