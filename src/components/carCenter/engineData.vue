<template>
    <div>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">发动机状态：{{carData.engineStatus==1?'启动状态':carData.engineStatus==2?'关闭状态': '-'}} </el-col>
            <el-col :span="12">曲轴转速(rpm)：{{getData(carData.crankshaftSpeed) }}</el-col>

        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">发动机燃料消耗率(L/100km)：{{getData(carData.engineFuelConsumption)}} </el-col>

        </el-row>
    </div>
</template>

<script>
    import {getData} from "@/utils/validate";
    export default {
        name: "engine-data",
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