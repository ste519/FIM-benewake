import { useState, useEffect, useLayoutEffect } from 'react'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import useTabContext from '../hooks/useTabContext'

const CONDITIONS = ["包含", "不包含", "大于", "大于等于", "等于", "不等于", "小于", "小于等于", "为空", "不为空"]
const HEADERS = ["销售员", "单据编号", "单据类型", "单据状态", "物料编码", "物料名称", "数量", "客户名称", "订单状态", "产品类型", "客户类型", "期望发货日期", "计划反馈日期", "是否延期", "订单交付进度", "运输单号", "签收时间", "最新状态", "是否定制", "创建人", "备注"]

export const Filter = ({ index, allFilterValues, setAllFilterValues, headers, conditions }) => {
  //values: ["销售员","包含",""]
  const [values, setValues] = useState(allFilterValues[index])

  useLayoutEffect(() => setValues(allFilterValues[index]), [allFilterValues, index])
  useEffect(() => {
    const copy = [...allFilterValues]
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
      <input name={`value${index}`} type="text" placeholder='数值' value={values[2]} onChange={handleStringChange} />
      <button className="close-btn" onClick={removeFilter}>
        <CloseIcon className="icon__small close-icon" />
      </button>
    </div>
  )

}

export default function Filters() {
  const { currentPreset, setCurrentView, currentView } = useTabContext()
  const [isVisible, setIsVisible] = useState(true)
  const headers = HEADERS
  const conditions = CONDITIONS
  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }

  const [allFilterValues, setAllFilterValues] = useState(currentPreset?.filters ?? [])
  useEffect(() => { setAllFilterValues(currentPreset?.filters) }, [currentPreset])

  useEffect(() => { setCurrentView({ ...currentView, filters: allFilterValues }) }, [allFilterValues])
  const addFilter = (e) => {
    e.preventDefault()
    setAllFilterValues([...allFilterValues, [headers[0], conditions[0], ""]])
  }

  const queryData = () => {
    console.log(allFilterValues);
  }
  return (
    <div className='col filter-container'>
      {
        isVisible &&
        <div className='row'>
          <div className="filter-wrapper">
            {allFilterValues?.map((_, i) =>
              <Filter
                key={i}
                headers={headers}
                conditions={conditions}
                index={i}
                allFilterValues={allFilterValues}
                setAllFilterValues={setAllFilterValues}
              />
            )}
            <button onClick={addFilter} className="icon-btn">
              <AddIcon className="icon__small add-icon" /> 新增筛选
            </button>
          </div>
          <div className="col flex-center controls">
            <button className="rounded blue40" onClick={queryData}>搜索</button>
          </div>
        </div>
      }
      <button onClick={toggleVisible} className="row flex-center toggle-btn blue5">
        <ArrowIcon className={isVisible ? "rotate180" : "rotate0"} /> {isVisible ? "收起筛选" : "展示筛选"}
      </button>
    </div>
  )
}
