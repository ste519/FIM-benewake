import { NavLink, useNavigate } from 'react-router-dom';
import children from '../path/children';
import { useAlertContext, useAuthContext, useUpdateTabContext } from '../hooks/useCustomContext';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-right.svg'
import { logout } from '../api/auth';
import adminChildren from '../path/adminChildren';
import { ADMIN_USER } from '../constants/Global'
import { useState } from 'react';
import UpdatePassword from './updatePassword';

export default function Sidebar({ showSidebar }) {
    const updateTabs = useUpdateTabContext()
    const navigate = useNavigate()
    const { auth } = useAuthContext()
    const { alertWarning, alertError, alertSuccess, alertConfirm } = useAlertContext()

    const [showSecSidebar, setShowSecSidebar] = useState(false)
    const [showUserFeatures, setShowUserFeatures] = useState(false)
    const [showPwdPopup, setShowPwdPopup] = useState(false)

    const handleClick = (newTab, path, event) => {
        event.stopPropagation();
        const tab = { ...newTab, path: path }
        updateTabs({ type: "ADD_TAB", tab: tab })
    }

    const handleArrowClick = (name) => {
        if (name === showSecSidebar) setShowSecSidebar(false)
        else setShowSecSidebar(name)
    }

    const handleLogout = () => {
        alertConfirm("是否确认退出登录？", async () => {
            await logout()
            navigate("/login")
        })
    }
    const closePopup = () => {
        setShowPwdPopup(false)
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

                    {/* 用户菜单 */}
                    <div
                        className='col flex-center mb1 g1 user-info-container' onMouseEnter={() => setShowUserFeatures(true)}
                        onMouseLeave={() => setShowUserFeatures(false)}
                    >
                        {showUserFeatures &&
                            <ul className='user-feature-dropdown'>
                                <li onClick={() => setShowPwdPopup(true)}>修改密码</li>
                                <li onClick={handleLogout}>退出登录</li>
                            </ul>
                        }
                        <div className='row user-info-wrapper'>
                            <UserIcon/>
                            <h1>{auth?.username ?? ""}</h1>
                        </div>
                    </div>

                    {showPwdPopup && <UpdatePassword closePopup={closePopup} />}

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
