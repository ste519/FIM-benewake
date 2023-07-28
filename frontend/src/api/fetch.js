import api from "./axios";
import moment from 'moment';

export async function fetchNewViews({ tableId }) {
    console.log(tableId);
    try {
        const response = await api.get('/order/views', { params: { "tableId": tableId } })

        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function fetchData({ tableId, viewId, filterCriterias, secTab }) {
    console.log("FetchData Started");
    let newCriterias = filterCriterias;
    if (secTab) {
        switch (secTab) {
            case "已完成":
                newCriterias = [...filterCriterias,
                {
                    colName: "inquiry_type",
                    condition: "like",
                    value: "PO"
                },
                {
                    colName: "order_delivery_progress",
                    condition: "like",
                    value: "已发货"
                }
                ]
                break
            case "未过期未完成":
                newCriterias = [...filterCriterias,
                {
                    colName: "expected_time",
                    condition: "ge",
                    value: moment(new Date()).format('yyyy/MM/DD')
                },
                {
                    colName: "order_delivery_progress",
                    condition: "like",
                    value: "未发货"
                }]
                break
            case "已过期未完成":
                newCriterias = [...filterCriterias,
                {
                    colName: "expected_time",
                    condition: "lt",
                    value: moment(new Date()).format('yyyy/MM/DD')
                },
                {
                    colName: "order_delivery_progress",
                    condition: "like",
                    value: "未发货"
                }]
                break
            default:
                newCriterias = filterCriterias
                break
        }
    }

    try {
        const response = await api.post('/order/Lists',
            { tableId, viewId, filterCriterias: newCriterias }
        )
        return response.data.data.lists
    }
    catch (err) {
        console.log(err);
    }
}

export async function fetchOptions(type, searchKey, searchValue) {
    try {
        const response = await api.post(`/${type}/likeList`, { [searchKey]: searchValue })
        // const options = response.data.data?.map((row) => row[searchKey])
        // setOptions(options)
        return response.data.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function fetchUser(username, userType) {
    try {
        const response = await api.post("/user/likeList", { username, userType})
        return response.data.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function fetchId({ type, searchKey, searchValue }) {
    try {
        const response = await api.post(`/${type}/likeList`, { [searchKey]: "aa" })
        console.log(response.data);
        // const options = response.data.data?.map((row) => row[searchKey])
        // setOptions(options)
        // return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
