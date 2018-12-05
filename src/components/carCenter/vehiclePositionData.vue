<template>
    <div>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">经度：{{getData(carData.longitude)}}</el-col>
            <el-col :span="12">定位状态：{{carData.positionStatus==0?'东经北纬':carData.positionStatus==2?'东经南纬':
                carData.positionStatus==4?'西经北纬':carData.positionStatus==6?'西经南纬':'-'
                }}</el-col>
        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">纬度：{{getData(carData.latitude)}}</el-col>
        </el-row>
    </div>
</template>

<script>
    import {getData} from "@/utils/validate";
    export default {
        name: "vehicle-position-data",
        props:{
            carData:Object,
        },
        data(){
            return {
                getData
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