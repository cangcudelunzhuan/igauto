<template>
  <div style="width: 100%;height:42vh"></div>
</template>

<script>
  import echarts from "echarts";
  export default {
    data() {
      return {};
    },
    props: {
      month: Array,
      monthData: Array
    },
    watch: {
      month: function(val, old) {
        this.initCharts();
      }
    },
    methods: {
      initCharts() {
        let bar = echarts.init(this.$el);
        let data_val = this.monthData,
          xAxis_val = this.month;
        let option = {
          grid: {
            left: "8px",
            top: "10%",
            bottom: 0,
            right: 40,
            containLabel: true
          },
          tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
              type: "none"
            },
            backgroundColor: "#384157",
            borderColor: "#384157",
            borderWidth: 1,
            formatter: "{c}",
            extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 1)"
          },
          xAxis: {
            data: xAxis_val,
            boundaryGap: false,
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
          },
          yAxis: {
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

          series: [
          {
            type: "bar",
            name: "linedemo",
            tooltip: {
              show: true
            },
            animation: true,
            barWidth: 1,
            hoverAnimation: true,
            data: data_val,
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
                    color: "#29D2FF"
                  },
                  {
                    offset: 1,
                    color: "#429CFF"
                  }],
                  globalCoord: true
                },
                opacity: 0.3,
                label: {
                  show: false
                }
              }
            }
          },
          {
            type: "line",
            name: "linedemo",
            smooth: true,
            symbolSize: 10,
            animation: true,
            hoverAnimation: true,
            data: data_val,
            symbol: "circle",
            borderWidth: 20,
            itemStyle: {
              normal: {
                color: "#5cb8f8",
                lineStyle: {
                  shadowBlur: 70,
                  shadowOffsetX: 0,
                  shadowOffsetY: 20,
                  width: 3
                }
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                  {
                    offset: 0,
                    color: "#78FFFB "
                  },
                  {
                    offset: 1,
                    color: "#074BEE"
                  }],
                  globalCoord: false
                },
                opacity: 0.2
              }
            }
          }]
        };

        bar.setOption(option);
        //根绝窗口大小调节图表大小
        let t = null
        window.addEventListener("resize", function() {
          clearTimeout(t)
          t = setTimeout(function() {
            bar.resize()
          }, 300)
        })
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>