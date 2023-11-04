import { NavLink } from "react-router-dom";
import { useUpdateTabContext } from "../hooks/useCustomContext";
import tables from '../constants/adminTables.json'

const AdminTables = () => {
    const updateTabs = useUpdateTabContext()

    const handleClick = (name, path) => {
        const newTab = { name: name, path: path, type: "admin" }
        updateTabs({ type: "ADD_TAB", tab: newTab })
    }

    return (
        <div className='col full-screen admin-tables'>
            <h1>数据管理</h1>
            <nav className="row">
                {tables.map((table, i) =>
                    <NavLink
                        key={i}
                        to={"/admin/" + table.eng}
                        onClick={() => handleClick(table.cn, table.eng)}>
                        {table.cn}
                    </NavLink>
                )}
            </nav >
        </div>
    )
}

export default AdminTables;