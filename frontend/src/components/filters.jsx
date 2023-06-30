import { useState, useLayoutEffect } from 'react'

export const Filter = ({ allFilterValues, setAllFilterValues, headers, conditions, index }) => {
  const values = allFilterValues[index]

  const [header, setHeader] = useState(values[0])
  const [condition, setCondition] = useState(values[1])
  const [string, setString] = useState(values[2])

  const rerenderFilter = (newValues) => {
    setAllFilterValues(newValues)
    setHeader(newValues[index][0])
    setCondition(newValues[index][1])
    setString(newValues[index][2])
  }
  
  useLayoutEffect(() => {
    let rerender = false;
    const newData = allFilterValues
    allFilterValues.forEach(
      (filterValues, i) => {
        const header = filterValues[0]
        if (!headers.includes(header)) {
          rerender = true
          newData[i] = [headers[0], conditions[0], ""]
        }
      }
    )
    if (rerender) {
      rerenderFilter(newData)
    }
  }, [headers])

  const handleHeaderChange = (event) => {
    const newValues = allFilterValues
    newValues[index][0] = event.target.value
    setHeader(event.target.value)
    setAllFilterValues(newValues)
  }

  const handleConditionChange = (event) => {
    const newValues = allFilterValues
    newValues[index][1] = event.target.value
    setCondition(event.target.value)
    setAllFilterValues(newValues)
  }

  const handleStringChange = (event) => {
    const newValues = allFilterValues
    newValues[index][2] = event.target.value
    setString(event.target.value)
    setAllFilterValues(newValues)
  }
  const removeFilter = () => {
    const data = allFilterValues.filter((_, i) => i !== index)
    rerenderFilter(data)
  }

  return (
    <div className='row filter'>
      <select value={header} onChange={handleHeaderChange}>
        {headers.map((header, i) => <option key={i}>{header}</option>)}
      </select>
      <select value={condition} onChange={handleConditionChange}>
        {conditions.map((condition, i) => <option key={i}>{condition}</option>)}
      </select>
      <input type="text" placeholder='数值' value={string} onChange={handleStringChange} />
      <button className="close-btn" onClick={removeFilter}></button>
    </div>
  )
}

export default function Filters({ headers }) {

  const conditions = ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "为空", "不为空", "类似于", "包含", "不包含", "左包含", "右包含", "IN", "NOT IN", "不等于（含空)", "不包含（含空）", "NOT IN（含空）"]

  const [allFilterValues, setAllFilterValues] = useState(
    //[筛选类型，条件，数值 （例如：物料编码，包含，编码）]
    [[headers[0], conditions[0], ""]])

  const addFilter = () => {
    setAllFilterValues([...allFilterValues, [headers[0], conditions[0], ""]])
  }

  const queryData = () => {
    console.log(allFilterValues);
  }

  return (
    <div className='row filter-container'>
      <div className="filter-wrapper">
        {allFilterValues.map((values, i) =>
          <Filter
            key={i}
            headers={headers}
            conditions={conditions}
            allFilterValues={allFilterValues}
            setAllFilterValues={setAllFilterValues}
            index={i}
          />
        )}
      </div>
      <div className="controls">
        <button onClick={addFilter}>增加筛选</button>
        <button onClick={queryData}>搜索</button>
      </div>
    </div>
  )
}
