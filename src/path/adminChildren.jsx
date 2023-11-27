
import { findMessages } from '../api/message';
import AdminTables from '../routes/AdminTables';
import PostMessage from '../routes/PostMessage';
import Manage from '../routes/Manage';
import adminSchemas from '../constants/adminSchemas'
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
    ...Object.keys(adminSchemas).map((key) => ({
        name: adminSchemas[key].cn,
        path: key,
        element: <Manage type={key} />,
        type: "admin", 
        loader: async () => {
            try {
                const res = await fetchAdminData(adminSchemas[key].select)
                return res
            }
            catch (err) {
                console.log(err);
            }
        }
    }))
]

export default adminChildren;
