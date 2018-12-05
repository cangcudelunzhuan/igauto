<template>
    <div class="ele-box" :style="{width:width,height:height}"></div>
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
            minBatteryVoltageNum: {
                type: Number,
            },
            maxBatteryVoltageNum:{
                type: Number,
            }
        },
        watch: {
            // 计算属性的 getter
            minBatteryVoltageNum: function (val,old) {
                this.initCharts(val,this.maxBatteryVoltageNum)
                return val
            },
            maxBatteryVoltageNum:function (val,old) {
                this.initCharts(this.minBatteryVoltageNum,val)
                return val
            }
        },
        mounted(){
            console.log()
            this.initCharts(this.minBatteryVoltageNum,this.maxBatteryVoltageNum)
        },
        methods:{
            initCharts(mindata,maxdata){
                let speed = echarts.init(this.$el);
                var that = this;
                let option = {
                    tooltip : {
                        position:['50%', '50%'],
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    toolbox: {
                        feature: {
                            restore: {show: false},
                            saveAsImage: {show: false}
                        }
                    },
                    series: [
                        {
                            name: '最高电压',
                            type: 'gauge',
                            detail: {
                                show:true,
                                formatter:'{value}',
                                offsetCenter: [0, '-36%'],
                                textStyle: {
                                    fontWeight:400,
                                    fontSize:14,
                                    display:'none',
                                    // offsetCenter: ['50%', '50%'] ,

                                    // color:'#666',
                                    // top:-50,
                                }
                            },
                            startAngle: 165,
                            endAngle: 15,
                            min:0,
                            max:15,
                            splitNumber: 2,
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 8,
                                    color: [[0.2, '#FF687A'],[0.8, '#3ED294'],[1, '#91E5C5']]
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
                        },
                        {
                            name: '最低电压',
                            type: 'gauge',
                            detail: {
                                show:true,
                                offsetCenter: [0, '36%'] ,
                                formatter:'{value}',
                                textStyle: {
                                    fontWeight:400,
                                    fontSize:14,
                                }
                            },
                            startAngle: 345,
                            endAngle: 195,
                            min:0,
                            max:15,
                            splitNumber: 2,
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 8,
                                    color: [[0.2, '#91E5C5'],[0.8, '#3ED294'],[1, '#FF687A']]
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
                option.series[0].data[0].value = maxdata;
                option.series[1].data[0].value = mindata;
                speed.setOption(option, true);
                // },2000);
                // speed.setOption(option);
            }
        }
    }
</script>

<style scoped>

</style>


