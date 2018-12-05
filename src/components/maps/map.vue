<template>
  <div class="amap-page-container" style="font-size:12px;">
    <!-- 地图 -->
    <el-amap ref="map" vid="amapDemo" :zoom="zoom" :zooms="zooms" class="amap-demo" :events="events" :class="{hideSidebar:!sidebar.opened}">
      <el-amap-info-window :position="window.position" v-if="window.visible">
        <div class="infoWindowStyle">
          <div class="infoWindowStyle-title">更新时间:{{updateTime}}</div>
          <div class="infoWindowStyle-body">
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="18">
                <div class="infoWindowStyle-info">
                  <p>车牌:{{plate}}</p>
                  <p>车型:{{type}} {{carSeatNum}}座</p>
                  <p>总里程:{{totalMileage}}</p>
                  <p>剩余电量:{{soc}}</p>
                  <p>地址:{{address}}</p>
                </div>
              </el-col>
              <el-col :span="6" style="height:77px;border-left:1px dashed #e9e9e9;margin:30px 0;">
                <div class="infoWindowStyle-speed" style="text-align: center">
                  <p style="font-size:40px">{{speed}}</p>
                  <p>Km/h</p>
                  <p>{{vehicleState}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="infoWindowStyle-buttom">
            <el-button type="primary" size="mini" @click.native="vehicleDetails">车辆详情</el-button>
            <el-button type="primary" size="mini" @click.native="vehicleCondition">实时车况</el-button>
            <el-button type="primary" size="mini" @click.native="TrajectoryTracking">轨迹追踪</el-button>
            <el-button type="primary" size="mini" @click.native="AlarmProcessing">报警处理</el-button>
          </div>
        </div>
      </el-amap-info-window>
    </el-amap>

    <!-- 地图放大缩小控件 -->
    <div class="map-zoom">
      <div class="map-zoom-plus" @click="add">
        <img src="static/img/plus.png" alt="">
      </div>
      <div class="map-zoom-minus" @click="minus">
        <img src="static/img/minus.png" alt="">
      </div>
    </div>

    <!-- 筛选框 -->
    <div class="filter-box" v-show="isFilter" ref="filterBox">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="机构名称:">
          <el-autocomplete v-model="cName" :fetch-suggestions="querySearchOrganization" placeholder="请输入内容" @select="queryHandleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item label="车型:">
          <el-select v-model="form.type" placeholder="请选择车型" multiple>
            <el-option v-for="(item,index) in carTypeList" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆状态:">
          <el-select v-model="form.state" placeholder="请选择车辆状态" multiple>
            <el-option-group v-for="group in item" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 树形控件 -->
      <div class="tree" v-show="isFilter">
        <el-tree v-if="freshRender" ref="ert" :props="defaultProps" accordion @node-click="handleNodeClick" lazy :load="loadNode">
        </el-tree>
        <div v-else style="text-align: center;">数据加载中。。</div>
      </div>

    </div>

    <!-- 搜索框 -->
    <div class="search">
      <el-autocomplete placeholder="按VIN码或车牌号搜索" class="input-with-select" :fetch-suggestions="querySearchAsync" @select="handleSelect" v-model="searchValue" :trigger-on-focus="false" :disabled="isDisabled">
        <div slot="suffix" class="options" @click="click">
          <img class="options-x" src="static/img/x.png" alt="" v-show="isShowIcon">
          <img class="options-xiala" src="static/img/xiala.png" alt="" v-show="!isShowIcon">
          <div class="options-tip">
            {{tipTitle}}
          </div>
        </div>
        <el-button class="search-button" slot="append" icon="el-icon-search" @click="search" type="primary">
          <div class="search-tip">
            搜索
          </div>
        </el-button>
      </el-autocomplete>
    </div>

    <!-- 车辆详情信息框 -->
    <el-dialog :visible.sync="dialogTableVisible">
      <car-msg :carDetailData="carBaseMsg"></car-msg>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapState } from "vuex";
  import { getUserId } from "@/utils/auth";
  import {
    queryCarDetailByVin,
    carInfoQueryCarRealByPlateOrVin,
    getUserList,
    getQueryPlateOrVinNoType,
    getUserAndCarNumList,
    getUserAndAllCarInfoByConditions,
    getCarTypeList
  } from "@/api/realTimeMonitoring";
  import { getCarDetail } from "@/api/carCenter";
  import CarMsg from "@/components/carCenter/carMsg.vue";
  export default {
    computed: {
      ...mapGetters([
        "arrAll", // 7
        "arrAbnormal", //2
        "arrFlameout", // 0
        "arrChargeFlameout", //3
        "arrChargeTravel", // 4
        "arrTravel", //1
        "arrFaultTravel", //5
        "arrFaultFlameout", //6
        "sidebar"
      ])
    },
    components: { CarMsg },
    data() {
      let self = this;
      return {
        form: {
          name: "",
          type: [],
          state: []
        },
        cName: "",
        carTypeList: [], //车型的内容
        item: [
        {
          label: "车辆状态",
          options: [
          {
            value: 0,
            label: "启动"
          },
          {
            value: 1,
            label: "熄火"
          },
          {
            value: 2,
            label: "离线"
          }]
        },
        {
          label: "故障状态",
          options: [
          {
            value: 3,
            label: "正常"
          },
          {
            value: 4,
            label: "故障"
          }]
        },
        {
          label: "充电状态",
          options: [
          {
            value: 5,
            label: "充电"
          },
          {
            value: 6,
            label: "未充电"
          }]
        }],
        defaultProps: {
          children: "children",
          label: "label",
          isLeaf: "leaf"
        },
        data: [], //树形控件的内容
        // totalData: [],
        freshRender: true, //树形控件的展示与隐藏
        tipTitle: "更多筛选", //tip展示的内容
        searchValue: "",
        isShowIcon: false, //图标的控制器
        isFilter: false, //筛选控制器
        isDisabled: false, //控制是否可以输入
        zoom: 5,
        zooms: [4, 18],
        window: {
          position: [0, 0],
          visible: false
        },
        NameOfInstitution: [], //用来存储机构名称联想的返回值
        map: "", //地图对象
        cluster: "", //地图聚合对象
        address: "", //转化的物理地址
        plate: "", //车牌
        soc: "", //电量
        type: "", //车型
        speed: "", //速度
        vehicleState: "", //车辆状态
        totalMileage: "", //总里程
        carSeatNum: "", //座位数
        updateTime: "", //更新时间
        // timer: "", //计时器
        dialogTableVisible: false,
        carBaseMsg: "", //dialog数据
        // arr: [],
        nIndex: "0", //用来存放序列
        events: {
          init(o) {
            // clearInterval(self.timer);
            self.map = self.$refs.map.$$getInstance();

            //初始化地图变化事件
            self.initMapChange();

            //获取当前可视区域数据
            let pointList = self.getLatitudeAndLongitude(self.map);
            let zoom = self.map.getZoom();
            //向父组件传递当前可视区域
            self.$emit("map-change", { pointList, zoom });
          }
        }
      };
    },
    created() {},
    watch: {
      arrAll: function() {
        this.initMapAggregation();
      },
      data: function() {
        //手动触发dom的更新
        this.freshRender = false;
        setTimeout(() => {
          this.freshRender = true;
        }, 500);
      },
      searchValue: function(newValue, oldValue) {
        if (!newValue) {
          this.isShowIcon = false;
        } else {
          this.isShowIcon = true;
        }
      },
      isShowIcon: function() {
        if (!this.isShowIcon) {
          this.tipTitle = "更多筛选";
        } else {
          this.tipTitle = "清空";
        }
      },
      NameOfInstitution: function() {
        if (this.NameOfInstitution.length == 1) {
          this.form.name = this.NameOfInstitution[0].userId;
        } else {
          this.form.name = "";
        }
      }
    },

    activated() {
      if (this.window.visible) {
        this.map.setCenter(this.loglat);
        this.window = {
          position: this.loglat,
          visible: true
        };
      }
    },
    mounted() {
      // this.$refs.filterBox.addEventListener('scroll', this.handleScroll)
      getCarTypeList().then(res => {
        res.results.map(item => {
          this.carTypeList.push({
            label: item.carTypeName,
            value: item.carTypeNum
          });
        });
      });
    },
    methods: {
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve(this.data);
        }
        if (node.level > 1) return resolve([]);
        let params = {
          userId: node.data.userId,
          carStatusList: this.form.state,
          carTypeNumList: this.form.type
        };
        getUserAndAllCarInfoByConditions(params).then(res => {
          let secondData = res.results,
            data = [];
          secondData.map(item => {
            data.push({
              leaf: true,
              label: item.plate || item.vin,
              vin: item.vin
            });
          });
          resolve(data);
        });
      },
      //获取一级菜单
      getTreeStair() {
        this.data = [];
        let data = {
          userId: this.form.name || getUserId(),
          carStatusList: this.form.state,
          carTypeNumList: this.form.type
        };
        return new Promise((resolve, reject) => {
          getUserAndCarNumList(data).then(res => {
            let carData = res.results.userAndCarNumVoList;
            carData.map(item => {
              this.data.push({
                label: `${item.userName}(${item.carNum})`,
                userId: item.userId
              });
            });
            // this.data = this.totalData.slice(0, 20)
            resolve(res);
          });
        });
      },
      //监听滚动回调
      // handleScroll() {
      //   let scrollTop = this.$refs.filterBox.scrollTop + 450, //滚动时的高度
      //     scrollHeight = this.$refs.filterBox.scrollHeight //整体的高度
      //   if (scrollTop >= scrollHeight) {
      //     let index = this.data.length + 20
      //     this.data = this.totalData.slice(0, index)
      //     if (this.data.length == this.totalData.length) {
      //       this.$refs.filterBox.removeEventListener('scroll', this.handleScroll)
      //     }
      //   }
      // },
      //初始化地图移动之后的逻辑，包括 缩放，平移等等操作
      initMapChange() {
        this.map.on("moveend", e => {
          if (this.isClickSearch) {
            this.getCarDataByPositions(1, true);
          } else {
            this.getCarDataByPositions(1);
          }
        });
        this.map.on("zoomend", () => {
          if (this.isClickSearch) {
            this.getCarDataByPositions(1, true);
          } else {
            this.getCarDataByPositions(1);
          }
        });
      },
      /**
       *  限制可视区域矩形的大小
       *
       *  @param points 矩形数据，格式参考 basePoints
       *  @return  Array  限制之后的矩形数据，格式参考 basePoints
       *
       */
      genLimitDataView(points) {
        // let basePoints = [136.912208,54.434384,72.752051,54.434384,72.752051,1.696239,136.912208,1.696239];
        let basePoints = [
          { longitude: 136.912208, latitude: 54.434384 },
          { longitude: 72.752051, latitude: 54.434384 },
          { longitude: 72.752051, latitude: 1.696239 },
          { longitude: 136.912208, latitude: 1.696239 }
        ];

        //top
        let topLngLat = points[0];
        //当前经度小于 基础数据中的经度
        if (topLngLat.longitude < basePoints[0].longitude) {
          topLngLat.longitude = basePoints[0].longitude;
        }
        //当前纬度大于 基础数据中的纬度
        if (topLngLat.latitude > basePoints[0].latitude) {
          topLngLat.latitude = basePoints[0].latitude;
        }

        //right
        let rightLngLat = points[1];
        //当前经度大于 基础数据中的经度
        if (rightLngLat.longitude > basePoints[1].longitude) {
          rightLngLat.longitude = basePoints[1].longitude;
        }
        //当前纬度大于 基础数据中的纬度
        if (rightLngLat.latitude > basePoints[1].latitude) {
          rightLngLat.latitude = basePoints[1].latitude;
        }

        //down
        let downLngLat = points[2];
        //当前经度大于 基础数据中的经度
        if (downLngLat.longitude > basePoints[2].longitude) {
          downLngLat.longitude = basePoints[2].longitude;
        }
        //当前纬度小于 基础数据中的纬度
        if (downLngLat.latitude < basePoints[2].latitude) {
          downLngLat.latitude = basePoints[2].latitude;
        }

        //left
        let leftLngLat = points[3];
        //当前经度小于 基础数据中的经度
        if (leftLngLat.longitude < basePoints[3].longitude) {
          leftLngLat.longitude = basePoints[3].longitude;
        }
        //当前纬度小于 基础数据中的纬度
        if (leftLngLat.latitude < basePoints[3].latitude) {
          leftLngLat.latitude = basePoints[3].latitude;
        }

        return [topLngLat, rightLngLat, downLngLat, leftLngLat];
      },
      /**
       * 获取一个区域内的车辆信息，这个区域由多个点组成
       *
       */
      getCarDataByPositions(num, isClickSearch) {
        let pointList = this.getLatitudeAndLongitude(this.map),
          zoom = this.map.getZoom(),
          isCheckoutHotMap = num,
          carStatusList = [],
          carTypeNumList = [],
          userId = "";
        if (isClickSearch) {
          carStatusList = this.form.state;
          carTypeNumList = this.form.type;
          userId = this.form.name;
        }
        //向父组件传递当前可视区域
        this.$emit("map-change", {
          pointList,
          zoom,
          isCheckoutHotMap,
          carStatusList,
          carTypeNumList,
          userId
        });
      },
      getLatitudeAndLongitude(map) {
        let northeast = map.getBounds().northeast,
          southwest = map.getBounds().southwest,
          nLat = northeast.lat,
          nLng = northeast.lng,
          sLat = southwest.lat,
          sLng = southwest.lng;
        //过滤经纬度
        let lnglat = this.genLimitDataView([
          { longitude: sLng, latitude: nLat },
          { longitude: nLng, latitude: nLat },
          { longitude: nLng, latitude: sLat },
          { longitude: sLng, latitude: sLat }
        ]);

        return lnglat;
      },
      initMapAggregation() {
        if (this.nIndex == "0" && !this.cluster) {
          let markers = this.getCarInfo(this.arrAll);
          this.cluster = new AMap.MarkerClusterer(this.map, markers, {
            gridSize: 60,
            maxZoom: 11,
            renderCluserMarker: this._renderCluserMarker
          });
        } else {
          // 需要手动的设置聚合的数组不然更改地图区域后聚合数量不会变化
          this.handleClick({ index: this.nIndex });
        }
      },
      _renderCluserMarker(context) {
        let div = `
          <div class="polymerization-box">
            <div class="circle-outer"></div>
            <div class="circle-middle"></div>
            <div class="circle-core">
              <div class="count">${context.count}辆</div>
            </div>
          </div>
        `;
        context.marker.setContent(div);
        context.marker.setOffset(new AMap.Pixel(-40, -40));
      },
      handleClick(tab, event) {
        let markers = [];
        this.nIndex = tab.index;
        if (this.cluster) {
          this.cluster.clearMarkers();
        }
        // if (tab.index != "0") {
        //   this.map.clearMap();
        // }
        // clearInterval(this.timer);
        // clearInterval(this.t);

        /*
                        需要优化：
                        30s 轮询有待优化 不知道什么原因state数据更新地图上显示的数据不会跟着变化

                        现在的做法是数据的轮询和显示的轮询是分开的：

                          数据每30s请求
                          一旦我点击了某个信息这个信息会有自己的30s轮询

                        */
        switch (tab.index) {
          case "0": // 全部
            markers = this.getCarInfo(this.arrAll);
            this.cluster.setMarkers(markers);

            break;

          case "1": //行驶
            markers = this.getCarInfo(this.arrTravel);
            this.cluster.setMarkers(markers);

            break;

          case "2": //熄火
            markers = this.getCarInfo(this.arrFlameout);
            this.cluster.setMarkers(markers);

            break;

          case "7": //充电熄火
            markers = this.getCarInfo(this.arrChargeFlameout);
            this.cluster.setMarkers(markers);

            break;

          case "6": //充电行驶
            markers = this.getCarInfo(this.arrChargeTravel);
            this.cluster.setMarkers(markers);

            break;

          case "5": //异常
            markers = this.getCarInfo(this.arrAbnormal);
            this.cluster.setMarkers(markers);

            break;

          case "4": //充电
            markers = this.getCarInfo(
              this.arrChargeTravel.concat(this.arrChargeFlameout)
            );
            this.cluster.setMarkers(markers);

            break;

          case "3": //故障
            markers = this.getCarInfo(
              this.arrFaultTravel.concat(this.arrFaultFlameout)
            );
            this.cluster.setMarkers(markers);

            break;

          case "9": //故障熄火
            markers = this.getCarInfo(this.arrFaultFlameout);
            this.cluster.setMarkers(markers);

            break;

          case "8": //故障行驶
            markers = this.getCarInfo(this.arrFaultTravel);
            this.cluster.setMarkers(markers);

            break;

          case "10": //搜索结果展示
            markers = this.getCarInfo(this.arrResult);
            this.cluster.setMarkers(markers);

            break;
        }
      },
      querySearchAsync(queryString, callback) {
        let result = [];
        getQueryPlateOrVinNoType(queryString.trim()).then(res => {
          let data = res.results;
          for (let i = 0, len = data.length; i < len; i++) {
            result.push({ value: data[i] });
          }
        });
        callback(result);
      },
      querySearchOrganization(queryString, callback) {
        this.NameOfInstitution = [];
        getUserList(getUserId(), queryString).then(res => {
          let data = res.results;
          data.map(item => {
            this.NameOfInstitution.push({
              value: item.userName,
              userId: item.userId
            });
          });
        });
        callback(this.NameOfInstitution);
      },
      queryHandleSelect(item) {
        this.form.name = item.userId;
      },
      handleSelect(item) {
        this.searchValue = item.value;
      },
      search() {
        this.window.visible = false;
        // clearInterval(this.t);
        // clearInterval(this.timer);

        if (!this.isFilter) {
          //单量车的搜索
          carInfoQueryCarRealByPlateOrVin(this.searchValue).then(res => {
            let data = res.results;
            this.arrResult = [];

            this.arrResult.push({
              longitude: data.carRealDataVo.longitude,
              latitude: data.carRealDataVo.latitude,
              vin: data.carBase.vin,
              plate: data.carBase.plate,
              type: data.carType.carTypeName,
              soc: data.carRealDataVo.soc,
              speed: data.carRealDataVo.speed,
              vehicleState: this.distinguishStatus(data),
              totalMileage: data.carRealDataVo.totalMileage,
              carSeatNum: data.carType.carSeatNum,
              updateTime: data.carBase.updateTime
            });

            this.handleClick({ index: "10" });
            this.map.setCenter([
              data.carRealDataVo.longitude,
              data.carRealDataVo.latitude
            ]);
          });
        } else {
          //批量车的搜索

          this.getTreeStair().then(res => {
            this.searchValue = `筛选（车辆：${res.results.total}）`;
          });
          this.isClickSearch = true;
          this.getCarDataByPositions(2, true);
        }
      },
      distinguishStatus(data) {
        if (data.carStatus.travelStatus == 2) {
          return 2;
          //是否为故障
        } else if (data.carStatus.isBadStatus == 1) {
          if (data.carStatus.travelStatus == 1) {
            return 6;
          } else if (data.carStatus.travelStatus == 0) {
            return 5;
          }
          //是否为充电
        } else if (data.carStatus.chargingStatus == 1) {
          if (data.carStatus.travelStatus == 1) {
            return 3;
          } else if (data.carStatus.travelStatus == 0) {
            return 4;
          }
        } else if (
          data.carStatus.chargingStatus == 0 &&
          data.carStatus.isBadStatus == 0
        ) {
          if (data.carStatus.travelStatus == 1) {
            return 0;
          } else if (data.carStatus.travelStatus == 0) {
            return 1;
          }
        }
      },
      vehicleDetails() {
        // this.$router.push({ name: "车辆档案" });
        let vin = { vin: this.vin };
        getCarDetail(vin).then(response => {
          this.dialogTableVisible = true;
          this.carBaseMsg = response.results;
        });
      },
      vehicleCondition() {
        this.$router.push({
          name: "单车监控"
        });
        this.$store.dispatch("getCarVin", this.vin);
      },
      TrajectoryTracking() {
        this.$router.push({
          name: "轨迹查询",
          params: { plate: this.plate ? this.plate : this.vin, lng: this.loglat }
        });
      },
      AlarmProcessing() {
        this.$router.push({ name: "实时报警", query: { vinId: this.vin } });
      },
      minus() {
        let mapObj = this.map;
        let zoom = mapObj.getZoom();
        let zoomIndexMinus = zoom - 1;
        if (zoomIndexMinus >= 3 && zoomIndexMinus <= 18) {
          mapObj.setZoom(zoomIndexMinus);
        }
      },
      add() {
        let mapObj = this.map;
        let zoom = mapObj.getZoom();
        let zoomIndexPlus = zoom + 1;
        if (zoomIndexPlus >= 3 && zoomIndexPlus <= 18) {
          mapObj.setZoom(zoomIndexPlus);
        }
      },
      click() {
        this.searchValue = "";
        this.isClickSearch = false;
        if (!this.isShowIcon) {
          this.getTreeStair().then(res => {
            this.isFilter = true;
            this.isShowIcon = true;
            this.isDisabled = true;
            this.searchValue = `筛选（车辆：${res.results.total}）`;
          });
        } else if (this.isDisabled) {
          this.isFilter = false;
          this.isShowIcon = false;
          this.isDisabled = false;

          //清空筛选条件
          this.form.state = [];
          this.form.type = [];
          this.form.name = "";
          this.getCarDataByPositions(2);
        } else {
          //关闭已经打开的信息框
          this.map.clearMap();
          //显示全部的车辆
          this.nIndex = "0";
          this.getCarDataByPositions(2);
        }
      },
      handleNodeClick(data) {
        this.vin = data.vin
        if (!data.userId) {
          this.getInfoWindowMessage(data.vin);
        }
      },
      getCarInfo(arr) {
        let markers = [],
          marker,
          content;
        for (var i = 0, len = arr.length; i < len; i += 1) {
          // 存下i 的值
          let property = i;
          switch (arr[i]["vehicleState"]) {
            case 0:
              self.vehicleState = "熄火";
              content = `
              <div class="marker-box">
                <div class="marker-title">${arr[i]["plate"]}</div>
                <img class="marker-img" src="static/img/mapxihuo.png" alt="">
              </div>
                      `;
              break;
            case 1:
              self.vehicleState = "启动";
              content = `
                <div class="marker-box">
                  <div class="marker-title" style="background:#47A4FF;">${
                    arr[i]["plate"]
                  }</div>
                  <img class="marker-img" src="static/img/mapyundong.png" alt="">
                </div>
                      `;
              break;
            case 2:
              self.vehicleState = "离线";
              content = `
                <div class="marker-box">
                  <div class="marker-title" style="background:#FF4646;">${
                    arr[i]["plate"]
                  }</div>
                  <img class="marker-img" src="static/img/mapyichang.png" alt="">
                </div>
                      `;
              break;
            case 3:
              self.vehicleState = "熄火充电";
              content = `
                <div class="marker-box">
                  <div class="marker-title" style="background:#FFAB0F;">${
                    arr[i]["plate"]
                  }</div>
                  <img class="marker-img" src="static/img/mapChargeFlameout.png" alt=""> 
                </div>
                      `;
              break;
            case 4:
              self.vehicleState = "启动充电";
              content = `
              <div class="marker-box">
                <div class="marker-title" style="background:#47A4FF">${
                  arr[i]["plate"]
                }</div>
                <img class="marker-img" src="static/img/mapChargeTravel.png" alt="">
              </div>
                      `;
              break;
            case 5:
              self.vehicleState = "启动故障";
              content = `
                <div class="marker-box" >
                  <div class="marker-title" style="background:#47A4FF;">${
                    arr[i]["plate"]
                  }</div>
                  <img class="marker-img" src="static/img/mapFaultTravel.png" alt="">
                </div>
                      `;
              break;
            case 6:
              self.vehicleState = "熄火故障";
              content = `
                <div class="marker-box" >
                  <div class="marker-title" style="background:#FFAB0F">${
                    arr[i]["plate"]
                  }</div>
                  <img class="marker-img" src="static/img/mapFaultFlameout.png" alt="">
                </div>
                      `;
              break;
          }
          marker = new AMap.Marker({
            position: [arr[i].longitude, arr[i].latitude],
            content: content,
            extData: {
              vin: arr[i].vin
            },
            offset: new AMap.Pixel(-19, -19),
            clickable: true,
            topWhenClick: true,
            bubble: true
          });
          marker.on("click", event => {
            this.vin = event.target.getExtData().vin;

            //远程获取数据
            this.getInfoWindowMessage(this.vin);
          });
          markers.push(marker);
        }
        return markers;
      },
      getInfoWindowMessage(vin) {
        queryCarDetailByVin({ vin: vin }).then(res => {
          let data = res.results;
          let info = {
            lnglat: [data.carRealDataVo.longitude, data.carRealDataVo.latitude],
            vin: data.vin,
            plate: data.carBase.plate,
            type: data.carType.carTypeName,
            soc: data.carRealDataVo.soc,
            speed: data.carRealDataVo.speed,
            vehicleState: this.distinguishStatus(data),
            totalMileage: data.carRealDataVo.totalMileage,
            carSeatNum: data.carType.carSeatNum,
            updateTime: data.carBase.updateTime
          };
          //显示信息窗体
          this.showInfoWindow(info);
        });
      },
      /**
       *     显示信息窗体
       * @param info
       * @param property
       */
      showInfoWindow(info) {
        this.loglat = info["lnglat"]; //经纬度
        this.plate = info["plate"]; //车牌
        this.soc =
          info["soc"] > 100 || info["soc"] < 0 ? "--" : info["soc"] + "%"; //电量
        this.type = info["type"]; //车型
        this.speed =
          info["speed"] == 65535 || info["speed"] == 65534 ? "--" : info["speed"]; //速度
        this.totalMileage =
          info["totalMileage"] < 0 ? "--" : info["totalMileage"] + "KM"; //总里程
        this.carSeatNum = info["carSeatNum"]; // 座位数
        this.updateTime = info["updateTime"]; //更新时间

        //转换为物理地址
        let self = this;
        this.geocoder.getAddress([self.loglat[0], self.loglat[1]], function(
          status,
          result
        ) {
          if (status === "complete" && result.info === "OK") {
            self.address = result.regeocode.formattedAddress;
          }
        });
        //控制显示infowindow的显示隐藏
        this.window.visible = false;
        this.$nextTick(() => {
          //[event.lnglat.lng, event.lnglat.lat]
          this.window.position = this.loglat;
          this.window.visible = true;
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .amap-demo {
    position: absolute;
    transition: 0.3s ease;
    width: calc(100% - 200px);
    height: calc(100% - 104px);
    &.hideSidebar {
      transition: 0.3s ease;
      width: calc(100% - 40px);
    }
    .infoWindowStyle {
      width: 430px;
      font-size: 14px;
      color: #000;
      margin: -10px -18px -10px -10px;
      &-title {
        border-bottom: 1px solid #e9e9e9;
        padding: 12px 24px;
      }
      &-body {
        width: 380px;
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

  .search {
    .input-with-select {
      position: absolute;
      right: 20px;
      top: 120px;
      width: 300px;
      .search-button {
        &:hover .search-tip {
          opacity: 1;
        }
        .search-tip {
          opacity: 0;
          position: absolute;
          width: 90px;
          height: 20px;
          top: 36px;
          left: -34px;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          line-height: 20px;
          transition: all 0.8s;
        }
      }
      .options {
        border-left: 1px solid #ccc;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 26px;
        width: 30px;
        img {
          // vertical-align: -webkit-baseline-middle;
          // vertical-align: -moz-middle-with-baseline;
          padding-top: 6px;
        }
        .options-tip {
          opacity: 0;
          position: absolute;
          width: 90px;
          top: 31px;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          transition: all 0.8s;
        }
        &:hover .options-tip {
          opacity: 1;
        }
      }
    }
  }

  .filter-box {
    width: 244px;
    padding: 10px;
    background: #fff;
    position: absolute;
    top: 160px;
    right: 76px;
    overflow: auto;
    max-height: 450px;
    z-index: 999;
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .polymerization-box {
    position: relative;
    width: 80px;
    height: 80px;
  }

  .circle-outer,
  .circle-middle,
  .circle-core {
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .circle-outer,
  .circle-middle {
    animation: mymove 2s infinite alternate;
  }

  .circle-outer {
    width: 80px;
    height: 80px;
    background: #47a4ff;
    opacity: 0.2;
  }

  .circle-middle {
    width: 60px;
    height: 60px;
    background: #47a4ff;
    opacity: 0.3;
  }

  .circle-core {
    width: 44px;
    height: 44px;
    background: url("../../../static/img/juhe.png") no-repeat;
  }

  .count {
    position: absolute;
    top: -20px;
    right: 0;
    left: 0;
    border-radius: 8px;
    color: #fff;
    background: #47a4ff;
    text-align: center;
    line-height: 18px;
  }

  @keyframes mymove {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }

  .marker-box {}

  .marker-title {
    position: absolute;
    top: -20px;
    left: -16px;
    background: #ffab0f;
    border-radius: 18px;
    font-size: 12px;
    color: #ffffff;
    min-width: 70px;
    line-height: 20px;
    text-align: center;
  }

  .marker-img {
    position: relative;
    display: block;
    width: 38px;
  }

  .amap-marker-content {
    //优化鼠标marker点击区域
    white-space: normal !important;
  }

  .el-select .el-tag {
    //下拉菜单超出部分显示。。。
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>