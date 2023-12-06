import ResizableHeader from '../ResizableHeader';
import Checkbox from '../Checkbox';
import { useState } from 'react';
import { deleteAdminData } from '../../api/admin';
import AdminPaginate from './AdminPaginate';
import AdminPopup from './AdminPopup';
import moment from 'moment';
import { useAlertContext } from '../../hooks/useCustomContext';
import adminSchema from '../../constants/schemas/adminSchema';

const Row = ({ schema, data, colWidths, addRow, removeRow, isSelected }) => {
    return (
        <div className="tr">
            <div className='td fixed checkbox'>
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
    const { alertWarning, alertConfirm, alertSuccess, alertError } = useAlertContext()
    const [selectedRows, setSelectedRows] = useState([])
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [showPopup, setShowPopup] = useState(false)
    const [action, setAction] = useState()

    const [colWidths, setColWidths] = useState(schema.map((item) => item.width))

    const addSelectedRow = (rowIndex) => setSelectedRows([...selectedRows, rowIndex])
    const addAllRows = () => setSelectedRows(Object.keys(rows).map((num) => parseInt(num)))
    const removeSelectedRow = (rowIndex) => setSelectedRows(selectedRows.filter((index) => index !== rowIndex))
    const removeAllRows = () => { setSelectedRows([]) }

    const handleAddRow = () => {
        setShowPopup(true)
        setAction("add")
    }

    const handleDelete = async () => {
        let payloads;
        const deleteList = rows.filter((_, index) => selectedRows.includes
            (index))
        const keys = adminSchema[type]['delete'].bodyKeys ?? []

        if (type === "customerName") {
            payloads = deleteList.map((item) => ({
                "deletCustomerName": item.customerName
            }))
        }
        else {
            payloads = deleteList.map(obj =>
                Object.entries(obj)
                    .reduce((obj, [key, value]) => {
                        if (keys.includes(key)) {
                            obj[key] = value;
                        }
                        return obj;
                    }, {}))
        }

        let messages = [];
        const promises = payloads.map(payload => deleteAdminData(type, payload));

        Promise.all(promises).then(results => {
            results.forEach((res, index) => {
                if (res.message.includes("失败") || res.message.includes("异常")) {
                    messages.push(`${JSON.stringify(payloads[index])} ${res.message}`)
                }
            })

            if (messages.length > 0) {
                alertError(messages.map((message) => message + '\n'))
            }
            else {
                alertSuccess('删除成功！')
            }
            handleRefresh()
        }).catch(error => {
            console.log(error);
        });
    }

    const handleDeleteRow = () => {
        if (rows.filter((_, index) => selectedRows.includes(index)).length === 0) {
            alertWarning("未选择数据！")
        }
        else {
            alertConfirm('确认删除所选行?', handleDelete)
            setAction("delete")
        }
    }

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
                    handleRefresh={() => {
                        setSelectedRows([])
                        handleRefresh()
                    }}
                />}
            <div className='row new-table-controls'>
                <button onClick={handleAddRow}>新增行</button>
                <button onClick={handleDeleteRow}>删除行</button>
                <button onClick={() => {
                    setSelectedRows([])
                    handleRefresh()
                }}
                >刷新</button>
            </div>
            <div className='admin-table-wrapper col'>
                <div className="table">
                    <div className='thead'>
                        <div className="tr">
                            <div className='th fixed checkbox' >
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