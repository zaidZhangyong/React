import { EChartsOption } from 'echarts';
import EChart from '../../../components/ECharts';
export default function DataAnalysis() {
    const chartOption1: EChartsOption = {
        title: {
            text: '销售数量',
            left: 'center'
        },
        tooltip: {},
        xAxis: {
            data: ['女装', '男装', '鞋', '数码', '电子']
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: [5, 20, 36, 10, 10]
            }
        ]
    };
    const chartOption2: EChartsOption = {
        title: {
            text: '数据占比',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '女装' },
                    { value: 735, name: '男装' },
                    { value: 580, name: '鞋' },
                    { value: 484, name: '数码' },
                    { value: 300, name: '电子' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    return (
        <>
            <div>数据分析</div>
            <EChart option={chartOption1} height='400px' width='100%' />
            <EChart option={chartOption2} height='300px' width='100%'  />
        </>

    )
}
