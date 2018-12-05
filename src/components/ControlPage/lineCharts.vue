<template>
    <div id="lineCharts" :style="{width: '100%', height: '600px'}"></div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/line');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "line-charts",
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                var ids =document.getElementById('lineCharts');
                let myChart = echarts.init(ids);
                // 绘制图表
                myChart.setOption({
                    title:{text: '车辆绑定'},
                    xAxis: {
                        type: 'category',
                        data: ['一月', 'T二月', '三月', '四月', '五月', '六月', '七月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                });
            }
        }
    }
</script>

<style scoped>

</style>