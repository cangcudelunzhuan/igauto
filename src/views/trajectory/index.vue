<template>
  <div class="trajectory" style="font-size:12px">

    <!-- 地图 -->
    <div id="map-container" :class="{hideSidebar:!sidebar.opened}"></div>

    <!-- 搜索条 -->
    <div class="query-nav">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="searchForm" :rules="searchRules">
        <el-form-item label="车牌/VIN码" prop="plate">
          <el-input v-model="formInline.plate" placeholder="车牌"></el-input>
        </el-form-item>
        <el-form-item label="起止时间" prop="date">
          <el-date-picker v-model="formInline.date" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 搜索展示项 -->
    <div v-show="show">
      <div class="info-window">
        <p>行驶时长:{{travelTime}}</p>
        <p>停留时长:{{restTime}}</p>
        <p>行驶里程:{{totalMileage}}公里</p>
        <p>最高速度:{{maxSpeed}}km/h</p>
        <p>平均速度:{{averageSpeed}}km/h</p>
        <!-- <p>报警:</p> -->
        <p class="info-window-icon">停留
          <img style="width:18px" src="static/img/stop.png" alt=""> 超速路段
        </p>
      </div>
      <div class="progress">
        <!--<el-button @click.native="start">开始</el-button>-->
        <el-button @click.native="onOffCarPolyline" type="primary" class="ui-speed-btn">
          {{onOffPolylineFlag?"暂停":"开始"}}
        </el-button>

        <div class="ui-speed-ratio">
          <el-select v-model="playSpeedRatio" placeholder="请选择" size="small" @change="changePlaySpeedRatio">
            <el-option v-for="ratioItem in speedRatioList" :key="ratioItem.value" :label="ratioItem.label" :value="ratioItem.value">
            </el-option>
          </el-select>
        </div>
        <!--<el-progress :percentage="0" :show-text="false"></el-progress>-->
        <el-slider v-model="moveProgress" @change="changeSlider" @mousedown.native="clickSlider"></el-slider>
      </div>
      <!-- <div class="speed-charts">
        <speed-charts :height="height" :width="width"></speed-charts>
      </div> -->
    </div>

  </div>
</template>

