
import { findMessages } from '../api/message';
import PostMessage from '../routes/PostMessage';

const adminChildren = [
    {
        name: "通知管理", path: "postmessage", element: <PostMessage />, type: "admin", loader: async () => {
            const res = await findMessages()
            return res.data
        }
    },
]

export default adminChildren;
