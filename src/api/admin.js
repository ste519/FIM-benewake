import axios from "./axios";
import { capitalizeFirstLetter } from '../js/parseData';

export async function fetchAdminData(type) {
    try {
        const response = await axios.get(`/admin/get${type}`)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function addAdminData(type, payload) {
    try {
        const response = await axios.post(`/admin/add${capitalizeFirstLetter(type)}`, null, { params: payload })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function deleteAdminData(type, payload) {
    try {
        const response = await axios.delete(`/admin/delete${capitalizeFirstLetter(type)}`, { params: payload })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
