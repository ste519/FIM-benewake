
import { useLayoutEffect, useEffect, useReducer } from "react";
import { TableDataContext, TableStatesContext, UpdateTableDataContext, UpdateTableStatesContext } from "../contexts/createContext";
import { useLocation } from "react-router-dom";

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
            return { columnVisibility: {}, rowSelection: {} }
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
    const [tableStates, updateTableStates] = useReducer(tableStatesReducer, {
        rowSelection: {},
        columnVisibility: {}
    })

    //Clear states upon route change
    const location = useLocation();
    useLayoutEffect(() => {
        updateTableStates({ type: "RESET_ALL_STATES" });
    }, [location]);
    //TODO
    useEffect(() => { console.log("tableStates: ", tableStates); }, [tableStates])
    useEffect(() => { console.log("tableData: ", tableData); }, [tableData])
    return (
        <TableDataContext.Provider value={tableData}>
            <UpdateTableDataContext.Provider value={updateTableData}>
                <TableStatesContext.Provider value={tableStates}>
                    <UpdateTableStatesContext.Provider value={updateTableStates}>
                        {children}
                    </UpdateTableStatesContext.Provider>
                </TableStatesContext.Provider>
            </UpdateTableDataContext.Provider>
        </TableDataContext.Provider >
    );
}

export default TableProvider;