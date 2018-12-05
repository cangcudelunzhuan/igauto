<template>
  <div>
    <el-row class="map-box">
      <!--左侧地图-->
      <el-col :span="12">
        <div id="car-map"></div>
        <div class="top-input-buttons">
          <el-input placeholder="请输VIN码或车牌号查询" v-model="inputCar" class="input-with-input">
            <!--<el-select  v-model="searchType" class="el-select-input" slot="prepend" placeholder="请选择">-->
            <!--<el-option-->
            <!--v-for="item in selectOptions"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
          </el-input>
        </div>
        <div class="map-text-box">
          <el-row>
            <el-col :lg="10">
              <div>
                <span>{{baseMsg.carBase.plate}} ( VIN:{{baseMsg.carBase.vin}} )</span>
              </div>
              <div class="addr-text-box">
                <span>{{currentTime}}</span>
              </div>
              <div class="addr-text-box">当前位置:{{address}}</div>
            </el-col>
            <el-col :span="14">
              <div class="button-box">
                <el-button type="primary" size="mini" class="input-car-msg" @click="getDetail">车辆详情</el-button>
                <el-dialog :visible.sync="dialogTableVisible" width="60%">
                  <car-msg :carDetailData="carBaseMsg"></car-msg>
                  <div class="close-box">
                    <el-button type="primary" size="small" @click="closeDialog">关闭</el-button>
                  </div>
                </el-dialog>
                <el-button type="primary" size="mini" class="input-car-msg" @click="handleHistoryData">历史数据</el-button>
                <el-button type="primary" size="mini" @click="onSubmit">轨迹追踪</el-button>
              </div>
            </el-col>
          </el-row>

        </div>


      </el-col>
      <!--右侧图标-->
      <el-col :span="12" class="right-charts-box">
        <el-tabs @tab-click="handleTabClick">
          <el-tab-pane label="电池信息">
            <div class="right-charts">
              <div class="right-charts-g">
                <div class="temp-box-detail">
                  <div class="block temp-box">
                    <temp-charts :color1="color3" :color2="color4" :bgColor="bgColor1" :tempValue="minTempValue" :tempText="minTempText"></temp-charts>

                  </div>
                  <div class="block last-temp-box">
                    <temp-charts :color1="color1" :color2="color2" :bgColor="bgColor2" :tempValue="maxTempValue" :tempText="maxTempText"></temp-charts>
                  </div>
                  <div class="temp-center-title">电池包温度(℃)</div>
                </div>
                <div class="speed-box">
                  <soc-charts :height="height" :width="width" :socData="carRealDataVo.soc"></soc-charts>
                  <div class="center-title">SOC(%)</div>
                </div>
                <div class="electric-box">
                  <electric-charts :height="height" :width="width" :minBatteryVoltageNum="minBatteryVoltageNum" :maxBatteryVoltageNum="maxBatteryVoltageNum"></electric-charts>
                  <div class="center-title">电池包电压(V)</div>
                </div>
              </div>

              <div class="right-charts-l" id="chart-detail">
                <div class="dropdown-right">

                  <el-dropdown @command="handleCommand" class="dropdown-link-box">
                    <span class="el-dropdown-link">
                      更多
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="option in elecOptions" :key="option.value" :command="option.value">{{option.label}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

                </div>
                <div v-if="barChart1">
                  <line-electric-charts :height="lineHeight" :width="lineWidth" :energyData="chargingDeviceVoltage[0].singleCellVoltage?chargingDeviceVoltage[0].singleCellVoltage:[]"></line-electric-charts>
                </div>
                <div v-if="barChart1">
                  <line-temp-charts :height="lineHeight" :width="lineWidth" :lineTempData="chargingDeviceTempData[0].chargingTempProbeValue?chargingDeviceTempData[0].chargingTempProbeValue:[]"></line-temp-charts>
                </div>
                <div v-if="barChart2">
                  <line-electric-charts :height="lineHeight" :width="lineWidth" :energyData="chargingDeviceVoltage[1].singleCellVoltage?chargingDeviceVoltage[1].singleCellVoltage:[]"></line-electric-charts>
                </div>
                <div v-if="barChart2">
                  <line-temp-charts :height="lineHeight" :width="lineWidth" :lineTempData="chargingDeviceTempData[1].chargingTempProbeValue?chargingDeviceTempData[1].chargingTempProbeValue:[]"></line-temp-charts>
                </div>
                <div v-if="barChart3">
                  <line-electric-charts :height="lineHeight" :width="lineWidth" :energyData="chargingDeviceVoltage[2].singleCellVoltage?chargingDeviceVoltage[2].singleCellVoltage:[]"></line-electric-charts>
                </div>
                <div v-if="barChart3">
                  <line-temp-charts :height="lineHeight" :width="lineWidth" :lineTempData="chargingDeviceTempData[2].chargingTempProbeValue?chargingDeviceTempData[2].chargingTempProbeValue:[]"></line-temp-charts>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="实时信息">
            <div class="right-real-page">
              <el-tabs type="border-card" v-model="activeCarName" class="tab-data" @tab-click="handleMsgClick">
                <el-tab-pane label="整车数据" name="1">
                  <status-data :carData="allCarDataTable"></status-data>
                </el-tab-pane>
                <el-tab-pane label="驱动电机数据" name="2">
                  <motor-data :carData="allCarDataTable"></motor-data>
                </el-tab-pane>
                <el-tab-pane label="燃料电池数据" name="3">
                  <battery-data :carData="allCarDataTable"></battery-data>
                </el-tab-pane>
                <el-tab-pane label="发动机数据" name="4">
                  <engine-data :carData="allCarDataTable"></engine-data>
                  <!--<extreme-data :carData="allCarDataTable"></extreme-data>-->
                </el-tab-pane>
                <el-tab-pane label="车辆位置数据" name="5">
                  <position-data :carData="allCarDataTable"></position-data>
                </el-tab-pane>
                <el-tab-pane label="可充电储能电压数据" name="6">
                  <charging-voltage-data :carData="allCarDataTable"></charging-voltage-data>
                </el-tab-pane>
                <el-tab-pane label="可充电储能温度数据" name="7">
                  <charging-temp-data :carData="allCarDataTable"></charging-temp-data>
                </el-tab-pane>
                <el-tab-pane label="极值数据" name="8">
                  <extreme-data :carData="allCarDataTable"></extreme-data>
                </el-tab-pane>
                <el-tab-pane label="报警数据" name="9">
                  <alarm-datas :carData="allCarDataTable"></alarm-datas>

                </el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
        </el-tabs>


      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import AMap from 'AMap';
  import SocCharts from '@/components/carCenter/socCharts.vue';
  import StatusData from '@/components/carCenter/vericleStatusData.vue';
  import ElectricCharts from '@/components/carCenter/electricChart.vue';
  import LineElectricCharts from '@/components/carCenter/lineElectricChart.vue';
  import LineTempCharts from '@/components/carCenter/lineTempChart.vue';
  import TempCharts from '@/components/carCenter/tempChart.vue';
  import MotorData from '@/components/carCenter/driveMotorData.vue'
  import BatteryData from '@/components/carCenter/fuelBatteryData.vue'
  import AlarmDatas from '@/components/carCenter/alarmDatas.vue'
  import ChargingTempData from '@/components/carCenter/chargingTempData.vue'
  import ChargingVoltageData from '@/components/carCenter/chargingVoltageData.vue'
  import DriveMotorData from '@/components/carCenter/driveMotorData.vue'
  import ExtremeData from '@/components/carCenter/extremeData.vue'
  import PositionData from '@/components/carCenter/vehiclePositionData.vue'
  import EngineData from '@/components/carCenter/engineData.vue'
  import { getCarDetail, getSingleCarRealByVins, getStandardDetail, getBaseStandardDetail } from '@/api/carCenter';
  import {
    getQueryCarRealByPlateOrVin
  } from "@/api/realTimeMonitoring";
  import { getData } from "@/utils/validate"
  //引入組件
  import CarMsg from '@/components/carCenter/carMsg.vue';
  import AutoMsg from '@/components/carCenter/autoMsg.vue';
  import axios from 'axios';
  import { mapGetters } from 'vuex'
  const preDate = new Date();
  var start = new Date(preDate.getTime());

  function getTaskTime(fmt, date) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  export default {
    name: "map-detail",
    components: {
      SocCharts,
      ElectricCharts,
      LineElectricCharts,
      LineTempCharts,
      CarMsg,
      AutoMsg,
      TempCharts,
      StatusData,
      MotorData,
      EngineData,
      AlarmDatas,
      ChargingTempData,
      DriveMotorData,
      ChargingVoltageData,
      ExtremeData,
      PositionData,
      BatteryData
    },
    data() {
      return {
        color1: '#FFAC3E',
        color2: '#FFAC3E',
        color3: '#81DCAF ',
        color4: '#81DCAF',
        bgColor1: '#EBF4F7',
        bgColor2: '#FFEACC',
        baseCar: {},
        CarData: {},
        searchType: 1,
        activeCarName: '1',
        zoom: 12,
        allCarDataTable: {},
        currentTime: '',
        barChart1: true,
        barChart2: false,
        barChart3: false,
        dialogTableVisible: false,
        dialogCarTableVisible: false,
        value10: 20,
        energyData: [],
        allRealData: {},
        selectOptions: [{
          value: 0,
          label: '按车牌'
        }, {
          value: 1,
          label: '按VIN码'
        }],
        carStatusOptions: [{
          value: 0,
          label: '待整备'
        }, {
          value: 1,
          label: '已整备'
        }, {
          value: 2,
          label: '运营中'
        }],
        elecOptions: [{
          value: 1,
          label: '电池包1'
        }],
        carBaseMsg: {},
        baseMsg: {
          carBase: {
            plate: '',
            plateTime: ''
          }
        },
        input3: '',
        width: '16rem',
        height: '18.75rem',
        lineHeight: '14rem',
        lineWidth: '47.5rem',
        input4: '',
        inputCar: '',
        vinData: '',
        map: '',
        plate: '',
        marker: '',
        carRealDataVo: {
          latitude: '26.16',
          longitude: '118.21',
          soc: 0,
        },
        standardData: [],
        address: '',
        chargingDeviceTempData: [{
          chargingTempProbeValue: []
        }],
        chargingDeviceVoltage: [{
          singleCellVoltage: []

        }],
        minTempText: '最低温度',
        maxTempText: '最高温度',
        minTempValue: 0,
        maxTempValue: 0,
        minBatteryVoltageNum: 0,
        maxBatteryVoltageNum: 0,
        selectCar: '请选择'
      };

    },
    computed: {
      ...mapGetters([
        'carVin',
      ])
    },
    mounted() {
      this.vinData = this.carVin;
      this.inputCar = this.carVin;
      this.initMap();
      if (this.vinData) {
        this.init();
        this.getStandardData();
      }
    },
    activated() {
      this.initMap();
      this.vinData = this.carVin;
      this.inputCar = this.carVin;
      clearInterval(this.timer);
      if (this.vinData) {
        this.init();
        this.getStandardData();
      }
    },

    deactivated() {
      clearInterval(this.timer);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },

    methods: {
      closeDialog() {
        this.dialogTableVisible = false;
      },
      changeTempData(val) {
        // console.log(val);
        return false;
      },
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
          " " + date.getHours() + seperator2 + date.getMinutes() +
          seperator2 + date.getSeconds();
        return currentdate;
      },
      handleMsgClick(tab) {
        this.getStandardDetailData();
      },
      getStandardDetailData() {
        var that = this;
        getStandardDetail(this.vinData, this.activeCarName).then(response => {
          this.allCarDataTable = response.results;

        }).catch(error => {
          clearInterval(that.timer)
        })
      },
      handleCommand(command) {
        if (command == 1) {
          this.barChart1 = true;
          this.barChart2 = false;
          this.barChart3 = false;
        } else if (command == 1) {
          this.barChart2 = true;
          this.barChart1 = false;
          this.barChart3 = false;
        } else {
          this.barChart3 = true;
          this.barChart2 = false;
          this.barChart1 = false;
        }
      },
      handleHistoryData() {
        clearInterval(this.timer);
        this.$router.push({ name: '历史查询' });
        this.$store.dispatch('getHistoryCarVin', this.vinData);
      },
      handleIconClick() {
        this.vinData = this.inputCar;
        this.activeCarName = '1';
        this.$store.dispatch("getCarVin", this.inputCar);
        this.getDetailData(this.vinData)
      },
      getDetailData(id) {
        var that = this;
        this.init(id);
      },
      getDetail() {
        var vin = { vin: this.vinData };
        getCarDetail(vin).then(response => {
          if (response.results) {
            this.dialogTableVisible = true;
            this.carBaseMsg = response.results
          } else {
            this.$message.error('暂无数据');
          }
        })
      },
      onSubmit() {
        clearInterval(this.timer);
        this.$router.push({ name: '轨迹查询', params: { plate: this.baseMsg.carBase.plate ? this.baseMsg.carBase.plate : this.baseMsg.carBase.vin, lng: this.lnglatXY } });
      },
      handleTabClick(tab, event) {
        if (tab.index == 1) {
          this.getStandardDetailData();
        }
      },
      //獲取地圖
      getStandardData() {
        if (localStorage.getItem('standardData')) {
          this.standardData = JSON.parse(localStorage.getItem('standardData'));
        } else {
          getBaseStandardDetail().then(response => {
            if (response.results) {
              localStorage.setItem('standardData', JSON.stringify(response.results));
              this.standardData = response.results;
            }
          })
        }

      },
      regeocoder(arr) {
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        var that = this;
        geocoder.getAddress(arr, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            that.address = result.regeocode.formattedAddress;
          }
        });
      },
      initMap() {
        this.map = new AMap.Map('car-map', {
          resizeEnable: true,
          zoom: 12
        });
      },
      init() {
        var that = this;
        clearInterval(this.timer);
        this.getRealData(this.map);

        this.timer = setInterval(() => {
          this.getRealData(this.map);
          // that.getStandardDetailData();
        }, 10000);


      },
      distinguishStatus(data) {
        if (data.carStatus.travelStatus == 2) {

          return 'static/img/mapyichang.png'
          //是否为故障
        } else if (data.carStatus.isBadStatus == 1) {
          if (data.carStatus.travelStatus == 1) {

            return 'static/img/mapFaultFlameout.png'

          } else if (data.carStatus.travelStatus == 0) {

            return 'static/img/mapFaultTravel.png'
          }
          //是否为充电
        } else if (data.carStatus.chargingStatus == 1) {
          if (data.carStatus.travelStatus == 1) {

            return 'static/img/mapChargeFlameout.png'
          } else if (data.carStatus.travelStatus == 0) {

            return 'static/img/mapChargeTravel.png'

          }
        } else if (
          data.carStatus.chargingStatus == 0 &&
          data.carStatus.isBadStatus == 0
        ) {
          if (data.carStatus.travelStatus == 1) {

            return 'static/img/mapxihuo.png'
          } else if (data.carStatus.travelStatus == 0) {

            return 'static/img/mapyundong.png'

          }
        }
      },
      getRealData(map) {
        var that = this;
        var type = 0;
        String.prototype.trim = function() {
          return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, '$1');
        }
        that.vinData = that.vinData.trim();
        if (that.vinData.length == 17) {
          type = 1;
        }
        // getQueryCarRealByPlateOrVin(type,that.vinData).then(response => {
        getSingleCarRealByVins(type, that.vinData).then(response => {
          if (response.results) {
            if (that.marker) {
              this.map.clearMap();
            }
            var data = response.results;
            if (that.inputCar.trim().length !== 17) {
              that.inputCar = data.carRealDBVo.carBase.plate
            }
            if (data.carRealDBVo.carBase.vin !== '' || that.inputCar.trim().length !== 17) {
              that.vinData = data.carRealDBVo.carBase.vin;
            }
            that.currentTime = data.carRealDBVo.carRealDataVo.samplingTime;
            that.baseMsg = data.carRealDBVo;
            that.baseMsg.carBase.vin = data.carRealDBVo.carBase.vin;
            that.plate = data.carRealDBVo.carBase.plate;

            var lt = that.baseMsg.carRealDataVo.latitude;
            var lg = that.baseMsg.carRealDataVo.longitude;


            that.lnglatXY = [lg, lt]; //已知点坐标
            that.map.setCenter([lg, lt]);
            that.regeocoder(that.lnglatXY);
            let content = `
                <div>
                    <img style="position: relative;width:38px;" src=${that.distinguishStatus(that.baseMsg)} alt="">
                </div>
                      `;
            that.marker = new AMap.Marker({
              content: content,
              position: that.lnglatXY,
              map: that.map,
              offset: new AMap.Pixel(-19, -19),
            })
            if (data.extremeData) {
              that.minTempValue = data.extremeData.minTempValue;
              that.maxTempValue = data.extremeData.maxTempValue;
              that.minBatteryVoltageNum = data.extremeData.minBatteryVoltageCellValue;
              that.maxBatteryVoltageNum = data.extremeData.maxBatteryVoltageCellValue;
            } else {
              that.minTempValue = 0;
              that.maxTempValue = 0;
              that.minBatteryVoltageNum = 0;
              that.maxBatteryVoltageNum = 0;
            }
            if (data.chargingDeviceVoltageData) {
              if (data.chargingDeviceVoltageData.chargingDeviceVoltage.length > 0) {
                if (data.chargingDeviceVoltageData.chargingDeviceVoltage.length == 2) {
                  this.elecOptions = [{
                    value: 1,
                    label: '电池包1'
                  }, {
                    value: 2,
                    label: '电池包2'
                  }]
                } else if (data.chargingDeviceVoltageData.chargingDeviceVoltage.length > 2) {
                  this.elecOptions = [{
                    value: 1,
                    label: '电池包1'
                  }, {
                    value: 2,
                    label: '电池包2'
                  }, {
                    value: 3,
                    label: '电池包3'
                  }]
                }
                that.chargingDeviceVoltage = data.chargingDeviceVoltageData.chargingDeviceVoltage;
              } else {
                that.chargingDeviceVoltage = [{
                  singleCellVoltage: []
                }]
              }
            } else {
              that.chargingDeviceVoltage = [{
                singleCellVoltage: []
              }]
            }
            if (data.chargingDeviceTempData) {
              if (data.chargingDeviceTempData.chargingDeviceTemp.length > 0) {
                that.chargingDeviceTempData = data.chargingDeviceTempData.chargingDeviceTemp;
              } else {
                that.chargingDeviceTempData = [{
                  chargingTempProbeValue: []
                }];
              }
            } else {
              that.chargingDeviceTempData = [{
                chargingTempProbeValue: []
              }];
            }


            if (that.baseMsg.carRealDataVo) {
              if (getData(that.baseMsg.carRealDataVo.soc) == '-') {
                that.carRealDataVo.soc = 0
              } else {
                that.carRealDataVo.soc = that.baseMsg.carRealDataVo.soc
              }

            } else {
              that.carRealDataVo.soc = 0;
            }
            that.getStandardDetailData();
          } else {}
        }).catch(error => {
          clearInterval(that.timer)
        })
      },
    }

  }
