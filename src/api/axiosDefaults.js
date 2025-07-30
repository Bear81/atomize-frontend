// 📄 src/api/axiosDefaults.js
import axios from 'axios';

// Detect baseURL from env or fallback
axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/';

// Make sure cookies (sessionid + csrf) are sent
axios.defaults.withCredentials = true;

// Extract CSRF token from cookie and attach to request headers
axios.interceptors.request.use(
  (config) => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
