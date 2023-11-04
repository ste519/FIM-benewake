
import { findMessages } from '../api/message';
import AdminTables from '../routes/AdminTables';
import PostMessage from '../routes/PostMessage';
import Manage from '../routes/Manage';
import tables from '../constants/adminTables.json'
import { fetchAdminData } from '../api/admin';

const adminChildren = [
    {
        name: "通知管理", path: "postmessage", element: <PostMessage />, type: "admin", inSidebar: true, loader: async () => {
            try {
                const res = await findMessages()
                return res
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    {
        name: "数据管理", path: "tables", element: <AdminTables />, type: "admin", menu: true, inSidebar: true
    },
    ...tables.map((table) => ({
        name: table.cn, path: table.eng, element: <Manage table={table} />, type: "admin", loader: async () => {
            try {
                const res = await fetchAdminData(table.select)
                return res
            }
            catch (err) {
                console.log(err);
            }
        }
    }))
]

export default adminChildren;
