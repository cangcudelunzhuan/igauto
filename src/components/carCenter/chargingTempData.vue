<template>
    <div>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">可充电储能子系统个数：{{getData(carData.chargingDeviceTempSum)}} </el-col>

        </el-row>
        <div class="driveMotorBox" v-for="(item,index) in chargingDeviceTemp">
            <el-row class="car-row" :gutter="20" >
                <el-col :span="12">可充电储能子系统号：{{item.chargingDeviceTempNum}}</el-col>
                <el-col :span="12">可充电储能子系统温度探针个数：{{item.chargingDeviceTempProbeSum}}</el-col>

            </el-row>
            <el-row class="car-row" :gutter="20">
                <el-col :span="12">可充电储能子系统温度各探针检测到的温度值(℃)：{{item.chargingTempProbeValue.length>0?item.chargingTempProbeValue.join(' '):'-'}}</el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {getData} from "@/utils/validate";
    export default {
        name: "charging-temp-data",
        data(){
            return{
                getData,
                chargingDeviceTemp:[{
                    chargingDeviceTempNum:'-',
                    chargingDeviceTempProbeSum:'-',
                    chargingTempProbeValue:[],
                }],
            }
        },
        props:{
            carData:Object,
        },
        watch: {
            // 计算属性的 getter
            carData: function (val,old) {
               if(val.chargingDeviceTemp){
                   if(val.chargingDeviceTemp.length>0){
                       this.chargingDeviceTemp = val.chargingDeviceTemp;
                   }
               }

            },

        },
    }
</script>

<style scoped>
    .car-row{
        line-height: 3;
        font-size: 14px;
        color:#666;
        padding-left: 30px;
        /*text-align: center;*/
    }
    .driveMotorBox{
        margin-top: 10px;
    }

</style>