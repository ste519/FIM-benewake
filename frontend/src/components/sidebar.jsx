import useTabContext from '../context/TabProvider';
import { NavLink } from 'react-router-dom';
import children from '../path/children';

export default function Sidebar() {
    const { tabs, setTabs, showSidebar } = useTabContext();
    const addTab = (newTab) => {
        if (!tabs.includes(newTab)) {
            setTabs([...tabs, newTab]);
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
