import axios from "axios";

// const baseURL = import.meta.env.VITE_BASE_URL;
// const baseURL = 'https://www.fim.benewake.top/benewake/'
const baseURL = 'https://fim.benewake.com/benewake/'

const api = axios.create({
    baseURL,
    withCredentials: true
});
api.defaults.withCredentials = true;

export default api