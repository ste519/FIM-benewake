import User from '../routes/User';
import All from '../routes/All';
import Charts from '../routes/Charts';
import New from '../routes/New';
import NotFound from '../routes/NotFound';
import fetchInventory from '../api/test';
import Production from '../routes/Production';
import Order from '../routes/Order';
import Customer from '../routes/Customer';
import Product from '../routes/Product';
import Inquiry from '../routes/Inquiry';
import Delivery from '../routes/Delivery';
import Inventory from '../routes/Inventory';
import Sales from '../routes/Sales';

const children = [
    { name: "全部订单", path: "all", element: <All />, id: 1 },
    { name: "订单类型列表", path: "order", element: <Order />, id: 2 },
    { name: "客户类型列表", path: "customer", element: <Customer />, id: 3 },
    { name: "产品类型列表", path: "product", element: <Product />, id: 4 },
    { name: "询单列表", path: "inquiry", element: <Inquiry />, id: 5 },
    { name: "订单交付进度", path: "delivery", element: <Delivery />, id: 6 },
    { name: "库存占用情况", path: "inventory", element: <Inventory /> },
    { name: "生产计划", path: "production", element: <Production /> },
    // { name: "仪表盘", path: "charts", element: <Charts /> },
    { name: "销售计划", path: "sales", element: <Sales /> },
    { name: "用户主页", path: "user", element: <User /> },
    { name: "新增询单", path: "new", element: <New /> },
    { name: "404", path: "*", element: <NotFound /> }
]

export default children;
