import { useState, useEffect, useLayoutEffect } from 'react'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'

const CONDITIONS = ["包含", "不包含", "大于", "大于等于", "等于", "不等于", "小于", "小于等于", "为空", "不为空"]
const HEADERS = ["销售员", "单据编号", "单据类型", "单据状态", "物料编码", "物料名称", "数量", "客户名称", "订单状态", "产品类型", "客户类型", "期望发货日期", "计划反馈日期", "是否延期", "订单交付进度", "运输单号", "签收时间", "最新状态", "是否定制", "创建人", "备注"]

export const Filter = ({ index, allFilterValues, setAllFilterValues, headers, conditions }) => {
  //values: ["销售员","包含",""]
  const initialValues = allFilterValues[index]
  const [values, setValues] = useState(initialValues)

  useLayoutEffect(() => {
    setValues(allFilterValues[index])
  }, [allFilterValues])

  useEffect(() => {
    const copy = allFilterValues
    copy[index] = values
    setAllFilterValues(copy)
  }, [values])

  const removeFilter = () => {
    setAllFilterValues(allFilterValues.filter((_, i) => i !== index))
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
      <input type="text" placeholder='数值' value={values[2]} onChange={handleStringChange} />
      <button className="close-btn" onClick={removeFilter}>
        <CloseIcon className="icon__small close-icon" />
      </button>
    </div>
  )

}

export default function Filters() {

  const headers = HEADERS
  const conditions = CONDITIONS

  
  const [allFilterValues, setAllFilterValues] = useState(preference.filters)

  const addFilter = () => {
    setAllFilterValues([...allFilterValues, [headers[0], conditions[0], ""]])
  }

  const queryData = () => {
    console.log(allFilterValues);
  }

  return (
    <div className='row filter-container'>
      <div className="filter-wrapper">
        {/* {allFilterValues.map((_, i) =>
          <Filter
            key={i}
            headers={headers}
            conditions={conditions}
            index={i}
            allFilterValues={allFilterValues}
            setAllFilterValues={setAllFilterValues}
          />
        )} */}
        <button onClick={addFilter}>
          <AddIcon className="icon__small add-icon" />
        </button>
      </div>
      <div className="controls">
        <button onClick={queryData}>搜索</button>
      </div>
    </div>
  )
}
