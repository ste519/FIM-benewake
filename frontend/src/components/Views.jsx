import { useState, useEffect, useRef } from 'react'
import { useUpdateTableDataContext, useUpdateQueryContext, useQueryContext, useUpdateTableStatesContext, useTableStatesContext, useTableDataContext, useAlertContext } from '../hooks/useCustomContext';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import SimpleColVisibility from './SimpleColVisibility'
import { fetchData, fetchNewViews } from '../api/fetch'
import Filters from './Filters'
import { postView } from '../api/post';
import { VISIBILITY_ALL_FALSE } from '../constants/Global';
import { useLoaderData } from 'react-router-dom';
import { deleteView } from '../api/delete';
import { getColParams } from '../js/parseData';
import { VisibilityToCols, ColsToFilters } from '../js/transformType';
import { noData } from '../js/valueCheck';

const ViewPopup = ({ closePopup, setNewViews }) => {

    const query = useQueryContext()

    const [viewName, setViewName] = useState("")
    const [visibility, setVisibility] = useState(VISIBILITY_ALL_FALSE)

    const updateAlert = useAlertContext()
    const visibleCols = VisibilityToCols(visibility)
    const handleSumbit = async (e) => {
        e.preventDefault();
        let res;
        const cols = visibleCols.map((col, i) => getColParams(col, i + 1, []))

        //TODO, Adding sequence logic
        const params = {
            tableId: query.tableId,
            viewName,
            cols: cols
        }
        res = await postView(params)

        switch (res?.code) {
            case 200:
                updateAlert({
                    type: "SHOW_ALERT",
                    data: { type: "success", message: res.message }
                });
                const views = await fetchNewViews("1")
                setNewViews(views.data)
                break
            case 400:
                updateAlert({
                    type: "SHOW_ALERT",
                    data: { type: "error", message: res.message }
                });
                break
        }
        closePopup()
    }
    return (
        <div className='popup-container'>
            <form className='popup-wrapper view-popup' onSubmit={handleSumbit}>
                <label htmlFor="view__name" className='row'>当前方案：
                    <input value={viewName} onChange={(e) => setViewName(e.target.value)}
                        type="text" id="view__name" placeholder="请输入方案名"
                    />
                </label>
                <div className='col'>
                    <h1>默认显示列：</h1>
                    <SimpleColVisibility visibility={visibility} setVisibility={setVisibility} />
                </div>

                <div className='row'>
                    <input type="button" name="cancel" onClick={closePopup} value="取消" />
                    <input type="submit" name="submit" className="blue40" value="确定" />
                </div>
            </form>
        </div>
    )
}

const View = ({ id, name, isSelected, handleViewClick, handleDelete, editable }) => {
    const [viewName, setViewName] = useState(name)
    useEffect(() => setViewName(name), [name])

    const [readOnly, setReadOnly] = useState(true)

    if (editable) {
        const ref = useRef(null);
        return (<div
            className={`view row flex-center 
        ${isSelected ? 'selected' : 'bordered'}`}
            onClick={() => handleViewClick(id, name)}
            onDoubleClick={() => setReadOnly(!readOnly)}
        >
            <input
                type="text"
                value={viewName}
                style={{ width: viewName.length * 12 }}
                readOnly={readOnly}
                ref={ref}
                onChange={(e) => setViewName(e.target.value)}
            />
            <button
                onClick={async (e) => await handleDelete(e, id)}>
                <CloseIcon />
            </button>
        </div>)
    }

    else {
        return (<div
            className={`view row flex-center ${isSelected ? 'selected' : 'bordered'}`}
            onClick={() => handleViewClick(id, name)}
        >
            {viewName}
        </div>)
    }
}

