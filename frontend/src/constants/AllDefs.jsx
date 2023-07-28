import moment from "moment"
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
            size:36
        },
        {
            id: "salesman_name",
            header: "销售员",
            accessorKey: "salesman_name",
            size: 60
        },
        {
            id: "inquiry_code",
            header: "单据编号",
            accessorKey: "inquiry_code",
            size: 125
        },
        {
            id: "inquiry_init_type",
            header: "单据类型",
            accessorKey: "inquiry_init_type",
            size: 70
        },
        {
            id: "state",
            header: "单据状态",
            accessorKey: "state",
            size: 70
        },
        {
            id: "item_code",
            header: "物料编码",
            accessorKey: "item_code",
            size: 90
        },
        {
            id: "item_name",
            header: "物料名称",
            accessorKey: "item_name",
            size: 170
        },
        {
            id: "sale_num",
            header: "数量",
            accessorKey: "sale_num",
            size: 50
        },
        {
            id: "customer_name",
            header: "客户名称",
            accessorKey: "customer_name",
            size: 100
        },
        {
            id: "inquiry_type",
            header: "订单状态",
            accessorKey: "inquiry_type",
            size: 135
        },
        {
            id: "item_type",
            header: "产品类型",
            accessorKey: "item_type",
            size: 70
        },
        {
            id: "customer_type",
            header: "客户类型",
            accessorKey: "customer_type",
            size: 70
        },
        {
            id: "expected_time",
            header: "期望发货日期",
            accessorKey: "expected_time",
            accessorFn: row => `${moment(row.expected_time).format("YYYY/MM/DD")}`,
            size: 100
        },
        {
            id: "arranged_time",
            header: "计划反馈日期",
            accessorKey: "arranged_time",
            accessorFn: row => `${moment(row.arranged_time).format("YYYY/MM/DD")}`,
            size: 100
        },
        {
            id: "delay",
            header: "是否延期",
            accessorKey: "delay",
            size: 70
        },
        {
            id: "remark",
            header: "备注",
            accessorKey: "remark",
            size: 150
        }
    ]
export default allDefs