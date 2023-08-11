import axios from "./axios";

export async function login({ username, password }) {
    try {
        const response = await axios.post('/login', {
            username, password
        })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function createUser({ username, password, userType }) {
    try {
        const response = await axios.post('/admin/add', {
            username, password, userType
        })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function logout() {

    try {
        const response = await axios.get('/logout')
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}


