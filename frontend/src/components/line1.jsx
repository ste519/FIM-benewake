import React from 'react'
import testdata from "../test/test.json"
import ReactECharts from 'echarts-for-react';
import benewake from "../echarts-theme/benewake.json"

export default function Line1() {
    const option = {
        xAxis: {
            type: 'category',
            data: testdata.map(item => item["物料名称"]),
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
        },
        tooltip: {
            trigger: "item"
        },
        series: [
            {
                data: testdata.map(item => item["6月包装"]),
                type: 'line'
            },
            {
                data: testdata.map(item => item["6月包装"]),
                type: 'bar'
            }
        ],
        grid: {
            containLabel: true,
            bottom: "0%",
            top: "0%"
        }
    };
    console.log(testdata);
    return (
        <div className='line1 span4'>
            <h1>测试数据</h1>
            <ReactECharts
                option={option}
                style={{
                    height: '500px',
                    width: '100%',
                }}
                theme={benewake}
            />
        </div>
    )
}
