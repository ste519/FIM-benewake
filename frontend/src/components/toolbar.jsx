import { useState } from 'react';
import ExcelUploader from './ExcelUploader';
import * as XLSX from 'xlsx';
import useTabContext from '../context/TabProvider';
import { useNavigate } from 'react-router-dom';

export default function Toolbar() {
    const { tabContents, setTabContents, activeTab, selectedRows, setSelectedRows } = useTabContext();
    const navigate = useNavigate()

    const [openImportPopup, setOpenImportPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [openExportPopup, setOpenExportPopup] = useState(false)
    const toggleImportPopup = () => {
        setOpenImportPopup(!openImportPopup)

    }
    const toggleDeletePopup = () => {
        setOpenDeletePopup(!openDeletePopup)
    }
    const toggleExportPopup = () => {
        setOpenExportPopup(!openExportPopup)
    }

    const handleDelete = () => {
        let tableData = tabContents[activeTab];
        tableData = tableData.filter((_, i) => !selectedRows.includes(i));
        setTabContents({ ...tabContents, [activeTab]: tableData });
        setSelectedRows([]);
        toggleDeletePopup()
    }

    const handleExport = () => {

        let worksheet = XLSX.utils.json_to_sheet(tabContents[activeTab]);
        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
        XLSX.writeFileXLSX(workbook, activeTab + ".xlsx");
        toggleExportPopup()
    }

    const deletePopup = <div className="popup-container">
        <div className="popup-wrapper">
            确定删除选定的信息？
            <div className="row">
                <button onClick={toggleDeletePopup}>取消</button>
                <button onClick={handleDelete}>确认</button>
            </div>
        </div>
    </div>

    const importPopup = <div className="popup-container">
        <div className="popup-wrapper">
            <ExcelUploader close={toggleImportPopup} />
        </div>
    </div>

    const exportPopup = <div className="popup-container">
        <div className="popup-wrapper">
            确定导出该表单？
            <div className="row">
                <button onClick={toggleExportPopup}>取消</button>
                <button onClick={handleExport}>确认</button>
            </div>
        </div>
    </div>
    return (
        <div className='row toolbar'>
            <button>新增</button>
            <button onClick={toggleDeletePopup}>删除</button>
            {openDeletePopup ?
                deletePopup : null}
            <button onClick={()=>navigate(0)}>刷新</button>
            <button onClick={toggleImportPopup}>导入</button>
            {openImportPopup ?
                importPopup : null}
            <button onClick={toggleExportPopup}>导出</button>
            {openExportPopup ?
                exportPopup : null}

        </div>
    )
}
