<template>
  <div class="car-control">

    <!-- 地图展示 -->
    <div v-if="show">
      <map-gd ref="map" v-on:map-change="getCarsByPoints"></map-gd>
    </div>
    <div v-else>
      <heat-map></heat-map>
    </div>

    <!-- 地图切换条 -->
    <div class="switch">
      <el-row>
        <el-col :span="12">
          <div class="switch-heat" @click="showHeat">
            <img src="static/img/relitu.png" alt="">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="switch-aggregation" @click="showAggregation">
            <img src="static/img/ditu.png" alt="">
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import HeatMap from "@/components/maps/heatMap.vue";
  import MapGd from "@/components/maps/map.vue";
  import {
    getToken,
    setToken,
    removeToken,
    getUserId,
    setUserId,
    removeUserId
  } from "@/utils/auth";
  import {
    getQueryPlateOrVin,
    getQueryCarRealByVins,
    queryCarDetailByVin,
    queryTidyCarRealByPoints
  } from "@/api/realTimeMonitoring";

  export default {
    name: "carControl",
    components: { MapGd, HeatMap },
    data() {
      return {
        show: true,
        // searchResult:"",
        // 所有,熄火,充电熄火,充电行驶，行驶,异常,故障熄火，故障行驶
        arrAll: [],
        throttle: null, //地图移动操作节流定时器
        time: null,
        arrFlameout: [],
        arrChargeFlameout: [],
        arrChargeTravel: [],
        arrTravel: [],
        arrAbnormal: [],
        arrFaultTravel: [],
        arrFaultFlameout: [],
        points: [], //矩形点信息
        map: "" //缓存地图实例

      };
    },
    deactivated() {
      clearInterval(this.time)
    },

    activated() {

    },
    mounted() {},

    methods: {
      showHeat() {
        this.show = false;
      },
      showAggregation() {
        this.show = true;
      },
      getCarsByPoints(points) {
        this.points = points.pointList;
        this.carStatusList = points.carStatusList
        this.carTypeNumList = points.carTypeNumList
        this.userId = points.userId
        if (!points.isCheckoutHotMap == 1 || points.isCheckoutHotMap == 2) {
          //刚进来或者切换热力图时候走的流程
          this.getData();
        } else {
          //节流
          clearTimeout(this.throttle)
          this.throttle = setTimeout(() => {
            this.getData();
          }, 2000);
        }

        clearInterval(this.time);
        if (points.zoom > 13) {
          this.time = setInterval(() => {
            this.getData();
          }, 30000);
        }
      },

      getData() {
        let arrFlameout = []; //熄火    0
        let arrChargeFlameout = []; //充电熄火  3
        let arrChargeTravel = []; //充电行驶 4
        let arrTravel = []; //行驶 1
        let arrAbnormal = []; //异常 2
        let arrFaultTravel = []; //故障行驶 5
        let arrFaultFlameout = []; //故障熄火 6

        //获取地图四个角的经纬度信息
        let pointList = this.points;

        //loding开始
        this.loading = this.$loading({
          lock: true,
          text: '正在加载...',
          background: 'rgba(0, 0, 0, 0.2)',
          customClass: "loading-box"
        });
        queryTidyCarRealByPoints({ "userId": this.userId || getUserId(), "carStatusList": this.carStatusList, "pointList": pointList, "carTypeNumList": this.carTypeNumList })
          .then(res => {
            //获取了数据就结束loding
            this.loading.close();

            if (!res.results) {
              return false;
            }

            let data = res.results;

            //遍历返回的结果
            data.forEach((item, index) => {
              //车辆的状态
              if (item.travelStatus == 2) {
                item.vehicleState = 2;
                arrAbnormal.push(Object.assign(item));
                //是否为故障
              } else if (item.isBadStatus == 1) {
                if (item.travelStatus == 1) {
                  item.vehicleState = 6;
                  arrFaultFlameout.push(item);
                } else if (item.travelStatus == 0) {
                  item.vehicleState = 5;

                  arrFaultTravel.push(item);
                }
                //是否为充电
              } else if (item.chargingStatus == 1) {
                if (item.travelStatus == 1) {
                  item.vehicleState = 3;
                  arrChargeFlameout.push(item);
                } else if (item.travelStatus == 0) {
                  item.vehicleState = 4;
                  arrChargeTravel.push(item);
                }
              } else if (item.chargingStatus == 0 && item.isBadStatus == 0) {
                if (item.travelStatus == 1) {
                  item.vehicleState = 0;
                  arrFlameout.push(item);
                } else if (item.travelStatus == 0) {
                  item.vehicleState = 1;
                  arrTravel.push(item);
                }
              }
            });

            this.arrFlameout = arrFlameout; //熄火    0
            this.arrChargeFlameout = arrChargeFlameout; //充电熄火  3
            this.arrChargeTravel = arrChargeTravel; //充电行驶 4
            this.arrTravel = arrTravel; //行驶 1
            this.arrAbnormal = arrAbnormal; //异常 2
            this.arrFaultTravel = arrFaultTravel; //故障行驶 5
            this.arrFaultFlameout = arrFaultFlameout; //故障熄火 6

            this.arrAll = []; // 7
            this.arrAll = this.arrAll.concat(
              arrFlameout, // 0
              arrFaultTravel, //5
              arrFaultFlameout, //6
              arrTravel, // 1
              arrAbnormal, //2
              arrChargeFlameout, //3
              arrChargeTravel //4
            );
            this.$store.dispatch("GetArr", {
              arrAll: this.arrAll, // 7
              arrFlameout: this.arrFlameout, // 0
              arrChargeFlameout: this.arrChargeFlameout, // 3
              arrChargeTravel: this.arrChargeTravel, //4
              arrTravel: this.arrTravel, // 1
              arrAbnormal: this.arrAbnormal, // 2
              arrFaultTravel: this.arrFaultTravel, //5
              arrFaultFlameout: this.arrFaultFlameout //6
            });
          }).catch(err => {
            console.log(err);
          })

      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .car-control {
    .switch {
      position: absolute;
      width: 200px;
      height: 80px;
      padding: 10px;
      bottom: 20px;
      right: 20px;
      background: #fff;
      &-aggregation,
      &-heat {
        z-index: 1000;
        &:hover {
          img {
            border: 1px solid #1890ff;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .loading-box {
    width: 100px;
    height: 100px;
    margin: auto;
  }
</style>