<template>
    <!--<div class="www">-->
        <div  style="width:100px; height: 18.75rem;">

        </div>

    <!--</div>-->

</template>

<script>
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/line');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

    export default {
        name: "temp-chart",
        props: {
            tempValue: {
                type: Number,
            },
            color1: {
                type: String,
                default: '#F7B95E'
            },
            color2: {
                type: String,
                default: '#FA3434'
            },
            bgColor:{
                type: String,
                default: '#fdd'
            },
            tempText:{
                type: String,
            }

        },

        watch: {
            // 计算属性的 getter
            tempValue: function (val,old) {
                this.drawLine(val);
            }
        },
        mounted() {
            this.drawLine(this.tempValue);
        },
        methods: {

            drawLine(val) {
                let bar = echarts.init(this.$el);
                var that =this;
                var data = [50];
                var xMax = 190;
                var axisColor = '#fff';
                var option = {
                    tooltip: {
                        show: true,
                        position:['50%', '50%'],
                        formatter: function(params){
                            return that.tempText+((params.value)-40)+'℃';
                        },
                    },
                    yAxis: [{
                        min:0,
                        max:180,
                        position:'left',
                        offset:-20,
                        axisTick: {
                            show: true,
                            // color:'#fff',
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            formatter:function(value,index){
                                return value-40;
                            }
                            //color:'#fff',
                        },
                        splitLine: {
                            show: false,
                            // color:'#fff',
                        },
                        splitNumber :10,
                    }],
                    xAxis: [{
                        type: 'category',
                        data: ['温度'],
                        axisTick: {
                            // color:'#fff',
                            show: false,
                        },
                        axisLine: {
                            //  color:'#fff',
                            show: false,
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                            }
                        }

                    }],
                    series: [{
                        name: ' ',
                        type: 'bar',
                        barWidth: 15,
                        silent: true,

                        itemStyle: {
                            normal: {
                                // color: '#A0A1A7',
                                color: this.bgColor,
                                barBorderRadius: [7, 7, 0, 0],

                            }

                        },
                        barGap: '-100%',

                        //barCategoryGap: '60%',
                        data: data.map(function(d) {
                            return xMax
                        }),
                    }, {
                        name: ' ',
                        type: 'bar',
                        barWidth: 15,
                        label: {
                            normal: {
                                show: false,
                                position: 'top',
                                // formatter: function(o){
                                //     return o.value-30+'℃';
                                // },
                            }
                        },
                        data: [{
                            value: (val)+40,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: this.color1},
                                            {offset: 1, color: this.color2}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: this.color1},
                                            {offset: 1, color: this.color2}
                                        ]
                                    )
                                }
                            }
                        } ],
                    }]
                };

                bar.setOption(option);
            }
        }
    }
</script>

<style scoped>

</style>