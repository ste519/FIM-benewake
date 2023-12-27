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


export async function saveDivideList(
    inquiryList) {
    const updatedList = inquiryList.map(inquiry => ({
        ...inquiry,
        inquiryCode: null
    }));
    try {
        const response = await api.post('/order/saveDivideList',
            { inquiries: updatedList, inquiryCode: inquiryList[0].inquiryCode }
        )
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function allowInquiry(ids) {
    try {
        const response = await api.post('/order/allowinquiry', ids)
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
        arrangedTime,
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
            arrangedTime,
            state,
            remark
        })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const restoreInquiry = async (inquiryCodes) => {
    try {
        const response = await api.post('/order/restoreOrder',  inquiryCodes )
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}