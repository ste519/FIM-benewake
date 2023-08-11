
import { findMessages } from '../api/message';
import PostMessage from '../routes/PostMessage';
import Test from '../routes/Test';

const adminChildren = [
    {
        name: "通知管理", path: "notice", element: <PostMessage />, type: "admin", loader: async () => {
            const res = await findMessages()
            return res.data
        },
    },
    {
        name: "字典管理", path: "dict", type: "admin", children: [
            { name: "用户字典", path: "user", type: "admin", element: <Test /> },
            { name: "用户类型字典", path: "user-type", type: "admin", element: "" },
            { name: "客户类型字典", path: "customer-type", type: "admin", element: "" },
            { name: "订单状态字典", path: "inquiry-type", type: "admin", element: "" },
            { name: "产品类型字典", path: "item-type", type: "admin", element: "" }
        ]
    },
    {
        name: "数据管理", path: "data", type: "admin", children: [
            { name: "物料编码管理", path: "item-code", type: "admin", element: <Test /> },
            { name: "客户管理", path: "customer", type: "admin", element: "" },
            { name: "客户类型管理", path: "customer-type", type: "admin", element: "" },
            { name: "历史订单", path: "past-inquiry", type: "admin", element: "" },
            { name: "客户名称替换表", path: "customer-name", type: "admin", element: "" },
            { name: "物料整合表", path: "item", type: "admin", element: "" },
            { name: "销售员替换表", path: "salesman", type: "admin", element: "" },
            { name: "定制物料替换表", path: "customized-item", type: "admin", element: "" },
            { name: "筛选物料表", path: "filtered-item", type: "admin", element: "" },
            { name: "季度预测表", path: "broadcast", type: "admin", element: "" }
        ]
    },
    {
        name: "产品数量标准", path: "item-num", element: ""
    }
]

export default adminChildren;