const Views = ({ views, editable }) => {
    const updateTableData = useUpdateTableDataContext()
    const updateTableStates = useUpdateTableStatesContext()
    const updateQuery = useUpdateQueryContext()
    const query = useQueryContext()
    const updateAlert = useAlertContext()
    const states = useTableStatesContext()

    const visibleCols = VisibilityToCols(states.columnVisibility)

    let initialFilters = query.tableId < 6 ? [
        { colName: "item_code", condition: "like", value: "" },
        { colName: "item_name", condition: "like", value: "" },
        { colName: "customer_name", condition: "like", value: "" },
        { colName: "item_type", condition: "like", value: "" },
        { colName: "inquiry_type", condition: "like", value: "" }
    ] : [
        { colName: "item_code", condition: "like", value: "" },
        { colName: "item_name", condition: "like", value: "" },
        { colName: "customer_name", condition: "like", value: "" }
    ]

    const [filters, setFilters] = useState(initialFilters)

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(views[0].viewName)
    const [newViews, setNewViews] = useState(useLoaderData()?.newViews)

    const handleAdd = () => setOpen("add")
    const handleSave = async () => {

        if (query.viewId === null || query.viewId === undefined || query.viewId === "") {
            updateAlert({ type: "SHOW_ALERT", data: { type: "warning", message: "未选择方案！" } })
        }
        else if (query.viewId <= 0) {
            updateAlert({ type: "SHOW_ALERT", data: { type: "warning", message: "系统方案无法修改！" } })
        }
        else {
            let res;
            const cols = visibleCols.map((col, i) => getColParams(col, i + 1, filters)) //TODO: Adding sequence logic

            const params = {
                tableId: query.tableId,
                viewName: selected,
                viewId: query.viewId,
                cols: cols
            }

            res = await postView(params)

            switch (res?.code) {
                case 200:
                    updateAlert({
                        type: "SHOW_ALERT",
                        data: { type: "success", message: res.message }
                    });
                    break
                case 400:
                    updateAlert({
                        type: "SHOW_ALERT",
                        data: { type: "error", message: res.message }
                    });
                    break
            }
        }
    }

    async function confirmDeleteView(id) {
        const res = await deleteView(id)
        switch (res.code) {
            case 200:
                updateAlert({
                    type: "SHOW_ALERT", data: {
                        type: "success", message: res.message
                    }
                })
                updateTableData({ type: "CLEAR_TABLE_DATA" })
                setNewViews(prev => prev.filter(value => value.viewId !== id))
                break
            case 400:
                updateAlert({
                    type: "SHOW_ALERT", data: {
                        type: "error", message: res.message
                    }
                })
                break
        }

    }

    const handleDelete = async (event, id) => {
        event.stopPropagation()
        updateAlert({
            type: "SHOW_ALERT", data: {
                type: "confirm",
                message: "确定删除所选方案？",
                action: () => confirmDeleteView(id)
            }
        })
    }

    const closePopup = () => setOpen(false)

    const handleViewClick = async (id, name) => {
        setSelected(name)
        updateQuery({ type: "SET_VIEW_ID", viewId: id })
        updateTableData({ type: "CLEAR_TABLE_DATA" })

        const res = await fetchData({ ...query, viewId: id, filterCriterias: [] })
        updateTableData({ type: "SET_TABLE_DATA", tableData: res.lists })
        if (id > 0) {
            setFilters(ColsToFilters(res.cols))
            updateQuery({ type: "SET_FILTER_CRITERIAS", filterCriterias: ColsToFilters(res.cols) })
        }

        updateTableStates({ type: "SET_COLUMN_VISIBILITY", columnVisibility: res.columnVisibility })
    }

    return (
        <>
            <div className='view-container row'>
                {views?.map((item, i) =>
                    <View
                        id={item.viewId}
                        name={item.viewName}
                        key={i}
                        isSelected={selected === item.viewName}
                        handleViewClick={handleViewClick}
                        handleDelete={handleDelete}
                    />
                )}
                {newViews?.map((item, i) =>
                    <View
                        id={item.viewId}
                        name={item.viewName}
                        key={i}
                        isSelected={selected === item.viewName}
                        handleViewClick={handleViewClick}
                        handleDelete={handleDelete}
                        editable
                    />
                )}
                {editable &&
                    <div className='controls row'>
                        <button className="rounded blue40" onClick={handleAdd}>
                            <AddIcon />新增方案</button>
                        <button className="rounded white"
                            onClick={handleSave}>保存方案</button>
                    </div>
                }
            </div>
            {open &&
                <ViewPopup
                    closePopup={closePopup}
                    setNewViews={setNewViews}
                />
            }
            {
                visibleCols?.length > 0 ?
                    <div className="col flex-center">
                        <Filters
                            headers={visibleCols}
                            filters={filters}
                            setFilters={setFilters}
                            display={true} />
                    </div> :
                    <div className='placeholder'></div>
            }
        </>
    )
}

export default Views
