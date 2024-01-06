import DataList from "../../components/DataList";
import DatePicker from "../../components/DatePicker";

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

const newDefs = [
    {
        header: "单据编号",
        identifier: "inquiryCode",
        element:
            (data) =>
                < Input
                    name="inquiryCode"
                    value={data.inquiryCode}
                    readOnly
                />
    },
    {
        header: "物料编码 *",
        identifier: "itemCode",
        element:
            (data, handleChange) =>
                <DataList
                    type="item"
                    searchKey="itemCode"
                    initialValue={data.itemCode}
                    handleChange={handleChange}
                    identifier="itemCode"
                />
    },
    {
        header: "物料名称",
        identifier: "itemName",
        element:
            (data) =>
                <Input
                    name="itemName"
                    value={data.itemName}
                    readOnly
                />
    },
    {
        header: "数量 *",
        identifier: "saleNum",
        element:
            (data, handleChange) =>
                <Input
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
            (data, handleChange) =>
                <DataList
                    type="customer"
                    searchKey="customerName"
                    initialValue={data.customerName}
                    handleChange={handleChange}
                    identifier="customerName"
                />
    },
    {
        header: "销售员 *",
        identifier: "salesmanName",
        element:
            (data, handleChange) =>
                <DataList
                    type="user"
                    searchKey="username"
                    initialValue={data.salesmanName}
                    handleChange={handleChange}
                    identifier="salesmanName"
                />
    },
    {
        header: "产品类型",
        identifier: "itemType",
        element:
            (data) =>
                <Input
                    name="itemType"
                    value={data.itemType}
                    readOnly
                />
    },
    {
        header: "客户类型",
        identifier: "customerType",
        element:
            (data) =>
                <Input
                    name="customerType"
                    value={data.customerType}
                    readOnly
                />
    },
    {
        header: "期望发货日期 *",
        identifier: "expectedTime",
        element:
            (data, handleChange) =>
                <DatePicker selected={data.expectedTime}
                    onChange={(date) => handleChange(["expectedTime"], [date])}
                />
    },
    {
        header: "计划反馈日期",
        identifier: "arrangedTime",
        element:
            (data) => <Input
                name="arrangedTime"
                value={data.arrangedTime}
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

export default newDefs;