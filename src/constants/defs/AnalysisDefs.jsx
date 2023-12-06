import { snakeToCamelCase } from "../../js/transformType";
const createAnalysisDef = (header, id, size = 80) => ({
    id: snakeToCamelCase(id),
    header,
    accessorKey: snakeToCamelCase(id),
    size
});

const analysisDefs = [
    createAnalysisDef("序号", "serial_num", 50),
    createAnalysisDef("物料编码", "item_code", 150),
    createAnalysisDef("物料名称", "item_name", 290),
    createAnalysisDef("年", "sale_year"),
    createAnalysisDef("季度", "sale_quarter"),
    createAnalysisDef("季度销量", "quarter_item_sale_num"),
    createAnalysisDef("季度月平均", "sales_share"),
    createAnalysisDef("产品月平均", "month_avg"),
    createAnalysisDef("大于百分比之和", "over_line_percentage"),
    createAnalysisDef("大于百分比个数", "over_line_num"),
    createAnalysisDef("剩余百分比", "rest_percentage"),
    createAnalysisDef("剩余个数", "rest_num"),
    createAnalysisDef("月度平均比例", "month_avg_proportion"),
    createAnalysisDef("客户名称", "customer_name"),
    createAnalysisDef("销售员", "salesman_name", 100),
    createAnalysisDef("日期", "sale_time"),
    createAnalysisDef("订单号码", "order_code"),
    createAnalysisDef("1为标黄", "is_yellow"),
    createAnalysisDef("客户", "customer"),
    createAnalysisDef("次数", "sale_times"),
    createAnalysisDef("客户购买总额", "total_customer_item_num"),
    createAnalysisDef("销售员产品销售总额", "salesman_sale_num", 140),
    createAnalysisDef("产品销售总额", "total_item", 100),
    createAnalysisDef("产品销售总额", "itemSaleNum", 100),
    createAnalysisDef("客户购买占比", "customer_proporation"),
    createAnalysisDef("大于比值个数", "over_proportion_num"),
    createAnalysisDef("1为标黄", "one_is_yellow"),
    createAnalysisDef("客户类型", "customer_type"),
    createAnalysisDef("有效月份", "total_months"),
    createAnalysisDef("最大值", "max_")
];

export default analysisDefs;
