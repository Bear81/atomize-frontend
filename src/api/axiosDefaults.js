import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/'; // change for production
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; // cookies/session handling

export default axios;
