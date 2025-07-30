// 📄 src/api/axiosDefaults.js

import axios from 'axios';

// ✅ Set the backend API base URL
axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// ✅ Allow credentials like sessionid and csrftoken to be sent with requests
axios.defaults.withCredentials = true;

// ✅ CSRF interceptor for unsafe methods
axios.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken');

  if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  return config;
});

// ✅ Cookie reader helper
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
