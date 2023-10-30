import ResizableHeader from './ResizableHeader';
import Checkbox from './Checkbox';
import { useState } from 'react';
import { useAlertContext } from '../hooks/useCustomContext';
import { addAdminData, deleteAdminData } from '../api/admin';

const addConfirm = (updateAlert, type, value, handleChange) => {
    console.log(11);
    updateAlert({
        type: "SHOW_ALERT", data: {
            type: "confirm",
            message: "确认添加该行？",
            action: async () => 
            {
                const res = await addAdminData(type, { [type]: value })
            },
            cancel: () => handleChange(["customerType"], [""])
        }
    })
}

const deleteConfirm = (updateAlert, type, value) => {
    updateAlert({
        type: "SHOW_ALERT", data: {
            type: "confirm",
            message: "确认删除所选行？",
            action: async () => {
                const res = await deleteAdminData(type, { [type]: value })
                console.log(res);
            }
        }
    })
}

const Row = ({ schema, rowIndex, data, updateCells, colWidths, addRow, removeRow, isSelected }) => {
    const updateAlert = useAlertContext()

    const handleChange = (keys, values) => {
        updateCells(keys, values, rowIndex)
    }

    return (
        <div className="tr">
            <div className='td fixed'>
                <Checkbox addRow={addRow} removeRow={removeRow} isSelected={isSelected} />
            </div>
            {schema.map((cell, i) =>
                <div
                    style={{ width: colWidths?.[i] ?? 70 }}
                    className='td'
                    key={cell.identifier}>
                    {cell.element(data, handleChange,
                        (e) => addConfirm(updateAlert, cell.identifier, e.target.value, handleChange)
                    )}
                </div>
            )}
        </div>
    )
}

const AdminTable = ({ schema, colWidths, setColWidths, rows, setRows }) => {
    const updateAlert = useAlertContext()
    const [selectedRows, setSelectedRows] = useState([])
    const addSelectedRow = (rowIndex) => setSelectedRows([...selectedRows, rowIndex])
    const addAllRows = () => setSelectedRows(Object.keys(rows).map((num) => parseInt(num)))
    const removeSelectedRow = (rowIndex) => setSelectedRows(selectedRows.filter((index) => index !== rowIndex))
    const removeAllRows = () => { setSelectedRows([]) }

    const newRow = { [Object.keys(rows[0])[0]]: "", editable: true }
    const handleAddRow = () => {
        setRows([...rows, newRow])
    }

    const handleDeleteRow = () => {
        console.log(selectedRows);
        selectedRows.forEach(index => {
            const key = Object.keys(rows[index])[0];
            const value = rows[index][key];
            deleteConfirm(updateAlert, key, value);
        })
        setRows(prev => prev.filter((_, index) => !selectedRows.includes(index)))
        setSelectedRows([])
    }


    const handleResize = (index, newSize) => {
        setColWidths(prev => {
            const newWidths = [...prev];
            newWidths[index] = newSize;
            return newWidths;
        });
    };

    const updateCells = (keys, values, rowIndex) => {
        const copy = [...rows]
        keys.forEach((key, i) => copy[rowIndex] = { ...copy[rowIndex], [key]: values[i] });
        setRows(copy)
    }

    return (
        <div className='col new-table-container'>
            <div className='row new-table-controls'>
                <button onClick={handleAddRow}>新增行</button>
                <button onClick={handleDeleteRow}>删除行</button>
            </div>
            <div className='new-table-wrapper'>
                <div className="table new-table">
                    <div className='thead'>
                        <div className="tr">
                            <div className='th fixed' >
                                <Checkbox addRow={addAllRows} removeRow={removeAllRows} isSelected={selectedRows?.length > 0} />
                            </div>
                            {schema.map((item, i) =>
                                <ResizableHeader
                                    key={i}
                                    width={colWidths?.[i]}
                                    onResize={handleResize}
                                    index={i}
                                >
                                    {item.header}
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
                                schema={schema}
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

export default AdminTable;