import DatePicker from '../components/DatePicker';
import { useEffect, useState } from 'react';
import { fetchOptions } from '../api/fetch';

const DataList = ({ index, getValue, id, table, type, searchKey }) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)
    const [options, setOptions] = useState()

    const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
    }

    useEffect(() => { setValue(initialValue ?? "") }, [initialValue])

    useEffect(() => {
        console.log({ type, setOptions, searchKey, value });
        const timeout = setTimeout(async () => {
            console.log(await fetchOptions({ type, setOptions, searchKey, value }))
        }, 500);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <>
            <input
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={onBlur}
                name={id}
                list={type}
            />
            <datalist id={type}>
                {options?.map((item) =>
                    <option key={item} value={item} />)}
            </datalist >
        </>
    )
}

const Input = ({ index, getValue, id, table, readOnly, type }) => {

    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
    }

    useEffect(() => { setValue(initialValue ?? "") }, [initialValue])

    return (
        <>
            {readOnly ?
                <input
                    readOnly={readOnly}
                    defaultValue={value}
                    name={id}
                /> :
                <input
                    type={type}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={onBlur}
                    name={id}
                />
            }
        </>
    )
}


export const newDefs = [
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
        header: "序号",
        id: "inquirySeq",
        cell: ({ row }) => row.index + 1,
        size: 50
    },
    {
        header: "物料编码 *",
        id: "itemCode",
        accessorKey: 'itemCode',
        cell: ({ index, getValue, id, table }) =>
            <DataList
                index={index}
                getValue={getValue}
                id={id}
                table={table}
                type={"item"}
                searchKey={"itemCode"}
            />,
        size: 90
    },
    {
        header: "物料名称",
        id: "itemName",
        accessorKey: 'itemName',
        cell: ({ row: { index }, getValue, column: { id }, table }) =>
            <Input index={index} id={id} readOnly={true} getValue={getValue} table={table} type="text" />,
        size: 170
    },
    {
        header: "数量 *",
        id: "saleNum",
        accessorKey: 'saleNum',
        cell: ({ row: { index }, getValue, column: { id }, table }) =>
            <Input index={index} id={id} readOnly={false} getValue={getValue} table={table} type="number" />,
        size: 50
    },
    {
        header: "客户名称 *",
        id: "customerName",
        accessorKey: 'customerName',
        cell: ({ row: { index }, getValue, column: { id }, table }) =>
            <Input index={index} id={id} readOnly={false} getValue={getValue} table={table} type="text" />,
        size: 200
    },
    {
        header: "销售员 *",
        id: "salesmanName",
        accessorKey: "salesmanName",
        cell: ({ index, getValue, id, table }) =>
            <DataList
                index={index}
                getValue={getValue}
                id={id}
                table={table}
                type={"user"}
                searchKey={"username"}
            />,
        size: 60
    },
    {
        header: "产品类型",
        id: "itemType",
        accessorKey: 'itemType',
        cell: ({ row: { index }, getValue, column: { id }, table }) =>
            <Input index={index} id={id} readOnly={true} getValue={getValue} table={table} type="text" />,
        size: 70
    },
    {
        header: "客户类型",
        id: "customerType",
        accessorKey: 'customerType',
        cell: ({ row: { index }, getValue, column: { id }, table }) =>
            <Input index={index} id={id} readOnly={true} getValue={getValue} table={table} type="text" />,
        size: 70
    },
    {
        header: "期望发货日期 *",
        id: "expectedTime",
        accessorKey: 'expectedTime',
        // cell: ({ data, handleChange }) => <DatePicker selected={data?.expectedTime}
        //     onChange={(date) => handleChange("expectedTime", date)}
        // />,
        size: 100
    },
    {
        header: "计划反馈日期", accessorKey: "arrangedTime", id: "arrangedTime",
        cell: ({ row: { index }, getValue, column: { id }, table }) =>
            <Input index={index} id={id} readOnly={true} getValue={getValue} table={table} type="text" />,
        size: 100
    },
    {
        header: "是否延期", accessorKey: "isLate", id: "isLate",
        cell: ({ row: { index }, getValue, column: { id }, table }) =>
            <Input index={index} id={id} readOnly={true} getValue={getValue} table={table} type="text" />,
        size: 70
    },
    {
        header: "备注",
        id: "remark",
        accessorKey: 'remark',
        cell: ({ getValue, row: { index }, column: { id }, table }) => {
            <Input index={index} id={id} readOnly={true} getValue={getValue} table={table} type="text" />
        },
        size: 200
    }
]


export const newRow = {
    itemCode: "",
    itemName: "",
    saleNum: "",
    customerName: "",
    salesmanName: "",
    itemType: "",
    customerType: "",
    expectedTime: "",
    arrangedTime: "",
    isLate: "",
    remark: ""
}