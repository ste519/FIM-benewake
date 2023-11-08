const createColumn = (cn, eng, width) => {
    return { cn, eng, width };
};

const adminDefs = [
    createColumn("客户类型", "customerType", 80),
    createColumn("订单状态", "inquiryType", 80),
    createColumn("订单状态名称", "inquiryTypeName", 140),
    createColumn("产品类型", "itemType", 80),
    createColumn("产品类型名称", "itemTypeName", 140),
    createColumn("客户ID", "customerId", 80),
    createColumn("客户名称", "customerName", 460),
    createColumn("客户名称（替换前）", "customerNameOld", 460),
    createColumn("客户名称（替换后）", "customerNameNew", 460),
    createColumn("物料编码（替换前）", "itemCodeOld", 150),
    createColumn("物料编码（替换后）", "itemCodeNew", 150),
    createColumn("销售员名称（替换前）", "salesmanNameOld", 140),
    createColumn("销售员名称（替换后）", "salesmanNameNew", 140),
    createColumn("物料编码", "itemCode", 150),
    createColumn("物料名称", "itemName", 290),
    createColumn("开始时间", "startMonth", 100),
    createColumn("订单状态名称", "typeName"),
    createColumn("客户名称", "addCustomerName"),
    createColumn("客户名称（替换前）", "oldCustomerName"),
    createColumn("客户名称（替换后）", "newCustomerName")
];

export default adminDefs;
