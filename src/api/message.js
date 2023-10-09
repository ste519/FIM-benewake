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
export async function findTodos() {
    try {
        const response = await api.get('/todotask/filtered-orders')
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function findPODelay() {
    try {
        const response = await api.get('/todotask/PoDelay')
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function fetchFilteredInquiries() {
    try {
        const response = await api.get('/todotask/filtered-inquiries')
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}