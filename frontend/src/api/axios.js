import axios from "axios";
const baseURL = 'http://localhost:8080/benewake'

const api = axios.create({
    baseURL,
    withCredentials: true
});
api.defaults.withCredentials = true;

export default api