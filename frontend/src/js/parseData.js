import moment from 'moment';
import { fetchOptions, fetchUser } from '../api/fetch';

export function getInquiryTypeInt(str) {
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

export function getStateStr(num) {
    if (num == 0)
        return "保存"
    else if (num == -1)
        return "无效"
    else
        return `询单${num}次`
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
        "inquiryId": source["inquiry_id"]?.toString(),
        "inquiryCode": source["inquiry_code"]?.toString(),
        "salesmanId": source["salesman_id"]?.toString(),
        "itemId": source["item_id"]?.toString(),
        "state": "0",
        "customerId": source["customer_id"]?.toString(),
        "saleNum": source["sale_num"]?.toString(),
        "expectedTime": moment(source["expected_time"]).format('yyyy/MM/DD'),
        "inquiryType": getInquiryTypeInt(source["inquiry_type"])?.toString(),
        "remark": source["remark"]
    }

    if (!result.customerId) {
        const res = await fetchOptions("customer", "customerName", source.customer_name)
        result.customerId = res?.[0]?.fcustId?.toString()
    }
    if (!result.itemId) {
        const res = await fetchOptions("item", "itemCode", source.item_code)
        result.itemId = res?.[0]?.id?.toString()
    }
    if (!result.salesmanId) {
        const res = await fetchUser(source.salesman_name)
        result.salesmanId = res?.[0]?.id?.toString()
    }

    return result;
}

export function rowToInquiry(row, inquiryType, state) {
    let param;
    if (inquiryType) {
        const { salesmanId, itemId, customerId, saleNum, expectedTime, remark } = row
        param = {
            salesmanId: salesmanId?.toString(),
            itemId: itemId?.toString(),
            customerId: customerId?.toString(),
            saleNum: saleNum?.toString(),
            expectedTime: expectedTime ? moment(expectedTime).format("YYYY/MM/DD") : null,
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
            expectedTime: expectedTime ? moment(expectedTime).format("YYYY/MM/DD") : null,
            inquiryType: getInquiryTypeInt(inquiryType)?.toString(),
            remark
        }
    }
    return param
}