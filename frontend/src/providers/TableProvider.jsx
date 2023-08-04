
import { useLayoutEffect, useState, useEffect, useReducer } from "react";
import { TableDataContext, TableStatesContext, UpdateTableDataContext, UpdateTableStatesContext, SelectedDataContext } from "../contexts/createContext";
import { useLocation } from "react-router-dom";
import { VISIBILITY_ALL_FALSE } from "../constants/Global";
import routes from "../path/children";
import { fetchData } from "../api/fetch";

const tableDataReducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_TABLE_DATA":
            return null
        case "SET_TABLE_DATA":
            return action.tableData
        case "DELETE_ROWS":
            const indexes = Object.keys(action.rowSelection).map(Number)
            return state.filter((_, i) => !indexes.includes(i))
        default:
            throw new Error('Unknown action type');
    }
};

const tableStatesReducer = (state, action) => {
    switch (action.type) {
        case "RESET_ALL_STATES":
            return { columnVisibility: VISIBILITY_ALL_FALSE, rowSelection: {} }
        case "RESET_ROW_SELECTION":
            return { ...state, rowSelection: {} }
        case "SET_ROW_SELECTION":
            return { ...state, rowSelection: action.rowSelection }
        case "SET_COLUMN_VISIBILITY":
            return { ...state, columnVisibility: action.columnVisibility }
        default:
            throw new Error('Unknown action type');
    }
}


const TableProvider = ({ children }) => {
    const [tableData, updateTableData] = useReducer(tableDataReducer, null);
    const [selectedData, setSelectedData] = useState();
    const [tableStates, updateTableStates] = useReducer(tableStatesReducer, {
        rowSelection: {},
        columnVisibility: VISIBILITY_ALL_FALSE
    })

    const location = useLocation();
    useLayoutEffect(() => {
        async function fetch() {

            let tableId = routes.find(route => route.path === location.pathname.replace("/", "")).id
            if (tableId) {
                const res = await fetchData({ tableId, viewId: 0 })
                updateTableStates({ type: "SET_COLUMN_VISIBILITY", columnVisibility: res.columnVisibility });
                updateTableData({ type: "SET_TABLE_DATA", tableData: res.lists });
            }
        }
        fetch()
    }, [location]);

    return (
        <TableDataContext.Provider value={tableData}>
            <UpdateTableDataContext.Provider value={updateTableData}>
                <TableStatesContext.Provider value={tableStates}>
                    <UpdateTableStatesContext.Provider value={updateTableStates}>
                        <SelectedDataContext.Provider value={{ selectedData, setSelectedData }}>
                            {children}
                        </SelectedDataContext.Provider>
                    </UpdateTableStatesContext.Provider>
                </TableStatesContext.Provider>
            </UpdateTableDataContext.Provider>
        </TableDataContext.Provider >
    );
}

export default TableProvider;