
import { findMessages } from '../api/message';
import PostMessage from '../routes/PostMessage';
import Manage from '../routes/Manage';
import adminSchema from '../constants/schemas/adminSchema'
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
    ...Object.keys(adminSchema).map(key => ({
        name: adminSchema[key].cn,
        path: key,
        element: <Manage type={key} />,
        type: "admin",
        loader: async ({ signal }) => {
            try {
                const res = await fetchAdminData(adminSchema[key].select, { signal });
                return res;
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error("Error fetching admin data:", err);
                }
                throw err;
            }
        }
    }))
]

export default adminChildren;
