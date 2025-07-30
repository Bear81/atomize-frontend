// 📄 src/api/axiosDefaults.js
import axios from 'axios';

// Set base URL from env
axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Send cookies on cross-site requests
axios.defaults.withCredentials = true;

// ✅ Automatically attach CSRF token
axios.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken && !config.headers['X-CSRFToken']) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to read cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default axios;
