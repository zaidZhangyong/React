import EChart from '../../../components/ECharts';
import { EChartsOption } from 'echarts';
export default function DataAnalysis() {
    const chartOption1: EChartsOption = {
        title: {
            text: 'ECharts Example'
        },
        tooltip: {},
        xAxis: {
            data: ['A', 'B', 'C', 'D', 'E']
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
            text: 'Referer of a Website',
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
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
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
            <EChart option={chartOption1} height='300px' width='500px' />
            <EChart option={chartOption2} height='300px' width='500px' />
        </>

    )
}
