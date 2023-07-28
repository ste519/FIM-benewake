import api from "./axios";

export async function deleteInquiry(orderId) {
    try {
        const response = await api.post('/order/delete', { orderId })
        console.log("DeleteInquiry: ", response);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
