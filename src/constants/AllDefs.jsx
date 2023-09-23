import moment from "moment"
import colNameDict from './ColNameDict.json'
const allDefs =
    [
        {
            id: "select",
            header: ({ table }) => (
                <input
                    type="checkbox"
                    name={table.id}
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) =>
                <input type="checkbox"
                    name={row.id}
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ,
            enableSorting: false,
            enableHiding: false,
            enableResizing: false,
            size: 36
        },
        ...colNameDict.map(item => ({
            id: item.col_name_ENG,
            header: item.col_name_CN,
            accessorKey: item.col_name_ENG,
            accessorFn: (row) => {
                if (item.col_name_ENG === "expected_time" || item.col_name_ENG === "arranged_time") {
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
    ]
export default allDefs