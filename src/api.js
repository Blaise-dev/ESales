import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // une url par défaut, à modifier
  headers: {
    'Content-Type': 'application/json'
  },
});

// Nous ajoutons un interceptor pour inclure le token dans les headers si disponible
/*apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/

export default apiClient;