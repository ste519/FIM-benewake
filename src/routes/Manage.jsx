import { useState } from 'react'
import CustomTable from '../components/CustomTable'

const schema = [
    {
        header: "姓名",
        identifier: "username",
        width: 80,
        element:
            (data, handleChange) =>
                <input
                    name="username"
                    value={data.username}
                    onChange={(e) => handleChange(["username"], [e.target.value])}
                />
    }
]
const Manage = () => {
    const [colWidths, setColWidths] = useState(schema.map(item => item.width))
    const [rows, setRows] = useState([{ username: "a" }])

    return (
        <CustomTable schema={schema} colWidths={colWidths} setColWidths={setColWidths} rows={rows} setRows={setRows} />
    )
}

export default Manage;