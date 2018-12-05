<template>
  <div style="width: 100%;height:72vh;"></div>
</template>

<script>
  import echarts from "echarts";
  export default {
    data() {
      return {};
    },
    props: {
      list: Array,
      legendName: Array
    },
    watch: {
      list: function(val, old) {
        this.initCharts();
      }
    },
    mounted() {
      this.initCharts();
    },
    methods: {
      initCharts() {
        let bar = echarts.init(this.$el);
        let option = {
          color: ["#45A6FF", "#FE5F5E", "#FFAB16", "#69CFFF", "#32D092"],

          title: {
            text: "车型统计",
            x: "center",
            textStyle: {
              color: "#6c6c6c"
            }
          },

          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} 辆 ({d}%)"
          },
          legend: {
            x: "center",
            top: "90%",
            data: this.legendName,
            itemWidth: 15,
            itemHeight: 10,
            itemGap: 6
          },
          series: [
          {
            name: "车型占比",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderWidth: 2,
                borderColor: "#ffffff"
              }
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                formatter: function(param) {
                  return `${param.name}\n${param.percent.toFixed(0)}%`;
                },
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.list
          }]
        };
        bar.setOption(option);


        //高亮数据最大的区域
        let aMax = []
        this.list.map(item => {
          aMax.push(item.value)
        })


        bar.dispatchAction({
          type: 'highlight',
          dataIndex: this.getMax(aMax)
        });

      },
      getMax(arr) {
        let max = arr[0],
          index = null
        for (let i = 0, len = arr.length; i < len; i++) {
          if (arr[i] >= max) {
            max = arr[i];
            index = i
          }
        }
        return index;
      }
    }
  };
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
</style>