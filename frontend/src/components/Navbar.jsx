import React from 'react'
import { useTabContext, useUpdateTabContext } from '../hooks/useCustomContext'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as LogoIcon } from '../assets/logos/logo.svg'
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { NavLink, useNavigate } from 'react-router-dom';

const Tabs = ({navigate}) => {
    console.log("Navbar mounted");

    const tabs = useTabContext()
    const updateTabs = useUpdateTabContext()
    console.log(tabs);
    const handleRemoveTab = (event, tab) => {
        event.preventDefault()
        updateTabs({ type: 'REMOVE_TAB', tab })
        navigate('/user');
    }

    return (
        <div className="tab-labels">
            {tabs?.map((tab, i) => (
                tab && tab.name !== "用户主页" &&
                <NavLink
                    key={i}
                    to={tab.path}
                    className="tab"
                >
                    {tab.name}
                    <button
                        className="close-btn"
                        onClick={(event) => handleRemoveTab(event, tab)}>
                        <CloseIcon />
                    </button>
                </NavLink>
            ))}
        </div>
    );
};

export const Navbar = ({ showSidebar, setShowSidebar }) => {
    const navigate = useNavigate();
    return (
        <div className="row navbar">
            <div className="brand row">
                <LogoIcon className="logo" onClick={() => navigate("/user")} />
                <button
                    className={`toggle-btn ${showSidebar ? 'blue40' : 'transparent'}`}
                    onClick={() => setShowSidebar(!showSidebar)}>
                    <MenuIcon />
                </button>
            </div>
            <Tabs navigate={navigate}/>
        </div>
    )
}

export default Navbar;
