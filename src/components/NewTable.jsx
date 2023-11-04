import DatePicker from './DatePicker';
import Checkbox from './Checkbox';
import { useState, useEffect } from 'react';
import { NEW_INQUIRY_DATA, NEW_INQUIRY_HEADERS } from '../constants/Global';
import ResizableHeader from './ResizableHeader';
import newDefs from '../constants/defs/NewDefs';
import { fetchCustomerType } from '../api/fetch';
import { EngToSize, camelToSnakeCase } from '../js/transformType';
import { useAuthContext } from '../hooks/useCustomContext';


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

    return (
        <div className={`tr${isSelected ? " selected" : ""}`}>
            <div className='td fixed'>
                <Checkbox addRow={addRow} removeRow={removeRow} isSelected={isSelected} />
            </div>
            <div className='td fixed' style={{ width: 45 }}>{rowIndex + 1}</div>

            {newDefs.map((cell, i) =>
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

    const new_inquiry_data = { ...NEW_INQUIRY_DATA, salesmanName: auth.userType == "2" ? auth.username : "" }
    const handleAddRow = () => setRows([...rows, new_inquiry_data])
    const handleDuplicateRow = () => {
        const selectedRowData = selectedRows.map((id) => ({ ...rows[id], inquiryCode: undefined, inquiryId: undefined }))
        setRows([...rows, ...selectedRowData])
    }
    const handleDeleteRow = () => {
        setRows(prev => prev.filter((_, index) => !selectedRows.includes(index)))
        setSelectedRows([])
    }

    const [colWidths, setColWidths] = useState(
        newDefs.map(
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