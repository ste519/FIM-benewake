import { useState, useEffect } from 'react'
import AdminTable from '../components/AdminTable'
import { deleteAdminData, fetchAdminData } from '../api/admin'
import { addAdminData } from '../api/admin';


const schema = [
    {
        header: "客户类型",
        identifier: "customerType",
        width: 80,
        element:
            (data, handleChange, addConfirm) =>
                <input
                    readOnly={!data?.editable}
                    name="customerType"
                    autoComplete='off'
                    value={data.customerType}
                    onBlur={addConfirm}
                    onChange={(e) => handleChange(["customerType"], [e.target.value])}
                />
    }
]

const Manage = () => {
    const [colWidths, setColWidths] = useState(schema.map(item => item.width))
    const [rows, setRows] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchAdminData('CustomerTypes');
                console.log(res);
                setRows(res)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='col full-screen'>
            {rows?.length > 0 &&
                <AdminTable
                    schema={schema}
                    colWidths={colWidths}
                    setColWidths={setColWidths}
                    rows={rows}
                    setRows={setRows}
                />
            }
        </div>

    )
}

export default Manage;