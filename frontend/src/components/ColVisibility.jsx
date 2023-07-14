import { useState } from 'react';

const ColVisibility = ({ table }) => {
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(!open)
    const handleReset = () => {
        table.resetColumnVisibility()
        toggleOpen()
    }
    return (
        <div className="visibility-container">
            <div className="row dropdown">
                显示列
                <button onClick={toggleOpen}>▾</button>
            </div>
            {open &&
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
                        {column.id}
                    </label> : null
                    )}
                    <button onClick={handleReset}>重置</button>
                    <button onClick={toggleOpen}>确认</button>
                </div >}
        </div >
    )
}

export default ColVisibility;