<template>
    <div>
        <el-row>
            <el-col :span="12">
                <ul>
                    <li>电源模式 : {{tabPosition}}</li>
                    <li>运行模式 : </li>
                    <li>累计里程(km) : </li>
                    <li>总电流(A) : </li>
                    <li>dcdc状态 : </li>
                    <li>绝缘电阻(kΩ) : </li>
                    <li>剩余电量(kwh) : </li>
                </ul>
            </el-col>
            <el-col :span="12">
                <ul>
                    <li>充电状态 : </li>
                    <li>车速(km/h) : </li>
                    <li>总电压(v) : </li>
                    <li>电池电量(%) : </li>
                    <li>档位 : </li>
                    <li>可续航里程(km) :</li>
                    <li>车辆行驶状态 :</li>
                </ul>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    export default {
        name: "all-car-data",
        data() {
            return {
                tabPosition: 'top'
            };
        }
    }
</script>

<style scoped>
    ul{
        list-style: none;
    }
    ul>li{
        line-height: 1.5;
        font-size: 14px;
        color:#666;
    }


</style>