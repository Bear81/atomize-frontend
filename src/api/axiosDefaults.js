// 📄 src/api/axiosDefaults.js
import axios from 'axios';

// ✅ Base API URL (env var or local fallback)
axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/';

// ✅ Send credentials with every request
axios.defaults.withCredentials = true;

// ✅ Required for POSTs
axios.defaults.headers.post['Content-Type'] = 'application/json';

// ✅ Attach CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

axios.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
  }
  return config;
});

export default axios;
