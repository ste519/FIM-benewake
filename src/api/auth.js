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
        const cookies = document.cookie.split('; ').map(cookie => cookie.trim())
        const filteredCookies = cookies.filter(cookie => {
            return !cookie.startsWith("ticket=") &&
                !cookie.startsWith("benewakeusername=") &&
                !cookie.startsWith("benewakeuserType=");
        });

        document.cookie = "ticket=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "benewakeusername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "benewakeuserType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        filteredCookies.forEach(cookie => {
            document.cookie = cookie;
        });
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}


