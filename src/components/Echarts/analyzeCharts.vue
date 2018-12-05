<template>
  <div style="width: 100%;height:20vh"></div>
</template>

<script>
  import echarts from "echarts";
  export default {
    data() {
      return {};
    },
    props: {
      Time: Array,
      data: Array,
      textColor: String,
      color: Array
    },
    watch: {
      Time: function(val, old) {
        this.initCharts();
      }
    },
    methods: {
      initCharts() {
        let bar = echarts.init(this.$el);
        let data_val = this.data,
          xAxis_val = this.Time;
        let option = {
          grid: {
            left: -10,
            top: "25%",
            bottom: 0,
            right: 35,
            containLabel: true
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
            show: false,
            // ayisLine: {
            //   show: false
            // },
            // axisLabel: {
            //   textStyle: {
            //     color: "#5c6076",
            //     verticalAlign: "bottom"
            //   }
            // },
            // splitLine: {
            //   show: false,
            //   lineStyle: {
            //     color: "#2e3547"
            //   }
            // },
            // axisLine: {
            //   show: false,
            //   lineStyle: {
            //     color: "#384157"
            //   }
            // },
            // axisTick: {
            //   show: false
            // }
          },

          series: [
          {
            type: "bar",
            name: "linedemo",
            tooltip: {
              show: false
            },
            animation: true,
            barWidth: 40,
            hoverAnimation: true,
            data: data_val,
            z: 10,
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
                    color: "#0BB8FF "
                  },
                  {
                    offset: 1,
                    color: "#9BFFC6"
                  }],
                  globalCoord: true
                },
                opacity: 0.2,
                label: {
                  show: false
                }
              }
            }
          },
          {
            type: "line",
            smooth: true,
            symbolSize: 6,
            animation: true,
            hoverAnimation: true,
            data: data_val,
            itemStyle: {
              normal: {
                color: this.textColor,
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#fff",
                    backgroundColor: this.textColor,
                    borderRadius: 33,
                    padding: 6
                  }
                },
                lineStyle: {
                  opacity: 0.5,
                  width: 0.8
                }
              }
            },

            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  colorStops: [
                  {
                    offset: 0,
                    color: this.color[0]
                  },
                  {
                    offset: 1,
                    color: this.color[1]
                  }],
                  globalCoord: true
                },
                opacity: 0.5
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