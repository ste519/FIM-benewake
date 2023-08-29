export function noData(tableData) {
    return (!tableData || tableData.length <= 0)
}

export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function noVisibleCols(visibility) {
    return !Object.values(visibility).includes(true)
}