import ReactECharts from 'echarts-for-react';
import benewake from '../echarts-theme/benewake.json';

export default function Bar2() {
    const data = ["TF02-Pro-W-485(单品包装)-V1.0  Q3电子物料的准备",
        "Luna  电子物料只预留了3~5 K的安全库存",
        "Q2 mini-S外壳和Luna外壳采购数量较大，供应商Q2应急能力减弱，Q3 mini-S 外壳需求减少， Luna外壳应急能力恢复。"
    ]
    const option = {
        grid: {
            bottom: "10%",
            containLabel: true,
            left: "0%",
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: "vertical",
            left: "left",
            top: "top",
            textStyle: {
            }
        },
        xAxis: {
            type: 'value',
            axisLabel: {
            }
        },
        yAxis: {
            type: 'category',
            data: ["数量"],
            axisLabel: {
            }
        },
        series: [
            {
                name: '亿嘉和科技股份有限公司',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    formatter: function (params) {
                        return "亿嘉和科技股份有限公司" + "\n" + "TF02-Pro-W-485(单品包装)-V1.0"
                    },
                    textStyle: {
                        lineHeight: 30
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [60]
            },
            {
                name: '深圳市前海铼停科技有限公司',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    formatter: "TF-Luna(LT/整箱包装)-V1.0"
                },
                emphasis: {
                    focus: 'series'
                },
                data: [60]
            },
        ]
    }
    function onChartReady(echarts) {
        console.log('echarts is ready', echarts);
    }

    return (
        <>
            <div className='bar2 span2'>
                <h1>重点客户预测情况</h1>
                <ReactECharts
                    option={option}
                    onChartReady={onChartReady}
                    theme={benewake}
                />
                <h2 className="list-label">影响因素：</h2>
                <ul className="bullet-list">
                    {data.map((item, i) => { return (<li key={i}>{item}</li>) })}
                </ul>
            </div >
        </>

    );
}