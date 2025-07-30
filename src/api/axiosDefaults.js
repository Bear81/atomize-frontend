// 📄 src/api/axiosDefaults.js
import axios from 'axios';

// Grab CSRF token from cookies
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

// Set the backend API URL from .env.production
axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/';

// Always send cookies
axios.defaults.withCredentials = true;

// Set default headers manually
axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
