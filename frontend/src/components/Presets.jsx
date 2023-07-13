import React, { useState } from 'react'
import Filters from './Filters'
import axios from 'axios'
import useTabContext from '../context/TabProvider'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'

const PresetPopup = ({ secTabs, toggleOpen }) => {
    return (
        <div className='popup-container'>
            <form className='popup-wrapper'>
                <label htmlFor="preset__name">当前方案：</label>
                <input type="text" id="preset__name" placeholder="请输入方案名" />
                <label htmlFor="preset__sec-tab">默认页面：</label>
                <select id="preset__sec-tab" placeholder="请输入方案名" >
                    {secTabs.map((tabname) =>
                        <option key={tabname}>{tabname}</option>
                    )}
                </select>
                <div>默认筛选条件：</div>
                <Filters id="preset__filters" />
                <button onClick={toggleOpen}>取消</button>
            </form>
        </div>
    )
}
const Presets = ({ presets, editable, secTabs, path }) => {
    const { tabContents, setTabContents } = useTabContext();
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const toggleOpen = () => setOpen(!open)

    const handlePresetClick = (item) => {
        axios.get('test.json')
            .then(res =>
                setTabContents({ ...tabContents, [path]: res.data }))
            .catch((err) => console.log(err))
        setSelected(item)
    }
    return (
        <div className='preset-container row'>
            {presets?.map((item, i) =>
                <div
                    className={`preset row flex-center ${selected === item?'selected':'bordered'}`}
                    key={i}
                    onClick={() => handlePresetClick(item)}
                >
                    {item.name}
                </div>
            )}
            {editable &&
                <div className='controls row'>
                    <button className="rounded blue" onClick={toggleOpen}>
                        <AddIcon />新增方案</button>
                    <button className="rounded white"
                        onClick={toggleOpen}>修改方案</button>
                </div>
            }
            {open && <PresetPopup secTabs={secTabs} toggleOpen={toggleOpen} />}
        </div>
    )
}

export default Presets;
