import { useState, useEffect, useLayoutEffect } from 'react'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-down.svg'
import { CONDITIONS } from '../constants/FilterConsts'
import { useQueryContext, useUpdateQueryContext, useUpdateTableDataContext } from '../hooks/useCustomContext'
import { fetchData } from '../api/fetch'

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
        {headers.map((header, i) => <option value={header.col_name_ENG} key={i}>{header.col_name_CN}</option>)}
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

export default function Filters({ display, headers }) {

  const [isVisible, setIsVisible] = useState(display ?? true)
  const toggleVisible = () => setIsVisible(!isVisible)

  const query = useQueryContext()

  let initialFilters = query.tableId < 6 ? [
    { colName: "item_code", condition: "like", value: "" },
    { colName: "item_name", condition: "like", value: "" },
    { colName: "customer_name", condition: "like", value: "" },
    { colName: "item_type", condition: "like", value: "" },
    { colName: "inquiry_type", condition: "like", value: "" }
  ] : [
    { colName: "item_code", condition: "like", value: "" },
    { colName: "item_name", condition: "like", value: "" },
    { colName: "customer_name", condition: "like", value: "" }
  ]
  const [filters, setFilters] = useState(query.filterCriterias ? query.filterCriterias : initialFilters)

  useEffect(() => {
    console.log(query.filterCriterias);
    if (query.filterCriterias)
      setFilters(query.filterCriterias)
  },
    [query.filterCriterias]
  )

  const updateQuery = useUpdateQueryContext()
  const updateTableData = useUpdateTableDataContext()

  const initialFilterValue = {
    colName: headers[0].col_name_ENG, condition: conditions[0].id, value: ""
  }

  const addFilter = () => {
    setFilters(prev => [...prev, initialFilterValue])
  }

  const queryData = async () => {
    updateQuery({ type: "SET_FILTER_CRITERIAS", filterCriterias: filters })
    updateTableData({ type: "CLEAR_TABLE_DATA" })
    const res = await fetchData({ ...query, filterCriterias: filters })
    updateTableData({ type: "SET_TABLE_DATA", tableData: res.lists })
  }

  return (
    <div className='col filter-container'>
      {
        isVisible &&
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
