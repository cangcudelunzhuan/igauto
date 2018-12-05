<template>
    <div>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">可充电储能装置个数：{{getData(carData.chargingDeviceVoltageSum)}} </el-col>

        </el-row>
        <div class="driveMotorBox" v-for="(item,index) in chargingDeviceVoltage">
            <el-row class="car-row" :gutter="20" >
                <el-col :span="12">可充电储能装置子系统号：{{item.chargingDeviceVoltageNum}}</el-col>
                <el-col :span="12">可充电储能装置电压(V)：{{item.energyStorageDeviceVoltage}}</el-col>

            </el-row>
            <el-row class="car-row" :gutter="20">
                <el-col :span="12">可充电储能装置电流(A)：{{item.energyStorageDeviceCurrent }}</el-col>
                <el-col :span="12">单体电池总数：{{item.singleCellCount }}</el-col>
            </el-row>
            <el-row class="car-row" :gutter="20">
                <el-col :span="12">本帧起始电池序号：{{item.frameCellStartNum}}</el-col>
                <el-col :span="12">本帧单体电池总数：{{item.frameSingleCellCount }}</el-col>

            </el-row>
            <el-row class="car-row" :gutter="20">
                <el-col :span="12">单体电池电压(V)：{{item.singleCellVoltage.length>0?item.singleCellVoltage.join(' '):'-' }}</el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {getData} from "@/utils/validate";
    export default {
        name: "charging-voltage-data",
       data(){
            return{
                getData,
                chargingDeviceVoltage:[{
                    chargingDeviceVoltageNum:'-',
                    energyStorageDeviceVoltage:'-',
                    energyStorageDeviceCurrent:'-',
                    singleCellCount:'-',
                    driveMotorTorque:'-',
                    frameCellStartNum:'-',
                    frameSingleCellCount:'-',
                    singleCellVoltage:[],
                }],
            }
       },
        props:{
            carData:Object,
        },
        watch: {
            // 计算属性的 getter
            carData: function (val,old) {
                if(val.chargingDeviceVoltage){
                    if(val.chargingDeviceVoltage.length>0){
                        this.chargingDeviceVoltage = val.chargingDeviceVoltage;
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