import { useState } from 'react'
import { useUpdateTableDataContext, useUpdateQueryContext, useQueryContext } from '../hooks/useCustomContext';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import SimpleColVisibility from './SimpleColVisibility'
import SimpleFilters from './SimpleFilters'
import { useLocation } from 'react-router-dom';
import { fetchData } from '../api/fetch'
import Filters from './Filters'

const ViewPopup = ({ closePopup, views, setViews, action, setSelected }) => {

    const [viewName, setViewName] = useState()
    const [visibility, setVisibility] = useState(data.visibility ?? {})

    function getNextId() {
        let nextId = 0;
        views.forEach((view) => { if (view.uid > nextId) nextId = view.uid })
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        if (action === "add") {
            const newItem = { name: viewName, uid: getNextId() }
            setViews([...views, newItem])
            setSelected(newItem)
        }
        else {
        }
        closePopup()
    }
    return (
        <div className='popup-container'>
            <form className='popup-wrapper' onSubmit={handleSumbit}>
                <label htmlFor="view__name">当前方案：
                    <input value={viewName} onChange={(e) => setViewName(e.target.value)}
                        type="text" id="view__name" placeholder="请输入方案名"
                    />
                </label>
                <label htmlFor="view__sec-tab">默认页面：
                    <select id="view__sec-tab"
                        value={defaultSecTab}
                        onChange={(e) => setDefaultSecTab(e.target.value)}>
                        {secTabs.map((tabname) =>
                            <option key={tabname}>{tabname}</option>
                        )}
                    </select>
                </label>
                <h1>默认筛选条件：</h1>
                <SimpleFilters filters={filters} setFilters={setFilters} />
                <h1>默认显示列：</h1>
                <SimpleColVisibility visibility={visibility} setVisibility={setVisibility} />
                <input type="button" name="cancel" onClick={closePopup} value="取消" />
                <input type="submit" name="submit" className="blue40" value="确定" />
            </form>
        </div>
    )
}

const Views = ({ views, editable, setViews }) => {
    console.log("Views mounted");
    const updateQuery = useUpdateQueryContext()
    const query = useQueryContext()
    const updateTableData = useUpdateTableDataContext()
    const [filters, setFilters] = useState([])

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    const handleAdd = () => setOpen("add")
    const handleEdit = () => setOpen("edit")
    const closePopup = () => setOpen(false)

    const handleViewClick = async (id) => {
        setSelected(id)
        updateQuery({ type: "SET_VIEW_ID", viewId: id })
        updateTableData({ type: "CLEAR_TABLE_DATA" })
        const res = await fetchData({ ...query, viewId: id })
        updateTableData({ type: "SET_TABLE_DATA", tableData: res})
    }

    return (
        <>
            <div className='view-container row'>
                {views?.map((item, i) =>
                    <div
                        className={`view row flex-center ${selected === item.viewId ? 'selected' : 'bordered'}`}
                        key={i}
                        onClick={() => handleViewClick(item.viewId)}
                    >
                        {item.viewName}
                    </div>
                )}
                {

                }
                {/* {editable &&
                    <div className='controls row'>
                        <button className="rounded blue40" onClick={handleAdd}>
                            <AddIcon />新增方案</button>
                        <button className="rounded white"
                            onClick={handleEdit}>修改方案</button>
                    </div>
                } */}
            </div>
            {open &&
                <ViewPopup
                    action={open}
                    secTabs={secTabs}
                    closePopup={closePopup}
                    views={views}
                    setViews={setViews}
                    setSelected={setSelected}
                />
            }

            <div className="col flex-center">
                <Filters filters={filters} setFilters={setFilters} display={false} />
               
            </div>
        </>
    )
}

export default Views
