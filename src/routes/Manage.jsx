import { useState, useEffect } from 'react'
import AdminTable from '../components/admin/AdminTable'
import { useLoaderData } from 'react-router-dom'
import { fetchAdminData } from '../api/admin';
import adminSchemas from '../constants/adminSchemas';
import adminDefs from '../constants/defs/AdminDefs';

const Manage = ({ type }) => {
    const data = useLoaderData();
    const [rows, setRows] = useState(data)
    const schema = Object.keys(rows[0]).flatMap(key => adminDefs.filter((item) => item.eng === key))

    const handleRefresh = async () => {
        const fetchUrl = adminSchemas[type].select
        const res = await fetchAdminData(fetchUrl)
        setRows(res ?? [])
    }

    useEffect(() => {
        setRows(data)
    }, [type]);


    return (
        <div className='col full-screen'>
            {rows?.length > 0 &&
                <AdminTable
                    schema={schema}
                    type={type}
                    rows={rows}
                    setRows={setRows}
                    handleRefresh={handleRefresh}
                />
            }
        </div>
    )
}

export default Manage;