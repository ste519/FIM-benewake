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


export async function updateInquiry(
    { inquiryId,
        inquiryType,
        inquiryCode,
        itemId,
        saleNum,
        customerId,
        expectedTime,
        salesmanId,
        state,
        remark }) {
    try {
        const response = await api.post('/order/update', {
            inquiryId,
            inquiryType,
            inquiryCode,
            itemId,
            saleNum,
            customerId,
            expectedTime,
            salesmanId,
            state,
            remark
        })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}