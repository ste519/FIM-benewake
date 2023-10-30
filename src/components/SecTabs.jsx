import { useState } from 'react';
import { useSelectedDataContext, useUpdateTableDataContext } from '../hooks/useCustomContext';
import { fetchData } from '../api/fetch';
import { useLocation } from 'react-router-dom';
import { getTableId } from '../js/getData';

const SecTabs = () => {


    const updateTableData = useUpdateTableDataContext()
    const location = useLocation()
    const tableId = getTableId(location)
    const { selectedQuery, updateSelectedQuery, resetSelectedQuery } = useSelectedDataContext()
    const defaultSelection = selectedQuery[tableId]
    const [activeSecTab, setActiveSecTab] = useState(defaultSelection.secTab);

    const handleSecTabClick = async (secTab) => {
        setActiveSecTab(secTab);
        updateSelectedQuery(tableId, "secTab", secTab)
        updateTableData({ type: "CLEAR_TABLE_DATA" })
        resetSelectedQuery(tableId, "filterCriterias", defaultSelection.viewId)
        const res = await fetchData({ ...defaultSelection, secTab })
        updateTableData({ type: "SET_TABLE_DATA", tableData: res.lists })
    }
    const secTabs = ['已完成', '未过期未完成', '已过期未完成']

    return (
        <div className="sec-tab-wrapper row">
            {secTabs.map((secTab, i) =>
                <div key={i}
                    className={`secondary-tab 
                    ${activeSecTab === secTab ? "active" : ""}`}
                    onClick={() => handleSecTabClick(secTab)}>
                    {secTab}
                </div>
            )}
        </div>
    )
}


export default SecTabs;
