import { NavLink, useNavigate } from 'react-router-dom';
import children from '../path/children';
import { useUpdateTabContext, useQueryContext, useUpdateQueryContext } from '../hooks/useCustomContext';
import {  logout } from '../api/auth';

export default function Sidebar({ showSidebar }) {
    console.log("Sidebar mounted");
    const updateTabs = useUpdateTabContext()
    const updateQuery = useUpdateQueryContext()
    const navigate = useNavigate()

    const handleClick = (newTab, event) => {
        event.stopPropagation();
        updateTabs({ type: "ADD_TAB", tab: newTab })
        updateQuery({ type: "SET_TABLE_ID", tableId: newTab.id })
    }

    const handleLogout = async() => {
        await logout()
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        navigate("/login")
    }
    return (
        <div className={`sidebar col ${showSidebar ? "" : "hidden"}`}>
            <nav className="col">
                {children.map((obj, i) =>
                    obj.name !== "用户主页" &&
                    obj.name !== "新增询单" &&
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
