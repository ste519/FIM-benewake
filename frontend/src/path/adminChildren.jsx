
import PostMessage from '../routes/PostMessage';

const adminChildren = [
    { name: "通知管理", path: "postmessage", element: <PostMessage />, type: "admin" },
]

export default adminChildren;
