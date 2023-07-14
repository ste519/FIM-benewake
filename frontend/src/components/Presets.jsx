import React, { useState } from 'react'
import Filters from './Filters'
import axios from 'axios'
import useTabContext from '../hooks/useTabContext'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { useLocation } from 'react-router-dom'
import fetchData from '../api/fetchData'
import fetchPreset from '../api/fetchPreset';
import SimpleColVisibility from './SimpleColVisibility'
import SimpleFilters from './SimpleFilters'

const PresetPopup = ({ secTabs, closePopup, presets, setPresets, action, setSelected }) => {
    const { currentPreset, setCurrentPreset, currentView } = useTabContext()
    const data = action === "edit" ? currentPreset : currentView
    const [presetName, setPresetName] = useState(data.name ?? "")
    const [defaultSecTab, setDefaultSecTab] = useState(data.defaultSecTab ?? "")
    const [filters, setFilters] = useState(data.filter ?? [])
    const [visibility, setVisibility] = useState(data.visibility ?? {})

    function getNextId() {
        let nextId = 0;
        presets.forEach((preset) => { if (preset.uid > nextId) nextId = preset.uid })
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        if (action === "add") {
            const newItem = { name: presetName, uid: getNextId() }

            setCurrentPreset({ name: presetName, defaultSecTab, filters, visibility })
            setPresets([...presets, newItem])
            setSelected(newItem)
        }
        else {
        }
        closePopup()
    }
    return (
        <div className='popup-container'>
            <form className='popup-wrapper' onSubmit={handleSumbit}>
                <label htmlFor="preset__name">当前方案：
                    <input value={presetName} onChange={(e) => setPresetName(e.target.value)}
                        type="text" id="preset__name" placeholder="请输入方案名"
                    />
                </label>
                <label htmlFor="preset__sec-tab">默认页面：
                    <select id="preset__sec-tab"
                        value={defaultSecTab}
                        onChange={(e) => setDefaultSecTab(e.target.value)}>
                        {secTabs.map((tabname) =>
                            <option key={tabname}>{tabname}</option>
                        )}
                    </select>
                </label>
                <h1>默认筛选条件：</h1>
                <SimpleFilters filters={filters} setFilters={setFilters}/>
                <h1>默认显示列：</h1>
                <SimpleColVisibility visibility={visibility} setVisibility={setVisibility} />
                <input type="button" name="cancel" onClick={closePopup} value="取消" />
                <input type="submit" name="submit" className="blue40" value="确定" />
            </form>
        </div>
    )
}
const Presets = ({ presets, editable, secTabs, setPresets }) => {
    const { setCurrentPreset, tabContents, setTabContents } = useTabContext();
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const path = useLocation().pathname.replace("/", "")

    const handleAdd = () => {
        setOpen("add")
    }
    const handleEdit = () => {
        setOpen("edit")
    }

    const closePopup = () => {
        setOpen(false)
    }

    const handlePresetClick = async (item) => {
        setSelected(item)
        setTabContents({ ...tabContents, [path]: await fetchData() })
        setCurrentPreset(await fetchPreset())
    }

    return (
        <div className='preset-container row'>
            {presets?.map((item, i) =>
                <div
                    className={`preset row flex-center ${selected === item ? 'selected' : 'bordered'}`}
                    key={i}
                    onClick={() => handlePresetClick(item)}
                >
                    {item.name}
                </div>
            )}
            {editable &&
                <div className='controls row'>
                    <button className="rounded blue40" onClick={handleAdd}>
                        <AddIcon />新增方案</button>
                    <button className="rounded white"
                        onClick={handleEdit}>修改方案</button>
                </div>
            }
            {open &&
                <PresetPopup
                    action={open}
                    secTabs={secTabs}
                    closePopup={closePopup}
                    presets={presets}
                    setPresets={setPresets}
                    setSelected={setSelected}
                />
            }
        </div>
    )
}

export default Presets;
