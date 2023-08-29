import api from "./axios";

export async function deleteInquiry(orderId) {
    try {
        const response = await api.post('/order/delete', { orderId })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function deleteView(viewId){
    try {
        const response = await api.post('/order/deleteView', { viewId })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
} 