import moment from 'moment';
import { fetchOptions, fetchUser } from '../api/fetch';

function getInquiryTypeInt(str) {
    switch (str) {
        case "PO(客户付款)":
            return 1
        case "PR(客户提出付款意向)":
            return 2
        case "YG(供应链预估)":
            return 3
        case "YC(销售预测)":
            return 4
        case "XD(意向询单)":
            return 5
    }
}

export function getVisbleTableData(tableData, headers_ENG) {
    return tableData.map(row => {
        let newData = {};
        headers_ENG.forEach(header => {
            if (row.hasOwnProperty(header)) {
                newData[header] = row[header];
            }
        });
        return newData;
    });
}

export function getColParams(col, seq, filters) {
    return {
        colId: col.col_id,
        colSeq: seq,
        colValue: filters.find(filter => filter.colName === col.col_name_ENG)?.value,
        valueOperator: filters.find(filter => filter.colName === col.col_name_ENG)?.condition
    }
}

export async function parseInquiryObj(source) {
    const result = {
        "inquiryId": source["inquiry_id"],
        "inquiryCode": source["inquiry_code"],
        "salesmanId": source["salesman_id"],
        "itemId": source["item_id"],
        "customerId": source["customer_id"],
        "saleNum": source["sale_num"],
        "expectedTime": moment(source["expected_time"]).format('yyyy/MM/DD'),
        "inquiryType": getInquiryTypeInt(source["inquiry_type"]),
        "remark": source["remark"]
    }

    if (!result.customerId) {
        const res = await fetchOptions("customer", "customerName", source.customer_name)
        result.customerId = res?.[0]?.fcustId
    }
    if (!result.itemId) {
        const res = await fetchOptions("item", "itemCode", source.item_code)
        result.itemId = res?.[0]?.id
    }
    if (!result.salesmanId) {
        const res = await fetchUser(source.salesman_name)
        result.salesmanId = res?.[0]?.id
    }

    return result;
}

export function rowToInquiry(row, inquiryType) {
    let param;
    console.log(row);
    if (inquiryType) {
        const { salesmanId, itemId, customerId, saleNum, expectedTime, remark } = row
        param = {
            salesmanId: salesmanId?.toString(),
            itemId: itemId?.toString(),
            customerId: customerId?.toString(),
            saleNum: saleNum?.toString(),
            expectedTime: moment(expectedTime).format("YYYY/MM/DD"),
            inquiryType: inquiryType?.toString(),
            remark
        }
    }
    else {
        const { inquiryId, inquiryCode, inquiryType, salesmanId, itemId, customerId, saleNum, expectedTime, remark } = row
        param = {
            inquiryId: inquiryId?.toString(),
            inquiryCode,
            salesmanId: salesmanId?.toString(),
            itemId: itemId?.toString(),
            customerId: customerId?.toString(),
            saleNum: saleNum?.toString(),
            expectedTime: moment(expectedTime).format("YYYY/MM/DD"),
            inquiryType: getInquiryTypeInt(inquiryType).toString(),
            remark
        }
    }
    return param
}