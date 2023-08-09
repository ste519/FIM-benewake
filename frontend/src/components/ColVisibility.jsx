import { useEffect, useState } from 'react';
import { ReactComponent as DownIcon } from '../assets/icons/arrow-down.svg';
import { useTableStatesContext, useUpdateTableStatesContext } from '../hooks/useCustomContext';
import colNameDict from '../constants/ColNameDict.json'
import { VISIBILITY_ALL_FALSE, VISIBILITY_ALL_TRUE } from '../constants/Global';

const ColVisibility = ({ editable }) => {
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(!open)
    const { columnVisibility } = useTableStatesContext()
    const [visibility, setVisibility] = useState()
    const updateTableStates = useUpdateTableStatesContext()

    useEffect(() => setVisibility(columnVisibility), [columnVisibility])

    const toggleSelectAll = () => {
        if (Object.values(visibility).includes(false)) {
            setVisibility(VISIBILITY_ALL_TRUE)
        }
        else {
            setVisibility(VISIBILITY_ALL_FALSE)
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
        <div className="visibility-container col" >
            <button onClick={toggleOpen} className='toggle-btn'>显示列<DownIcon /></button>
            {
                open &&
                (editable ?
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
                    </div>
                    :
                    <div className=' visibility-wrapper col-selection'>
                        {
                            colNameDict.map(
                                col =>
                                    <label key={col.col_id}>
                                        <input
                                            type='checkbox'
                                            name={"visibility" + col.col_id}
                                            checked={visibility[col.col_name_ENG]}
                                            disabled
                                        />
                                        {col.col_name_CN}
                                    </label>
                            )}
                    </div>)
            }
        </div >
    )
}

export default ColVisibility;