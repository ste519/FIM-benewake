
import { findMessages } from '../api/message';
import Tables from '../routes/Tables';
import PostMessage from '../routes/PostMessage';
import Manage from '../routes/Manage';

const adminChildren = [
    {
        name: "通知管理", path: "postmessage", element: <PostMessage />, type: "admin", loader: async () => {
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
        name: "表单管理", path: "tables", element: <Tables />, type: "admin",
        children: [{ name: "管理", path: "manage", element: <Manage />, type: "admin" }]
    }
]

export default adminChildren;
