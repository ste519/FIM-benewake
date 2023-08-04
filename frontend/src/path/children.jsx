import User from '../routes/User';
import All from '../routes/All';
import Charts from '../routes/Charts';
import New from '../routes/New';
import NotFound from '../routes/NotFound';
import fetchInventory from '../api/test';
import Production from '../routes/Production';
import Order from '../routes/Order';
import Customer from '../routes/Customer';
import Item from '../routes/Item';
import Inquiry from '../routes/Inquiry';
import Delivery from '../routes/Delivery';
import Inventory from '../routes/Inventory';
import Sales from '../routes/Sales';
import Edit from '../routes/Edit';
import { fetchData, fetchNewViews } from '../api/fetch';
import { useLocation } from 'react-router-dom';

function HideableRoute({ children, path }) {
    const location = useLocation();
    const active = location.pathname.replace("/", "") === path;

    // If not active, hide the component, but do not unmount it
    if (!active) {
        return <div style={{ display: 'none' }}>{children}</div>
    }

    // If active, render it as normal
    return children;
}

const children = [
    {
        name: "全部订单", path: "all", id: 1,
        element: <HideableRoute path="all"><All /></HideableRoute>,
        loader: async () => {
            const viewRes = await fetchNewViews("1")
            return {
                newViews: viewRes.data
            }
        }

    },
    { name: "订单类型列表", path: "order", element: <HideableRoute path="order"><Order /></HideableRoute>, id: 2 },
    { name: "客户类型列表", path: "customer", element: <Customer />, id: 3 },
    { name: "产品类型列表", path: "item", element: <Item />, id: 4 },
    { name: "订单转换列表", path: "inquiry", element: <Inquiry />, id: 5 },
    { name: "订单交付进度", path: "delivery", element: <Delivery />, id: 6 },
    { name: "库存占用情况", path: "inventory", element: <Inventory /> },
    { name: "生产计划", path: "production", element: <Production /> },
    // { name: "仪表盘", path: "charts", element: <Charts /> },
    { name: "销售计划", path: "sales", element: <Sales /> },
    { name: "用户主页", path: "user", element: <User /> },
    { name: "新增询单", path: "new", element: <New /> },
    {
        name: "修改询单", path: "edit", element: <Edit />,
    },
    { name: "404", path: "*", element: <NotFound /> }
]

export default children;
