import api from "./axios";

export async function postMessage(message, type) {
    try {
        const response = await api.post('/notice/save', { message, type })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}


export async function deleteMessages(ids) {
    try {
        const response = await api.post('/notice/delete', ids)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function findMessages(createUsername) {
    try {
        const response = await api.post('/notice/find', { createUsername })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}