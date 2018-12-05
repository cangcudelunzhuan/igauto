<template>
    <div id="lineTempCharts" :style="{width:width,height:height}"></div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/line');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "line-temp-chart",
        props: {
            lineTempData: {
                type: Array,
            },
            height: {
                type: String,
                default: '200px'
            },
            width: {
                type: String,
                default: '300px'
            },

        },
        watch: {
            // 计算属性的 getter
            lineTempData: function (val,old) {
                this.drawLine(val);
            },
        },
        mounted() {
            this.drawLine(this.lineTempData);
        },
        methods: {
            drawLine(lineTempData) {
                // 基于准备好的dom，初始化echarts实例
                var ids =document.getElementById('lineTempCharts');
                let myChart = echarts.init(ids);
                var array = [];
                for(var i=0;i<lineTempData.length;i++){
                    array.push(i+1);
                }
                // 绘制图表
                myChart.setOption({
                    title:{text: '可充电储能温度数据(℃)'},
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: array,
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: lineTempData,
                        type: 'bar',
                        itemStyle:{
                            normal:{
                                color:'#ffc374'
                            }
                        }
                    }]
                });
            }
        }
    }
</script>

<style scoped>

</style>