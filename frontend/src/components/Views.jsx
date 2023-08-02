import { useState, useEffect, useRef } from 'react'
import { useUpdateTableDataContext, useUpdateQueryContext, useQueryContext, useUpdateTableStatesContext, useTableStatesContext, useAlertContext } from '../hooks/useCustomContext';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import SimpleColVisibility from './SimpleColVisibility'
import SimpleFilters from './SimpleFilters'
import { fetchData, fetchNewViews } from '../api/fetch'
import Filters from './Filters'
import colNameDict from '../constants/ColNameDict.json'
import { postView } from '../api/post';
import { VISIBILITY_ALL_FALSE } from '../constants/Global';
import { useLoaderData } from 'react-router-dom';
import { deleteView } from '../api/delete';

function getColParams(col, seq, filters) {
    return {
        colId: col.col_id,
        colSeq: seq,
        colValue: filters.find(filter => filter.colName === col.col_name_ENG)?.value,
        valueOperator: filters.find(filter => filter.colName === col._name_ENG)?.condition
    }
}

function VisibilityToCols(visibility) {
    return Object.entries(visibility)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => colNameDict.find(item => item.col_name_ENG === key)
        );
}

function ColsToFilters(cols) {
    return cols
        .sort((a, b) => a.col_seq - b.col_seq)
        .filter(item => item.value_operator)
        .map(item => ({
            colName: item.col_name_ENG,
            condition: item.value_operator,
            value: item.col_value
        }));
}

const ViewPopup = ({ closePopup, setNewViews }) => {

    const query = useQueryContext()

    const [viewName, setViewName] = useState("")
    const [filters, setFilters] = useState([])
    const [visibility, setVisibility] = useState(VISIBILITY_ALL_FALSE)

    const updateAlert = useAlertContext()
    const visibleCols = VisibilityToCols(visibility)
    const handleSumbit = async (e) => {
        e.preventDefault();
        let res;
        const cols = visibleCols.map((col, i) => getColParams(col, i + 1, filters))
        //Adding sequence logic
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

                <div className='col'>
                    <h1>显示列筛选条件：</h1>
                    {(visibleCols.length > 0) &&
                        <SimpleFilters
                            filters={filters}
                            setFilters={setFilters}
                            headers={visibleCols}
                        />}
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

    if (editable) {
        const ref = useRef(null);
        return (<div
            className={`view row flex-center 
        ${isSelected ? 'selected' : 'bordered'}`}
            onClick={() => handleViewClick(id)}
        >
            <input
                type="text"
                value={viewName}
                style={{ width: viewName.length * 12 }}
                ref={ref}
                onClick={e => e.stopPropagation()}
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
            onClick={() => handleViewClick(id)}
        >
            {viewName}
        </div>)
    }
}

const Views = ({ views, editable }) => {
    console.log("Views mounted");
    const updateTableData = useUpdateTableDataContext()
    const updateTableStates = useUpdateTableStatesContext()
    const updateQuery = useUpdateQueryContext()
    const query = useQueryContext()

    const updateAlert = useAlertContext()
    const [filters, setFilters] = useState([])

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [newViews, setNewViews] = useState(useLoaderData()?.data)

    const handleAdd = () => setOpen("add")
    const handleEdit = () => {
        if (query.viewId === null || query.viewId === undefined || query.viewId === "") {
            updateAlert({ type: "SHOW_ALERT", data: { type: "warning", message: "未选择方案！" } })
        }
        else if (query.viewId <= 0) {
            updateAlert({ type: "SHOW_ALERT", data: { type: "warning", message: "系统方案无法修改！" } })
        }
        else {
            setOpen("edit")
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
                break
            case 400:
                updateAlert({
                    type: "SHOW_ALERT", data: {
                        type: "error", message: res.message
                    }
                })
                break
        }
        setNewViews(prev => prev.filter(value => value.viewId !== id))
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
        updateQuery({ type: "SET_VIEW_ID", viewId: id })
        updateTableData({ type: "CLEAR_TABLE_DATA" })

        const res = await fetchData({ ...query, viewId: id, filterCriterias: [] })
        updateTableData({ type: "SET_TABLE_DATA", tableData: res.lists })

        updateQuery({ type: "SET_FILTER_CRITERIAS", filterCriterias: ColsToFilters(res.cols) })

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
                        isSelected={selected === item.viewId}
                        handleViewClick={handleViewClick}
                        handleDelete={handleDelete}
                    />
                )}
                {newViews?.map((item, i) =>
                    <View
                        id={item.viewId}
                        name={item.viewName}
                        key={i}
                        isSelected={selected === item.viewId}
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
                            onClick={handleEdit}>保存方案</button>
                    </div>
                }
            </div>
            {open &&
                <ViewPopup
                    closePopup={closePopup}
                    setNewViews={setNewViews}
                />
            }

            <div className="col flex-center">
                <Filters filters={filters} setFilters={setFilters} display={true} />

            </div>
        </>
    )
}

export default Views
