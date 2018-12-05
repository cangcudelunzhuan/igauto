<template>
  <div class="amap-page-containe">
    <el-amap
            vid="amapDemo"
            :center ='center'
            :zoom="zoom"
            class="amap-demo">
      <el-amap-marker
                      v-if="carMarker"
                      :position="alarmResultDetail.position"
                      :content="componentMarker.content"
                      id='defaultMarker'
                      :events="componentMarker.events"
      ></el-amap-marker>
      <el-amap-marker v-for="(marker,index) in markers"
                      :key="index"
                      :content="marker.content"
                      :position="marker.position"
                      :events="marker.events">

      </el-amap-marker>
      <el-amap-info-window v-if="window.visible" :offset="offset" :events="closeInfoWindow" @close="closeInfoWindow"  :position="window.position"  :content="window.content">
        <div class="infoWindowStyle">
          <div v-if="carText" class="infoWindowStyle-title">更新时间:{{alarmResultDetail.updateTime}}</div>
          <!--<div v-if="markerText" class="infoWindowStyle-title">更新时间:{{alarmResultDetail.updateTime}}</div>-->
          <div class="infoWindowStyle-body">
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="20">
                <div class="infoWindowStyle-info">
                  <p v-show="carText">车牌:{{getData(alarmResultDetail.plate)}}</p>
                  <p v-show="carText">车型:{{getData(alarmResultDetail.type)}} {{getData(alarmResultDetail.carSeatNum)}}座</p>
                  <p v-show="carText">总里程:{{getData(alarmResultDetail.totalMileage)}}Km</p>
                  <p v-show="carText">剩余电量:{{getData(alarmResultDetail.soc)}}%</p>
                  <p v-show="carText">地址:{{getData(addressAlarm)}}</p>
                  <p v-show="markerText">服务站代码:{{getData(stationCode)}}</p>
                  <p v-show="markerText">服务站名称:{{getData(companyName)}}</p>
                  <p v-show="markerText">站长热线:{{getData(founderName)}}&nbsp;&nbsp; {{founderPhone}}</p>
                  <p v-show="markerText">服务热线:{{getData(managerName)}}&nbsp;&nbsp; {{managerPhone}}</p>
                  <p v-show="markerText">服务站地址:{{getData(address)}}</p>
                </div>
              </el-col>
              <el-col v-show="carText" :span="4" style="height:77px;border-left:1px dashed #e9e9e9;margin:30px 0;">
                <div class="infoWindowStyle-speed" style="text-align: center">
                  <p v-show="carText" style="font-size:40px">{{getData(alarmResultDetail.speed)}}</p>
                  <p v-show="carText">Km/h</p>
                  <p v-show="carText">{{getData(alarmResultDetail.vehicleState)}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="infoWindowStyle-buttom" v-show="carText">
            <el-button size="mini" type="primary"  @click.native="vehicleDetails">车辆详情</el-button>
            <el-button size="mini" type="primary" @click.native="vehicleCondition">实时车况</el-button>
            <el-button size="mini" type="primary" @click.native="TrajectoryTracking">轨迹追踪</el-button>
            <el-button size="mini" type="primary" @click.native="AlarmProcessing">报警处理</el-button>
          </div>
        </div>
      </el-amap-info-window>
    </el-amap>
    <div>
      <el-dialog :visible.sync="dialogTableVisible" width="60%">
        <car-msg :carDetailData="carBaseMsg"></car-msg>
        <div class="close-box">
          <el-button type="primary" size="small" @click="closeDialog">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import {getCarDetail} from  '@/api/carCenter';
    import CarMsg from  '@/components/carCenter/carMsg.vue';
    import {getWebService,getRangeService} from  '@/api/alarm';
    import {getData} from "@/utils/validate";
    export default {
        components:{CarMsg},
        data: function() {
            return {
                getData,
                zoom: 10,
               center: [121.59996, 31.197646],
                // markerOffset:new AMap.Pixel(-68, -68),
                componentMarker: {
                    position: [0, 0],
                    content:`<span id="carMarker" style="position: relative;"><img style="display:block;margin:0 auto;"mg src="static/img/guzhang.png" alt=""></span>`,
                    events: {
                          click: () => {
                              this.markerText = false;
                              this.carText = true;
                              this.window.visible =true;
                              this.window.position = this.alarmResultDetail.position;
                              this.$nextTick(() => {
                                  self.window.visible = true;
                              });
                          },
                      },
                },
                closeInfoWindow:{
                    close:()=>{
                        this.window.visible =false;
                    }
                },
                carText:true,
                carMarker:false,
                carBaseMsg:{},
                dialogTableVisible:false,
                testMarker:true,
                markerText:false,
                address:'',
                managerName:'',
                companyName:'',
                stationCode:'',
                managerPhone:'',
                founderName:'',
                updateTime:'',
                founderPhone:'',
                arrContainer:[],
                offset:[0,-10],
                markers: [],
                windows: [],
                // window:'',
                window:{
                    position: [0, 0],
                    visible:false,
                },
                source: 'click',
            };
        },
        props:{
            alarmResultDetail:Object,
            serviceData:Array,
            position:Array,
            addressAlarm:String,
        },
        watch: {
            // 计算属性的 getter
            position: function (val,old) {
                this.center = val;
                this.window.position =val;
                this.window.visible =true;
            },
            alarmResultDetail:function (val,old) {
                this.getWebServiceData(val.latitude,val.longitude);
                if(val.latitude){
                    this.carText=true,
                    this.markerText=false,
                    this.carMarker = true;
                    this.window.visible =true;

                }else {
                    this.carMarker = false;
                    this.window.visible =false;
                    // this.center = [val.longitude,val.latitude];
                    // this.window.position = [val.longitude,val.latitude];
                }
            },

        },

        mounted() {
//            this.getWebServiceData(34.299529,108.826508);
        },
        methods: {
            closeDialog(){
                this.dialogTableVisible = false;
            },
            vehicleDetails(){
                var vin ={vin:this.alarmResultDetail.vin};
                getCarDetail(vin).then(response => {
                    if(response.results){
                        this.dialogTableVisible =true;
                        this.carBaseMsg = response.results
                    }else {
                        this.$message.error('暂无数据');
                    }
                })
                // this.$router.push({ name: "车辆档案" });
                // this.$router.push({path:"/example/index",name: 'Form'})
            },
            getWebServiceData(lat,lgt){
                var that =this;
                var data ={
                    latitude:lat,
                    longitude:lgt
                }
                getWebService(data).then(response=>{
                    if(response.results){
                        var data= response.results;
                        this.getMarkerInfo(data);
                    }
                })
            },
            vehicleCondition(){
                // this.$router.push({path:'/carsCenter/controlCar',query:{vinId:this.alarmResultDetail.vin}});
              this.$router.push({
                name: "单车监控"
              });
              this.$store.dispatch("getCarVin", this.alarmResultDetail.vin);
            },

            TrajectoryTracking(){
              // this.$router.push({ name: "轨迹查询", params: { plate: this.alarmResultDetail.plate, lng: this.window.position } });
              this.$router.push({ name: '轨迹查询', params: { plate: this.alarmResultDetail.plate ?this.alarmResultDetail.plate: this.alarmResultDetail.vin, lng: this.window.position } });
            },
            AlarmProcessing(){
                this.$emit('handleSingleData',this.alarmResultDetail.alarmCode);
            },
            getMarkerInfo(arr) {
                var markers = [];
                let windows = [];
                let content ='';
                let self = this;
                for (let i = 0 ; i < arr.length; i ++) {
                    let ii = i;
                    if(arr[i].carSeatNum){
                        content = `<span id="carMarker" style="position: relative;"><img style="display:block;margin:0 auto;"mg src="static/img/guzhang.png" alt=""></span>`;
                    }else {
                        content = `<div style="position: relative;"><img style="width:24px;" src="static/img/service.png" alt=""></div>`;
                    }
                    markers.push({
                        position: [arr[i].longitude,arr[i].latitude],
                        content: content,
                        events: {
                            click(e) {
                                self.managerName = arr[ii].managerName;
                                self.managerPhone = arr[ii].managerPhone;
                                self.address = arr[ii].stationAdrress;
                                self.companyName =arr[ii].companyName;
                                self.stationCode = arr[ii].stationCode;
                                self.founderName = arr[ii].founderName;
                                self.founderPhone = arr[ii].founderPhone;
                                self.updateTime = arr[ii].updateTime;
                                if(e.target.vh.contentDom.lastChild.id=='carMarker'){
                                    self.markerText = false;
                                    self.carText = true;
                                }else {
                                    self.markerText = true;
                                    self.carText = false;
                                }
                                // self.windows.forEach(window => {
                                //     window.visible = false;
                                // });

                                self.window = self.windows[i];
                                self.window.visible = false;
                                self.$nextTick(() => {
                                    self.window.visible = true;
                                    self.window.position = [arr[ii].longitude,arr[ii].latitude]
                                });
                            }
                        }
                    });
                    windows.push({
                        position: [arr[i].longitude,arr[i].latitude],
                        visible: false
                    });
                }

                this.markers = markers;
                this.windows = windows;
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .amap-demo {
    position: absolute;
    transition: 0.3s ease;
    width: calc(100% - 230px);
    height: 550px;
    &.hideSidebar {
      transition: 0.3s ease;
      width: calc(100% - 40px);
    }
    /*height: calc(100% - 84px);*/
    .infoWindowStyle {
      width: 426px;
      font-size: 14px;
      color: #000;
      margin: -10px -18px -10px -10px;
      &-title {
        border-bottom: 1px solid #e9e9e9;
        padding: 12px 24px;
      }
      &-body {
        width: 378px;
        border-bottom: 1px solid #e9e9e9;
        margin: 0 auto;
        opacity: 0.65;
      }
      &-img,
      &-speed,
      &-info {
        p {
          margin: 5px 0;
        }
      }
      &-buttom {
        padding: 12px 30px;
      }
    }
    .markerWindowStyle{
      width: 200px;
    }
  }
  .map-zoom{
    position: absolute;
    right: 50px;
    bottom: 150px;
  }
  .map-zoom {
    position: absolute;
    right: 20px;
    bottom: 136px;
    border-radius: 2px;
    background: #fff;
    &::after {
      content: "";
      position: absolute;
      left: 12px;
      top: 41px;
      width: 14px;
      height: 2px;
      background: rgba(228, 231, 237, 0.6);
    }
    &-plus,
    &-minus {
      padding: 12px;
    }
  }
</style>