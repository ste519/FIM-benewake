import DatePicker from './DatePicker';
import Checkbox from './Checkbox';
import { useState, useEffect } from 'react';
import { NEW_INQUIRY_DATA, NEW_INQUIRY_HEADERS } from '../constants/Global';
import ResizableHeader from './ResizableHeader';
import DataList from './DataList'
import { fetchCustomerType } from '../api/fetch';
import { EngToSize, camelToSnakeCase } from '../js/transformType';
import { useAuthContext } from '../hooks/useCustomContext';

const Input = ({ type, name, value, readOnly, onChange }) => {
    return (
        <input
            type={type ?? "text"}
            name={name}
            className={readOnly ? "readOnly" : ""}
            readOnly={readOnly}
            value={value ?? ""}
            onChange={onChange}
        />
    );
}

const schema = [
    {
        header: "物料编码 *",
        identifier: "itemCode",
        element:
            (data, handleChange) =>
                <DataList
                    type="item"
                    searchKey="itemCode"
                    initialValue={data.itemCode}
                    handleChange={handleChange}
                    identifier="itemCode"
                />
    },
    {
        header: "物料名称",
        identifier: "itemName",
        element:
            (data) =>
                <Input
                    name="itemName"
                    value={data.itemName}
                    readOnly
                />
    },
    {
        header: "数量 *",
        identifier: "saleNum",
        element:
            (data, handleChange) =>
                <Input
                    type="number"
                    name="saleNum"
                    value={data.saleNum}
                    onChange={(e) => handleChange(["saleNum"], [e.target.value])}
                />
    },
    {
        header: "客户名称 *",
        identifier: "customerName",
        element:
            (data, handleChange) =>
                <DataList
                    type="customer"
                    searchKey="customerName"
                    initialValue={data.customerName}
                    handleChange={handleChange}
                    identifier="customerName"
                />
    },
    {
        header: "销售员 *",
        identifier: "salesmanName",
        element:
            (data, handleChange) =>
                <DataList
                    type="user"
                    searchKey="username"
                    initialValue={data.salesmanName}
                    handleChange={handleChange}
                    identifier="salesmanName"
                />
    },
    {
        header: "产品类型",
        identifier: "itemType",
        element:
            (data) =>
                <Input
                    name="itemType"
                    value={data.itemType}
                    readOnly
                />
    },
    {
        header: "客户类型",
        identifier: "customerType",
        element:
            (data) =>
                <Input
                    name="customerType"
                    value={data.customerType}
                    readOnly
                />
    },
    {
        header: "期望发货日期 *",
        identifier: "expectedTime",
        element:
            (data, handleChange) =>
                <DatePicker selected={data.expectedTime}
                    onChange={(date) => handleChange(["expectedTime"], [date])}
                />
    },
    {
        header: "计划反馈日期",
        identifier: "arrangedTime",
        element:
            (data) => <Input
                name="arrangedTime"
                value={data.arrangedTime}
                readOnly
            />
    },
    {
        header: "是否延期",
        identifier: "isLate",
        element:
            (data) => <Input
                name="isLate"
                value={data.isLate}
                readOnly
            />
    },
    {
        header: "备注",
        identifier: "remark",
        element:
            (data, handleChange) => <Input
                name="remark"
                value={data.remark}
                onChange={(e) => handleChange(["remark"], [e.target.value])}
            />
    }
]

const Row = ({ rowIndex, data, updateCells, addRow, removeRow, colWidths, isSelected }) => {

    const handleChange = (keys, values) => {
        updateCells(keys, values, rowIndex)
    }

    useEffect(() => {
        const customerId = data.customerId
        const itemId = data.itemId
        if (customerId && customerId !== "" && itemId && itemId !== "") {
            const fetch = async () => {
                const res = await fetchCustomerType(itemId, customerId)
                handleChange(["customerType"], [res.message])
            }
            fetch()
        }

    }, [data.customerId, data.itemId])

    console.log(data);

    return (
        <div className={`tr${isSelected ? " selected" : ""}`}>
            <div className='td fixed'>
                <Checkbox addRow={addRow} removeRow={removeRow} isSelected={isSelected} />
            </div>
            <div className='td fixed' style={{ width: 45 }}>{rowIndex + 1}</div>

            {schema.map((cell, i) =>
                <div
                    style={{ width: colWidths?.[i] ?? 70 }}
                    className='td'
                    key={cell.identifier}>
                    {cell.element(data, handleChange)}
                </div>
            )}
        </div>
    )
}

const NewTable = ({ rows, setRows }) => {
    const headers = NEW_INQUIRY_HEADERS;
    const { auth } = useAuthContext()

    const [selectedRows, setSelectedRows] = useState([])
    const addSelectedRow = (rowIndex) => setSelectedRows([...selectedRows, rowIndex])
    const addAllRows = () => setSelectedRows(Object.keys(rows).map((num) => parseInt(num)))
    const removeSelectedRow = (rowIndex) => setSelectedRows(selectedRows.filter((index) => index !== rowIndex))
    const removeAllRows = () => { setSelectedRows([]) }

    const new_inquiry_data = { ...NEW_INQUIRY_DATA, salesmanName: auth.username }
    const handleAddRow = () => setRows([...rows, new_inquiry_data])
    const handleDuplicateRow = () => {
        let selectedRowData = selectedRows.map((id) => rows[id])
        setRows([...rows, ...selectedRowData])
    }
    const handleDeleteRow = () => {
        setRows(prev => prev.filter((_, index) => !selectedRows.includes(index)))
        setSelectedRows([])
    }

    const [colWidths, setColWidths] = useState(
        schema.map(
            (item) => EngToSize(camelToSnakeCase(item.identifier))
        )
    )

    const handleResize = (index, newSize) => {
        setColWidths(prev => {
            const newWidths = [...prev];
            newWidths[index] = newSize;
            return newWidths;
        });
    };
    const updateCells = (keys, values, rowIndex) => {
        const copy = [...rows]
        keys.forEach((key, i) => copy[rowIndex] = { ...copy[rowIndex], [key]: values[i] })
        setRows(copy)
    }

    return (
        <div className='col new-table-container'>
            <div className='row new-table-controls'>
                <button onClick={handleAddRow}>新增行</button>
                <button onClick={handleDuplicateRow}>复制行</button>
                <button onClick={handleDeleteRow}>删除行</button>
            </div>
            <div className='new-table-wrapper'>
                <div className="table new-table">
                    <div className='thead'>
                        <div className="tr">
                            <div className='th fixed' >
                                <Checkbox addRow={addAllRows} removeRow={removeAllRows} isSelected={selectedRows?.length > 0} />
                            </div>
                            <div className='th fixed' >序号 </div>

                            {headers.map((header, i) =>
                                <ResizableHeader
                                    key={i}
                                    width={colWidths?.[i]}
                                    onResize={handleResize}
                                    index={i}
                                >
                                    {header}
                                </ResizableHeader>)
                            }
                        </div>
                    </div>
                    <div className='tbody'>
                        {rows.map((row, i) =>
                            <Row
                                key={i}
                                rowIndex={i}
                                data={row}
                                colWidths={colWidths}
                                updateCells={updateCells}
                                isSelected={selectedRows.includes(i)}
                                addRow={() => addSelectedRow(i)}
                                removeRow={() => removeSelectedRow(i)}
                            />)}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewTable