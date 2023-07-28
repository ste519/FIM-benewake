import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import { newDefs, newRow } from '../constants/NewDefs';
import Table from './Table';


// const Row = ({ rowIndex, data, updateCells, addRow, removeRow, isSelected }) => {

//     const handleChange = (key, newData) => {
//         updateCells(key, newData, rowIndex)
//     }


//     return (
//         <div className={isSelected ? "selected tr" : "tr"}>
//             <div className='td'><Checkbox addRow={addRow} removeRow={removeRow} isSelected={isSelected} /></div>
//             {data && newDefs.map((colDef, i) =>
//                 <div
//                     className={`td ${colDef.readOnly ? 'read-only' : ''}`}
//                     key={i}
//                     style={{ width: colDef.size }}>
//                     {colDef.cell({ data, handleChange, i })}
//                 </div>)}
//         </div>
//     )
// }

const NewTable = () => {

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
    return (
        <div className='col new-table-container'>
            <div className='row new-table-controls'>
                <button onClick={handleAddRow}>新增行</button>
                <button onClick={handleDuplicateRow}>复制行</button>
                <button onClick={handleDeleteRow}>删除行</button>
            </div>
           <Table data={rows} columns={newDefs} showVisibility={false}/>
        </div>
    )
}

export default NewTable;