<template>
  <div>
    <div slot="title" style="margin-top:-30px;"></div>
    <div>
      <div class="car-base-title">车辆基本信息</div>
      <el-row class="car-base-box">
        <el-col :span="8">
          <ul>
            <li>VIN码 :
              <span class="car-base-text">{{getData(carDetailData.carVo.vin)}}</span>
            </li>
            <li>车型 :
              <span class="car-base-text">{{getData(carDetailData.carVo.carTypeName)}}</span>
            </li>
            <li>车牌号 :
              <span class="car-base-text">{{getData(carDetailData.carVo.plate)}}</span>
            </li>
            <li>录入时间 :
              <span class="car-base-text">{{getData(carDetailData.carVo.createTime)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>ICCID :
              <span class="car-base-text">{{getData(carDetailData.carVo.iccid)}}</span>
            </li>
            <li>车辆状态 :
              <span class="car-base-text">{{carDetailData.carVo.carStatus==0?'待整备':carDetailData.carVo.carStatus==1?'已整备':carDetailData.carVo.carStatus==2?'运营中':carDetailData.carVo.carStatus==3?'报废':'-'}}</span>
            </li>
            <li>上牌时间 :
              <span class="car-base-text">{{getData(carDetailData.carVo.plateTime)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>品牌 :
              <span class="car-base-text">{{getData(carDetailData.carVo.carBand)}}</span>
            </li>
            <li>颜色 :
              <span class="car-base-text">{{getData(carDetailData.carVo.carColor)}}</span>
            </li>
            <li>合格证号 :
              <span class="car-base-text">{{getData(carDetailData.carVo.certificateNum)}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="car-base-title">车型基础信息</div>
      <el-row class="car-base-box">
        <el-col :span="8">
          <ul>
            <li>型号 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.carTypeNum)}}</span>
            </li>
            <li>纯电续驶里程(km) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.electriRange)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>驱动电机布置位置 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.motorPosition)}}</span>
            </li>
            <li class="car-msg-box">各档位传动比 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.gearRatio)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>最高车速(km/h) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.maxSpeed)}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="car-base-title">燃油部分信息</div>
      <el-row class="car-base-box">
        <el-col :span="8">
          <ul>
            <!--<li>发动机编号 :-->
              <!--<span class="car-base-text">{{getData(carDetailData.carExtrendDetail.engineNum)}}</span>-->
            <!--</li>-->
            <li>最大输出功率(kw) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.maxOutputPower)}}</span>
            </li>
            <li>最大输出转矩(N·m) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.maxOutputTorque)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>燃油类型 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.fuelType)}}</span>
            </li>

          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>燃油标号:
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.fuelNum)}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="car-base-title">可充电储能装置</div>
      <el-row class="car-base-box">
        <el-col :span="8">
          <ul>
            <li>电池个数 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.batteryNum)}}</span>
            </li>
            <li>车载储能装置类型总能量 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.totalStoragePower)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <!--<li>可充电储能系统编号 :-->
              <!--<span class="car-base-text">{{getData(carDetailData.carExtrendDetail.chargeStorageNum)}}</span>-->
            <!--</li>-->
            <li>车载储能装置冷却方式 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.storageCoolingType)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>车载储能装置类型 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.storageType)}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="car-base-title">驱动电机信息</div>
      <el-row class="car-base-box">
        <el-col :span="8">
          <ul>
            <li>驱动电机个数 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.engineCount)}}</span>
            </li>
            <li>驱动电机最大工作电流(A) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.engineMaxElectricity)}}</span>
            </li>
            <li>驱动电机型号 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.engineType)}}</span>
            </li>
            <li>驱动电机峰值转矩(N·m) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.enginePeakTorque)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>驱动电机冷却方式 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.engineCoolingType)}}</span>
            </li>
            <li>最大输出转矩(N·m) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.maxEngineOutputTorque)}}</span>
            </li>
            <li>驱动电机峰值功率(kw) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.engineMaxMotorPower)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>额定电压(V) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.nominalVoltage)}}</span>
            </li>
            <li>驱动电机序号 :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.engineSequenceNum)}}</span>
            </li>
            <li>驱动电机最高转速(r/min) :
              <span class="car-base-text">{{getData(carDetailData.carExtrendDetail.engineMaxRev)}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="car-base-title">车主信息</div>
      <el-row class="car-base-box">
        <el-col :span="8">
          <ul>
            <li>车主姓名 :
              <span class="car-base-text">{{getData(carDetailData.carOwner.name)}}</span>
            </li>
            <li>手机号 :
              <span class="car-base-text">{{getData(carDetailData.carOwner.mobile)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>性别 :
              <span class="car-base-text">{{carDetailData.carOwner.sex==1?'男':carDetailData.carOwner.sex==2?'女':'-'}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li>证件号 :
              <span class="car-base-text">{{getData(carDetailData.carOwner.identityNumber)}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
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
  import { getData } from "@/utils/validate";
  export default {
    name: "carMeg",
    props: {
      carDetailData: {
        type: Object,
      },
    },
    data() {
      return {
        getData,
        tableData: []
      };

    },
    mounted() {}

  }
</script>

<style scoped>
  ul {
    list-style: none;
  }

  ul>li {
    line-height: 17px;
    font-size: 12px;
    color: #333;
  }

  .car-msg-box {
    word-break: break-all;
    word-wrap: break-word;
  }

  ul>li .car-base-text {
    font-family: PingFangSC-Regular;
    color: #2A2A2A;
  }

  .car-base-box {
    border: 1px solid #F2F2F2;
  }

  .car-base-title {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #333333;
    margin-top: 12px;
    margin-bottom: 2px;
  }
</style>