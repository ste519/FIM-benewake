import { useState, useEffect } from 'react'
import AdminTable from '../components/admin/AdminTable'
import { useLoaderData } from 'react-router-dom'
import adminDefs from '../constants/defs/AdminDefs';

const Manage = ({ table }) => {
    const data = useLoaderData();
    const schema = adminDefs.filter(item => item.type === table.eng)
    const [rows, setRows] = useState([])

    const handleRefresh = () => {
        setRows(data);
    }

    useEffect(() => {
        handleRefresh()
    }, [table]);


    return (
        <div className='col full-screen'>
            {rows?.length > 0 &&
                <AdminTable
                    schema={schema}
                    rows={rows}
                    setRows={setRows}
                    handleRefresh={handleRefresh}
                />
            }
        </div>
    )
}

export default Manage;