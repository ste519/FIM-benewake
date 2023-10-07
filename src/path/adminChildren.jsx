
import { findMessages } from '../api/message';
import Manage from '../routes/Manage';
import PostMessage from '../routes/PostMessage';

const adminChildren = [
    {
        name: "通知管理", path: "postmessage", element: <PostMessage />, type: "admin", loader: async () => {
            const res = await findMessages()
            return res.data
        }
    },
    {
        name: "用户管理", path: "user", element: <Manage />, type: "admin"
    }
]

export default adminChildren;
