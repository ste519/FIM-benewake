import { useState } from 'react';
import { ReactComponent as DownIcon } from '../assets/icons/arrow-down.svg';

const ColVisibility = ({ table }) => {
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(!open)
    const handleReset = () => {
        table.resetColumnVisibility()
        toggleOpen()
    }
    return (
        <div className="visibility-container col" >
            <button onClick={toggleOpen} className='toggle-btn'>显示列<DownIcon /></button>
            {
                open &&
                <div className="col visibility-wrapper">
                    <label>
                        <input
                            type="checkbox"
                            name="visibilityAll"
                            checked={table.getIsAllColumnsVisible()}
                            onChange={table.getToggleAllColumnsVisibilityHandler()}
                        />
                        全选
                    </label>
                    {table.getAllColumns().map(column => column.getCanHide() ? <label key={column.id}>
                        <input
                            type='checkbox'
                            name={"visibility" + column.id}
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                        />
                        {column.columnDef.header}
                    </label> : null
                    )}
                    <button onClick={handleReset}>重置</button>
                    <button onClick={toggleOpen}>确认</button>
                </div >
            }
        </div >
    )
}

export default ColVisibility;