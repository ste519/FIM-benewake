import { useReducer } from "react";
import { TabContext, UpdateTabContext } from "../contexts/createContext";

const tabReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TAB':
            if (state.some(item => JSON.stringify(item) === JSON.stringify(action.tab)))
                return state
            else
                return [...state, action.tab];
        case 'REMOVE_TAB':
            return state.filter(tab => tab !== action.tab);
        default:
            throw new Error('Unknown action type');
    }
};

const TabProvider = ({ children }) => {
    const [tabs, updateTabs] = useReducer(tabReducer, []);
    return (
        <TabContext.Provider value={tabs}>
            <UpdateTabContext.Provider value={updateTabs}>
                {children}
            </UpdateTabContext.Provider>
        </TabContext.Provider>
    );
}

export default TabProvider;