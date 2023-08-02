import api from "./axios";
import moment from 'moment';
import { VISIBILITY_ALL_FALSE } from "../constants/Global";

const inquiryTypeObject = value => ({
    colName: "inquiry_type",
    condition: "like",
    value
});

const deliveryProgressObject = value => ({
    colName: "order_delivery_progress",
    condition: "like",
    value
});

const expectedTimeObject = condition => ({
    colName: "expected_time",
    condition,
    value: moment(new Date()).format('yyyy/MM/DD')
});

const customerTypeObject = value => ({
    colName: "customer_type",
    condition: "eq",
    value
});

const itemTypeObject = value => ({
    colName: "item_type",
    condition: "eq",
    value
});

const inquiryInitTypeObject = value => ({
    colName: "inquiry_init_type",
    condition: "like",
    value
});

const stateObject = value => ({
    colName: "state",
    condition: "eq",
    value
});

const secTabMapping = {
    "已完成": [
        inquiryTypeObject("PO"),
        deliveryProgressObject("已发货")
    ],
    "未过期未完成": [
        expectedTimeObject("ge"),
        deliveryProgressObject("未发货")
    ],
    "已过期未完成": [
        expectedTimeObject("lt"),
        deliveryProgressObject("未发货")
    ]
};

const orderMapping = {
    1: [inquiryTypeObject("PO")],
    2: [inquiryTypeObject("PR")],
    3: [inquiryTypeObject("YG")],
    4: [inquiryTypeObject("YC")],
    5: [inquiryTypeObject("XD")]
};

const customerMapping = {
    1: [customerTypeObject("年度")],
    2: [customerTypeObject("月度")],
    3: [customerTypeObject("日常")],
    4: [customerTypeObject("代理商")],
    5: [customerTypeObject("新增")],
    6: [customerTypeObject("临时")]
};

const itemMapping = {
    1: [itemTypeObject("已有标品")],
    2: [itemTypeObject("已有定制")],
    3: [itemTypeObject("新增软件定制")],
    4: [itemTypeObject("新增原材料定制")],
    5: [itemTypeObject("新增原材料+软件定制")]
};

const inquiryMapping = {
    1: [inquiryTypeObject("XD")],//现有询单
    2: [inquiryTypeObject("YC")],//现有预测
    3: [inquiryTypeObject("XD"), stateObject("-1")],//删除询单
    4: [inquiryTypeObject("YC"), stateObject("-1")],//删除预测
    5: [inquiryInitTypeObject("XD"), inquiryTypeObject("PR")],//XD已变PR询单
    6: [inquiryInitTypeObject("YC"), inquiryTypeObject("PR")],//YC已变PR询单
    7: [inquiryInitTypeObject("XD"), inquiryTypeObject("PO")],//XD已变PO询单
    8: [inquiryInitTypeObject("YC"), inquiryTypeObject("PO")]//YC已变PO询单
};

export async function fetchData({ tableId, viewId, filterCriterias, secTab }) {
    console.log("FetchData Started");
    let newCriterias = filterCriterias;
    let newViewId = viewId
    if (secTab) {
        const additionalCriterias = secTabMapping[secTab];
        if (additionalCriterias) {
            newCriterias = [...newCriterias, ...additionalCriterias];
        }
    }
    if (tableId === 2) {
        const additionalCriterias = orderMapping[viewId];
        if (additionalCriterias) {
            newCriterias = [...newCriterias, ...additionalCriterias];
            newViewId = -1
        }
    }

    if (tableId === 3) {
        const additionalCriterias = customerMapping[viewId];
        if (additionalCriterias) {
            newCriterias = [...newCriterias, ...additionalCriterias];
            newViewId = -1
        }
    }

    if (tableId === 4) {
        const additionalCriterias = itemMapping[viewId];
        if (additionalCriterias) {
            newCriterias = [...newCriterias, ...additionalCriterias];
            newViewId = -1
        }
    }

    if (tableId === 5) {
        const additionalCriterias = inquiryMapping[viewId];
        if (additionalCriterias) {
            newCriterias = [...newCriterias, ...additionalCriterias];
            newViewId = -1
        }
    }

    try {
        const res = await api.post('/order/Lists',
            { tableId, viewId: newViewId, filterCriterias: newCriterias }
        )

        const { lists, cols } = res?.data?.data || {};

        let columnVisibility = { ...VISIBILITY_ALL_FALSE }

        console.log(lists, cols);
        cols.forEach(col => columnVisibility[col.col_name_ENG] = true);
        console.log(columnVisibility);

        return { lists: lists, columnVisibility: columnVisibility, cols: cols }
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
        const response = await api.post("/user/likeList", { username, userType })
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

export async function fetchNewViews(tableId) {
    try {
        const response = await api.post('/order/views', { tableId })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
