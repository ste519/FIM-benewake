import moment from "moment";
const createColumn = (header, identifier, type, width, autoIncrement, readonly) => {
    return {
        header,
        identifier,
        type,
        width,
        element: (data) =>
            <span>{identifier === "startMonth" ? moment(data.startMonth).format('YYYY/MM/DD') : data[identifier]}</span>
    };
};

const adminDefs = [
    createColumn("客户类型", "customerType", "customerType", 80),
    createColumn("订单状态", "inquiryType", "inquiryType", 80),
    createColumn("订单状态名称", "inquiryTypeName", "inquiryType", 140),
    createColumn("产品类型", "itemType", "itemType", 80),
    createColumn("产品类型名称", "itemTypeName", "itemType", 140),
    createColumn("客户ID", "customerId", "customerName", 80),
    createColumn("客户名称", "customerName", "customerName", 460),
    createColumn("客户名称（替换前）", "customerNameOld", "customerRename", 460),
    createColumn("客户名称（替换后）", "customerNameNew", "customerRename", 460),
    createColumn("物料编码（替换前）", "itemCodeOld", "itemChange", 150),
    createColumn("物料编码（替换后）", "itemCodeNew", "itemChange", 150),
    createColumn("客户名称", "customerName", "customizedItemChange", 460),
    createColumn("物料编码（替换前）", "itemCodeOld", "customizedItemChange", 150),
    createColumn("物料编码（替换后）", "itemCodeNew", "customizedItemChange", 150),
    createColumn("物料编码", "itemCode", "pastChooseItem", 150),
    createColumn("物料名称", "itemName", "pastChooseItem", 290),
    createColumn("开始时间", "startMonth", "pastChooseItem", 100),
];

export default adminDefs;
