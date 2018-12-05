<template>
        <div id="speedCharts" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/gauge');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "speed-charts",
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                var ids =document.getElementById('speedCharts');
                let myChart = echarts.init(ids);
                // 绘制图表
                var option = {
                    // title: {
                    //     text: '速度',
                    // },
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            detail: {
                                formatter:'{value} (速度)',
                                textStyle: {
                                    fontWeight:400,
                                    fontSize:14,
                                    // color:'#666',
                                    top:-50,
                                }
                            },
                            startAngle: 180,
                            endAngle: 0,
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 8,
                                    color: [[0.2, '#ff0033'],[0.4, '#ffcc00'],[0.8, '#009999'],[1, '#6BC235']]
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 15,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 20,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            axisLabel: {
                                shadowColor : '#fff', //默认透明
                                color: 'auto',
                            },
                            data: [{value: 50}]
                        }
                    ]
                };
                setInterval(function () {
                    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                    myChart.setOption(option, true);
                },2000);
            }
        }
    }
</script>

<style scoped>

</style>