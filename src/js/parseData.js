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


export function filterOut9999(data) {
    const result = data.map(row => (
        {
            ...row,
            "expected_time": row.expected_time?.slice(0, 4) === "9999" ?
                ""
                : row.expected_time
        })
    )
    return result
}

export function getStateNum(str) {
    if (!str)
        return null
    if (str === "保存")
        return "0"
    else if (str === "无效")
        return "-1"
    else {
        const regex = /询单(\d+)次/;
        const match = str.match(regex);
        if (match) {
            return match[1];
        } else {
            return null;
        }
    }
}


export function getVisbleTableData(tableData, headers_ENG) {
    return tableData.map(row => {
        let newData = {};
        headers_ENG.forEach(header => {
            if (row.hasOwnProperty(header)) {
                switch (header) {
                    case "expected_time":
                        newData[header] = row[header] && moment(row[header]).format('YYYY/MM/DD');
                        break;
                    case "arranged_time":
                        newData[header] = row[header] && moment(row[header]).format('YYYY/MM/DD');
                        break
                    case "allow_inquiry":
                        newData[header] = row[header] && "是"
                        break
                    default:
                        newData[header] = row[header]
                }
            }
            else { newData[header] = null }
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
        const res = await fetchUser(source.salesman_name, "2")
        result.salesmanId = res?.[0]?.id?.toString()
    }

    return result;
}

export async function rowToInquiry(row, inquiryType) {
    let param;

    //new inquiry
    if (inquiryType) {
        let salesmanId = null;
        if (!row?.salesmanId) {
            const res = await fetchUser(row.salesmanName, "2")
            salesmanId = res?.[0]?.id?.toString()
        }
        else {
            salesmanId = row.salesmanId.toString()
        }

        const { itemId, customerId, saleNum, expectedTime, remark, inquiryId, inquiryCode } = row

        param = {
            salesmanId,
            inquiryId,
            inquiryCode,
            itemId: itemId?.toString(),
            customerId: customerId?.toString(),
            saleNum: saleNum?.toString(),
            expectedTime: expectedTime ? moment(expectedTime).format("YYYY/MM/DD") : null,
            inquiryType: inquiryType?.toString(),
            remark
        }
    }

    //edit inquiry
    else {
        const { inquiryId, inquiryCode, inquiryType, salesmanId, itemId, customerId, saleNum, expectedTime, remark, arrangedTime, state } = row
        param = {
            inquiryId: inquiryId?.toString(),
            inquiryCode,
            salesmanId: salesmanId?.toString(),
            itemId: itemId?.toString(),
            customerId: customerId?.toString(),
            saleNum: saleNum?.toString(),
            expectedTime: expectedTime ? moment(expectedTime).format("YYYY/MM/DD") : null,
            inquiryType: getInquiryTypeInt(inquiryType)?.toString(),
            arrangedTime: arrangedTime ? moment(arrangedTime).format("YYYY/MM/DD") : null,
            state: getStateNum(state),
            remark
        }
    }
    return param
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}