import useTabContext from '../hooks/useTabContext';
import { NavLink } from 'react-router-dom';
import children from '../path/children';
import { fetchNewPresets } from '../api/order';


export default function Sidebar() {
    const { tabLabels, setTabLabels, showSidebar, setShowSidebar } = useTabContext();
    const addTab = async (newTab) => {

        if (!tabLabels.includes(newTab)) {
            setTabLabels([...tabLabels, newTab]);
        }
        setShowSidebar(false)
    }
    return (
        <nav className={`sidebar  ${showSidebar ? "" : "hidden"}`}>
            {children.map((obj, i) =>
                obj.name !== "用户主页" &&
                obj.name !== "新增询单" &&
                obj.name !== "404" &&
                <NavLink
                    key={i}
                    to={obj.path}
                    className="sidebar-item"
                    onClick={() => addTab(obj)}
                >
                    {obj.name}
                </NavLink>)}
        </nav >
    )
}
