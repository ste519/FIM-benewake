import { useState, useEffect, useRef } from 'react'
import { useUpdateTableDataContext, useUpdateTableStatesContext, useTableStatesContext, useAlertContext, useSelectedDataContext } from '../hooks/useCustomContext';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as SaveIcon } from '../assets/icons/save.svg'
import SimpleColVisibility from './SimpleColVisibility'
import { fetchData, fetchNewViews } from '../api/fetch'
import Filters from './Filters'
import { postView } from '../api/post';
import { VISIBILITY_ALL_FALSE } from '../constants/Global';
import { useLoaderData, useLocation } from 'react-router-dom';
import { deleteView } from '../api/delete';
import { getColParams } from '../js/parseData';
import { VisibilityToCols, ColsToFilters } from '../js/transformType';
import { getTableId } from '../js/getData'
import AutoWidthInput from './AutoWidthInput';

const ViewPopup = ({ closePopup, setNewViews, tableId }) => {

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
            tableId: tableId,
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
            <form className='popup-wrapper g2' onSubmit={handleSumbit}>
                <label htmlFor="view__name" className='row'>当前方案：
                    <input value={viewName} onChange={(e) => setViewName(e.target.value)}
                        type="text" id="view__name" placeholder="请输入方案名"
                    />
                </label>
                <div className='col'>
                    <SimpleColVisibility visibility={visibility} setVisibility={setVisibility} />
                </div>

                <div className='row  g1 flex-center'>
                    <input type="button" name="cancel" className="white small bordered" onClick={closePopup} value="取消" />
                    <input type="submit" name="submit" className="blue40 small" value="确定" />
                </div>
            </form>
        </div>
    )
}

const View = ({ id, name, isSelected, handleViewClick, handleDelete, editable, handleChange }) => {

    if (editable) {
        const [readOnly, setReadOnly] = useState(true)

        return (<div
            className={`view row flex-center editable
        ${isSelected ? 'selected' : 'bordered'}`}
            onClick={() => handleViewClick(id, name)}
            onDoubleClick={(e) => { e.stopPropagation(); setReadOnly(!readOnly) }}
        >
            <AutoWidthInput
                value={name}
                name={id}
                onChange={(e) => handleChange(e.target.value, id)}
                readOnly={readOnly}
            />
            <button
                onClick={async (e) => await handleDelete(e, id)}>
                <CloseIcon />
            </button>
        </div>)
    }

    else {
        const [viewName, setViewName] = useState(name)
        useEffect(() => setViewName(name), [name])


        return (<div
            className={`view row flex-center ${isSelected ? 'selected' : 'bordered'}`}
            onClick={() => handleViewClick(id)}
        >
            {viewName}
        </div>)
    }
}

const Views = ({ views, editable }) => {
    const updateTableData = useUpdateTableDataContext()
    const updateTableStates = useUpdateTableStatesContext()
    const updateAlert = useAlertContext()
    const states = useTableStatesContext()
    const { selectedQuery, updateSelectedQuery, resetSelectedQuery } = useSelectedDataContext()

    const location = useLocation()
    const tableId = getTableId(location)

    const defaultSelection = selectedQuery[tableId]
    const visibleCols = VisibilityToCols(states.columnVisibility)

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(defaultSelection.viewId)
    const [newViews, setNewViews] = useState(useLoaderData() ?? [])

    const handleAdd = () => setOpen("add")
    const handleSave = async () => {

        if (defaultSelection.viewId === null || defaultSelection.viewId === undefined || defaultSelection.viewId === "") {
            updateAlert({ type: "SHOW_ALERT", data: { type: "warning", message: "未选择方案！" } })
        }
        else if (defaultSelection.viewId <= 0) {
            updateAlert({ type: "SHOW_ALERT", data: { type: "warning", message: "系统方案无法修改！" } })
        }
        else {
            let res;
            const cols = visibleCols.map((col, i) => getColParams(col, i + 1, defaultSelection.filterCriterias)) //TODO: Adding sequence logic

            const params = {
                tableId: defaultSelection.tableId,
                viewName: newViews.find(view => view.viewId === defaultSelection.viewId).viewName,
                viewId: defaultSelection.viewId,
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

    const handleViewClick = async (id) => {
        setSelected(id)
        updateSelectedQuery(tableId, "viewId", id)
        updateTableData({ type: "CLEAR_TABLE_DATA" })
        const res = await fetchData({ tableId, viewId: id, filterCriterias: [], secTab: defaultSelection.secTab })
        updateTableData({ type: "SET_TABLE_DATA", tableData: res.lists })

        //新增视图
        if (tableId === 1) {
            if (id > 0)
                updateSelectedQuery(1, "filterCriterias", ColsToFilters(res.cols))
            else {
                resetSelectedQuery(1, "filterCriterias")
            }
        }

        updateTableStates({ type: "SET_COLUMN_VISIBILITY", columnVisibility: res.columnVisibility })
    }

    const handleViewNameChange = (newName, viewId) => {
        setNewViews(prev => 
            prev.map(view => 
                view.viewId === viewId ? { ...view, viewName: newName } : view
            )
        );
    }
    return (
        <>
            <div className='view-container row'>
                {views?.map((item) =>
                    <View
                        id={item.viewId}
                        name={item.viewName}
                        key={item.viewId}
                        isSelected={selected === item.viewId}
                        handleViewClick={() => handleViewClick(item.viewId)}
                        handleDelete={handleDelete}
                    />
                )}
                {newViews?.map((item) =>
                    <View
                        id={item.viewId}
                        name={item.viewName}
                        key={item.viewId}
                        isSelected={selected === item.viewId}
                        handleViewClick={() => handleViewClick(item.viewId)}
                        handleDelete={handleDelete}
                        editable
                        handleChange={handleViewNameChange}
                    />
                )}
                {editable &&
                    <div className='controls row g1'>
                        <button className="rounded blue40" onClick={handleAdd}>
                            <AddIcon />新增方案
                        </button>
                        <button className="rounded white"
                            onClick={handleSave}>
                            <SaveIcon />保存方案
                        </button>
                    </div>
                }
            </div>
            {open &&
                <ViewPopup
                    closePopup={closePopup}
                    setNewViews={setNewViews}
                    tableId={tableId}
                />
            }
            {
                visibleCols?.length > 0 ?
                    <div className="col flex-center">
                        <Filters
                            headers={visibleCols}
                            display={true} />
                    </div> :
                    <div className='placeholder'></div>
            }
        </>
    )
}

export default Views
