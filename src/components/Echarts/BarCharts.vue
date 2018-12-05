<template>
  <div style="width: 100%;height:100%"></div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
// .heatmap-container{
//   width: 300px;
//   height: 150px;
// }
</style>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      let bar = echarts.init(this.$el);
      let option = {
        // title: {
        //   text: "ECharts 入门示例",
        //   left: "center"
        // },
        tooltip: { show: true },
        xAxis: {
          data: [],
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: "时间",
            type: "bar",
            data: [500, 200, 360, 100, 300, 400]
          }
        ],
        grid: {
          bottom: 0,
          height: "100%"
        }
      };
      bar.setOption(option);
    }
  }
};
</script>