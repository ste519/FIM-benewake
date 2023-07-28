import { useState } from 'react';
import { useQueryContext, useUpdateQueryContext, useUpdateTableDataContext } from '../hooks/useCustomContext';
import { fetchData } from '../api/fetch';

const SecTabs = () => {
    const [activeSecTab, setActiveSecTab] = useState();
    const updateQuery = useUpdateQueryContext();
    const query = useQueryContext()
    const updateTableData = useUpdateTableDataContext()

    const handleSecTabClick = async (secTab) => {
        setActiveSecTab(secTab);
        updateQuery({ type: "SET_SEC_TAB", secTab })
        updateTableData({ type: "CLEAR_TABLE_DATA" })
        const res = await fetchData({ ...query, secTab })
        updateTableData({ type: "SET_TABLE_DATA", tableData: res })
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
