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
        setTabLabels(tabLabels.filter(({ name }) => { return name !== removedTab }));
        navigate("user")
    }

    return (
        <div className="tab-labels">
            {tabLabels.map(({ name, path }, i) => (
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
                        <CloseIcon />
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
                <LogoIcon className="logo" onClick={() => navigate("user")} />
                <button className={`toggle-btn ${showSidebar ? 'blue40' : 'transparent'}`} onClick={() => setShowSidebar(!showSidebar)}>
                    <MenuIcon />
                </button>
            </div>
            <Tabs />
        </div>
    )
}

export default Navbar;
