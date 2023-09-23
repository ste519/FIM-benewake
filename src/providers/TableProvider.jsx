
import { useLayoutEffect, useReducer } from "react";
import { TableDataContext, TableStatesContext, UpdateTableDataContext, UpdateTableStatesContext } from "../contexts/createContext";
import { useLocation } from "react-router-dom";
import { VISIBILITY_ALL_FALSE } from "../constants/Global";
import { fetchData } from "../api/fetch";
import { useSelectedDataContext } from "../hooks/useCustomContext";
import { getTableId } from '../js/getData'
import { filterOut9999 } from "../js/parseData";

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
    const [tableStates, updateTableStates] = useReducer(tableStatesReducer, {
        rowSelection: {},
        columnVisibility: VISIBILITY_ALL_FALSE
    })

    const { selectedQuery } = useSelectedDataContext()
    const location = useLocation();

    useLayoutEffect(() => {
        const tableId = getTableId(location)
        if (tableId) {
            async function fetch() {
                const res = await fetchData(selectedQuery[tableId])
                updateTableStates({ type: "SET_COLUMN_VISIBILITY", columnVisibility: res.columnVisibility });
                updateTableData({ type: "SET_TABLE_DATA", tableData: filterOut9999(res.lists) });
            }
            fetch()
        }
    }, [location]);

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