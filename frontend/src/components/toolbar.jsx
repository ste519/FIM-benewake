import { useContext, useState } from 'react';
import { TabContext } from '../routes/test';
import React from 'react';
import ExcelUploader from './ExcelUploader';

export const Popup = ({ close }) => {
    return (
        <div className="popup-container ">

        </div>
    )
}

export default function Toolbar() {
    const { tabContents, setTabContents, activeTab } = useContext(TabContext)
    const [open, setOpen] = useState(false)

    const togglePopup = () => {
        setOpen(!open)
    }
    return (
        <div className='row toolbar'>
            <button>新增</button>
            <button>删除</button>
            <button>保存</button>
            <button onClick={togglePopup}>导入</button>
            <button>导出</button>
            {open ?
                <div className="popup-container">
                    <ExcelUploader close={togglePopup} />
                </div> : null}
        </div>
    )
}
