import moment from "moment"
import colNameDict from '../ColNameDict.json'
const allDefs =
    colNameDict.map(item => ({
        id: item.col_name_ENG,
        header: item.col_name_CN,
        accessorKey: item.col_name_ENG,
        accessorFn: (row) => {
            if (["expected_time", "arranged_time", "create_time", "update_time"].includes(item.col_name_ENG)) {
                return (row[item.col_name_ENG] ?
                    moment(row[item.col_name_ENG]).format("YYYY/MM/DD")
                    : null)
            }
            else if (item.col_name_ENG === "allow_inquiry" && row[item.col_name_ENG]) {
                return "是"
            }
            else {
                return row[item.col_name_ENG]
            }
        },
        size: item.size
    }))
export default allDefs