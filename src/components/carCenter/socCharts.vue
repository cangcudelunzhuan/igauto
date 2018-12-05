<template>
    <div :style="{width:width,height:height}"></div>
</template>

<script>
    import echarts from 'echarts'
    export default{
        props: {
            width: {
                type: String,
                default: '300px'
            },
            height: {
                type: String,
                default: '200px'
            },
            socData: {
                type: Number,
            }
        },
        watch: {
            // 计算属性的 getter
            socData: function (val,old) {
                this.initCharts(val);
            }
        },
        data() {
            return {
            }
        },
        mounted(){
            this.initCharts(this.socData)
        },
        methods:{
            initCharts(val){
                var that = this;
                let speed = echarts.init(this.$el);
                let option = {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    toolbox: {
                        position:['50%', '50%'],
                        feature: {
                            restore: {show: false},
                            saveAsImage: {show: false}
                        }
                    },
                    series: [
                        {
                            name: 'soc',
                            type: 'gauge',
                            detail: {
                                formatter:'{value}',
                                textStyle: {
                                    fontWeight:400,
                                    fontSize:14,
                                    // color:'#666',
                                    // top:-50,
                                }
                            },
                            // startAngle: 180,
                            // endAngle: 0,
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 8,
                                    color: [[0.2, '#FF687A'],[0.4, '#FDCF46'],[0.8, '#3ED294'],[1, '#91E5C5']]
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

                // setInterval(function () {
                option.series[0].data[0].value = val;
                speed.setOption(option, true);
                // },2000);
                // speed.setOption(option);
            }
        }
    }
</script>

<style scoped>

</style>