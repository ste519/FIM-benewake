import React, { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import { useLoaderData } from 'react-router-dom';
import Checkbox from './Checkbox';


const DataList = ({ value, handleChange, identifier }) => {
    const options = useLoaderData()
    return (
        <>
            <input list={identifier} name={identifier}
                value={value}
                onChange={(e) => handleChange(identifier, e.target.value)} />
            <datalist id={identifier}>
                {options[identifier]?.map((item) =>
                    <option key={item} value={item} />)}
            </datalist >
        </>
    )
}

const Row = ({ rowIndex, data, updateCells, addRow, removeRow, isSelected }) => {

    const handleChange = (key, newData) => {
        updateCells(key, newData, rowIndex)
    }

    const schema = [
        {
            header: "物料编码 *",
            identifier: "itemCode",
            element:
                <DataList
                    value={data.itemCode}
                    handleChange={handleChange}
                    identifier={"itemCode"}
                />
        },
        {
            header: "物料名称",
            identifier: "itemName",
            element: <input type="text" name="itemName" disabled
                value={data.itemName} />
        },
        {
            header: "数量 *",
            identifier: "saleNum",
            element: <input type="number" value={data.saleNum} onChange={(e) => handleChange("saleNum", e.target.value)} />
        },
        {
            header: "客户名称 *",
            identifier: "customerName",
            element:
                <DataList
                    value={data.customerName}
                    handleChange={handleChange}
                    identifier={"customerName"}
                />
        },
        {
            header: "销售员 *",
            identifier: "salesmanName",
            element: <DataList
                value={data.salesmanName}
                handleChange={handleChange}
                identifier={"salesmanName"}
            />
        },
        {
            header: "产品类型",
            identifier: "itemType",
            element: <input type="text" name="itemType" disabled
                value={data.itemType} />
        },
        {
            header: "客户类型",
            identifier: "customerType",
            element: <input type="text" name="customerType" disabled
                value={data.customerType} />
        },
        {
            header: "期望发货日期 *", identifier: "expectedTime",
            element: <DatePicker selected={data.expectedTime}
                onChange={(date) => handleChange("expectedTime", date)}
            />
        },
        {
            header: "计划反馈日期", identifier: "arrangedTime",
            element: <input type="text" name="arrangedTime" disabled
                value={data.arrangedTime} />
        },
        {
            header: "是否延期", identifier: "isLate",
            element: <input type="text" name="isLate" disabled
                value={data.isLate} />
        },
        {
            header: "备注",
            identifier: "remark",
            element: <input type="textarea" name="remark" />
        }
    ]

    return (
        <tr className={isSelected ? "selected" : ""}>
            <td><Checkbox addRow={addRow} removeRow={removeRow} isSelected={isSelected} /></td>
            <td className=''>{rowIndex}</td>
            {schema.map((cell, i) => <td key={i}>{cell.element}</td>)}
        </tr>
    )
}
const NewTable = () => {
    const headers = ["序号", "物料编码 *", "物料名称", "数量 *", "客户名称 *", "销售员 *", "产品类型", "客户类型", "期望发货日期 *", "计划反馈日期", "是否延期", "备注"]

    const newRow = {
        itemCode: "",
        itemName: "",
        saleNum: undefined,
        customerName: "",
        salesmanName: "",
        itemType: "",
        customerType: "",
        expectedTime: "",
        arrangedTime: "",
        isLate: "",
        remark: ""
    }

    const [rows, setRows] = useState([newRow])
    const [selectedRows, setSelectedRows] = useState([])
    const handleAddRow = () => setRows([...rows, newRow])

    const handleDuplicateRow = () => {
        let selectedRowData = selectedRows.map((id) => rows[id])
        setRows([...rows, ...selectedRowData])
    }


    const addSelectedRow = (rowIndex) => setSelectedRows([...selectedRows, rowIndex])
    const addAllRows = () => setSelectedRows(Object.keys(rows).map((num) => parseInt(num)))
    const removeSelectedRow = (rowIndex) => setSelectedRows(selectedRows.filter((index) => index !== rowIndex))
    const removeAllRows = () => { setSelectedRows([]) }

    const handleDeleteRow = () => { }
    const updateCells = (key, value, rowIndex) => {
        const copy = [...rows]
        copy[rowIndex] = { ...copy[rowIndex], [key]: value }
        setRows(copy)
    }
    useEffect(() => console.log(selectedRows), [selectedRows])
    return (
        <div className='col new-table-container'>
            <div className='row new-table-controls'>
                <button onClick={handleAddRow}>新增行</button>
                <button onClick={handleDuplicateRow}>复制行</button>
                <button onClick={handleDeleteRow}>删除行</button>
            </div>
            <div className='new-table-wrapper'>
                <table className="new-table">
                    <thead>
                        <tr>
                            <th><Checkbox addRow={addAllRows} removeRow={removeAllRows} isSelected={selectedRows?.length > 0} /></th>
                            {headers.map((header, i) => <th key={i}>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) =>
                            <Row
                                key={i}
                                rowIndex={i}
                                data={row}
                                updateCells={updateCells}
                                isSelected={selectedRows.includes(i)}
                                addRow={() => addSelectedRow(i)}
                                removeRow={() => removeSelectedRow(i)}
                            />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NewTable;