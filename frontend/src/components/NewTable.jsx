import React, { useEffect, useState } from 'react';
import newDefs from '../constants/NewDefs';
import Table from './Table';

const NewTable = () => {
    const newRow = {
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
    const [newInquiryData, setNewInquiryData] = useState([newRow])
    useEffect(() => { console.log("new:", newInquiryData); }, [newInquiryData])
    return (
        <div className='col new-table-container'>
            {/* <div className='row new-table-controls'>
                <button onClick={handleAddRow}>新增行</button>
                <button onClick={handleDuplicateRow}>复制行</button>
                <button onClick={handleDeleteRow}>删除行</button>
            </div> */}
            <Table data={newInquiryData} columns={newDefs} setNewInquiryData={setNewInquiryData} />
        </div>
    )
}

export default NewTable;