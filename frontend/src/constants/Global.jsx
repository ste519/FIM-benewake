import New from "../routes/New"
import colNameDict from './ColNameDict.json'
export const NEW_INQUIRY_TAB = { name: "新增询单", path: "new", element: <New /> }

export const VISIBILITY_ALL_FALSE = colNameDict.reduce((newObj, col) => ({ ...newObj, [col.col_name_ENG]: false }), {})

export const VISIBILITY_ALL_TRUE = colNameDict.reduce((newObj, col) => ({ ...newObj, [col.col_name_ENG]: true }), {})