import React from 'react';
import ReactECharts from 'echarts-for-react';
import benewake from '../echarts-theme/benewake.json';

export default function Area1() {
    const option = {
        tooltip: {
            trigger: "item",
        },
        grid: {
            containLable: true,
            bottom: "0%"
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {color: "#074DD9"}
            }
        ]
    };
    return (
        <div className='area1 span2'>
            <h1>测试数据</h1>
            <ReactECharts
                option={option}
                theme={benewake}
            />
        </div>
    )
}
