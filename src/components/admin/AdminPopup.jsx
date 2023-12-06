import React from 'react'
import adminSchema from '../../constants/schemas/adminSchema';
import { useState } from 'react';
import adminDefs from '../../constants/defs/AdminDefs';
import { addAdminData } from '../../api/admin';
import { useAlertContext } from '../../hooks/useCustomContext';

const getLabels = (array) => {
    return array.reduce((acc, key) => {
        const item = adminDefs.find(item => item.eng === key);
        if (item) {
            acc.push(item.cn);
        }
        return acc;
    }, [])
}

const getInitialValues = (array) => {
    return array.reduce((acc, key) => {
        acc[key] = ''
        return acc
    }, {})
}

const AdminPopup = ({ type, action, closePopup, handleRefresh }) => {
    const { alertError, alertSuccess, alertWarning } = useAlertContext();
    let keys = adminSchema[type][action].bodyKeys ?? []

    const [values, setValues] = useState(getInitialValues(keys))
    const labels = action !== "delete" && getLabels(keys)

    const handleAdd = async (e) => {
        e.preventDefault()
        const res = await addAdminData(type, values)
        if (res.message.includes("成功")) {
            alertSuccess(res.message)
        }
        else if (res.message.includes("失败")) {
            alertError(res.message);
        }
        else {
            alertWarning(res.message)
        }
        handleRefresh()
        closePopup()
    }

    

    const addForm = <form className='col flex-center g1' onSubmit={handleAdd}>
        {labels?.length > 0 && labels.map((label, index) =>
            <label key={index} htmlFor={label} className='row'>
                {label}
                <input
                    id={label}
                    name={label}
                    type="text"
                    value={values[keys[index]]}
                    onChange={(e) => setValues(prev => ({ ...prev, [keys[index]]: e.target.value }))}
                />
            </label>
        )}
        <div className='row mt1 g1'>
            <button className='small white bordered' onClick={closePopup}>取消</button>
            <input type="submit" value="确定" className='small blue40' />
        </div>
    </form>

    return (
        <div className='popup-container admin-popup flex-center'>
            <div className='admin-popup-wrapper col flex-center' >
                {action === "add" && addForm}
            </div>
        </div>
    )
}

export default AdminPopup