</script>

<style scoped>
  .all-car-list {
    display: inline-block;
    width: 33.3%;
    line-height: 1.5;
    font-size: 14px;
    color: #666;
  }

  .map-box {
    position: relative;
  }

  .center-title {
    position: relative;
    text-align: center;
    top: -1.5rem;
  }

  .temp-center-title {
    position: relative;
    text-align: center;
    bottom: -17.25rem;
  }

  .input-with-select {
    width: 6.25rem;
  }

  .input-car-msg {
    margin-left: .625rem;
  }

  .input-with-input {
    /*display: inline-block;*/
    float: left;
    width: 50%;
    margin-right: .9375rem;
  }

  .top-input-buttons {
    padding: 5px;
    position: absolute;
    /*background: rgba(0,0,0,.5);*/
    width: 50%;
    top: 10px;
    /*z-index: 1;*/
  }

  .input-with-input button {
    border: 0;
    border-image-width: 0;
  }

  .input-with-input input {
    border: 0;
    border-image-width: 0;
  }

  .speed-box {
    position: absolute;
    height: 18.75rem;
    width: 33.3%;
    left: 33.3%;
  }

  .devide-box {
    padding-left: 2.5rem;
  }

  .temp-box-detail {
    position: absolute;
    height: 18.75rem;
    width: 33.3%;
  }

  .temp-box,
  .last-temp-box {
    position: absolute;
    height: 18.75rem;
    width: 50%;
    left: 15%;
  }

  .last-temp-box {
    left: 55%;
  }

  .electric-box {
    position: absolute;
    width: 33.3%;
    height: 18.75rem;
    left: 66.6%;
    /*top:11.25rem;*/
  }

  .map-text-box {
    padding-left: 2.5rem;
    font-size: .875rem;
    margin-top: .9675rem;
  }

  .addr-text-box {
    margin-top: .625rem;
  }

  .min-time {
    padding-left: .625rem;
  }

  .left-map {
    position: absolute;
    width: 60%;
    height: 59.375rem;
  }

  #car-map {
    width: 100%;
    height: 47.5rem;
  }

  .right-charts-box {
    padding-left: 10px;
    box-sizing: border-box;
  }

  .right-charts {
    padding-right: .625rem;
    box-sizing: border-box;
    right: 0;
    width: 100%;
    /*height: 80%;  */
  }

  .right-charts-g,
  .right-charts-l {
    border: 1px solid #dfdfdf;
    box-shadow: 1px 1px 1px #ddd;
    position: relative;
    height: 20rem;
    width: 100%;
  }

  .right-charts-l {
    margin-top: .625rem;
    height: 28rem;
  }

  .close-box {
    text-align: center;
    margin-top: 10px;
  }

  .el-dropdown-link {
    color: #1890FF;
  }

  .button-box {
    padding: 20px;
  }

  .dropdown-right {
    text-align: right;
    padding-right: 20px;
    padding-top: 10px;
  }

  .el-select-input {
    width: 100px;
  }
</style>