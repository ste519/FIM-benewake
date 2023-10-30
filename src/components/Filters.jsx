import { useState, useEffect, useCallback, useMemo } from 'react'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/cross.svg'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-down.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import conditions from '../constants/FilterConsts'
import { useSelectedDataContext, useUpdateTableDataContext } from '../hooks/useCustomContext'
import { fetchData } from '../api/fetch'
import { useLocation } from 'react-router-dom'
import { getTableId } from '../js/getData'
import SimpleDataList from './SimpleDataList'
import schema from '../constants/FilterSchema.json'
import DatePicker from './DatePicker'

// inquiry_code 单据编号：模糊匹配 /order/inquiryCodeList
// inquiry_init_type 单据类型：前端模糊匹配(销售预测，销售询单，供应链预估)
// state 单据状态：前端模糊匹配
// created_user_name 创建人：模糊匹配 /user/likelist
// item_type 产品类型：模糊匹配 /item/itemTypeList
// inquiry_type 订单状态：模糊匹配 /order/inquiryTypeList
// item_code 物料编码：模糊匹配 /item/
// item_name物料名称：模糊匹配 /item/itemNameList
// customer_name 客户名称：模糊匹配 /customer/likeList
// salesman_name 销售员：模糊匹配 /user/likelist
// sale_num 数量：自由输入，数字
// expected_time 期望发货日期：日期选择
// arranged_time 计划反馈日期：日期选择
// delay 是否延期：前端模糊匹配 
// customer_type 客户类型：模糊匹配 /customer/typeList
// order_delivery_progress 订单交付进度：模糊匹配 ？
// delivery_code 运输单号：模糊匹配 /delivery/deliveryCodeList
// receive_time 签收时间：日期选择
// delivery_state 最新状态：模糊匹配  ?
// customize 是否定制：前端模糊匹配
// remark 备注：自由输入

const getInputElement = (schemaItem, value, handleChange) => {
  const { identifier, element, url, searchKey } = schemaItem
  if (element === "datalist") {
    return <SimpleDataList
      name={identifier}
      url={url}
      searchKey={searchKey}
      initialValue={value}
      handleChange={handleChange}
    />
  }
  else if (element === "datepicker") {
    return <DatePicker
      name={identifier}
      selected={value}
      onChange={(date) => handleChange("value", date)}
    />
  }
  else if (element === "number") {
    return <input
      type="number"
      name={identifier}
      value={value}
      onChange={(e) => handleChange("value", e.target.value)}
    />
  }
  else if (element === "text") {
    return <input
      type="text"
      name={identifier}
      value={value}
      onChange={(e) => handleChange("value", e.target.value)}
    />
  }
}

const isHeaderExisted = (filters, header) => {
  const existedHeaders = filters.map((filter) => filter.colName);
  return (
    existedHeaders.includes(header.col_name_ENG)
  );
}

export const Filter = ({ index, initialValues, setFilters, filters, headers }) => {

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
    <div className='row filter'>
      <div className='filter-select-wrapper'>
        <select value={values.colName} onChange={(e) => handleChange("colName", e.target.value)}>
          {headers.map((header, i) =>
            <option
              value={header.col_name_ENG}
              key={i}
              disabled={header.col_name_ENG === values.colName ? false : isHeaderExisted(filters, header)}
            >{header.col_name_CN}
            </option>)}
        </select>
        <ArrowIcon />
      </div>
      <div className='filter-select-wrapper'>
        <select value={values.condition} onChange={(e) => handleChange("condition", e.target.value)}>
          {conditions.map((condition, i) => <option value={condition.id} key={i}>{condition.name}</option>)}
        </select>
        <ArrowIcon />
      </div>
      {getInputElement(schema[values.colName], values.value, handleChange)}

      <button className="close-btn" onClick={removeFilter}>
        <CloseIcon className="icon__small close-icon" />
      </button>
    </div>
  )
}

export default function Filters({ display, headers }) {
  const [isVisible, setIsVisible] = useState(display ?? true)
  const toggleVisible = () => setIsVisible(!isVisible)

  const { selectedQuery, updateSelectedQuery } = useSelectedDataContext()
  const location = useLocation()
  const tableId = getTableId(location)
  const defaultSelection = selectedQuery[tableId]

  const [filters, setFilters] = useState(defaultSelection?.filterCriterias)

  const updateTableData = useUpdateTableDataContext()

  const enabledHeaders = useMemo(() => headers.filter(header => !isHeaderExisted(filters, header)), [headers, filters]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      queryData();
    }
  }

  const initialFilterValue = useMemo(() => ({
    colName: enabledHeaders[0]?.col_name_ENG, condition: conditions[0].id, value: ""
  }), [enabledHeaders])

  useEffect(() => {
    if (JSON.stringify(defaultSelection?.filterCriterias) !== JSON.stringify(filters)) {
      setFilters(defaultSelection?.filterCriterias);
    }
  }, [defaultSelection?.filterCriterias]);

  useEffect(() => {
    if (tableId === 1 && defaultSelection.viewId > 0) {
      updateSelectedQuery(tableId, "filterCriterias", filters)
    }
  }, [filters])


  const addFilter = () => {
    setFilters(prev => [...prev, initialFilterValue])
  }

  const queryData = async () => {
    updateTableData({ type: "CLEAR_TABLE_DATA" })
    const res = await fetchData({ ...defaultSelection, filterCriterias: filters })
    updateTableData({ type: "SET_TABLE_DATA", tableData: res.lists })
  }

  return (
    <div className='col filter-container' >
      {
        isVisible &&
        <div className='row'>
          <div className="filter-wrapper" tabIndex="0"
            onKeyDown={handleKeyDown} >
            {filters?.map((value, i) =>
              <Filter
                key={i}
                index={i}
                initialValues={value}
                setFilters={setFilters}
                headers={headers}
                filters={filters}
              />
            )}
            {enabledHeaders?.length > 0 &&
              <button onClick={addFilter} className="icon-btn">
                <AddIcon className="icon__small add-icon" /> 新增筛选
              </button>
            }
          </div>
          <div className="col flex-center controls">
            <button className="rounded blue40" onClick={queryData}>
              <SearchIcon />搜索
            </button>
          </div>
        </div>
      }
      <button onClick={toggleVisible} className="row flex-center toggle-btn blue5">
        <ArrowIcon className={isVisible ? "rotate180" : "rotate0"} /> {isVisible ? "收起筛选" : "展示筛选"}
      </button>
    </div >
  )
}
