import { useState } from 'react';
import ExcelUploader from './ExcelUploader';
import * as XLSX from 'xlsx';
import useTabContext from '../hooks/useTabContext';
import { useLocation, useNavigate } from 'react-router-dom';
import {fetchData} from '../api/order';
import children from '../path/children';
import moment from 'moment';
import "moment/dist/locale/zh-cn";
import { login } from '../api/loginAuth';
moment.locale("zh-cn");

export default function Toolbar({ features }) {
    const { tabLabels, setTabLabels, tabContents, setTabContents, rowSelection, setRowSelection, pinnedRows, setPinnedRows } = useTabContext();

    const [openImportPopup, setOpenImportPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [openExportPopup, setOpenExportPopup] = useState(false)
    const [action, setAction] = useState(null)
    const activeTab = useLocation().pathname.replace('/', '')


    const toggleImportPopup = () => setOpenImportPopup(!openImportPopup)
    const toggleDeletePopup = () => setOpenDeletePopup(!openDeletePopup)
    const toggleExportPopup = () => setOpenExportPopup(!openExportPopup)

    function deleteSelectedRows() {
        const removedIndexes = Object.keys(rowSelection).map((str) => parseInt(str))
        let tableData = tabContents[activeTab];
        tableData = tableData.filter((_, i) => !removedIndexes.includes(i));
        setTabContents({ ...tabContents, [activeTab]: tableData });
        setRowSelection({})
    }

    const handleDelete = () => {
        setAction({ type: "删除", time: new Date() })
        deleteSelectedRows()
        toggleDeletePopup()
    }

    const handleRefresh = async () => {
        setAction({ type: "刷新", time: new Date() })
        //TODO
    }

    const handleExport = () => {
        setAction({ type: "刷新", time: new Date() })
        let worksheet = XLSX.utils.json_to_sheet(tabContents[activeTab]);
        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
        XLSX.writeFileXLSX(workbook, activeTab + ".xlsx");
        toggleExportPopup()
    }

    const handleStartXD = async () => {
        setAction({ type: "开始询单", time: new Date() })
        //TODO    

    }

    const handleSave = () => {
        setAction({ type: "保存", time: new Date() })
        //TODO
    }

    const handlePin = () => {
        setAction({ type: "置顶", time: new Date() })
        const pinnedIndexes = Object.keys(rowSelection).map((str) => parseInt(str))
        const rowData = tabContents[activeTab].filter((_, i) => pinnedIndexes.includes(i));
        setPinnedRows(rowData)
        console.log(rowData);
        deleteSelectedRows()
    }

    const handleUnpin = () => {
        setAction({ type: "取消置顶", time: new Date() })
        //TODO
    }

    const navigate = useNavigate()
    const handleNew = (event) => {
        event.preventDefault()
        const newTab = children[children.length - 1]
        if (!tabLabels.includes(newTab)) {
            setTabLabels([...tabLabels, newTab]);
        }
        navigate("/new")
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
            <div className='row flex-center'>
                <button to="/new" onClick={handleNew} className={`${features?.includes("new") ? "" : "hidden"}`}>新增</button>
                <button onClick={toggleDeletePopup} className={`${features?.includes("delete") ? "" : "hidden"}`}>删除</button>
                {openDeletePopup && deletePopup}
                <button onClick={handlePin} className={`${features?.includes("pin") ? "" : "hidden"}`}>置顶</button>
                <button onClick={handleUnpin} className={`${features?.includes("unpin") ? "" : "hidden"}`}>取消置顶</button>
                <button onClick={handleRefresh} className={`${features?.includes("refresh") ? "" : "hidden"}`}>刷新</button>
                <button onClick={toggleImportPopup} className={`${features?.includes("import") ? "" : "hidden"}`}>导入</button>
                {openImportPopup && importPopup}
                <button onClick={toggleExportPopup} className={`${features?.includes("export") ? "" : "hidden"}`}>导出</button>
                {openExportPopup && exportPopup}
                <button onClick={handleSave} className={`${features?.includes("save") ? "" : "hidden"}`}>保存</button>
                <button onClick={handleStartXD} className={`${features?.includes("startXD") ? "" : "hidden"}`}>开始询单</button>

            </div>
            <div className={`row flex-center status ${features?.includes("status") ? "" : "hidden"}`}>
                {action &&
                    <span>
                        <strong>{action.type}</strong>
                        &nbsp;于&nbsp;
                        <strong>{`${moment(action.time).format('lll')}`}</strong>
                    </span>
                }
            </div>
        </div>
    )
}
