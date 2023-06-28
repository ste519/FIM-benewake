import { useContext } from 'react';
import { TabContext } from '../routes/test';
import React from 'react';
import CSVUploader from './CSVUploader';


export default function Toolbar() {
    const { tabContents, setTabContents, activeTab } = useContext(TabContext)
    const addData = (newData) => {
        const oldData = tabContents[activeTab]

        setTabContents({ ...tabContents, [activeTab]: { ...oldData, ...newData } })
    }
    console.log(tabContents);
    return (
        <div className='row'>
            <button onClick={() => addData({ "label1": "newdata" })}>新增</button>
            <CSVUploader />
            <button>删除</button>
            <button>保存</button>
            <button>导入</button>
            <button>导出</button>
        </div>
    )
}
