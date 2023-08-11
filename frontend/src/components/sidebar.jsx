import { NavLink, useNavigate } from 'react-router-dom';
import children from '../path/children';
import { useAuthContext, useUpdateTabContext } from '../hooks/useCustomContext';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-right.svg'
import { logout } from '../api/auth';
import adminChildren from '../path/adminChildren';
import { ADMIN_USER } from '../constants/Global'
import { useState } from 'react';

export default function Sidebar({ showSidebar }) {
    const updateTabs = useUpdateTabContext()
    const navigate = useNavigate()
    const { auth } = useAuthContext()

    const [showSecSidebar, setShowSecSidebar] = useState(false)

    const handleClick = (newTab, path, event) => {
        event.stopPropagation();
        const tab = { ...newTab, path: path }
        updateTabs({ type: "ADD_TAB", tab: tab })
    }

    const handleArrowClick = (name) => {
        if (name === showSecSidebar) setShowSecSidebar(false)
        else setShowSecSidebar(name)
    }

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    return (
        <>
            <div className={`sidebar col ${showSidebar ? "" : "hidden"}`}>
                <div className='col flex-between'>
                    <nav className="col">
                        {children.map((obj, i) =>
                            obj.type !== "hidden" &&
                            <NavLink
                                key={i}
                                to={"/" + obj.path}
                                className="sidebar-item"
                                onClick={(e) => handleClick(obj, "/" + obj.path, e)}
                            >
                                {obj.name}
                            </NavLink>)
                        }
                        {
                            auth?.userType == ADMIN_USER &&
                            adminChildren.map((obj, i) =>
                                obj.children ?
                                    <div key={i} className='sidebar-item row flex-between flex-center'
                                        onClick={() => handleArrowClick(obj.name)}>
                                        {obj.name}
                                        <ArrowIcon className={obj.name === showSecSidebar ? "rotate180" : ""} />
                                    </div>
                                    : <NavLink
                                        key={i}
                                        to={"/admin/" + obj.path}
                                        className="sidebar-item"
                                        onClick={(e) => handleClick(obj, "/admin/" + obj.path, e)}
                                    >
                                        {obj.name}
                                    </NavLink>
                            )}
                    </nav>
                    <div className='row flex-center mb1 user-info-container'>
                        <h1>用户：{auth?.username ?? ""}</h1>
                        <button onClick={handleLogout} >
                            <LogoutIcon />
                        </button>
                    </div>
                </div >
            </div >
            <nav className={`sidebar col sec-sidebar ${showSecSidebar ? "" : "hidden"}`}>
                {
                    adminChildren.map((obj) =>
                        obj.name === showSecSidebar && obj.children.map((item, j) =>
                            <NavLink
                                key={j}
                                to={`/admin/${obj.path}/${item.path}`}
                                className="sidebar-item"
                                onClick={(e) => handleClick(item, `/admin/${obj.path}/${item.path}`, e)}
                            >
                                {item.name}
                            </NavLink>
                        )
                    )
                }
            </nav>
        </>
    )
}