<script>
  // import SpeedCharts from "@/components/Echarts/speedCharts.vue";
  import { validatePlate } from "@/utils/validate";
  import { getQueryTrajectoryData } from "@/api/trackTheQuery";
  import { mapGetters, mapState } from "vuex";
  import axios from "axios";
  export default {
    name: "trajectory",
    // components: { SpeedCharts },
    computed: {
      ...mapGetters(["sidebar"])
    },
    data() {
      const vDate = (rule, value, cb) => {
        if (!value) {
          cb(new Error("时间不能为空"));
        }
        else if (((value[1] - value[0]) / (24 * 60 * 60 * 1000)) > 6) {
          cb(new Error("仅支持7天的查询"));
        } else {
          cb();
        }
      };
      return {
        formInline: {
          plate: "",
          // plate: "浙J0317试",
          date: [new Date(new Date().getTime() - 24 * 60 * 60 * 1000), new Date()]
          //TODO 测试数据，用完记得删除
          // date: [new Date("2018-03-08"), new Date("2018-04-01")]
        },
        searchRules: {
          date: [{ required: true, trigger: "blur", validator: vDate }]
        },
        moveProgress: 0, //车辆轨迹回放进度
        userInputProgressCache: 0, //缓存用户输入的车辆轨迹进程百分比，默认 0
        onOffPolylineFlag: false, //启停轨迹回放  true | false  启动|停止  默认:false停止
        playSpeedRatio: 1, //播放倍速  默认1   可选：1倍、1.5倍、1.75倍、2倍
        speedRatioList: [
        {
          value: 1,
          label: "1.0X"
        },
        {
          value: 1.5,
          label: "1.5X"
        },
        {
          value: 1.75,
          label: "1.75X"
        },
        {
          value: 2,
          label: "2.0X"
        }], //播放倍速  默认1   可选：1倍、1.5倍、1.75倍、2倍
        // speed: 10000,
        speed: 6000,
        show: false,
        height: "200px",
        width: "200px",
        lineArr: [],
        infomation: [],
        speedLineArr: [],
        dockingStations: [],
        travelTime: "",
        totalMileage: "",
        restTime: "",
        maxSpeed: "",
        averageSpeed: "",
        t: null, //节流函数计时器
        isChangeSelect: false, //用来标记是否更改了速度
        passRoad: null, //已经行驶过的轨迹实例
        eArr: [] //已经行驶过的路程数据
      };
    },
    mounted() {
      if (this.$route.params) {
        this.formInline.plate = this.$route.params.plate;
        this.loglat = this.$route.params.lng;
      }
      this.init();
    },
    activated() {
      let arr = Object.keys(this.$route.params)
      if (arr.length == 0) {
        this.show = false;
        this.formInline.plate = this.formInline.plate;
        this.loglat = this.loglat;
      } else {
        this.show = false;
        this.formInline.plate = this.$route.params.plate;
        this.loglat = this.$route.params.lng;
      }
      this.init();
    },
    methods: {
      init() {
        const map = new AMap.Map("map-container", {
          zoom: 12,
          center: this.loglat
        });
        this.map = map;
        let marker = new AMap.Marker({
          map: this.map,
          position: this.loglat,
          icon: "http://webapi.amap.com/images/car.png",
          offset: new AMap.Pixel(-26, -13),
          zIndex: 1000
        });
      },
      /**
       *  开始/停止 车辆轨迹回放
       */
      onOffCarPolyline() {
        //如果信息窗口是打开的就关闭
        if (this.infoWindow) {

          this.infoWindow.close()
        }
        //动画播放状态
        if (this.onOffPolylineFlag) {
          //暂停动画
          this.marker.pauseMove();

          //设置按钮状态
          this.onOffPolylineFlag = false;
        } else {
          //停止状态
          //如果轨迹回放没有开始或者已经结束，就需要重新开始轨迹播放
          if (this.moveProgress === 0 || this.moveProgress === 100) {
            this.changeSlider(0);

            //清除轨迹重新开始
            if (this.passRoad) {
              this.passRoad.setMap(null)
              this.passRoad = null
            }
          }

          //开始动画
          this.marker.resumeMove();

          //设置按钮状态
          this.onOffPolylineFlag = true;

          //每次点击开始都把状态改回默认值
          this.isChangeSelect = false
        }
      },
      /**
       *  当用户鼠标按下拖拽条的时候，说明用户想要操作 slider
       */
      clickSlider() {
        this.onOffPolylineFlag = false;
        //暂停动画
        this.marker.stopMove();
      },
      /**
       *  修改速度倍率的回调
       *
       */
      changePlaySpeedRatio(value) {

        //表示更改了速度了
        this.isChangeSelect = true

        //用来存储已通过的路段
        if (!this.passRoad) {
          this.passRoad = new AMap.Polyline({
            map: this.map,
            strokeColor: "#0F0", //线颜色
            strokeWeight: 3 //线宽
          });

        }

        if (this.moveProgress == 0) {} else {
          //暂停动画
          this.marker.stopMove();

          //设置也通过路段的路径
          this.passRoad.setPath(this.eArr);

          //开始轨迹回放
          this.changeSlider(this.moveProgress);
        }
      },
      /**
       *  当用户鼠拖拽slider的时候，执行回调
       *  @param  value   拖拽进度
       */
      changeSlider(value) {
        if (this.infoWindow) {
          this.infoWindow.close()
        }
        //临时缓存用户slider 中输入的值
        this.userInputProgressCache = value;

        this.onOffPolylineFlag = true;

        //得到剩余路程数据
        let surplusLineArr = this.lineArr.slice(this.arrStartSeat(value));

        //如果不是开始和结束就往数组中添加动画过程中最后一个点坐标  解决轨迹跳跃的bug
        if (this.isChangeSelect && value != 100 && value != 0) {
          surplusLineArr = this.lastPath.concat(surplusLineArr)
        }

        //如果是拖到最后需要特殊处理，因为剩余路程为0 会导致报错
        if (surplusLineArr.length < 1) {
          surplusLineArr = [this.lineArr[this.arrStartSeat(value) - 1]];
        }

        this.marker.moveAlong(surplusLineArr, this.speed * this.playSpeedRatio);
        if (value != 0) {
          //暂停动画
          this.marker.pauseMove();

          //设置按钮状态
          this.onOffPolylineFlag = false;

        }

      },
      lineDrawing() {
        this.show = true;


        let marker = new AMap.Marker({
          map: this.map,
          position: this.startRow,
          // icon: "static/img/start.png",
          icon: "http://webapi.amap.com/images/car.png",
          offset: new AMap.Pixel(-26, -13),
          autoRotation: true,
          zIndex: 1000
        });
        this.marker = marker;


        // 绘制行驶的路径
        let polyline = new AMap.Polyline({
          map: this.map,
          path: this.lineArr,
          strokeColor: "#444E58", //线颜色
          strokeOpacity: 0.8, //线透明度
          strokeWeight: 8, //线宽
          isOutline: true,
          outlineColor: "#3E82F7",
          strokeStyle: "solid", //线样式
          showDir: true, //显示小三角
          strokeDasharray: [10, 5], //补充线样式
          geodesic: true,
          lineJoin: "round"
        });

        //得到超速路段的经纬度
        let speedB = this.limitPolylineData.map(value => {
          let speedA = value.map(item => {
            let speedLine;
            return (speedLine = [item.longitude, item.latitude]);
          });
          return speedA;
        });

        // 绘制超速的路径
        speedB.map(value => {
          let speedPolyLine = new AMap.Polyline({
            map: this.map,
            path: value,
            strokeColor: "#F00", //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 5, //线宽
            // strokeStyle: "solid"  //线样式
            zIndex: 100
          });
        });

        let distance = polyline.getLength(); //获取距离单位“米”
        this.distance = distance;

        //车通过的路径
        let passedPolyline = new AMap.Polyline({
          map: this.map,
          // path: lineArr,
          strokeColor: "#0F0", //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 3 //线宽
          // strokeStyle: "solid"  //线样式
        });

        marker.on("moving", e => {
          //存储已通过的路段
          this.passPath = e.passedPath

          //存储已通过的路段的最后一个点坐标  解救更改速度轨迹跳跃的bug
          this.lastPath = this.passPath.slice(-1)

          //设置行驶路段
          passedPolyline.setPath(e.passedPath);

          //当前移动路程的百分比
          let carRunPercentage = e.passedPath.length / this.lineArr.length * 100;
          carRunPercentage += this.userInputProgressCache;

          this.moveProgress = carRunPercentage;

          //已经行驶过的路程
          this.eArr = this.lineArr.slice(0, this.arrStartSeat(carRunPercentage));

        });

        //轨迹回放结束之后的回调
        marker.on("movealong", e => {
          //恢复按钮的状态
          this.onOffPolylineFlag = false;

          //恢复进度
          this.moveProgress = 0;
        });

        //鼠标点击

        marker.on("click", e => {
          this.createInfoWindow()
          setTimeout(() => {
            this.infoWindow.open(this.map, marker.getPosition());
          }, 800)
        });

        //设置合适的视野范围
        this.map.setFitView();
      },
      //用来计算在哪里截取数组的长度
      arrStartSeat(value) {
        //路程数组长度
        let lineArrLen = this.lineArr.length;

        //计算出生于回放路程开始的位置
        return parseInt(lineArrLen * (value / 100));
      },
      createInfoWindow() {
        //获取信息框的数据
        let news = this.infomation[this.arrStartSeat(this.moveProgress)]
        //转换为物理地址
        this.geocoder.getAddress(
          [news.longitude ? news.longitude : "", news.latitude ? news.latitude : ""],
          (status, result) => {
            news.address = result.regeocode.formattedAddress;
          }
        );
        setTimeout(() => {
          //构造信息窗体
          let info = document.createElement("div"),
            infoTitle = document.createElement("div"),
            infoContanier = document.createElement("div"),
            infoFooter = document.createElement("div")

          //infoTitle中的内容
          infoTitle.innerHTML = `更新时间:${news.samplingTime?news.samplingTime:"--"}`
          info.appendChild(infoTitle);

          //infoContanier中的内容
          infoContanier.style.display = "flex"
          infoContanier.style.justifyContent = "space-around";
          infoContanier.innerHTML = `
          <div style="border-right:1px dashed #ccc;margin:10px 0;padding-right: 20px;">
            <p style="margin:5px;">vin码:${this.vin}</p>
            <p style="margin:5px;">车牌:${this.plate}</p>
            <p style="margin:5px;">朝向:${news.gnssDirectionName?news.gnssDirectionName:"--"}</p>
            <p style="margin:5px;">总里程:${news.totalMileage?news.totalMileage:"--"} KM</p>
            <p style="margin:5px;">剩余电量/油量:${news.remainingBattery == 65534||news.remainingBattery == 65535?"--":news.remainingBattery}</p>  
          </div>
          <div style="text-align: center;align-self: center;padding: 0px 25px;">
            <p style="font-size:30px;margin:0;">${news.speed == 65534 || news.speed == 65535?"--":news.speed}</p>
            <p style="margin:5px;">Km/h</p>
          </div>
          `
          info.appendChild(infoContanier);

          //infoFooter中的内容
          infoFooter.innerHTML = `地址:${news.address}`
          info.appendChild(infoFooter);

          //创建全局信息框体方便调用
          this.infoWindow = new AMap.InfoWindow({
            content: info,
          });
        }, 600)

      },
      drawStartEnd() {
        let endPoint = new AMap.Marker({
          map: this.map,
          position: this.endRow,
          offset: new AMap.Pixel(-30, -30),
          icon: "static/img/end.png",
          zIndex: 1000
        });
      },
      drawDockingStations() {
        if (this.cluster) {
          this.cluster.clearMarkers();
        }
        let marks = [],
          mark;
        for (let i = 0, len = this.dockingStations.length; i < len; i++) {
          mark = new AMap.Marker({
            position: this.dockingStations[i],
            offset: new AMap.Pixel(-20, -40),
            icon: "static/img/stop.png"
          });
          marks.push(mark);
        }
        this.cluster = new AMap.MarkerClusterer(this.map, marks, {
          zoomOnClick: false
        });
      },
      /*        start() {
              let $progress = $(".el-progress-bar__inner");
              let sec = this.distance * 3600000 / (this.speed * 1000);
              $progress.stop();
              $progress.width("0px");
              $progress.animate({width: "100%"}, sec);
              this.marker.moveAlong(this.lineArr, this.speed);
          },*/
      getParams() {
        // console.log(this.$route.params)
      },
      search() {

        //这里设置了节流函数为了解决多次点击查询的bug
        clearTimeout(this.t)
        this.t = setTimeout(() => {

          this.$refs.searchForm.validate(valid => {
            if (valid) {
              let startTime = this.getTaskTime(
                "yyyy-MM-dd hh:mm:ss",
                this.formInline.date[0]
              );
              let endTime = this.getTaskTime(
                "yyyy-MM-dd hh:mm:ss",
                this.formInline.date[1]
              );
              let plate = this.formInline.plate,
                type = this.formInline.plate.length > 8 ? 1 : 0

              this.lineArr = [];
              this.dockingStations = [];
              this.speedLineArr = [];
              this.map.clearMap();

              this.moveProgress = 0; //车辆轨迹回放进度
              this.onOffPolylineFlag = false; //启停轨迹回放  true | false  启动|停止  默认:false停止
              this.playSpeedRatio = 1; //播放倍速  默认1   可选：1倍、1.5倍、1.75倍、2倍

              getQueryTrajectoryData(plate, startTime, endTime, type)
                .then(res => {
                  let data = res.results;
                  this.travelTime = this.formatSeconds(data.travelTime); //行驶时长
                  this.restTime = this.formatSeconds(data.restTime); //休息时长
                  this.totalMileage = data.totalMileage == "-" ? "-" : data.totalMileage.toFixed(2); //行驶里程
                  this.maxSpeed = data.maxSpeed.toFixed(2); //最大速度
                  this.averageSpeed = data.averageSpeed == "-" ? "-" : data.averageSpeed.toFixed(2); //平均速度
                  this.vin = data.vin //vin
                  this.plate = data.plate //车牌号
                  this.startRow = [
                    data.records[0].longitude,
                    data.records[0].latitude
                  ]; //起点
                  this.endRow = [
                    data.records[data.records.length - 1].longitude,
                    data.records[data.records.length - 1].latitude
                  ]; // 终点
                  for (let i = 0, len = data.records.length; i < len; i++) {
                    if (data.records[i].speed > 120) {
                      this.speedLineArr.push({
                        longitude: data.records[i].longitude,
                        latitude: data.records[i].latitude,
                        num: i + 1
                      }); //超速路段
                    }
                    this.lineArr.push([
                      data.records[i].longitude,
                      data.records[i].latitude
                    ]); //行驶路段
                    //获得每个点的信息
                    this.infomation.push(data.records[i])
                  }

                  for (let i = 0, len = data.stops.length; i < len; i++) {
                    this.dockingStations.push([
                      data.stops[i].longitude,
                      data.stops[i].latitude
                    ]); //停车点
                  }
                  this.limitPolylineData = this.getSpeedLimitRoad(
                    this.speedLineArr
                  );

                  this.drawDockingStations();
                  this.drawStartEnd();
                  this.lineDrawing();
                })
                .catch(err => {
                  console.log(err, "获取数据出错");
                });
            } else {
              console.log("error");
              return false;
            }
          });
        }, 1000)
      },
      getSpeedLimitRoad(speedLineArr) {
        let speedPolyline = [speedLineArr[0]];
        let limitPolylineData = [];
        speedLineArr.forEach((item, index) => {
          let lastSpeed = speedPolyline[speedPolyline.length - 1];

          if (item.num - lastSpeed.num == 1) {
            speedPolyline.push(item);
          } else {
            if (speedPolyline.length >= 3) {
              limitPolylineData.push(speedPolyline);
            }
            speedPolyline = [item];
          }
        });

        if (speedPolyline.length >= 3) {
          limitPolylineData.push(speedPolyline);
        }
        return limitPolylineData;
      },

      formatSeconds(second) {
        let theTime = parseInt(second); // 秒
        let theTime1 = 0; // 分
        let theTime2 = 0; // 小时
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60);
          theTime = parseInt(theTime % 60);
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
          }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
          result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
          result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .trajectory {
    // position: relative;
    #map-container {
      position: absolute;
      transition: 0.3s ease;
      width: calc(100% - 200px);
      height: calc(100% - 106px);
      &.hideSidebar {
        transition: 0.3s ease;
        width: calc(100% - 40px);
      }
    }
    .query-nav {
      position: absolute;
      top: 124px;
      left: 276px;
      height: 64px;
      background: #fff;
      box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
      .el-form-item {
        margin: 10px;
      }
    }
    .info-window {
      position: absolute;
      width: 164px;
      height: 176px;
      background: #fff;
      bottom: 48px;
      left: 276px;
      padding: 10px;
      box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
      p {
        margin: 8px 0;
      }
      &-icon::after {
        content: "";
        display: inline-block;
        width: 28px;
        height: 8px;
        background: red;
      }
    }
    .progress {
      position: absolute;
      width: 400px;
      right: calc(50% - 400px);
      bottom: 48px;
      .ui-speed-ratio {
        display: inline-block;
        position: absolute;
        right: -110px;
        top: 0;
        width: 90px;
      }
      .ui-speed-btn {
        position: absolute;
        left: -80px;
        top: 0;
      }
    } // .speed-charts{
    //   position: absolute;
    //   right: 20px;
    //   bottom: -20px;
    // }
  }
</style>