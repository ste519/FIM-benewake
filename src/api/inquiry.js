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