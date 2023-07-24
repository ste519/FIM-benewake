import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8080/benewake',
    withCredentials: true
});
api.defaults.withCredentials = true;

export default api;