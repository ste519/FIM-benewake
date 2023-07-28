import { useState, useEffect, useLayoutEffect } from 'react'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-down.svg'
import {useTabContext} from '../hooks/useCustomContext';

const CONDITIONS = ["包含", "不包含", "大于", "大于等于", "等于", "不等于", "小于", "小于等于", "为空", "不为空"]
const HEADERS = ["销售员", "单据编号", "单据类型", "单据状态", "物料编码", "物料名称", "数量", "客户名称", "订单状态", "产品类型", "客户类型", "期望发货日期", "计划反馈日期", "是否延期", "订单交付进度", "运输单号", "签收时间", "最新状态", "是否定制", "创建人", "备注"]

export const Filter = ({ index, filters, setFilters, headers, conditions }) => {
    //values: ["销售员","包含",""]
    const [values, setValues] = useState(filters[index])

    useLayoutEffect(() => setValues(filters[index]), [filters[index]])
    useEffect(() => {
        const copy = [...filters]
        copy[index] = values
        setFilters(copy)
    }, [values])

    const removeFilter = () => {
        setFilters(filters.filter((_, i) => i !== index))
    }

    const handleHeaderChange = (event) => {
        setValues([event.target.value, values[1], values[2]])
    }

    const handleConditionChange = (event) => {
        setValues([values[0], event.target.value, values[2]])
    }

    const handleStringChange = (event) => {
        setValues([values[0], values[1], event.target.value])
    }

    return (
        <div className='row filter' >
            <div className='select-wrapper'>
                <select value={values[0]} onChange={handleHeaderChange}>
                    {headers.map((header, i) => <option key={i}>{header}</option>)}
                </select>
                <ArrowIcon className="arrow-icon" />
            </div>
            <div className='select-wrapper'>
                <select value={values[1]} onChange={handleConditionChange}>
                    {conditions.map((condition, i) => <option key={i}>{condition}</option>)}
                </select>
                <ArrowIcon className="arrow-icon" />
            </div>
            <input name={`value${index}`} type="text" placeholder='数值' value={values[2]} onChange={handleStringChange} />
            <button className="close-btn" onClick={removeFilter}>
                <CloseIcon className="icon__small close-icon" />
            </button>
        </div>
    )

}

const SimpleFilters = ({ filters, setFilters }) => {
    const headers = HEADERS
    const conditions = CONDITIONS

    const addFilter = (e) => {
        e.preventDefault()
        setFilters([...filters, [headers[0], conditions[0], ""]])
    }

    return (
        <div className="filter-wrapper">
            {filters?.map((_, i) =>
                <Filter
                    key={i}
                    headers={headers}
                    conditions={conditions}
                    index={i}
                    filters={filters}
                    setFilters={setFilters}
                />
            )}
            <button onClick={addFilter} className="icon-btn">
                <AddIcon className="icon__small add-icon" /> 新增筛选
            </button>
        </div>

    )
}

export default SimpleFilters;
