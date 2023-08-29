import moment from "moment"

const InventoryDefs = [
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
    {
        id: "item-info",
        enableResizing: false,
        columns: [

            {
                id: "物料编码",
                header: "物料编码",
                accessorKey: "物料编码",
                size: 130
            },
            {
                id: "物料名称",
                header: "物料名称",
                accessorKey: "物料名称",
                size: 130
            }]
    },
    {
        header: "今日",
        enableResizing: false,
        columns: [
            {
                id: "即时库存",
                header: "即时库存",
                accessorKey: "即时库存",
                size: 60
            },
            {
                id: "PO占用1",
                header: "PO占用",
                accessorKey: "PO占用",
                size: 60
            },
            {
                id: "PR占用1",
                header: "PR占用",
                accessorKey: "PR占用",
                size: 60
            },
            {
                id: "YG占用1",
                header: "YG占用",
                accessorKey: "YG占用",
                size: 60
            },
            {
                id: "可用1",
                header: "可用",
                accessorKey: "可用",
                size: 60
            }
        ]
    },
    {
        header: "首批入库时间",
        enableResizing: false,
        columns: [
            {
                id: "入库时间2",
                header: "入库时间",
                accessorKey: "入库时间",
                accessorFn: row => `${moment(row.arranged_time).format("YYYY/MM/DD")}`,
                size: 80
            },
            {
                id: "PO占用2",
                header: "PO占用",
                accessorKey: "PO占用",
                size: 60
            },
            {
                id: "PR占用2",
                header: "PR占用",
                accessorKey: "PR占用",
                size: 60
            },
            {
                id: "YG占用2",
                header: "YG占用",
                accessorKey: "YG占用",
                size: 60
            },
            {
                id: "入库数量2",
                header: "入库数量",
                accessorKey: "入库数量",
                size: 70
            },
            {
                id: "预计可用2",
                header: "预计可用",
                accessorKey: "预计可用",
                size: 70
            }
        ]
    },
    {
        header: "次批入库时间",
        enableResizing: false,
        columns: [
            {
                id: "入库时间3",
                header: "入库时间",
                accessorKey: "入库时间",
                accessorFn: row => `${moment(row.arranged_time).format("YYYY/MM/DD")}`,
                size: 80
            },
            {
                id: "PO占用3",
                header: "PO占用",
                accessorKey: "PO占用",
                size: 60
            },
            {
                id: "PR占用3",
                header: "PR占用",
                accessorKey: "PR占用",
                size: 60
            },
            {
                id: "YG占用3",
                header: "YG占用",
                accessorKey: "YG占用",
                size: 60
            },
            {
                id: "入库数量3",
                header: "入库数量",
                accessorKey: "入库数量",
                size: 70
            },
            {
                id: "预计可用3",
                header: "预计可用",
                accessorKey: "预计可用",
                size: 70
            }
        ]
    }
]

export default InventoryDefs