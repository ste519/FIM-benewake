import React from 'react'
import useTabContext from '../hooks/useTabContext'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as LogoIcon } from '../assets/logos/logo.svg'
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { NavLink, useNavigate } from 'react-router-dom';

const Tabs = () => {
    const { tabLabels, setTabLabels } = useTabContext();
    const navigate = useNavigate();
    const removeTab = (removedTab, e) => {
        e.preventDefault();
        setTabLabels(tabLabels.filter(({name}) => { return name !== removedTab }));
        navigate("user")
    }

    return (
        <div className="tab-labels">
            {tabLabels.map(({name, path}, i) => (
                name !== "用户主页" &&
                <NavLink
                    key={i}
                    to={path}
                    className="tab"
                >
                    {name}
                    <button
                        className="close-btn"
                        onClick={(e) => removeTab(name, e)}>
                        <CloseIcon className="icon__small" />
                    </button>
                </NavLink>
            ))}
        </div>
    );
};

export const Navbar = () => {
    const navigate = useNavigate();
    const { showSidebar, setShowSidebar } = useTabContext();
    return (
        <div className="row navbar">
            <div className="brand row">
                <LogoIcon className="logo" onClick={() => navigate("用户主页")} />
                <button className="toggle-btn" >
                    <MenuIcon className={`icon__small arrow-icon ${showSidebar ? 'selected' : ''}`} onClick={() => setShowSidebar(!showSidebar)} />
                </button>
            </div>
            <Tabs />
        </div>
    )
}

export default Navbar;
