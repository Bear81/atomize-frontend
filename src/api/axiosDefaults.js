// 📄 src/api/axiosDefaults.js
import axios from 'axios';

// Use correct env var name
axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
axios.defaults.withCredentials = true;

// ✅ Automatically include CSRF token from cookies
axios.interceptors.request.use(
  (config) => {
    const getCookie = (name) => {
      const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + '='))
        ?.split('=')[1];
      return cookieValue || '';
    };

    const csrftoken = getCookie('csrftoken');

    if (!config.headers['X-CSRFToken']) {
      config.headers['X-CSRFToken'] = csrftoken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
