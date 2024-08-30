import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

interface EChartProps {
    option: echarts.EChartsOption;
    height?: string | number; // 使用基本数据类型
    width?: string | number;  // 使用基本数据类型
}

const EChart: React.FC<EChartProps> = ({ option, height = '400px', width = '500px' }) => {
    return <div style={{ width, height }}>
        <ReactECharts option={option} />
    </div>;
};

export default EChart;