import React from 'react'

const AdminPopup = ({ fields, value, setValue }) => {

    return (
        <div>{fields.map((field) => {
            <label htmlFor={field}>
            <input
                id={field} 
                name={field}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </label>
        })}</div>
    )
}

export default AdminPopup