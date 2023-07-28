import { useState } from 'react';
import ExcelUploader from './ExcelUploader';
import * as XLSX from 'xlsx';
import { useAlertContext, useQueryContext, useTableDataContext, useTableStatesContext, useUpdateTabContext, useUpdateTableDataContext, useUpdateTableStatesContext } from '../hooks/useCustomContext';;
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchData, fetchOptions, fetchUser } from '../api/fetch';
import children from '../path/children';
import moment from 'moment';
moment.updateLocale('zh-cn')
import "moment/dist/locale/zh-cn";
import { NEW_INQUIRY_TAB } from '../constants/Global'
import { deleteInquiry } from '../api/delete';
import { startInquiry } from '../api/inquiry';

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
function getIndexes(rowSelection) {
    return Object.keys(rowSelection).map(Number)
}

function getInquiryTypeInt(str) {
    switch (str) {
        case "PO(客户付款)":
            return 1
        case "PR(客户提出付款意向)":
            return 2
        case "YG(供应链预估)":
            return 3
        case "YC(销售预测)":
            return 4
        case "XD(意向询单)":
            return 4
    }
}

async function parseInquiryObj(source) {
    const result = {
        "inquiryId": source["inquiry_id"],
        "inquiryCode": source["inquiry_code"],
        "salesmanId": source["salesman_id"],
        "itemId": source["item_id"],
        "customerId": source["customer_id"],
        "saleNum": source["sale_num"],
        "expectedTime": moment(source["expected_time"]).format('yyyy/MM/DD'),
        "inquiryType": getInquiryTypeInt(source["inquiry_type"]),
        "remark": source["remark"]
    }

    if (!result.customerId) {
        const res = await fetchOptions("customer", "customerName", source.customer_name)
        result.customerId = res?.[0]?.fcustId
    }
    if (!result.itemId) {
        const res = await fetchOptions("item", "itemCode", source.item_code)
        result.itemId = res?.[0]?.id
    }
    if (!result.salesmanId) {
        const res = await fetchUser(source.salesman_name)
        result.salesmanId = res?.[0]?.id
    }

    console.log(result);
    return result;
}

export default function Toolbar({ features }) {

    console.log("Toolbar mounted");
    console.log(children);
    const updateTabs = useUpdateTabContext()
    const updateTableData = useUpdateTableDataContext()
    const updateTableStates = useUpdateTableStatesContext()
    const tableData = useTableDataContext()
    const updateAlert = useAlertContext()
    const query = useQueryContext()

    const { rowSelection } = useTableStatesContext()
    const [openImportPopup, setOpenImportPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [openExportPopup, setOpenExportPopup] = useState(false)
    const [action, setAction] = useState(null)
    const activeTab = useLocation().pathname.replace("/", "")

    const toggleImportPopup = () => setOpenImportPopup(!openImportPopup)
    const toggleDeletePopup = () => setOpenDeletePopup(!openDeletePopup)
    const toggleExportPopup = () => setOpenExportPopup(!openExportPopup)

    function noRowSelected() {
        if (!tableData || tableData.length === 0 || isObjectEmpty(rowSelection)) {
            updateAlert({
                type: "SHOW_ALERT",
                data: { type: "warning", message: "未选择数据！", action: null }
            })
            return true
        }
        else { return false }
    }


    const handleDelete = async () => {
        setAction({ type: "删除", time: new Date() })
        if (!noRowSelected()) {
            const orderIds = getIndexes(rowSelection)?.map((index) => tableData[index].inquiry_id);
            await orderIds?.forEach(orderId => deleteInquiry(orderId))
            updateAlert({
                type: "SHOW_ALERT",
                data: { type: "success", message: "删除成功！", action: null }
            })
            updateTableData({ type: "DELETE_ROWS", rowSelection: rowSelection })
            updateTableStates({ type: "RESET_ROW_SELECTION" })
        }
        toggleDeletePopup()
    }

    const handleRefresh = async () => {
        setAction({ type: "刷新", time: new Date() })
        updateTableData({ type: "CLEAR_TABLE_DATA" })
        const res = await fetchData(query)
        updateTableData({ type: "SET_TABLE_DATA", tableData: res })
    }

    const handleExport = () => {
        setAction({ type: "导出", time: new Date() })

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([]);

        // let Heading = [['FirstName', 'Last Name', 'Email']];

        // XLSX.utils.sheet_add_aoa(ws, Heading);
        XLSX.utils.sheet_add_json(ws, tableData, { origin: 'A2', skipHeader: true });
        XLSX.utils.book_append_sheet(wb, ws, activeTab);

        const timestamp = moment(new Date()).format('YYMMDDHHmmss')
        const filename = children.filter((child) => child.path === activeTab)[0].name

        XLSX.writeFileXLSX(wb, filename + timestamp + ".xlsx");
        toggleExportPopup()
    }

    const handleStartInquiry = async () => {
        setAction({ type: "开始询单", time: new Date() })
        //TODO    
        if (!noRowSelected()) {
            const indexes = getIndexes(rowSelection)
            const inquiries = indexes.map(i => tableData[i])
            let newInquiries = [];
            for (const obj of inquiries) {
                newInquiries.push(await parseInquiryObj(obj));
            }
            const res = await startInquiry(newInquiries, 1)
            switch (res.code) {
                case 200:
                    updateAlert({ type: "SHOW_ALERT", data: { type: "success", message: res.message } })
                    updateTableStates({ type: "RESET_ROW_SELECTION" })
                    break
                case 400:
                    updateAlert({ type: "SHOW_ALERT", data: { type: "error", message: res.message } })
                    break
                default:
                    throw new Error("Unknown inquiry problem")
            }
        }
    }

    const handleSave = () => {
        setAction({ type: "保存", time: new Date() })
        //TODO
    }

    const handlePin = () => {
        setAction({ type: "置顶", time: new Date() })
        const pinnedIndexes = getIndexes(rowSelection)
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

    const handleNew = () => {
        const newTab = children[10]
        updateTabs({ type: "ADD_TAB", tab: newTab })
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

    const importPopup =
        <div className="popup-container">
            <div className="popup-wrapper">
                <ExcelUploader close={toggleImportPopup} updateAlert={updateAlert} />
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
                <button onClick={handleStartInquiry} className={`${features?.includes("startInquiry") ? "" : "hidden"}`}>开始询单</button>

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
        </div >
    )
}
