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
            }
        },
        data() {
            return {
            }
        },
        mounted(){
            this.initCharts()
        },
        methods:{
            initCharts(){
                let speed = echarts.init(this.$el);
                let option = {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    series: [
                        {
                            name: 'soc',
                            type: 'gauge',
                            max:250,
                            detail: {formatter:'{value}'},
                            data: [{value: 50, name: '速度'}]
                        }
                    ]
                };
                setInterval(function () {
                    option.series[0].data[0].value = (Math.random() * 250).toFixed(2) - 0;
                    speed.setOption(option, true);
                },2000);
            }
        }
    }
</script>
