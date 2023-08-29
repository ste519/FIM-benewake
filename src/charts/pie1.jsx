import React from 'react';
import ReactECharts from 'echarts-for-react';
import benewake from '../echarts-theme/benewake.json';

export default function Pie1() {
    const option = {
        tooltip: {
            trigger: "item"
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        grid: {
            containLabel: true,
            bottom: "0%"
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                center: ["50%", "45%"],
                data: [
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
            }
        ],
        height: 400

    }
    return (
        <div className='span2'>
            <h1>测试数据</h1>
            <ReactECharts
                option={option}
                theme={benewake}
                style={{ height: 300 }}
            />
        </div>
    )
}
