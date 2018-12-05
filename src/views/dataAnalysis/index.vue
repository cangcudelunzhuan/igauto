<template>
  <div class="data-analysis">

    <el-row :gutter="10">

      <el-col :span="8">
        <!-- 车辆统计 -->
        <div class="traffic-statistics">
          <div class="title">
            <span class="title-headline">车辆统计</span>
          </div>
          <div class="container" style="text-align:center;margin-top:23px">
            <el-row :gutter="10">
              <el-col :span="6">
                <span style="font-size:24px;color:#333;display: inline-block;margin-bottom: 20px;">{{sum}}</span>
                <div>
                  <img style="width:16px;" src="static/img/all.png" alt="">
                  <span class="traffic-statistics-des">总数</span>
                </div>
              </el-col>
              <el-col :span="6">
                <span style="font-size:24px;color:#333;display: inline-block;margin-bottom: 20px;">{{travel}}</span>
                <div>
                  <img src="static/img/travel.png" alt="">
                  <span class="traffic-statistics-des">启动</span>
                </div>
              </el-col>
              <el-col :span="6">
                <span style="font-size:24px;color:#333;display: inline-block;margin-bottom: 20px;">{{brennschluss}}</span>
                <div>
                  <img src="static/img/park.png" alt="">
                  <span class="traffic-statistics-des">熄火</span>
                </div>
              </el-col>
              <el-col :span="6">
                <span style="font-size:24px;color:#333;display: inline-block;margin-bottom: 20px;">{{abnormal}}</span>
                <div>
                  <img style="width:16px;" src="static/img/yichang.png" alt="">
                  <span class="traffic-statistics-des">离线</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <!-- 车辆统计 -->
        <div class="traffic-statistics">
          <div class="container" style="text-align:center;margin-top:33px;color:#333;">
            <div style="margin-bottom:20px;overflow: hidden;">
              <div style="float:left">
                <img style="width:18px" src="static/img/malfunction.png" alt="">
                <span class="traffic-statistics-des">故障</span>
              </div>
              <span style="font-size:24px;float:right">{{breakdownVehicleNum}}</span>
            </div>
            <div style="overflow: hidden;">
              <div style="float:left">
                <img src="static/img/recharge.png" alt="">
                <span class="traffic-statistics-des">充电</span>
              </div>
              <span style="font-size:24px;float:right">{{charge}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <!-- 能耗统计 -->
        <div class="energy-consumption-statistics">
          <div class="title">
            <span class="title-headline">能耗统计</span>
          </div>
          <div class="contanier" style="margin-top:6px">
            <el-row :gutter="20" style="margin-left:10%">
              <el-col :span="12" class="oil">
                <el-row :gutter="20">
                  <el-col :span="12" style="position: relative;">
                    <el-progress :width="80" type="circle" :percentage="fuelConsumptionM2M" color="#8e71c7"></el-progress>
                    <div style="position: absolute;top: 60%;left: 32px;font-size:12px;">月环比</div>
                    <div style="position: absolute;top: 18%;left:41px">
                      <img src="static/img/up.png" v-if="fuelConsumption" alt="">
                      <img src="static/img/down.png" v-else alt="">
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="margin-top:10px;">
                      <span style="font-size:24px;">{{fuelConsumptionTotal}}</span> L</div>
                    <div style="margin-top:10px;">
                      <img src="static/img/fuel.png" alt=""> 油耗</div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="20">
                  <el-col :span="12" style="position: relative;">
                    <el-progress :width="80" type="circle" :percentage="electricConsumptionM2M" color="#8e71c7"></el-progress>
                    <div style="position: absolute;top: 60%;left: 32px;font-size:12px;">月环比</div>
                    <div style="position: absolute;top: 18%;left:41px">
                      <img src="static/img/up.png" v-if="currentDrain" alt="">
                      <img src="static/img/down.png" v-else alt="">
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="margin-top:10px;">
                      <span style="font-size:24px;">{{electricConsumptionTotal}}</span> KWh</div>
                    <div style="margin-top:10px;">
                      <img src="static/img/recharge.png" alt="">电耗</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>

    </el-row>

    <el-row :gutter="10" style="margin-top:10px">

      <el-col :span="12">
        <!-- 在线时长 -->
        <div class="online-time">
          <div class="title">
            <div class="title-left">
              <span class="title-headline">在线时长</span>
              <span style="font-size:26px;margin:0 10px;font-weight: normal;">{{onlineSecondTotal}}</span>
              小时
            </div>
            <div class="titel-right">
              <span class="titel-right-text">月平均环比: {{onlineSecondM2M }}%</span>

              <img src="static/img/up.png" v-if="onLine" alt="">
              <img src="static/img/down.png" v-else alt="">

            </div>
          </div>
          <div class="contanier">
            <analyze :color="onLineColor" :textColor="onLineTextColor" :data="onLinedata" :Time="onLineTime"></analyze>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <!-- 行驶里程 -->
        <div class="mileage">
          <div class="title">
            <div class="title-left">
              <span class="title-headline">行驶里程</span>
              <span style="font-size:26px;margin:0 10px;font-weight: normal;">{{travelMileageTotal}}</span>
              KM
            </div>
            <div class="titel-right">
              <span class="titel-right-text">月平均环比: {{travelMileageM2M}}%</span>

              <img src="static/img/up.png" v-if="mileage" alt="">
              <img src="static/img/down.png" v-else alt="">

            </div>
          </div>
          <div class="contanier">
            <analyze :color="mileageColor" :textColor="mileageTextColor" :data="mileagedata" :Time="mileageTime"></analyze>
          </div>
        </div>
      </el-col>

    </el-row>

    <div class="alarm-data">
      <div class="alarm-data-title">
        <span>报警数据</span>
        <div class="button-group" style="float:right;">
          <el-button size="mini" round @click.native="seven" :type="seve">七天</el-button>
          <el-button size="mini" round @click="january" :type="jan" style="margin:0 20px 0 30px">一个月</el-button>
          <el-button size="mini" round @click="march" :type="mar">三个月</el-button>
        </div>
      </div>
      <div class="alarm-data-container">
        <el-row :gutter="10">
          <el-col :span="19">
            <police v-if="seve =='primary' " :month="policeOneWeek" :monthData="policeOneWeekData"></police>
            <police v-else-if="jan =='primary'" :month="policeOneMonth" :monthData="policeOneMonthData"></police>
            <police v-else :month=" policeThreeMonth" :monthData=" policeThreeMonthData"></police>
          </el-col>
          <el-col :span="5">
            <div class="list">
              <div class="list-title">通用报警标志排名</div>
              <ul v-if="seve =='primary' ">
                <li style="overflow: hidden;" v-for="(item,index) in oneWeekAlarmStats" :key="index">
                  {{item.alarmId}} {{item.alarmLevel }}
                  <span style="float:right">{{item.count }}次</span>
                </li>
              </ul>
              <ul v-else-if="jan =='primary'">
                <li style="overflow: hidden;" v-for="(item,index) in oneMonthAlarmStats" :key="index">
                  {{item.alarmId}} {{item.alarmLevel }}
                  <span style="float:right">{{item.count }}次</span>
                </li>
              </ul>
              <ul v-else>
                <li style="overflow: hidden;" v-for="(item,index) in  threeMonthAlarmStats" :key="index">
                  {{item.alarmId}} {{item.alarmLevel }}
                  <span style="float:right">{{item.count }}次</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import analyze from "@/components/Echarts/analyzeCharts.vue";
  import police from "@/components/Echarts/policeCharts.vue";
  import {
    getStatisticsByBelonger,
    getStatisticByUserId
  } from "@/api/realTimeMonitoring";
  import { getUserId } from "@/utils/auth";
  export default {
    name: "dataAnalysis",
    components: { analyze, police },
    data() {
      return {
        seve: "primary",
        jan: "",
        mar: "",
        fuelConsumption: true,
        currentDrain: true,
        onLine: true,
        mileage: false,
        onLineTextColor: "#1893FF",
        onLineColor: ["#427DFF", "#40C0FF"],
        onLinedata: [],
        onLineTime: [],
        mileageTextColor: "#37C8AE",
        mileageColor: ["#31DF93", "#42BFFB"],
        mileagedata: [],
        mileageTime: [],
        travel: "", //行驶车辆
        sum: "", //车辆总数
        charge: "", //充电车辆
        breakdownVehicleNum: "", //故障
        brennschluss: "", //停止车辆
        abnormal: "", //异常
        //环比数据
        travelMileageM2M: "", //行驶
        electricConsumptionM2M: 0, //电量
        fuelConsumptionM2M: 0, //油量
        onlineSecondM2M: "", //在线
        //排名数据
        oneMonthAlarmStats: [],
        oneWeekAlarmStats: [],
        threeMonthAlarmStats: [],
        //图表数据
        policeOneMonth: [],
        policeOneMonthData: [],
        policeOneWeek: [],
        policeOneWeekData: [],
        policeThreeMonth: [],
        policeThreeMonthData: [],
        //6个月数据总和
        fuelConsumptionTotal: 0,
        travelMileageTotal: 0,
        electricConsumptionTotal: 0,
        onlineSecondTotal: 0
      };
    },
    mounted() {
      let data = {
        userId: getUserId()
      };
      getStatisticsByBelonger(data).then(res => {
        //环比数据
        if (res.results.travelMileageM2M > 0) {
          this.travelMileageM2M = (
            Math.abs(res.results.travelMileageM2M) * 100
          ).toFixed(2); //总里程
          this.mileage = true;
        } else {
          this.travelMileageM2M = (
            Math.abs(res.results.travelMileageM2M) * 100
          ).toFixed(2); //总里程
          this.mileage = false;
        }
        if (res.results.electricConsumptionM2M > 0) {
          this.electricConsumptionM2M = Number(
            (Math.abs(res.results.electricConsumptionM2M) * 100).toFixed(2)
          ); //电量消耗
          this.currentDrain = true;
        } else {
          this.electricConsumptionM2M = Number(
            (Math.abs(res.results.electricConsumptionM2M) * 100).toFixed(2)
          ); //电量消耗
          this.currentDrain = false;
        }
        if (res.results.fuelConsumptionM2M > 0) {
          this.fuelConsumptionM2M = Number(
            (Math.abs(res.results.fuelConsumptionM2M) * 100).toFixed(2)
          ); //油量消耗
          this.fuelConsumption = true;
        } else {
          this.fuelConsumptionM2M = Number(
            (Math.abs(res.results.fuelConsumptionM2M) * 100).toFixed(2)
          ); //油量消耗
          this.fuelConsumption = false;
        }
        if (res.results.onlineSecondM2M > 0) {
          this.onlineSecondM2M = (
            Math.abs(res.results.onlineSecondM2M) * 100
          ).toFixed(2); //在线时长
          this.onLine = true;
        } else {
          this.onlineSecondM2M = (
            Math.abs(res.results.onlineSecondM2M) * 100
          ).toFixed(2); //在线时长
          this.onLine = false;
        }
        //报警数据图表数据
        res.results.alarmDayCountsOneWeek.map(item => {
          this.policeOneWeek.push(item.day);
          this.policeOneWeekData.push(item.count);
        });

        res.results.alarmDayCountsOneMonth.map(item => {
          this.policeOneMonth.push(item.day);
          this.policeOneMonthData.push(item.count);
        });

        res.results.alarmDayCountsThreeMonths.map(item => {
          this.policeThreeMonth.push(item.day);
          this.policeThreeMonthData.push(item.count);
        });
        //报警排名
        res.results.oneWeekAlarmStats.map(item => {
          switch (item.alarmLevel) {
            case 1:
              item.alarmLevel = "一级";
              break;
            case 2:
              item.alarmLevel = "二级";
              break;
            case 3:
              item.alarmLevel = "三级";
              break;
          }
          this.oneWeekAlarmStats.push({
            count: item.count,
            alarmLevel: item.alarmLevel,
            alarmId: item.alarmName
          });
        });
        res.results.oneMonthAlarmStats.map(item => {
          switch (item.alarmLevel) {
            case 1:
              item.alarmLevel = "一级";
              break;
            case 2:
              item.alarmLevel = "二级";
              break;
            case 3:
              item.alarmLevel = "三级";
              break;
          }
          this.oneMonthAlarmStats.push({
            count: item.count,
            alarmLevel: item.alarmLevel,
            alarmId: item.alarmName
          });
        });
        res.results.threeMonthAlarmStats.map(item => {
          switch (item.alarmLevel) {
            case 1:
              item.alarmLevel = "一级";
              break;
            case 2:
              item.alarmLevel = "二级";
              break;
            case 3:
              item.alarmLevel = "三级";
              break;
          }
          this.threeMonthAlarmStats.push({
            count: item.count,
            alarmLevel: item.alarmLevel,
            alarmId: item.alarmName
          });
        });
        //6个月数据总和
        let onlineSecondTotal = 0,
          electricConsumptionTotal = 0,
          travelMileageTotal = 0,
          fuelConsumptionTotal = 0;

        res.results.sixMonthStats.map(item => {
          fuelConsumptionTotal = fuelConsumptionTotal + item.fuelConsumption; //油耗
          travelMileageTotal = travelMileageTotal + item.travelMileage; //行驶里程
          electricConsumptionTotal = electricConsumptionTotal + item.electricConsumption; //电耗
          onlineSecondTotal = onlineSecondTotal + item.onlineSecond; //在线时长

          this.onLinedata.push((item.onlineSecond / 3600).toFixed(2));
          this.onLineTime.push(item.month);
          this.mileagedata.push(item.travelMileage.toFixed(2));
          this.mileageTime.push(item.month);
        });

        this.fuelConsumptionTotal = fuelConsumptionTotal
        this.travelMileageTotal = travelMileageTotal.toFixed(2)
        this.electricConsumptionTotal = electricConsumptionTotal
        this.onlineSecondTotal = (onlineSecondTotal / 3600).toFixed(2)
      });
      getStatisticByUserId(data).then(res => {
        this.breakdownVehicleNum = res.results.breakdownVehicleNum; //故障
        this.charge = res.results.chargingVehicleNum; //充电的车辆

        this.sum = res.results.total; //总数

        res.results.travelStatusList.map(item => {
          switch (item.travelStatus) {
            case "1":
              this.brennschluss = item.travelStatusNum; //停止的车辆
              break;
            case "0":
              this.travel = item.travelStatusNum; //行驶的车辆
              break;
            case "2":
              this.abnormal = item.travelStatusNum; //异常
              break;
          }
        });
      });
    },
    methods: {
      seven() {
        this.seve = "primary";
        this.jan = "";
        this.mar = "";
      },
      january() {
        this.seve = "";
        this.jan = "primary";
        this.mar = "";
      },
      march() {
        this.seve = "";
        this.jan = "";
        this.mar = "primary";
      }
    }
  };
</script>

<style lang="scss" scoped>
  .data-analysis {
    padding: 10px;
    .traffic-statistics,
    .energy-consumption-statistics,
    .mileage,
    .online-time,
    .alarm-data {
      border: 1px solid #f5f5f5;
      padding: 10px;
      .title-headline {
        color: #001529;
        height: 30px;
        font-weight: 700;
        font-size: 14px;
      }
      .traffic-statistics-des {
        font-size: 14px;
      }
    }
    .online-time,
    .mileage {
      // padding: 0;
      .title {
        overflow: hidden;
        .title-left {
          float: left;
        }
        .titel-right {
          position: relative;
          float: right;
          .titel-right-text {
            font-size: 14px; // position: absolute;
            // top: 38%;
            // left: -48px;
          }
        }
      }
    }
    .alarm-data {
      margin-top: 10px;
      .alarm-data-title {
        height: 30px;
      }
      .alarm-data-container {
        .list {
          .list-title {
            text-align: center;
            padding: 30px 0;
            font-weight: 700;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          li {
            counter-increment: index;
            margin-bottom: 20px;
            line-height: 20px;
            font-size: 14px;
          }
          li:before {
            content: counter(index);
            display: inline-block;
            vertical-align: top;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 10px;
            text-align: center;
            font-size: 12px;
            color: #fff;
            background: gray;
          }
          li:last-of-type {
            margin-bottom: 0;
          }
          li:first-of-type:before {
            background: red;
          }
          li:nth-of-type(2):before {
            background: green;
          }
          li:nth-of-type(3):before {
            background: orange;
          }
        }
      }
    }
  }
</style>