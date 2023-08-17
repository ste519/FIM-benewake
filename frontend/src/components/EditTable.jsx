import DatePicker from './DatePicker';
import { useState, useEffect } from 'react';
import ResizableHeader from './ResizableHeader';
import DataList from './DataList'
import { fetchCustomerType } from '../api/fetch';
import moment from 'moment';
import { EngToSize, camelToSnakeCase } from '../js/transformType';

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
                identifier="item_code"
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
        identifier: "inquiry_type",
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
        identifier: "expected_time",
        element:
            (data, handleChange) =>
                <DatePicker selected={new Date(data.expectedTime)}
                    onChange={(date) => handleChange(["expectedTime"], [date])}
                />
    },
    {
        header: "销售员 *",
        identifier: "salesman_name",
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
        identifier: "item_name",
        element:
            (data) => <Input
                name="item_name"
                value={data.itemName}
                readOnly
            />
    },

    {
        header: "产品类型",
        identifier: "item_type",
        element:
            (data) => <Input
                name="item_type"
                value={data.itemType}
                readOnly
            />
    },
    {
        header: "客户类型",
        identifier: "customer_type",
        element:
            (data) => <Input
                name="customer_type"
                value={data.customerType}
                readOnly
            />
    },

    {
        header: "计划反馈日期",
        identifier: "arrangedTime",
        element:
            (data) => <Input
                name="arrangedTime"
                value={moment(data.arrangedTime).format("YYYY/MM/DD")}
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

const Input = ({ type, name, value, readOnly, onChange }) => {
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

    return (
        <div className="tr">
            <div className='td fixed' style={{ width: 45 }}>{rowIndex + 1}</div>

            {schema.map((cell, i) =>
                <div
                    style={{ width: colWidths?.[i] ?? 70 }}
                    className='td'
                    key={cell.identifier}>
                    {cell.element(data, handleChange)}
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
        keys.forEach((key, i) => copy[rowIndex] = { ...copy[rowIndex], [key]: values[i] })
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