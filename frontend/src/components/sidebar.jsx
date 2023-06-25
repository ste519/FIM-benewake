import React from 'react';
import Dropdown from './dropdown';

export default function Sidebar() {
    // primary为一级页面，secondary为二级页面

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
            "订单交付进度"], [], [], [], ["年度需求",
            "月度需求",
            "日常需求",
            "代理商需求",
            "新增需求",
            "询单需求"], ["历史订单",
            "销售预测"], []]
    }

    return (
        <div className="sidebar">
            {structure.primary.map(
                (item, i) =>
                    <Dropdown
                        title={item}
                        key={"dropdown" + i}
                        menuItem={structure.secondary[i]} />
            )}
        </div >
    )
}
