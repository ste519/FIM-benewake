import api from "./axios";

export async function updatePassword(oldPassword, newPassword, rePassword) {
    try {
        const response = await api.post('/user/updatePwd', {
            oldPassword, newPassword, rePassword
        })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}