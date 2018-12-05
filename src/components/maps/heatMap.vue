<template>
  <div id="map-container">
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  #map-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "mapGd",
    computed: {
      ...mapGetters(["arrAll"])
    },
    data() {
      return {};
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        const map = new AMap.Map("map-container", {
          zoom: 5
        });
        const heatmap = new AMap.Heatmap(map, {
          radius: 25, //给定半径
          opacity: [0, 0.8]
        });
        let points = [];
        for (let i = 0, len = this.arrAll.length; i < len; i++) {
          points.push({
            lng: this.arrAll[i]["longitude"],
            lat: this.arrAll[i]["latitude"]
          });
        }
        heatmap.setDataSet({
          data: points
        });
      }
    }
  };
</script>