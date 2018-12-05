<template>
  <div class="police-statistics">
    <div class="police-statistics-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">

        <!-- 搜索项 -->
        <el-form-item label="搜索项" class="date-pick">
          <el-select v-model="formInline.searchTerms">
            <el-option label="里程统计" value="1"></el-option>
            <el-option label="消耗电量统计" value="2"></el-option>
            <el-option label="消耗油量统计" value="3"></el-option>
            <el-option label="报警统计" value="4"></el-option>
            <el-option label="在线时长统计" value="5"></el-option>
            <el-option label="充电时长统计" value="6"></el-option>
            <el-option label="平均车速统计" value="7"></el-option>
          </el-select>
        </el-form-item>

        <!-- 搜索方式 -->
        <el-select v-model="searchType" placeholder="请选择搜索方式" @change="changeSearchType">
          <el-option label="按VIN搜索" value="0"></el-option>
          <el-option label="按账号搜索" value="1"></el-option>
        </el-select>
        <el-form-item label="" v-if="searchType == '' || searchType == '1'">
          <el-select v-model="formInline.ascription" placeholder="请选择归属">
            <el-option v-for="item in belongerList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" v-else>
          <el-input v-model="formInline.vin" placeholder="请输入VIN码"></el-input>
        </el-form-item>

        <!-- 搜索日期 -->
        <el-form-item label="日期" class="date-pick">
          <el-select v-model="formInline.datePick" @change="pick">
            <el-option label="按年查找" value="3"></el-option>
            <el-option label="按月查找" value="2"></el-option>
            <el-option label="按日查找" value="1"></el-option>
          </el-select>
          <el-date-picker v-model="formInline.date" align="right" :type="type" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <!-- <el-button type="primary" @click="onSubmit">导出</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="police-statistics-chart">
      <line-bar :sum="sum" :time="time" :amount="amount" :describe="describe" v-if="isShow"></line-bar>
    </div>
  </div>
</template>

<script>
  import lineBar from "@/components/Echarts/lineBarCharts.vue";
  import { getAlarmStatistics, getBelongerList } from "@/api/alarm";
  import { getUserId } from "@/utils/auth";
  export default {
    name: "policeStatistics",
    components: { lineBar },
    data() {
      return {
        formInline: {
          vin: "",
          ascription: getUserId(),
          date: new Date(),
          datePick: "2",
          searchTerms: "1"
        },
        type: "month",
        searchType: "1",
        belongerList: [], //归属的option
        sum: [], //统计总和
        time: [], //统计的时间
        amount: [], //统计单次数
        describe: [], //描述
        isShow: false
      };
    },
    mounted() {
      this.belongerList = [];
      getBelongerList().then(res => {
        res.results.map(item => {
          this.belongerList.push({
            label: item.name,
            value: item.userId
          });
        });
        this.onSubmit()
      });
    },
    methods: {
      onSubmit() {
        this.sum = [];
        this.time = [];
        this.amount = [];
        switch (this.formInline.searchTerms) {
          case "1":
            this.describe = ["总里程(km)", "行驶里程(km)"];
            break;
          case "2":
            this.describe = ["总能耗/电量(kwh)", "能耗/电量(kwh) "];
            break;
          case "3":
            this.describe = ["总能耗/油耗(L)", "能耗/油耗(L)"];
            break;
          case "4":
            this.describe = ["总报警次数(次)", "当前报警次数(次)"];
            break;
          case "5":
            this.describe = ["总在线时长(小时)", "在线时长(小时)"];
            break;
          case "6":
            this.describe = ["总充电时长(小时）", "充电时长(小时)"];
            break;
          case "7":
            this.describe = ["平均车速(km/h)"];
            break;
        }
        //转换时间格式
        if (typeof this.formInline.date == "object") {
          switch (this.formInline.datePick) {
            case "3":
              this.formInline.date = this.getTaskTime(
                "yyyy",
                this.formInline.date
              );
              break;
            case "2":
              this.formInline.date = this.getTaskTime(
                "yyyy-MM",
                this.formInline.date
              );
              break;
            case "1":
              this.formInline.date = this.getTaskTime(
                "yyyy-MM-dd",
                this.formInline.date
              );
              break;
            case "按日查找":
              this.formInline.date = this.getTaskTime(
                "yyyy-MM-dd",
                this.formInline.date
              );
              break;
          }
        }

        let data = {
          searchScope: this.formInline.datePick,
          searchItems: this.formInline.searchTerms,
          searchTime: this.formInline.date,
          vin: this.formInline.vin,
          ascription: this.formInline.ascription,
          searchType: this.searchType || 1
        };
        getAlarmStatistics(data)
          .then(res => {
            let data = res.results;
            data.map(item => {
              switch (this.formInline.searchTerms) {
                case "1":
                  this.amount.push(item.travelMileage);
                  break;
                case "2":
                  this.amount.push(item.electricConsumption);
                  break;
                case "3":
                  this.amount.push(item.fuelConsumption);
                  break;
                case "4":
                  this.amount.push(item.alarmCount);
                  break;
                case "5":
                  this.amount.push((item.onlineSecond / 3600).toFixed(2));
                  break;
                case "6":
                  this.amount.push((item.chargingSecond / 3600).toFixed(2));
                  break;
                case "7":
                  this.amount.push(item.averageSpeed);
                  break;
              }
              if (item.searchScope == "1") {
                this.time = [
                  "0:00",
                  "1:00",
                  "2:00",
                  "3:00",
                  "4:00",
                  "5:00",
                  "6:00",
                  "7:00",
                  "8:00",
                  "9:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00",
                  "19:00",
                  "20:00",
                  "21:00",
                  "22:00",
                  "23:00"
                ];
              } else {
                this.time.push(item.searchTime);
              }
            });
            // 得到合计的值
            let TemporaryVariable = 0;
            this.amount.map(item => {
              this.sum.push(
                Math.floor((TemporaryVariable + Number(item)) * 100) / 100
              );
              TemporaryVariable = this.sum[this.sum.length - 1];
            });
            this.isShow = true;
          })
          .catch(err => {
            this.isShow = false;
          });
      },
      reset() {
        for (let key in this.formInline) {
          this.formInline[key] = "";
        }
        this.searchType = "";
      },
      pick(val) {
        //时间选择器
        this.formInline.date = new Date()
        switch (val) {
          case "3":
            this.type = "year";
            break;
          case "2":
            this.type = "month";
            break;
          case "1":
            this.type = "date";
            break;
        }
      },
      changeSearchType() {
        this.formInline.vin = ""
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .police-statistics {
    &-search {
      padding: 20px;
    }
  }
</style>