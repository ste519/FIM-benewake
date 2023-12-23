import DatePicker from './DatePicker';
import { memo, useState, useEffect, useRef } from 'react';
import ResizableHeader from './ResizableHeader';
import DataList from './DataList'
import { fetchCustomerType } from '../api/fetch';
import moment from 'moment';
import { EngToSize, camelToSnakeCase } from '../js/transformType';
import { useAuthContext } from '../hooks/useCustomContext';

const schema = [
    {
        header: "物料编码 *",
        identifier: "itemCode",
        element:
            (data, handleChange) => <DataList
                type="item"
                searchKey="itemCode"
                initialValue={data.itemCode}
                handleChange={handleChange}
                identifier="itemCode"
            />
    },
    {
        header: "数量 *",
        identifier: "saleNum",
        element:
            (data, handleChange) => <Input
                type="number"
                name="saleNum"
                value={data.saleNum}
                onChange={(e) => handleChange(["saleNum"], [e.target.value])}
            />
    },
    {
        header: "客户名称 *",
        identifier: "customerName",
        element:
            (data, handleChange) => <DataList
                type="customer"
                searchKey="customerName"
                initialValue={data.customerName}
                handleChange={handleChange}
                identifier="customerName"
            />
    },
    {
        header: "订单状态 *",
        identifier: "inquiryType",
        element:
            (data, handleChange) =>
                <DataList
                    initialValue={data.inquiryType}
                    handleChange={handleChange}
                    identifier="inquiryType"
                    searchKey="inquiryType"
                />
    },
    {
        header: "期望发货日期 *",
        identifier: "expectedTime",
        element:
            (data, handleChange) =>
                <DatePicker selected={data.expectedTime ? new Date(data.expectedTime) : null}
                    onChange={(date) => handleChange(["expectedTime"], [date])}
                />
    },
    {
        header: "销售员 *",
        identifier: "salesmanName",
        element:
            (data, handleChange) => <DataList
                type="user"
                searchKey="username"
                initialValue={data.salesmanName}
                handleChange={handleChange}
                identifier="salesmanName"
            />
    },
    {
        header: "物料名称",
        identifier: "itemName",
        element:
            (data) => <Input
                name="itemName"
                value={data.itemName}
                readOnly
            />
    },

    {
        header: "产品类型",
        identifier: "itemType",
        element:
            (data) => <Input
                name="item_type"
                value={data.itemType}
                readOnly
            />
    },
    {
        header: "客户类型",
        identifier: "customerType",
        element:
            (data) => <Input
                name="customerType"
                value={data.customerType}
                readOnly
            />
    },

    {
        header: "计划反馈日期",
        identifier: "arrangedTime",
        element:
            (data, handleChange) => <Input
                name="arrangedTime"
                value={data.arrangedTime ? moment(data.arrangedTime).format("YYYY/MM/DD") : ""}
                onChange={(date) => handleChange(["arrangedTime"], [date])}
                readOnly
            />
    },
    {
        header: "是否延期",
        identifier: "delay",
        element:
            (data) => <Input
                name="delay"
                value={data.delay}
                readOnly
            />
    },
    {
        header: "备注",
        identifier: "remark",
        element:
            (data, handleChange) => <Input
                name="remark"
                value={data.remark}
                onChange={(e) => handleChange(["remark"], [e.target.value])}
            />
    }
]

const Input = ({ type, name, value, readOnly, onChange, }) => {
    const { auth } = useAuthContext()

    if (name === 'arrangedTime') {
        if (auth.userType && auth.userType == "1") {
            return <DatePicker selected={!value ? null : new Date(value)}
                onChange={onChange}
            />
        }
    }
    return (
        <input
            type={type ?? "text"}
            name={name}
            className={readOnly ? "readOnly" : ""}
            readOnly={readOnly}
            value={value ?? ""}
            onChange={onChange}
        />
    );
}

const Row = ({ rowIndex, data, updateCells, colWidths }) => {

    const handleChange = (keys, values) => {
        updateCells(keys, values, rowIndex)
    }

    useEffect(() => {
        const customerId = data.customerId
        const itemId = data.itemId
        if (customerId && customerId !== "" && itemId && itemId !== "") {
            const fetch = async () => {
                const res = await fetchCustomerType(itemId, customerId)
                handleChange(["customerType"], [res.message])
            }
            fetch()
        }

    }, [data.customerId, data.itemId])

    const safeDisplay = (value, defaultValue = '') => 
    value !== null && value !== undefined ? value : defaultValue;

    return (
        <div className="tr">
            <div className='td fixed' style={{ width: 45 }}>{rowIndex + 1}</div>

            {schema.map((cell, i) =>
                <div
                    style={{ width: colWidths?.[i] ?? 70 }}
                    className='td'
                    key={cell.identifier}>
                    {cell.element(
                        { ...data, [cell.identifier]: safeDisplay(data[cell.identifier]) },
                        handleChange
                    )}
                </div>
            )}
        </div>
    )
}

const EditTable = ({ rows, setRows }) => {

    const [colWidths, setColWidths] = useState(
        schema.map(
            (item) => EngToSize(camelToSnakeCase(item.identifier))
        )
    )

    const handleResize = (index, newSize) => {
        setColWidths(prev => {
            const newWidths = [...prev];
            newWidths[index] = newSize;
            return newWidths;
        });
    };
    const updateCells = (keys, values, rowIndex) => {
        const copy = [...rows]
        keys.forEach((key, i) => copy[rowIndex] = { ...copy[rowIndex], [key]: values[i] });
        setRows(copy)
    }

    return (
        <div className='col new-table-container'>

            <div className='new-table-wrapper'>
                <div className="table new-table">
                    <div className='thead'>
                        <div className="tr">
                            <div className='th fixed' >序号 </div>

                            {schema.map((item, i) =>
                                <ResizableHeader
                                    key={i}
                                    width={colWidths?.[i]}
                                    onResize={handleResize}
                                    index={i}
                                >
                                    {item.header}
                                </ResizableHeader>)
                            }
                        </div>
                    </div>
                    <div className='tbody'>
                        {rows.map((row, i) =>
                            <Row
                                key={i}
                                rowIndex={i}
                                data={row}
                                colWidths={colWidths}
                                updateCells={updateCells}
                            />)}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditTable