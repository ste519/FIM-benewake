import { useEffect, useReducer } from 'react'
import { QueryContext, UpdateQueryContext } from '../contexts/createContext';

const queryReducer = (state, action) => {
    switch (action.type) {
        case "SET_TABLE_ID":
            return { ...state, tableId: action.tableId }
        case "SET_VIEW_ID":
            return { ...state, viewId: action.viewId }
        case "SET_FILTER_CRITERIAS":
            return { ...state, filterCriterias: action.filterCriterias }
        case "ADD_FILTER_CRITERIAS":
            return { ...state, filterCriterias: [...state.filterCriterias, ...action.filterCriterias] }
        case "SET_SEC_TAB":
            return { ...state, secTab: action.secTab }
        default:
            throw new Error('Unknown action type');
    }
}

const QueryProvider = ({ children }) => {
    const [query, updateQuery] = useReducer(queryReducer,
        {
            tableId: null,
            viewId: null,
            filterCriterias: null,
            secTab: null
        }
    )
    return (
        <QueryContext.Provider value={query}>
            <UpdateQueryContext.Provider value={updateQuery}>
                {children}
            </UpdateQueryContext.Provider>
        </QueryContext.Provider>
    )
}

export default QueryProvider;