<template>
  <div class="history-alerm">

    <!-- 搜索条 -->
    <div class="history-alerm-search">
      <el-form ref="searchForm" :inline="true" :model="formInline" :rules="searchRules" label-position="left">
        <el-form-item label="VIN码:" prop="vin">
          <el-input v-model="formInline.vin" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="风险等级:" prop="rank">
          <el-select v-model="formInline.rank" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="三级红色报警" value="3"></el-option>
            <el-option label="二级橙色报警" value="2"></el-option>
            <el-option label="一级绿色报警" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上报时间:" prop="date">
          <el-date-picker v-model="formInline.date" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="车牌号:" prop="plate">
          <el-input v-model="formInline.plate" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item class="search-grounp">
          <el-button type="primary" @click="onSubmit('searchForm')">查询</el-button>
          <el-button @click="resetForm('searchForm')">重置</el-button>
          <el-button @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 统计数目 -->
    <div class="history-alerm-statistics">
      报警总数：
      <span style="margin-right: 20px;">{{sum}}</span>
      三级红色报警：
      <span style="color:red;margin-right: 20px;">{{three_level}}</span>
      二级橙色报警：
      <span style="color:orange;margin-right: 20px;">{{second_level}}</span>
      一级绿色报警：
      <span style="color:green;">{{stair}}</span>
      <!-- <el-button type="primary" class="statistics-export">数据导出</el-button> -->
    </div>

    <!-- 表格 -->
    <div class="history-alerm-table">
      <el-table :data="list" element-loading-text="拼命加载中" border fit v-loading.body="listLoading">
        <el-table-column align="center" label='序号' width="60">
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="60">
          <template slot-scope="scope">
            <a href="javascript:;" @click="showDialog(scope.row.alarmCode)" style="color:#66b1ff;">详情</a>
          </template>
        </el-table-column>
        <el-table-column label="VIN码" width="160">
          <template slot-scope="scope">
            <span>{{scope.row.vin}}</span>
          </template>
        </el-table-column>
        <el-table-column label="车牌号">
          <template slot-scope="scope">
            <span>{{scope.row.plate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="风险等级">
          <template slot-scope="scope">
            <span :class="scope.row.alarmLevel==1?'green-alarm':scope.row.alarmLevel==2?'orange-alarm':'red-alarm'">{{scope.row.alarmLevel==1?'一级报警':scope.row.alarmLevel==2?'二级报警':'三级报警'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="报警类别">
					<template slot-scope="scope">
						{{scope.row.alarmType}}
					</template>
				</el-table-column> -->
        <el-table-column label="风险内容">
          <template slot-scope="scope">
            <span>{{scope.row.alarmName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="触发时间">
          <template slot-scope="scope">
            <span>{{scope.row.startTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="消除时间">
          <template slot-scope="scope">
            <span>{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="触发时长(分钟)">
          <template slot-scope="scope">
            <span>{{scope.row.lastTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="触发地点">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <div class="history-alerm-page">
      <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>

    <!-- dialog弹出框 -->
    <div class="history-details">
      <el-dialog :visible.sync="dialogVisible" width="720px">
        <div slot="title" class="dialog-title">
          报警详情
        </div>
        <div class="dialog-container">

          <!-- 报警信息 -->
          <el-row>
            <el-col :span="24">
              <div class="dialog-container-title">报警信息</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>VIN码：{{AlarmHisDetail.vin}}</div>
            </el-col>
            <el-col :span="12">
              <div>车牌号：{{dataPlate}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>触发时间：{{AlarmHisDetail.startTime}}</div>
            </el-col>
            <el-col :span="12">
              <div>消除时间：{{AlarmHisDetail.endTime}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>风险等级：
                <span :class="AlarmHisDetail.alarmLevel==1?'green-alarm':AlarmHisDetail.alarmLevel==2?'orange-alarm':'red-alarm'">{{AlarmHisDetail.alarmLevel==1?'一级报警':AlarmHisDetail.alarmLevel==2?'二级报警':'三级报警'}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div>风险内容：{{AlarmHisDetail.alarmName}}</div>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="12">
							<div>报警类别：{{AlarmHisDetail.alarmType}}</div>
						</el-col> -->
            <el-col :span="24">
              <div>报警地点：{{AlarmHisDetail.address}}</div>
            </el-col>
          </el-row>

          <!-- 报警处理 -->
          <br/>
          <el-row>
            <el-col :span="24">
              <div class="dialog-container-title">报警处理</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>处理方式：{{AlarmResultDetail.alarmStyle}}</div>
            </el-col>
            <el-col :span="12">
              <div>处理详情：{{AlarmResultDetail.remark || "无"}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>责任人：{{AlarmResultDetail.processedPerson}}</div>
            </el-col>
            <el-col :span="12">
              <div>处理时间：{{AlarmResultDetail.processedTime}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>报警类型：{{AlarmHisDetail.alarmBigType}}</div>
            </el-col>
            <el-col :span="12">
              <div>服务站：{{AlarmHisDetail.stationName}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>是否短信通知：{{AlarmResultDetail.isNotice}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>通知人：{{AlarmResultDetail.affiliationUser}}</div>
            </el-col>
            <el-col :span="12">
              <div>联系方式：{{AlarmResultDetail.affiliationPhone}}</div>
            </el-col>
          </el-row>

          <!-- 备注 -->
          <!-- <br/>
          <el-row>
            <el-col :span="24">
              <div class="dialog-container-title">备注</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>{{AlarmResultDetail.remark || "无"}}</div>
            </el-col>
          </el-row> -->

        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {
    getAlarmHisInfoList,
    getAlarmTotalData,
    getRealAlarmDetailData
  } from "@/api/alarm";
  import { getUserId } from "@/utils/auth";
  export default {
    name: "history-alerm",
    data() {
      const vDate = (rule, value, cb) => {
        if (!value) {
          cb(new Error("时间不能为空"));
        }
        else {
          cb();
        }
      };
      return {
        list: [],
        formInline: {
          vin: "",
          rank: "",
          type: "",
          date: [new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2), new Date()],
          plate: ""
        },
        sum: 0,
        searchRules: {
          date: [{ required: true, trigger: "blur", validator: vDate }]
        },
        three_level: 0,
        second_level: 0,
        stair: 0,
        dialogVisible: false,
        total: 0,
        pageIndex: 1,
        AlarmHisDetail: "",
        AlarmResultDetail: "",
        dataPlate: "",
        listLoading: false
      };
    },
    mounted() {
      this.getdata();
      this.getstatistics();
    },
    methods: {
      getdata() {
        this.$refs.searchForm.validate(valid => {
          if (valid) {
            let data = {
              userId: getUserId(),
              vin: this.formInline.vin,
              // alarmType: this.formInline.type,
              alarmLevel: this.formInline.rank,
              startTime: this.formInline.date[0] ?
                this.getTaskTime("yyyy-MM-dd hh:mm:ss", this.formInline.date[0]) : "",
              endTime: this.formInline.date[1] ?
                this.getTaskTime("yyyy-MM-dd hh:mm:ss", this.formInline.date[1]) : "",
              pageIndex: this.pageIndex,
              pageSize: 10,
              plate: this.formInline.plate
            };
            this.listLoading = true;

            getAlarmHisInfoList(data).then(res => {
              let data = res.results.datas,
                arr = [];
              this.total = res.results.totalRecords;
              this.pageIndex = res.results.pageIndex;
              if (data.length) {
                data.map((value, index) => {
                  this.geocoder.getAddress(
                    [value.longitude, value.latitude],
                    (status, result) => {
                      if (status === 'complete' && result.info === 'OK') {
                        value.address = result.regeocode.formattedAddress;
                      } else {
                        value.address = "地点异常";
                      }
                      arr.push(value)
                      this.listLoading = false;
                      this.list = arr;
                    }
                  );
                });
              } else {
                this.listLoading = false;
              }
            }).catch(err => {
              this.listLoading = false;
              this.list = []
              this.total = 0;
              this.pageIndex = 0;
              this.three_level = 0
              this.second_level = 0
              this.stair = 0
              this.sum = 0
            });

          }
        })
      },
      getstatistics() {
        getAlarmTotalData({ alarmStatus: 9, userId: getUserId() }).then(res => {
          let data = res.results;
          data.map(value => {
            this.sum += value.nums;
            switch (value.alarmLevel) {
              case 1:
                this.stair = value.nums;
                break;
              case 2:
                this.second_level = value.nums;
                break;
              case 3:
                this.three_level = value.nums;
                break;
            }
          });
        });
      },
      onSubmit(formName) {

        this.getdata();
      },
      exportExcel() {
        // let day = new Date(this.formInline.date[1] - this.formInline.date[0]).getDate()
        // if (day > 3) {
        //   this.$message.error('只支持导出3天之内的数据');
        // } else {
        let data = {
          excelTemplateId: 5,
          userId: getUserId(),
          vin: this.formInline.vin,
          alarmLevel: this.formInline.rank,
          startTime: this.formInline.date[0] ?
            this.getTaskTime("yyyy-MM-dd hh:mm:ss", this.formInline.date[0]) : "",
          endTime: this.formInline.date[1] ?
            this.getTaskTime("yyyy-MM-dd hh:mm:ss", this.formInline.date[1]) : ""
        };
        let params = Object.keys(data)
          .map(item => {
            return item + "=" + data[item];
          }).join("&");
        window.location = `${process.env.BASE_API}excelTemplate/exportExcel?${params}`;

        // }
      },
      resetForm(formName) {
        let formInline = {
          date: "",
          vin: "",
          rank: "",
          type: ""
        };
        this.formInline = formInline;
      },

      showDialog(data) {
        getRealAlarmDetailData(data).then(res => {
          let data = res.results;
          //经纬度转化为物理地址
          if (
            data.alarmHisDetail.longitude != 0 &&
            data.alarmHisDetail.latitude != 0
          ) {
            this.geocoder.getAddress(
              [data.alarmHisDetail.longitude, data.alarmHisDetail.latitude],
              (status, result) => {
                data.alarmHisDetail.address = result.regeocode.formattedAddress;
              }
            );
          } else {
            data.alarmHisDetail.address = "地点异常";
          }
          //报警类型
          if (data.alarmHisDetail.alarmBigType == 1) {
            data.alarmHisDetail.alarmBigType = "安全预警";
          } else if (data.alarmHisDetail.alarmBigType == 2) {
            data.alarmHisDetail.alarmBigType = "误报";
          } else if (data.alarmHisDetail.alarmBigType == 3) {
            data.alarmHisDetail.alarmBigType = "事故";
          }
          //是否是通知状态
          if (data.alarmResultDetail.isNotice === 1) {
            data.alarmResultDetail.isNotice = "通知";
          } else {
            data.alarmResultDetail.isNotice = "未通知";
          }

          //处理方式
          if (data.alarmResultDetail.alarmStyle === 1) {
            data.alarmResultDetail.alarmStyle = "人工处理";
          } else {
            data.alarmResultDetail.alarmStyle = "系统自动处理	";
          }

          // 通知人
          data.alarmResultDetail.msgNoticePersonList.map(value => {
            if (value.position == 1) {
              data.alarmResultDetail.affiliationUser = value.affiliationUser;
              data.alarmResultDetail.affiliationPhone = value.affiliationPhone;
            }
          });

          //转为经纬度是异步的所以赋值时加了定时器
          setTimeout(() => {
            this.AlarmHisDetail = data.alarmHisDetail;
            this.AlarmResultDetail = data.alarmResultDetail;
            this.dataPlate = data.plate
            this.dialogVisible = true;
          }, 100);
        });
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getdata();
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .history-alerm {
    &-search {
      padding: 20px 20px 0 20px;
      border-bottom: 1px solid #e8e8e8;
    }
    &-statistics {
      padding: 20px;
      position: relative;
      font-size: 14px;
      .statistics-export {
        position: absolute;
        right: 0;
        top: 8px;
      }
    }
    &-page {
      text-align: right;
    }
    .history-details {
      .dialog-title {
        padding: 12px 12px 22px;
        font-size: 20px;
        font-weight: 700;
      }
      .dialog-container {
        padding: 0 12px;
        margin-top: -30px;
        &-title::before {
          content: "";
          display: inline-block;
          width: 4px;
          height: 11px;
          background: #aaa;
          margin-right: 6px;
        }
      }
    }
    .green-alarm {
      color: green;
    }
    .orange-alarm {
      color: orange;
    }
    .red-alarm {
      color: red;
    }
  }
</style>