import New from "../routes/New"
import Edit from "../routes/Edit"
import colNameDict from './ColNameDict.json'

export const VISIBILITY_ALL_FALSE = colNameDict.reduce((newObj, col) => ({ ...newObj, [col.col_name_ENG]: false }), {})

export const VISIBILITY_ALL_TRUE = colNameDict.reduce((newObj, col) => ({ ...newObj, [col.col_name_ENG]: true }), {})

export const NEW_INQUIRY_TAB = { name: "新增询单", path: "new", element: <New /> }

export const EDIT_INQUIRY_TAB = { name: "修改询单", path: "edit", element: <Edit /> }

export const NEW_INQUIRY_HEADERS = ["物料编码 *", "物料名称", "数量 *", "客户名称 *", "销售员 *", "产品类型", "客户类型", "期望发货日期 *", "计划反馈日期", "是否延期", "备注"]

export const ADMIN_USER = 1

export const NEW_INQUIRY_DATA = {
    itemCode: "",
    itemName: "",
    inquiryId: undefined,
    itemId: "",
    saleNum: undefined,
    customerName: "",
    customerId: "",
    salesmanName: "",
    itemType: "",
    customerType: "",
    expectedTime: "",
    arrangedTime: "",
    isLate: "",
    remark: ""
}