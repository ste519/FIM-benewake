import ReactECharts from 'echarts-for-react';
import benewake from '../echarts-theme/benewake.json';

export default function Bar1() {
    const data = ["ODM的闭环管理存在优化空间，希望FAE主导进行优化改善",
        "不常用物料的交付周期未完全定义好，计划主导进行交期重新定义",
        "5月大额订单 销售 - 计划协同性较好，并未对标品的日常发货造成影响"
    ]
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (params.seriesName == '未及时交付') {
                    return "TF-SV24S08(ODM部分包装定制)<br/>舵机(供应商供货延迟)"
                }
            }
        },
        legend: {
            orient: "vertical",
            left: "left",
            textStyle: {
            }
        },
        grid: {
            bottom: "10%",
            containLabel: true,
            left: "0%"
        },
        xAxis: {
            type: 'value',
            axisLabel: {
            }
        },
        yAxis: {
            type: 'category',
            data: ["交付单数"],
        },
        series: [
            {
                name: '未及时交付',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                },
                emphasis: {
                    focus: 'series'
                },
                data: [2]
            },
            {
                name: '已及时交付',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [115]
            },
        ]
    }

    return (
        <>
            <div className='bar1 span2'>
                <h1>订单交付情况</h1>
                <ReactECharts
                    option={option}
                    theme={benewake}
                    style={{ height: "200px" }}
                />
                <h2 className="list-label">影响因素：</h2>
                <ul className="bullet-list">
                    {data.map((item, i) => { return (<li key={i}>{item}</li>) })}
                </ul>
            </div >
        </>
    );
}