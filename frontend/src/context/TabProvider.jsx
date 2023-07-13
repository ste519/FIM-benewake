import { useContext, createContext, useState } from "react";

const TabContext = createContext(null);

export const useTabContext = () => {
    return useContext(TabContext)
}

export const TabProvider = ({ children }) => {
    const [tabs, setTabs] = useState([])
    const [tabContents, setTabContents] = useState({})
    const [selectedRows, setSelectedRows] = useState([])
    const [showSidebar, setShowSidebar] = useState(true)
    return (
        <TabContext.Provider value={{
            tabs, setTabs,
            tabContents, setTabContents,
            selectedRows, setSelectedRows,
            showSidebar, setShowSidebar
        }}>
            {children}
        </TabContext.Provider>
    )
}

export default useTabContext;