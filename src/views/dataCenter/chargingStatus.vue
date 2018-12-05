<template>
  <div class="history-alerm">

    <!-- 搜索条 -->
    <div class="history-alerm-search">
      <el-form ref="searchForm" :inline="true" :model="formInline" :rules="searchRules">
        <el-form-item label="VIN码/车牌号" prop="vin">
          <el-input v-model="formInline.plateOrVinValue" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- <el-form-item label="车牌号" prop="plate">
          <el-input v-model="formInline.plate" placeholder="请输入内容"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="归属" prop="rank">
          <el-select v-model="formInline.rank" clearable placeholder="请选择">
            <el-option v-for="item in affiliationList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="统计时间" prop="date">
          <el-date-picker v-model="formInline.date" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="search-grounp">
          <el-button type="primary" @click="onSubmit()">查询</el-button>
          <el-button @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="history-alerm-table">
      <el-table :data="list" element-loading-text="拼命加载中" border fit>
        <el-table-column align="center" label='序号' width="100">
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>

        <el-table-column label="车架号">
          <template slot-scope="scope">
            <span>{{scope.row.vin}}</span>
          </template>
        </el-table-column>

        <el-table-column label="车牌号">
          <template slot-scope="scope">
            <span>{{scope.row.plate}}</span>
          </template>
        </el-table-column>

        <el-table-column label="充电次数">
          <template slot-scope="scope">
            <span>{{scope.row.totalCount}}</span>
          </template>
        </el-table-column>

        <el-table-column label="充电时长(h)">
          <template slot-scope="scope">
            <span>{{(scope.row.totalTimes/3600).toFixed(2)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="充电度数(kWh)">
          <template slot-scope="scope">
            <span>{{scope.row.totalPower}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" @click="showDialog(scope.row)" style="color:#66b1ff;">详情</a>
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
          充电详情
        </div>
        <span>VIN = {{vin}}</span>
        <el-table :data="gridData" border fit max-height="350">
          <el-table-column align="center" label='序号' width="100">
            <template slot-scope="scope">
              {{scope.$index +1}}
            </template>
          </el-table-column>

          <el-table-column label="充电开始时间">
            <template slot-scope="scope">
              <span>{{scope.row.startTime}}</span>
            </template>
          </el-table-column>

          <el-table-column label="充电结束时间">
            <template slot-scope="scope">
              <span>{{scope.row.endTime}}</span>
            </template>
          </el-table-column>

          <el-table-column label="充电开始SOC(%)">
            <template slot-scope="scope">
              <span>{{scope.row.startSoc}}</span>
            </template>
          </el-table-column>

          <el-table-column label="充电结束SOC(%)">
            <template slot-scope="scope">
              <span>{{scope.row.endSoc}}</span>
            </template>
          </el-table-column>

          <el-table-column label="充电度数(kWh)">
            <template slot-scope="scope">
              <span>{{scope.row.chargingPower}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="history-alerm-page">
          <el-pagination @current-change="handleCurrentChangeDialog" :page-size="10" layout="total, prev, pager, next" :total="totalDialog">
          </el-pagination>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {
    getQueryChargingHistory,
    getQueryChargingDetail
  } from "@/api/alarm";
  import { getUserId } from "@/utils/auth";
  export default {
    name: "charging-status",
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
        gridData: [],
        formInline: {
          // rank: getUserId(),
          type: "",
          date: [new Date(new Date().setDate(1)), new Date()],
          plateOrVinValue: ""
        },
        searchRules: {
          date: [{ required: true, trigger: "blur", validator: vDate }]
        },
        dialogVisible: false,
        total: 0,
        totalDialog: 0,
        pageIndexDialog: 1,
        pageIndex: 1,
        vin: "",
        affiliationList: []
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.$refs.searchForm.validate(valid => {
          if (valid) {
            let data = {
              plateOrVinValue: this.formInline.plateOrVinValue,
              ascription: getUserId(),
              startTime: this.getTaskTime(
                "yyyy-MM-dd hh:mm:ss",
                this.formInline.date[0]
              ),
              endTime: this.getTaskTime(
                "yyyy-MM-dd hh:mm:ss",
                this.formInline.date[1]
              ),
              pageSize: 10,
              pageIndex: this.pageIndex
            };
            getQueryChargingHistory(data).then(res => {
              this.total = res.results.totalRecords;
              this.list = res.results.datas;
            });

          }
        })
      },
      onSubmit() {
        this.getData();
      },
      resetForm(formName) {
        let formInline = {
          date: "",
          vin: "",
          // rank: "",
          type: ""
        };
        this.formInline = formInline;
        this.list = []
        this.total = 0
      },

      showDialog(rows) {
        this.vin = rows.vin;
        this.getDataDialog();
      },
      getDataDialog() {
        this.$refs.searchForm.validate(valid => {
          if (valid) {
            let data = {
              vin: this.vin,
              startTime: this.getTaskTime(
                "yyyy-MM-dd hh:mm:ss",
                this.formInline.date[0]
              ),
              endTime: this.getTaskTime(
                "yyyy-MM-dd hh:mm:ss",
                this.formInline.date[1]
              ),
              pageIndex: this.pageIndexDialog,
              pageSize: 10
            };
            getQueryChargingDetail(data).then(res => {
              this.totalDialog = res.results.totalRecords;
              this.gridData = res.results.datas;
              this.dialogVisible = true;
            });

          }
        })
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getData();
      },
      handleCurrentChangeDialog(val) {
        this.pageIndexDialog = val;
        this.getDataDialog();
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
    &-page {
      text-align: right;
    }
    .history-details {
      .dialog-title {
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