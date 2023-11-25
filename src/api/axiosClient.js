import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withXSRFToken = true;

const API_BASE_URL = 'https://whattest-stage.us.aldryn.io/';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosClient;
