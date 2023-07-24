import { useState, useEffect } from "react";
import { TabContext } from "../js/createContext";

const initialView = {
    "visibility": {
        "物料编码": true,
        "物料名称": true,
        "6月包装": true
    },
    "selectedSecTab": "已完成",
    "filters": [
        [
            "物料编码",
            "包含",
            ""
        ],
        [
            "物料名称",
            "包含",
            ""
        ],
        [
            "客户类型",
            "包含",
            ""
        ],
        [
            "产品类型",
            "包含",
            ""
        ],
        [
            "订单状态",
            "包含",
            ""
        ]
    ]
}

const TabProvider = ({ children }) => {

    const [tabLabels, setTabLabels] = useState([])
    const [tabContents, setTabContents] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [showSidebar, setShowSidebar] = useState(true)
    const [currentPreset, setCurrentPreset] = useState(null)
    const [currentView, setCurrentView] = useState(initialView)
    const [pinnedRows, setPinnedRows] = useState()

    //TODO
    // useEffect(() => { console.log(showSidebar); }, [showSidebar])
    return (
        <TabContext.Provider value={{
            tabLabels, setTabLabels,
            tabContents, setTabContents,
            rowSelection, setRowSelection,
            showSidebar, setShowSidebar,
            currentPreset, setCurrentPreset,
            currentView, setCurrentView,
            pinnedRows, setPinnedRows
        }}>
            {children}
        </TabContext.Provider>
    )
}
export default TabProvider;