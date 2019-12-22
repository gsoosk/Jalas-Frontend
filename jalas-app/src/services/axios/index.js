import axios from 'axios';
import { baseConfig } from './config';

const Axios = axios.create(baseConfig);
Axios.interceptors.request.use((config) => {
  if (config.url === '/login') return config;
  config.headers.Authorization = `Token ${localStorage.getItem('token')}`;
  return config;
});

Axios.interceptors.response.use(response => response, (error) => {
  if (error.response && error.response.status === 401) window.location.href = '/login';
  return Promise.reject(error);
});

export default Axios;
