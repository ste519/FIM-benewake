import axios from "axios";
// const baseURL = 'http://10.0.0.201:9527/benewake'
const baseURL = 'http://localhost:9527/benewake'

const api = axios.create({
    baseURL,
    withCredentials: true
});
api.defaults.withCredentials = true;

export default api