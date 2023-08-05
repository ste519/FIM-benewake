import { NavLink, useNavigate } from 'react-router-dom';
import children from '../path/children';
import { useUpdateTabContext, useUpdateQueryContext, useUpdateTableDataContext, useUpdateTableStatesContext } from '../hooks/useCustomContext';
import { logout } from '../api/auth';
import { fetchData } from '../api/fetch';

export default function Sidebar({ showSidebar }) {
    const updateTabs = useUpdateTabContext()
    const updateQuery = useUpdateQueryContext()
    const updateTableData = useUpdateTableDataContext()
    const updateTableStates = useUpdateTableStatesContext()
    const navigate = useNavigate()

    const handleClick = async (newTab, event) => {
        event.stopPropagation();
        updateTabs({ type: "ADD_TAB", tab: newTab })
        updateQuery({ type: "SET_TABLE_ID", tableId: newTab.id })

        const res = await fetchData({ tableId: newTab.id, viewId: 0 })
        updateTableData({ type: "SET_TABLE_DATA", tableData: res.lists })
        updateTableStates({ type: "SET_COLUMN_VISIBILITY", columnVisibility: res.columnVisibility })
    }

    const handleLogout = async () => {
        await logout()
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        navigate("/login")
    }
    return (
        <div className={`sidebar col ${showSidebar ? "" : "hidden"}`}>
            <nav className="col">
                {children.map((obj, i) =>
                    obj.name !== "用户主页" &&
                    obj.name !== "新增询单" &&
                    obj.name !== "修改询单" &&
                    obj.name !== "404" &&
                    <NavLink
                        key={i}
                        to={obj.path}
                        className="sidebar-item"
                        onClick={(e) => handleClick(obj, e)}
                    >
                        {obj.name}
                    </NavLink>)}
            </nav >
            <button onClick={handleLogout}>退出登录</button>
        </div>
    )
}
