<template>
    <div>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">最高电压电池子系统号：{{getData(carData.maxBatteryVoltageNum)}}</el-col>
            <el-col :span="12">最高电压电池单体代号：{{getData(carData.maxBatteryVoltageCellNum)}}</el-col>
        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">电池单体电压最高值(V)：{{getData(carData.maxBatteryVoltageCellValue) }}</el-col>
            <el-col :span="12">最低电压电池子系统号：{{getData(carData.minBatteryVoltageNum)}}</el-col>
        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">最低电压电池单体代号：{{getData(carData.minBatteryVoltageCellNum)}} </el-col>
            <el-col :span="12">电池单体电压最低值(V)：{{getData(carData.minBatteryVoltageCellValue)}}</el-col>

        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">最高温度子系统号：{{getData(carData.maxTempNum)}} </el-col>
            <el-col :span="12">最高温度探针序号：{{getData(carData.maxTempPropeNum) }}</el-col>

        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">最高温度值(℃)：{{getData(carData.maxTempValue)}}</el-col>
            <el-col :span="12">最低温度子系统号：{{getData(carData.minTempNum)}} </el-col>

        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">最低温度探针序号：{{getData(carData.minTempPropeNum)}}</el-col>
            <el-col :span="12">最低温度值(℃)：{{getData(carData.minTempValue)}}</el-col>
        </el-row>
    </div>
</template>

<script>
    import {getData} from "@/utils/validate";
    export default {
        name: "extreme-data",
        props:{
            carData:Object,
        },
        data(){
            return{
                getData,
            }
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