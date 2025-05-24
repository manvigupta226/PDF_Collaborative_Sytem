import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Update with your backend URL on deployment
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
