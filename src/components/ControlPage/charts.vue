<template>
        <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "charts",
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                var ids =document.getElementById('myChart');
                let myChart = echarts.init(ids);
                // 绘制图表
                myChart.setOption({
                    title: { text: '车辆状态',textStyle:{fontSize:'16px'} },
                    tooltip: {},
                    legend:{
                        show:false
                    },
                    xAxis: {
                        data: ["车辆1", "车辆2", "车辆3", "车辆4", "车辆5", "车辆6"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        }
    }
</script>

<style scoped>

</style>