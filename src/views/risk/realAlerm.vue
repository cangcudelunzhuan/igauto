<template>
  <div class="alarm-page">
    <el-form ref="multipleSelection" :model="alarmForm" label-width="80px">
      <el-row :gutter="20">
        <el-col :lg="5" :lx="4">
          <el-form-item class="file-item" label="VIN码:">
            <el-input v-model="alarmForm.vin"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :lg="5" :lx="4">-->
        <!--<el-form-item  label="报警类别:">-->
        <!--<el-select v-model="alarmForm.alarmType" clearable placeholder="请选择">-->
        <!--<el-option-->
        <!--v-for="item in carStatusOptions"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :lg="5" :lx="4">
          <el-form-item label="风险等级:">
            <el-select v-model="alarmForm.alarmLevel" clearable placeholder="请选择">
              <el-option v-for="item in riskOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="10" :lx="8">
          <el-form-item label="上报时间:">
            <el-date-picker v-model="carDatetime" style="width:100%" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>


      </el-row>
      <el-row :gutter="20">
        <el-col :lg="5" :lx="4">
          <el-form-item class="file-item" label="车牌号:">
            <el-input v-model="alarmForm.plate"></el-input>
          </el-form-item>
        </el-col>

        <el-col :lg="8" :lx="8">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" @click="onHandleAll">批量处理</el-button>
          <el-button @click="onExportSubmit">导出</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="total-data">
      <span>报警总数： {{totalData.nums}}</span>
      <span class="alarm-level">三级红色报警：
        <span class="red-alarm">{{totalData.firstLevel}}</span>
      </span>
      <span class="alarm-level">二级橙色报警：
        <span class="orange-alarm">{{totalData.secondLevel}}</span>
      </span>
      <span class="alarm-level">一级绿色报警：
        <span class="yellow-alarm">{{totalData.thirdLevel}}</span>
      </span>
    </div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="地图" name="1" v-show="mapShow" class="collapse-item-box">
          <!--<el-collapse-item title="地图" name="1"class="collapse-item-box">-->
          <div class="amap-page-container map-collapse-item">
            <map-charge :serviceData="webServiceData" :position="alarmResultDetail.position" :addressAlarm='carAddressInfo' :alarmResultDetail="alarmResultDetail" @handleSingleData=" handleSingleAlarmData"></map-charge>
          </div>
        </el-collapse-item>
        <el-collapse-item title="数据列表" name="2" class="collapse-item-box">
          <div class="car-file-table">
            <el-table ref="multipleTable" :data="alarmTableData" tooltip-effect="dark" style="width: 100%" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column align="center" label='序号' width="50">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                  <!--<div>-->
                  <el-button type="text" size="small" @click="handleAlarmData(scope.$index, scope.row)">处理</el-button>
                  <el-button type="text" size="small" @click="handleMsgResend(scope.$index, scope.row)">短信重发</el-button>
                  <!--</div>-->

                  <!--<div>-->
                  <el-button type="text" size="small" @click="handlePosition(scope.$index, scope.row)">定位</el-button>
                  <el-button type="text" size="small" @click="handleMsgReturn(scope.$index, scope.row)">短信转发</el-button>
                  <!--</div>-->
                </template>

              </el-table-column>
              <el-table-column align="center" label='车架号' width="160">
                <template slot-scope="scope">
                  {{scope.row.vin}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='车牌号' width="160">
                <template slot-scope="scope">
                  {{scope.row.plate}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='风险等级' width="85">
                <template slot-scope="scope">
                  <span :class="scope.row.alarmLevel==1?'yellow-alarm':scope.row.alarmLevel==2?'orange-alarm':'red-alarm'">{{scope.row.alarmLevel==1?'一级报警':scope.row.alarmLevel==2?'二级报警':'三级报警'}}</span>
                </template>
              </el-table-column>
              <!--<el-table-column align="center" label='报警类别' width="85">-->
              <!--<template slot-scope="scope">-->
              <!--{{scope.row.alarmType==1?'国标报警':'企业报警'}}-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column align="center" label='风险内容'>
                <template slot-scope="scope">
                  {{scope.row.alarmName}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='触发时间' width="160">
                <template slot-scope="scope">
                  {{scope.row.startTime}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='处理状态' width="100">
                <template slot-scope="scope">
                  {{scope.row.processedStatus==0?'未处理':scope.row.processedStatus==1?'处理中':''}}
                </template>
              </el-table-column>
              <!--<el-table-column align="center" label='车牌号' width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--{{scope.row.plate}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column align="center" label='归属' width="95">
                <template slot-scope="scope">
                  {{scope.row.belonger}}
                </template>
              </el-table-column>
              <el-table-column align="center" label='电话' width="120">
                <template slot-scope="scope">
                  {{scope.row.phone}}
                </template>
              </el-table-column>


            </el-table>
            <div class="pagination-item">
              <el-pagination @current-change="handleCurrentChange" :current-page.sync="alarmForm.pageIndex" :page-size="alarmForm.pageSize" class="right-pagination" layout="total, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog title="车辆处理" :visible.sync="handleFormVisible" :before-close="cancelHandleForm">
      <!--<add-cars @child-info="submitForm" @child-cancel = 'cancelForm'></add-cars>-->
      <div>
        <div class="component-choose">
          <el-form :inline="false" ref="handleCarForm" :model="handleCarForm" :rules="rules" label-width="100px">
            <el-form-item label="报警类型:" prop="alarmBigType">
              <el-select v-model="handleCarForm.alarmBigType" clearable placeholder="请选择">
                <el-option v-for="item in alermOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务站:" prop="stationName">
              <el-select v-model="handleCarForm.stationName" filterable remote style="width: 100%" reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" @change='selectStationId' :loading="loading">
                <el-option v-for="item in options4" :key="item.stationId" :label="item.label" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理详情:" prop="processedResults">
              <el-input type="textarea" v-model="handleCarForm.processedResults"></el-input>
            </el-form-item>
            <el-form-item label="责任人:" prop="processedPerson">
              <el-input v-model="handleCarForm.processedPerson"></el-input>
            </el-form-item>
            <el-form-item label="处理时间:" prop="processedTime">
              <el-date-picker v-model="handleCarForm.processedTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelHandleForm">取 消</el-button>
          <el-button type="primary" @click="submitHandleForm('handleCarForm')">确 定</el-button>
        </div>
        <!--<button @click="send">send</button>-->
        <!-- <p>{{msgChild}}</p> -->
      </div>
    </el-dialog>
    <el-dialog title="手机号确认" :visible.sync="handlePhoneVisible">
      <div>
        <div class="component-choose">
          <el-form class="" label-width="80px">
            <el-form-item label="手机号:">
              <el-input v-model="confirmPhone"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelPhoneForm()">取 消</el-button>
          <el-button type="primary" @click="submitPhoneForm()">确 定</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  var table = [];
  import MapCharge from '@/components/maps/mapCharge.vue';
  import { getUserId } from '@/utils/auth';
  import { getRealAlarmData, getRangeService, getAlarmMsgData, getRealAlarmDetailData, getAlarmTotalData, getHandleAlarmData } from '@/api/alarm';
  import axios from 'axios'
  import { getQueryCarRealByVins, queryTidyCarRealByVin, queryCarDetailByVin } from "@/api/realTimeMonitoring";
  import { mapGetters } from 'vuex'
  const preData = new Date();
  var start = new Date(preData.getTime());

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
    name: "real-alarm",
    components: { MapCharge },

    data() {
      return {
        alarmForm: {
          vin: '',
          alarmType: '',
          alarmLevel: 3,
          userId: getUserId(),
          startTime: '',
          endTime: '',
          plate: '',
          riskType: '',
          alarmStatus: '',
          pageSize: 10,
          pageIndex: 1,
        },
        rules: {
          processedResults: [
            { required: true, message: '填写处理详情', trigger: 'change' }
          ],
          stationName: [
            { required: true, message: '填写服务站地址', trigger: 'change' }
          ],
          alarmBigType: [
            { required: true, message: '请填写报警类型', trigger: 'change' }
          ],
          processedPerson: [
            { required: true, message: '请填写责任人', trigger: 'change' }
          ],
          processedTime: [
            { required: true, message: '请选择处理时间', trigger: 'change' }
          ]

        },
        handleCarForm: {
          processedTime: getTaskTime("yyyy-MM-dd hh:mm:ss", start),
          alarmBigType: 1,
          stationId: '',
          stationName: '',
          processedPerson: '',
          processedResults: ''
        },
        loading: false,
        options4: [],
        list: [],
        states: [],
        alermOptions: [{
          label: '安全预警',
          value: 1
        }, {
          label: '误报',
          value: 2
        }, {
          label: '事故',
          value: 3
        }],
        totalData: {
          nums: '',
          firstLevel: '',
          secondLevel: '',
          thirdLevel: ''
        },
        carDatetime: '',
        mapShow: false,
        //                processedStatus:1,
        activeNames: ['2'],
        confirmPhone: '',
        timer: '',
        alarmTableData: table,
        total: 0,
        alarmCodes: [],
        positionData: {},
        listLoading: false,
        handlePhoneVisible: false,
        handleFormVisible: false,
        carAddressInfo: '',
        returnMsgPhone: [],
        multipleSelection: [],
        alarmResultDetail: {

        },
        webServiceData: [],
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
        carUsageOptions: [{
          value: 0,
          label: '乘用车'
        }, {
          value: 1,
          label: '商用车'
        }],
        riskOption: [{
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '一级绿色报警'
        }, {
          value: 2,
          label: '二级橙色报警'
        }, {
          value: 3,
          label: '三级红色报警'
        }],
        selectRiskOption: [{
          value: 1,
          label: '一级绿色报警'
        }, {
          value: 2,
          label: '二级橙色报警'
        }],
      }
    },
    computed: {
      ...mapGetters([
        'alarmVin',
      ])
    },
    mounted() {

      if (this.$route.query.vinId) {
        this.alarmForm.vin = this.$route.query.vinId
      }
      if (this.alarmVin) {
        this.getMapDetail(this.alarmVin);
      }
      this.getTableData();
      this.getStatistisData();

    },
    deactivated() {
      this.mapShow = false;
    },
    destroyed() {
      this.mapShow = false;
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          getRangeService(query).then(response => {
            if (response.results.datas) {
              this.list = response.results.datas.map(item => {
                return { value: item.companyName, label: item.companyName, stationId: item.id };
              });
            }
            setTimeout(() => {
              this.loading = false;
              this.options4 = this.list.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);

          });

        } else {
          this.options4 = [];
        }
      },
      selectStationId(obj) {
        this.handleCarForm.stationName = obj.value;
        this.handleCarForm.stationId = obj.stationId;
      },

      handleCurrentChange(val) {
        this.alarmForm.pageIndex = val;
        this.getTableData();
      },
      cancelPhoneForm() {
        this.handlePhoneVisible = false;
      },
      submitPhoneForm() {
        this.handlePhoneVisible = false;
        this.returnMsgPhone.tel = this.confirmPhone;
        getAlarmMsgData(this.returnMsgPhone, 2).then(response => {
          this.$message.success('发送成功');
        });
      },
      cancelHandleForm(formName) {
        this.handleFormVisible = false;
        this.$refs['handleCarForm'].resetFields();
      },
      clearHandleForm() {
        this.handleCarForm = {}
      },
      submitHandleForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (valid) {
            this.handleFormVisible = false;

            var data = {
              alarmCodes: this.alarmCodes,
              processedPerson: this.handleCarForm.processedPerson,
              //                        processedStatus:this.processedStatus,
              processedTime: this.handleCarForm.processedTime,
              processedResults: this.handleCarForm.processedResults,
              stationId: this.handleCarForm.stationId,
              stationName: this.handleCarForm.stationName,
              alarmBigType: this.handleCarForm.alarmBigType
            };
            getHandleAlarmData(data).then(response => {
              this.$message.success('处理成功');
              this.getTableData();
            });
          }
        });

      },

      onReset() {
        this.alarmForm = {
          vin: '',
          alarmType: '',
          alarmLevel: 3,
          userId: getUserId(),
          startTime: '',
          endTime: '',
          riskType: '',
          plate: '',
          alarmStatus: '',
          pageSize: 10,
          pageIndex: 1,
        };
        this.mapShow = false;
        this.getTableData();

      },
      onSubmit() {
        this.getTableData();
      },
      //地图中的单个处理
      handleSingleAlarmData(alarmCode) {
        this.handleFormVisible = true;
        this.handleCarForm.alarmLevel = this.positionData.alarmLevel == 1 ? '一级报警' : this.positionData.alarmLevel == 2 ? '二级报警' : '三级报警';
        this.handleCarForm.alarmName = this.positionData.alarmName;
        this.alarmCodes = [this.positionData.alarmCode];
      },
      //单个处理
      handleAlarmData(index, row) {
        this.handleCarForm.alarmLevel = row.alarmLevel == 1 ? '一级报警' : row.alarmLevel == 2 ? '二级报警' : '三级报警';
        this.handleCarForm.alarmName = row.alarmName;
        this.handleFormVisible = true;
        this.alarmCodes = [row.alarmCode];
      },
      //批量处理
      onHandleAll() {
        var data = this.multipleSelection;
        var code = [];
        var alarmLevel = [];
        var alarmNames = [];
        let level = new Set([1, 2, 3])
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            code.push(data[i].alarmCode)
            alarmLevel.push(data[i].alarmLevel)
            alarmNames.push(data[i].alarmName)
          }
        }
        var alarmLevels = new Set(alarmLevel);
        let newLevel = [...level].filter(item => alarmLevels.has(item));
        var level3 = newLevel.filter(function(lev) {
          return lev == 3
        });
        this.handleCarForm.alarmLevel = newLevel[0] == 1 ? '一级报警' : '二级报警';
        this.handleCarForm.alarmName = alarmNames.join(',');

        if (data.length > 0) {
          this.alarmCodes = code;
          this.handleFormVisible = true;
        }
        //                if(level3.length>0){
        //                    this.$message.error('三级红色警告不能批量处理');
        //                }else if(newLevel.length==1){
        //                    this.alarmCodes =code;
        //                    this.handleFormVisible=true;
        //                } else if(newLevel.length>1) {
        //                    this.$message.error('只能处理同一等级的警告');
        //                }

      },
      //数据导出
      onExportSubmit() {
        if (this.carDatetime == '') {
          this.alarmForm.startTime = '';
          this.alarmForm.endTime = '';
        } else {
          this.alarmForm.startTime = this.carDatetime[0];
          this.alarmForm.endTime = this.carDatetime[1];
        }
        window.location = process.env.BASE_API + '/excelTemplate/exportExcel?excelTemplateId=4&userId=' + this.alarmForm.userId+
          '&vin='+this.alarmForm.vin+'&startTime='+this.alarmForm.startTime+'&endTime='+this.alarmForm.endTime+
          '&pageIndex='+this.alarmForm.pageIndex+'&pageSize='+this.alarmForm.pageSize+'&alarmLevel='+this.alarmForm.alarmLevel;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //表格数据
      //表格数据
      getTableData() {
        this.listLoading = true;
        if (this.carDatetime == '') {
          this.alarmForm.startTime = '';
          this.alarmForm.endTime = '';
        } else {
          this.alarmForm.startTime = this.carDatetime[0];
          this.alarmForm.endTime = this.carDatetime[1];
        }
        getRealAlarmData(this.alarmForm).then(response => {
          this.listLoading = false;
          if (response.results) {
            this.alarmTableData = response.results.datas.filter(function(x) {
              return x.alarmLevel <= 3;
            });
            this.total = response.results.totalRecords;
          } else {
            this.alarmTableData = {};
            this.total = 0;
          }

        }).catch(error => {
          this.listLoading = false;
        });
      },
      getStatistisData() {
        var data = {
          alarmStatus: 1,
          userId: getUserId()
        };
        getAlarmTotalData(data).then(response => {
          this.listLoading = false;
          if (response.results) {
            this.totalData.firstLevel = response.results[0] ? response.results[0].nums : 0;
            this.totalData.secondLevel = response.results[1] ? response.results[1].nums : 0;
            this.totalData.thirdLevel = response.results[2] ? response.results[2].nums : 0;
            this.totalData.nums = this.totalData.firstLevel + this.totalData.secondLevel + this.totalData.thirdLevel;
          }

        }).catch(error => console.log(error));
      },
      //信息重发
      handleMsgResend(index, row) {
        row.tel = row.phone;
        getAlarmMsgData(row, 1).then(response => {
          this.$message.success('发送成功');
        });
      },

      //定位
      handlePosition(index, row) {
        this.$store.dispatch('getAlarmVin', row);
        this.positionData = row;
        this.getMapDetail(row);

      },
      getMapDetail(row) {
        this.mapShow = true;
        this.activeNames = ['1', '2'];
        this.getPositionData(row);
      },
      regeocoder(arr) {
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        var that = this;
        geocoder.getAddress(arr, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            that.carAddressInfo = result.regeocode.formattedAddress;
          }
        });
      },


      getPositionData(row) {
        let queryParams = new URLSearchParams();
        var map = new AMap.Map("container", {
          resizeEnable: true,
          center: [105, 34],
          zoom: 4
        });

        queryParams.append('alarmCode', row.alarmCode);
        // queryTidyCarRealByVin(row.vin)
        queryCarDetailByVin({
            "vin": row.vin
          })
          // queryTidyCarRealByPoints({ "userId": getUserId(), "vins":row.vin, "pointList": pointList })
          .then(res => {
            if (res.results) {
              var data = {};
              var result = res.results;

              data.updateTime = result.carRealDataVo.samplingTime;
              data.type = result.carType.carTypeName;
              data.plate = result.carBase.plate;
              data.carSeatNum = result.carType.carSeatNum;
              data.totalMileage = result.carRealDataVo.totalMileage;
              data.soc = result.carRealDataVo.soc;
              data.speed = result.carRealDataVo.speed;
              if (result.carStatus.isBadStatus == 1) {
                data.vehicleState = '故障'
              } else {
                data.vehicleState = result.carStatus.travelStatus == 0 ? '熄火' :
                  result.carStatus.travelStatus == 1 ? '充电' :
                  result.carStatus.travelStatus == 2 ? '行驶' : '异常';
              }
              var latitude = result.carRealDataVo.latitude;
              var longitude = result.carRealDataVo.longitude;
              data.latitude = latitude;
              data.longitude = longitude;
              data.vin = result.carBase.vin;
              this.regeocoder([longitude, latitude]);
              data.position = [longitude, latitude];
              this.alarmResultDetail = data;
            } else {
              this.showCityInfo();
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //根据ip获取当前位置
      showCityInfo() {
        var that = this;
        //加载城市查询插件
        AMap.service(["AMap.CitySearch"], function() {
          //实例化城市查询类
          var citysearch = new AMap.CitySearch();
          //自动获取用户IP，返回当前城市
          citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.city && result.bounds) {
                that.alarmResultDetail = { longitude: result.bounds.Cb.lng, latitude: result.bounds.Cb.lat }
              }
            }
          });
        });
      },
      //信息转发
      handleMsgReturn(index, row) {
        this.handlePhoneVisible = true;
        this.returnMsgPhone = row;
      },

    },
  }
</script>


<style scoped>
  .alarm-level {
    padding-left: 20px;
  }

  .alarm-page {
    padding: 15px;
  }

  .right-pagination {
    float: right;
  }

  .orange-alarm {
    color: orange;
  }

  .red-alarm {
    color: red;
  }

  .yellow-alarm {
    color: green;
  }

  pagination-item:after {
    content: '';
    clear: both;
    display: block;
  }

  .dialog-footer {
    text-align: center;
  }

  .amap-box {
    height: 300px;
    width: 100%;
  }

  .map-collapse-item {
    height: 550px;
  }

  .total-data {
    font-size: 14px;
    margin-bottom: 10px;
  }
</style>