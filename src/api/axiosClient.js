import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withXSRFToken = true;

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;
console.log(`API_BASE_URL: ${API_BASE_URL}`);

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosClient;
