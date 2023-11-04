import axios from "./axios";
import tables from '../constants/adminTables.json'

export async function fetchAdminData(url) {
    try {
        const response = await axios.get(`/admin/${url}`)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function addAdminData(type, payload) {

    const addUrl = tables.find(item => item.eng === type)?.add

    try {
        const response = await axios.post(`/admin/${addUrl}`, null, { params: payload })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function deleteAdminData(type, payload) {

    const deleteUrl = tables.find(item => item.eng === type)?.delete

    try {
        const response = await axios.delete(`/admin/${deleteUrl}`, null, { params: payload })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
