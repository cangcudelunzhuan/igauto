<template>
  <div style="width: 100%;height:64vh;"></div>
</template>

<script>
  import echarts from "echarts";
  export default {
    data() {
      return {};
    },
    props: {
      sum: Array,
      time: Array,
      amount: Array,
      describe: Array
    },
    watch: {
      amount: function(val, old) {
        this.initCharts();
      }
    },
    mounted() {
      // console.log(this.describe, this.time, this.amount, this.sum);
      this.initCharts();
    },
    methods: {
      initCharts() {
        let bar = echarts.init(this.$el);
        let option = {
          title: {
            //text: '2000-2016年中国汽车销量及增长率'
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "none"
            }
          },
          // toolbox: {
          //   feature: {
          //     dataView: {
          //       show: true,
          //       readOnly: false
          //     },
          //     restore: {
          //       show: true
          //     },
          //     saveAsImage: {
          //       show: true
          //     }
          //   }
          // },
          grid: {
            containLabel: true
          },
          legend: {
            data: this.describe
          },
          xAxis: [
          {
            type: "category",
            // axisTick: {
            //   alignWithLabel: true
            // },
            data: this.time, //x坐标的数据
            // boundaryGap: false,
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#5c6076"
              }
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [
          {
            type: "value",
            name: this.describe[0],
            // min: 0,
            // max: this.sum[this.sum.length - 1],
            position: "right",
            show: this.describe.length > 1 ? true : false,
            ayisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#666666"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#F5F5F5"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#F5F5F5"
              }
            },
            axisTick: {
              show: false
            }
          },
          {
            type: "value",
            name: this.describe.length > 1 ? this.describe[1] : this.describe[0],
            // min: 0,
            // max: this.sum[this.sum.length - 1],
            position: "left",
            ayisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#666666"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#F5F5F5"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#F5F5F5"
              }
            },
            axisTick: {
              show: false
            }
          }],
          series: [
          {
            name: this.describe.length > 1 ? this.describe[0] : "",
            type: "line",
            smooth: true,
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                  {
                    offset: 0,
                    color: "#FFC94D"
                  },
                  {
                    offset: 1,
                    color: "#FF7740"
                  }],
                  globalCoord: true
                },
                width: 3,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 10,
                shadowOffsetY: 10
              }
            },
            data: this.describe.length > 1 ? this.sum : [] //y轴坐标的数据
          },
          {
            name: this.describe.length > 1 ? this.describe[1] : this.describe[0],
            type: "bar",
            yAxisIndex: 1,
            barWidth: 25,
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                  {
                    offset: 0,
                    color: "#86CDFF"
                  },
                  {
                    offset: 1,
                    color: "#1F96FF"
                  }],
                  globalCoord: true
                },
                opacity: 1,
                barBorderRadius: [10, 10, 0, 0]
              }
            },

            data: this.amount //y轴坐标的数据]
          }]
        };
        bar.setOption(option);
      }
    }
  };
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
</style>