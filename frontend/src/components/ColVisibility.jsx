import { useEffect, useState } from 'react';
import { ReactComponent as DownIcon } from '../assets/icons/arrow-down.svg';
import { useTableStatesContext, useUpdateTableStatesContext, useTableDataContext } from '../hooks/useCustomContext';
import colNameDict from '../constants/ColNameDict.json'

// Convert all values to true
const allTrue = (obj) => Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = true;
    return newObj;
}, {});

// Convert all values to false
const allFalse = (obj) => Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = false;
    return newObj;
}, {});

const ColVisibility = () => {
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(!open)
    const { columnVisibility } = useTableStatesContext()
    const [visibility, setVisibility] = useState({})
    const tableData = useTableDataContext()
    const updateTableStates = useUpdateTableStatesContext()

    useEffect(() => setVisibility(columnVisibility), [columnVisibility])

    const toggleSelectAll = () => {
        if (Object.values(visibility).includes(false)) {
            setVisibility(allTrue(visibility))
        }
        else {
            setVisibility(allFalse(visibility))
        }
    }
    const handleChange = (name) => {
        setVisibility({ ...visibility, [name]: !visibility[name] })
    }

    const handleConfirm = () => {
        updateTableStates({ type: "SET_COLUMN_VISIBILITY", columnVisibility: visibility })
        toggleOpen()
    }

    return (
        <>
            {tableData &&
                <div className="visibility-container col" >
                    <button onClick={toggleOpen} className='toggle-btn'>显示列<DownIcon /></button>
                    {
                        open &&
                        <div className="col visibility-wrapper">
                            <label key="-1">
                                <input
                                    type="checkbox"
                                    name="visibilityAll"
                                    checked={!Object.values(visibility).includes(false)}
                                    onChange={toggleSelectAll}
                                />
                                全选
                            </label>
                            <div className='col-selection'>
                                {
                                    colNameDict.map(
                                        col =>
                                            <label key={col.col_id}>
                                                <input
                                                    type='checkbox'
                                                    name={"visibility" + col.col_id}
                                                    checked={visibility[col.col_name_ENG]}
                                                    onChange={() => handleChange(col.col_name_ENG)}
                                                />
                                                {col.col_name_CN}
                                            </label>
                                    )}
                            </div>
                            <div className='row flex-center'>
                                <button onClick={toggleOpen}>取消</button>
                                <button onClick={handleConfirm}>确认</button>
                            </div>
                        </div >
                    }
                </div >
            }
        </>
    )
}

export default ColVisibility;