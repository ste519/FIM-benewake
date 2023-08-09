
import colNameDict from '../constants/ColNameDict.json'

export function VisibilityToCols(visibility) {
    return Object.entries(visibility)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => colNameDict.find(item => item.col_name_ENG === key)
        );
}

export function ColsToFilters(cols) {
    return cols
        .sort((a, b) => a.col_seq - b.col_seq)
        .filter(item => item.value_operator)
        .map(item => ({
            colName: item.col_name_ENG,
            condition: item.value_operator,
            value: item.col_value
        }));
}

export function getIndexes(rowSelection) {
    return Object.keys(rowSelection).map(Number)
}


export function EngToCn(col_name_ENG) {
    return colNameDict.find(col => col.col_name_ENG === col_name_ENG)?.col_name_CN
}

export function VisibilityToHeadersENG(visibility) {
    return Object.entries(visibility)
        .filter(([key, value]) => key !== "inquiry_id" && value === true)
        .map(([key, value]) => key)
}

export function snakeToCamelCase(snakeCaseString) {
    return snakeCaseString.replace(/_([a-z])/g, function (match, letter) {
        return letter.toUpperCase();
    });
}

export function camelToSnakeCase(camelCaseString) {
    return camelCaseString.replace(/([a-z0-9])([A-Z])/g, function (match, p1, p2) {
        return p1 + '_' + p2.toLowerCase();
    });
}

export function EngToSize(col_name_ENG) {
    return colNameDict.find(col => col.col_name_ENG === col_name_ENG)?.size
}
