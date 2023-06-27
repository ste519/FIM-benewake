import { useState } from 'react';
import Dropdown from './dropdown';

export default function Sidebar() {
    // primary为一级页面，secondary为二级页面
    const [activeItem, setActiveItem] = useState(null)
    function handleItemClick(i) {
        setActiveItem(i);
    }
    const structure = {
        primary: ["订单列表",
            "新增询单",
            "库存占用情况",
            "生产计划",
            "需求列表",
            "仪表盘",
            "销售计划"],
        secondary: [["订单类型列表",
            "客户类型列表",
            "询单列表",
            "订单交付进度"], null, null, null, ["年度需求",
            "月度需求",
            "日常需求",
            "代理商需求",
            "新增需求",
            "询单需求"], ["历史订单",
            "销售预测"], null]
    }

    return (
        <div className="sidebar">
            <ul className="sidemenu">
                {structure.primary.map(
                    (item, i) =>
                        structure.secondary[i] != null ?
                            <Dropdown
                                onClick={() => handleItemClick(i)}
                                label={item}
                                key={"dropdown" + i}
                                items={structure.secondary[i]}
                                active={activeItem == i ? true : false}
                            /> :
                            <li className={`dropdown-item ${activeItem == i ? "active" : ""}`} key={"li" + i} onClick={() => handleItemClick(i)}> {item} </li>

                )}
            </ul>
        </div >
    )
}
