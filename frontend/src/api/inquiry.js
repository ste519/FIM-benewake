import api from "./axios";

export async function startInquiry(inquiryList, status) {
    try {
        const response = await api.post('/order/save', { inquiryList, startInquiry: status })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}