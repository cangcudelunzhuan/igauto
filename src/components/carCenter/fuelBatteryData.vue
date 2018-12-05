<template>
    <div>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">燃料电池电压(V)：{{getData(carData.fuelBatteryVoltage)}}</el-col>
            <el-col :span="12">燃料电池电流(A)：{{getData(carData.fuelBatteryCurrent)}}</el-col>
        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">燃料消耗率(L/100km)：{{getData(carData.fuelConsumption )}}</el-col>
            <el-col :span="12">燃料电池温度探针总数：{{getData(carData.fuelBatteryTempProbeCount)}}</el-col>
        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">探针温度数(℃)：{{getData(probeTempValue)}} </el-col>
            <el-col :span="12">氢系统中最高温度(℃)：{{getData(carData.hydrogenSysMaxTemp)}}</el-col>

        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">氢系统中最高温度探针序号：{{getData(carData.hydrogenSysMaxTempPropeNum)}} </el-col>
            <el-col :span="12">氢气最高浓度(ppm)：{{getData(carData.hydrogenMaxConcentration) }}</el-col>

        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">氢气最高浓度传感器代号：{{getData(carData.hydrogenMaxConcentrationSensorNum)}}</el-col>
            <el-col :span="12">氢气最高压力(MPa)：{{getData(carData.hydrogenMaxPressure)}} </el-col>

        </el-row>
        <el-row class="car-row" :gutter="20">

            <el-col :span="12">氢气最高压力传感器代号：{{getData(carData.hydrogenMaxPressureSensorNum) }}</el-col>
            <el-col :span="12">高压DC-DC状态：{{carData.hydrogenDcdcStatus==0?'工作':carData.hydrogenDcdcStatus==2?'断开': '-'}}</el-col>
        </el-row>
    </div>
</template>

<script>
    import {getData} from "@/utils/validate";
    export default {
        name: "fuel-battery-data",
        props:{
            carData:Object,
        },
        data(){
            return{
                getData,
                probeTempValue:'-'
            }
        },
        watch: {
            // 计算属性的 getter
            carData: function (val,old) {
                if(val.probeTempValue){
                    if(val.probeTempValue.length>0){
                        this.probeTempValue = val.probeTempValue;
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
</style>