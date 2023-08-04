import { useState, useEffect, useLayoutEffect } from 'react'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { CONDITIONS } from '../constants/FilterConsts'

const conditions = CONDITIONS

export const Filter = ({ index, initialValues, setFilters, headers }) => {
    const [values, setValues] = useState(initialValues)

    useEffect(() => setValues(initialValues), [initialValues])

    useEffect(() => {
        setFilters(prev => prev.map((filter, i) => i === index ? values : filter));
    }, [values]);


    const removeFilter = () => {
        setFilters(prev => prev.filter((_, i) => i !== index))
    }

    const handleChange = (key, value) => {
        setValues(prev => ({
            ...prev,
            [key]: value,
        }));
    }

    return (
        <div className='row filter' >
            <select value={values?.colName} onChange={(e) => handleChange("colName", e.target.value)}>
                {headers.map((header, i) => <option value={header.id} key={i}>{header.name}</option>)}
            </select>
            <select value={values?.condition} onChange={(e) => handleChange("condition", e.target.value)}>
                {conditions.map((condition, i) => <option value={condition.id} key={i}>{condition.name}</option>)}
            </select>
            <input value={values?.value} name="value" type="text" placeholder='数值' onChange={(e) => handleChange("value", e.target.value)} />
            <button className="close-btn" onClick={removeFilter}>
                <CloseIcon className="icon__small close-icon" />
            </button>
        </div>
    )
}

export default function SimpleFilters({ filters, setFilters, headers}) {

    const initialFilterValue = {
        colName: headers[0].id, condition: conditions[0].id, value: ""
    }

    const addFilter = () => {
        setFilters(prev => [...prev, initialFilterValue])
    }

    return (
        <div className='col filter-container'>
            <div className='row'>
                <div className="filter-wrapper">
                    {filters?.map((value, i) =>
                        <Filter
                            key={i}
                            index={i}
                            initialValues={value}
                            filters={filters}
                            setFilters={setFilters}
                            headers={headers}
                        />
                    )}
                    <button onClick={addFilter} className="icon-btn">
                        <AddIcon className="icon__small add-icon" /> 新增筛选
                    </button>
                </div>
            </div>
        </div>
    )
}
