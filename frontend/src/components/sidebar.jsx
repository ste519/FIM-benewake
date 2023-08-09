import { NavLink, useNavigate } from 'react-router-dom';
import children from '../path/children';
import { useAuthContext, useUpdateTabContext } from '../hooks/useCustomContext';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg'
import { logout } from '../api/auth';


export default function Sidebar({ showSidebar }) {
    const updateTabs = useUpdateTabContext()
    const navigate = useNavigate()
    const { auth } = useAuthContext()

    const handleClick = (newTab, event) => {
        event.stopPropagation();
        updateTabs({ type: "ADD_TAB", tab: newTab })
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
            <div className='row flex-center mb1'>
                <h1>用户：{auth?.username ?? ""}</h1>
                <button className='transparent' onClick={handleLogout}>
                    <LogoutIcon />
                </button>
            </div>
        </div>
    )
}
