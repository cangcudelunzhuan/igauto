<template>
    <div id="rightCharts" :style="{width: '100%', height: '300px'}"></div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/pie');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "right-chart",
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                var ids =document.getElementById('rightCharts');
                let myChart = echarts.init(ids);
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '车型',
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data: ['西凉', '陕西','兖州','荆州','幽州']
                    },
                    series : [
                        {
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '50%'],
                            selectedMode: 'single',
                            data:[
                                {value:1548, name: '幽州'},
                                {value:535, name: '荆州'},
                                {value:510, name: '兖州'},
                                {value:634, name: '益州'},
                                {value:735, name: '西凉'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped>

</style>