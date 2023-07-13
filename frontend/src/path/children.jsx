import User from '../routes/User';
import All from '../routes/All';
import DDLX from '../routes/DDLX';
import KHLX from '../routes/KHLX';
import CPLX from '../routes/CPLX';
import XDLB from '../routes/XDLB';
import DDJF from '../routes/DDJF';
import KCZY from '../routes/KCZY';
import SCJH from '../routes/SCJH';
import Charts from '../routes/Charts';
import XSJH from '../routes/XSJH';

const children =
    [
        { name: "全部订单", path: "all", element: <All />, },
        { name: "订单类型列表", path: "order", element: <DDLX /> },
        { name: "客户类型列表", path: "customer", element: <KHLX /> },
        { name: "产品类型列表", path: "product", element: <CPLX /> },
        { name: "询单列表", path: "inquiry", element: <XDLB /> },
        { name: "订单交付进度", path: "delivery", element: <DDJF /> },
        { name: "库存占用情况", path: "inventory", element: <KCZY /> },
        { name: "生产计划", path: "production", element: <SCJH /> },
        { name: "仪表盘", path: "charts", element: <Charts /> },
        { name: "销售计划", path: "sales", element: <XSJH /> },
        { name: "用户主页", path: "user", element: <User /> }
    ]

export default children;
