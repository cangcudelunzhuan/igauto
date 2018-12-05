<template>
  <div class="police-statistics">
    <div class="police-statistics-chart">
      <pie-charts :list="list" :legendName="legendName"></pie-charts>
    </div>
  </div>
</template>

<script>
  import pieCharts from "@/components/Echarts/pieCharts.vue";
  import { getCarTypeCount } from "@/api/alarm";
  import { getUserId } from "@/utils/auth";
  export default {
    name: "vehicleStatistics",
    components: { pieCharts },
    data() {
      return {
        list: [],
        legendName: [],
      };
    },
    mounted() {

      this.getData(getUserId());

    },
    methods: {
      getData(userId) {
        let data = {
          ascription: userId
        };
        getCarTypeCount(data).then(res => {
          this.list = res.results;
          this.list.map(item => {
            this.legendName.push(item.name);
          });
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .police-statistics {
    &-chart {
      padding-top: 40px;
    }
  }
</style>