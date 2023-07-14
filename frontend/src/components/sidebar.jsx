import useTabContext from '../hooks/useTabContext';
import { NavLink } from 'react-router-dom';
import children from '../path/children';

export default function Sidebar() {
    const { tabLabels, setTabLabels, showSidebar } = useTabContext();
    const addTab = (newTab) => {
        if (!tabLabels.includes(newTab)) {
            setTabLabels([...tabLabels, newTab]);
        }
    }
    return (
        <>
            {showSidebar ?
                <nav className="sidebar">
                    {children.map((obj, i) =>
                        obj.name !== "用户主页" &&
                        <NavLink
                            key={i}
                            to={obj.path}
                            className="sidebar-item"
                            onClick={() => addTab(obj)}
                        >
                            {obj.name}
                        </NavLink>)}
                </nav >
                : null}
        </>
    )
}
