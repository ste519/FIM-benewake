import ResizableHeader from '../ResizableHeader';
import Checkbox from '../Checkbox';
import { useEffect, useState } from 'react';
import { useAlertContext } from '../../hooks/useCustomContext';
import { deleteAdminData } from '../../api/admin';
import AdminPaginate from './AdminPaginate';
import AdminPopup from './AdminPopup';
import moment from 'moment';
import adminDefs from '../../constants/defs/AdminDefs';

const Row = ({ schema, data, colWidths, addRow, removeRow, isSelected }) => {
    return (
        <div className="tr">
            <div className='td fixed'>
                <Checkbox addRow={addRow} removeRow={removeRow} isSelected={isSelected} />
            </div>
            {schema.map((cell, i) =>
                <div
                    style={{ width: colWidths[i] }}
                    className='td'
                    key={i}>
                    <span>{cell.eng === "startMonth" ? moment(data.startMonth).format('YYYY/MM/DD') : data[cell.eng]}</span>
                </div>
            )}
        </div>
    )
}


const AdminTable = ({ schema, type, rows, setRows, handleRefresh }) => {
    const [selectedRows, setSelectedRows] = useState([])
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [showPopup, setShowPopup] = useState(false)
    const [action, setAction] = useState()

    const { alertConfirm, alertSuccess, alertError, alertWarning } = useAlertContext()
    const [colWidths, setColWidths] = useState(schema.map((item) => item.width))

    // useEffect(() => {
    //     setColWidths(schema.map((item) => item.width));
    // }, [schema])

    const addSelectedRow = (rowIndex) => setSelectedRows([...selectedRows, rowIndex])
    const addAllRows = () => setSelectedRows(Object.keys(rows).map((num) => parseInt(num)))
    const removeSelectedRow = (rowIndex) => setSelectedRows(selectedRows.filter((index) => index !== rowIndex))
    const removeAllRows = () => { setSelectedRows([]) }

    const handleAddRow = () => {
        setShowPopup(true)
        setAction("add")
    }

    // const handleDeleteRow = () => {
    //     selectedRows.forEach(index => {
    //         const type = schema[0].type
    //         const payloadItem = schema.find(item => "payload" in item)
    //         const data = rows[index][payloadItem.identifier]
    //         const payload = payloadItem.payload(data);
    //         alertConfirm(
    //             "确认删除该行？",
    //             async () => {
    //                 const res = await deleteAdminData(type, payload)
    //                 if (res.message.includes("成功")) {
    //                     alertSuccess(res.message)
    //                     setRows(prev => prev.filter((_, index) => !selectedRows.includes(index)))
    //                     setSelectedRows([])
    //                 }
    //                 else if (res.message.includes("失败")) {
    //                     alertError(res.message);
    //                 }
    //                 else {
    //                     alertWarning(res.message)
    //                 }
    //             },
    //         )
    //     })
    // }

    const handleResize = (index, newSize) => {
        setColWidths(prev => {
            const newWidths = [...prev];
            newWidths[index] = newSize;
            return newWidths;
        });
    };

    return (
        <div className='col table-container'>
            {showPopup &&
                <AdminPopup
                    type={type}
                    action={action}
                    closePopup={() => setShowPopup(false)}
                    handleRefresh={handleRefresh}
                />}
            <div className='row new-table-controls'>
                <button onClick={handleAddRow}>新增行</button>
                {/* <button onClick={handleDeleteRow}>删除行</button> */}
                <button onClick={handleRefresh}>刷新</button>
            </div>
            <div className='admin-table-wrapper col'>
                <div className="table">
                    <div className='thead'>
                        <div className="tr">
                            <div className='th fixed' >
                                <Checkbox addRow={addAllRows} removeRow={removeAllRows} isSelected={selectedRows?.length > 0} />
                            </div>
                            {schema.map((item, i) =>
                                <ResizableHeader
                                    key={i}
                                    width={item.width}
                                    onResize={handleResize}
                                    index={i}
                                    type={item.eng}
                                >
                                    {item.cn}
                                </ResizableHeader>)
                            }
                        </div>
                    </div>
                    <div className='tbody'>
                        {rows.slice((pageNum - 1) * pageSize, pageNum * pageSize).map((row, i) =>
                            <Row
                                key={i}
                                rowIndex={i}
                                data={row}
                                colWidths={colWidths}
                                schema={schema}
                                isSelected={selectedRows.includes(i)}
                                addRow={() => addSelectedRow(i)}
                                removeRow={() => removeSelectedRow(i)}
                            />)}
                    </div>
                </div>
            </div>
            <AdminPaginate totalItems={rows.length} pageSize={pageSize} setPageSize={setPageSize} pageNum={pageNum} setPageNum={setPageNum} />
        </div >
    )
}

export default AdminTable;