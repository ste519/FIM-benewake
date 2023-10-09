
import { findMessages } from '../api/message';
import PostMessage from '../routes/PostMessage';

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
]

export default adminChildren;
