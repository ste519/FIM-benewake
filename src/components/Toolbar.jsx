import { useState } from 'react';
import ExcelUploader from './ExcelUploader';
import * as XLSX from 'xlsx';
import { useAlertContext, useAuthContext, useSelectedDataContext, useTableDataContext, useTableStatesContext, useUpdateTabContext, useUpdateTableDataContext, useUpdateTableStatesContext } from '../hooks/useCustomContext';;
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchData } from '../api/fetch';
import children from '../path/children';
import moment from 'moment';
moment.updateLocale('zh-cn')
import "moment/dist/locale/zh-cn";
import { deleteInquiry } from '../api/delete';
import { allowInquiry, startInquiry } from '../api/inquiry';
import ColVisibility from './ColVisibility';
import { getIndexes, EngToCn, VisibilityToHeadersENG, snakeToCamelCase } from '../js/transformType';
import { noData, isObjectEmpty, noVisibleCols } from '../js/valueCheck';
import { getVisbleTableData, parseInquiryObj } from '../js/parseData';
import { getTableId } from '../js/getData';
import { EDIT_INQUIRY_TAB, NEW_INQUIRY_TAB } from '../constants/Global';



export default function Toolbar({ features }) {

    const updateTabs = useUpdateTabContext()
    const updateTableData = useUpdateTableDataContext()
    const updateTableStates = useUpdateTableStatesContext()

    const tableData = useTableDataContext()
    const { alertSuccess, alertError, alertConfirm, alertWarning } = useAlertContext()

    const { selectedQuery, setSelectedData, setSavedNewData } = useSelectedDataContext()
    const location = useLocation()
    const tableId = getTableId(location)
    const defaultSelection = selectedQuery[tableId]
    const states = useTableStatesContext()

    const { rowSelection } = useTableStatesContext()
    const [openImportPopup, setOpenImportPopup] = useState(false)
    const activeTab = useLocation().pathname.replace("/", "")

    const { auth } = useAuthContext()

    const toggleImportPopup = () => setOpenImportPopup(!openImportPopup)

    function noRowSelected() {
        if (!tableData || tableData.length === 0 || isObjectEmpty(rowSelection)) {
            alertWarning("未选择数据！")
            return true
        }
        else { return false }
    }

    const handleDelete = async () => {
        if (!noRowSelected())
            alertConfirm("确定删除选定的信息？",
                async () => {
                    if (!noRowSelected()) {
                        const orderIds = getIndexes(rowSelection)?.map((index) => tableData[index].inquiry_id);
                        const res = [];
                        orderIds?.forEach(async (orderId, i) => { res[i] = await deleteInquiry(orderId) })

                        if (res.some(item => item.code === 400 || item.code === 1)) {
                            alertError("删除失败！失败原因：" + [...new Set(res.filter(item => item.code === 400).map(item => item.message))].join(' ')
                            )
                        } else {
                            alertSuccess("删除成功！")
                        }

                        updateTableData({ type: "DELETE_ROWS", rowSelection: rowSelection })
                        updateTableStates({ type: "RESET_ROW_SELECTION" })
                    }
                }
            )
    }

    const handleRefresh = async () => {
        updateTableData({ type: "CLEAR_TABLE_DATA" })

        const res = await fetchData(selectedQuery[tableId])
        updateTableData({ type: "SET_TABLE_DATA", tableData: res.lists })
    }

    const handleAllowInquiry = async () => {
        if (noRowSelected()) {
            return
        }

        const rowIndexes = Object.keys(rowSelection).map(str => Number(str))
        const inquiryIds = rowIndexes.map(id => tableData[id].inquiry_id)

        const res = await allowInquiry(inquiryIds)
        const message = res?.map(item => item.message).join('\n')

        //TODO: adding code varification
        alertSuccess(message)
        handleRefresh()

    }

    const handleExport = () => {
        if (noData(tableData) || noVisibleCols(states.columnVisibility)) {
            alertError("没有数据！")
        }
        else {
            alertConfirm("确定导出该表单？", () => {

                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet([]);

                const headers_ENG = VisibilityToHeadersENG(states.columnVisibility)

                let headers_CN = headers_ENG.map((name) => EngToCn(name)).filter((value) => value !== undefined)

                XLSX.utils.sheet_add_aoa(ws, [headers_CN]);
                const newData = getVisbleTableData(tableData, headers_ENG)
                    ;
                XLSX.utils.sheet_add_json(ws, newData, { origin: 'A2', skipHeader: true });
                XLSX.utils.book_append_sheet(wb, ws);

                const timestamp = moment(new Date()).format('YYMMDDHHmmss')
                const filename = children.filter((child) => child.path === activeTab)[0].name

                XLSX.writeFileXLSX(wb, filename + timestamp + ".xlsx");
            })
        }
    }

    const handleStartInquiry = async () => {
        if (!noRowSelected()) {
            const indexes = getIndexes(rowSelection)
            const inquiries = indexes.map(i => tableData[i])
            let newInquiries = inquiries.map(obj => ({ "inquiryId": obj.inquiry_id }));

            const res = await startInquiry(newInquiries, 1)
            switch (res.code) {
                case 200:
                    alertWarning(res.message)
                    handleRefresh()
                    break
                case 400:
                case 1:
                    alertError(res.message)
                    break
                default:
                    alertError("未知错误")
                    break
            }
        }
    }

    const handleEdit = async () => {
        if (!noRowSelected()) {
            if (Object.keys(rowSelection).length > 1) {
                alertError("至多一条询单进行修改！")
            }
            else {
                const newTab = EDIT_INQUIRY_TAB
                updateTabs({ type: "ADD_TAB", tab: newTab })
                const selectedIndex = Number(Object.keys(rowSelection)[0])
                const selectedData = tableData[selectedIndex]
                const initialData = await (parseInquiryObj(selectedData))
                Object.entries(selectedData).forEach(([key, value]) => {
                    const camelCaseKey = snakeToCamelCase(key)
                    initialData[camelCaseKey] = value
                })

                setSelectedData(initialData)
                navigate("/edit")
            }
        }
    }

    const handlePin = () => {
        const pinnedIndexes = getIndexes(rowSelection)
        const rowData = tabContents[activeTab].filter((_, i) => pinnedIndexes.includes(i));
        setPinnedRows(rowData)
        deleteSelectedRows()
    }

    const handleUnpin = () => {
        //TODO
    }

    const navigate = useNavigate()

    const handleNew = () => {
        const newTab = NEW_INQUIRY_TAB
        setSavedNewData(null)
        updateTabs({ type: "ADD_TAB", tab: newTab })
        navigate("/new")
    }

    const importPopup =
        <div className="popup-container flex-center">
            <ExcelUploader close={toggleImportPopup} />
        </div>



    function ToolbarButton({ feature, handler, text, additionalCondition = true }) {
        const isVisible = features?.includes(feature) && additionalCondition;
        return isVisible ? <button onClick={handler}>{text}</button> : null;
    }

    return (
        <div className='row toolbar'>
            <div className='row flex-center'>
                <ToolbarButton feature="new" handler={handleNew} text="新增" additionalCondition={auth.userType != "3"} />
                <ToolbarButton feature="delete" handler={handleDelete} text="删除" additionalCondition={auth.userType != "3"} />
                <ToolbarButton feature="pin" handler={handlePin} text="置顶" />
                <ToolbarButton feature="unpin" handler={handleUnpin} text="取消置顶" />
                <ToolbarButton feature="refresh" handler={handleRefresh} text="刷新" />
                <ToolbarButton feature="import" handler={toggleImportPopup} text="导入" additionalCondition={auth.userType != "3"}/>
                {openImportPopup && importPopup}
                <ToolbarButton feature="export" handler={handleExport} text="导出" />
                <ToolbarButton feature="edit" handler={handleEdit} text="修改" additionalCondition={auth.userType != "3"} />
                <ToolbarButton feature="startInquiry" handler={handleStartInquiry} text="开始询单" additionalCondition={auth.userType != "3"} />
                <ToolbarButton feature="allowInquiry" handler={handleAllowInquiry} text="允许询单" additionalCondition={auth.userType == "1"} />
            </div>

            {features.includes("visibility") && !noData(tableData) && (
                <div className="row flex-center status">
                    <ColVisibility editable={tableId === 1 && defaultSelection.viewId > 0} />
                </div>
            )}
        </div>
    );
}
