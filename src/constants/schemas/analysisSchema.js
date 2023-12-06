const createSchemaEntry = (cn, select) => ({ cn, select });

const analysisSchema = {
    allPastAnalysis: createSchemaEntry("销售员销售现况表", "getAllPastAnalysis"),
    allQuarterlySellingCondition: createSchemaEntry("季度销售现况表", "getAllQuarterlySellingCondition"),
    allMonthAvgProportion: createSchemaEntry("月度平均比例现况", "getAllMonthAvgProportion"),
    allEligibleOrders: createSchemaEntry("符合条件的中间文件", "getAllEligibleOrders"),
    allNotEligibleOrders: createSchemaEntry("不符合条件的中间文件", "getAllNotEligibleOrders"),
    allSellingConditionReplaced: createSchemaEntry("替换后的销售员销售现况", "getAllSellingConditionReplaced"),
    allQuarterlySellingConditionReplaced: createSchemaEntry("替换后的季度销售现况", "getAllQuarterlySellingConditionReplaced"),
    allMajorCustomersSituation: createSchemaEntry("主要客户现况", "getAllMajorCustomersSituation"),
    allProductDimensionSituation: createSchemaEntry("销售员用产品维度现况", "getAllProductDimensionSituation"),
    allRetailCondition: createSchemaEntry("散户现况", "getAllRetailCondition"),
    allRetailQuarterlySellingCondition: createSchemaEntry("散户季度现况", "getAllRetailQuarterlySellingCondition"),
    allCustomerTypeOrdersReplaced: createSchemaEntry("客户类型分类-订单版（替换后）", "getAllCustomerTypeOrdersReplaced"),
    allCustomerTypeOrdersBack: createSchemaEntry("客户类型分类-订单版（已还原）", "getAllCustomerTypeOrdersBack"),
    allCustomerTypeordersMonthlyReplaced: createSchemaEntry("客户类型分类-月份版（替换后）", "getAllCustomerTypeordersMonthlyReplaced"),
    allCustomerTypeordersMonthlyBack: createSchemaEntry("客户类型分类-月份版（已还原）", "getAllCustomerTypeordersMonthlyBack"),

};

export default analysisSchema;