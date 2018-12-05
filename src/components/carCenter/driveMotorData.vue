<template>
    <div>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">驱动电机个数：{{getData(carData.driveMotroSum)}} </el-col>

        </el-row>
        <div class="driveMotorBox" v-for="(item,index) in driveMotor">
            <el-row class="car-row" :gutter="20" >
                <el-col :span="12">驱动电机数据：{{item.driveMotorIndex}}</el-col>
                <el-col :span="12">驱动电机状态：{{item.driveMotorStatus==1?'耗电':
                    item.driveMotorStatus==2?'发电':item.driveMotorStatus==3?'关闭状态':
                    item.driveMotorStatus==4?'准备状态':'-'
                    }}</el-col>

            </el-row>
            <el-row class="car-row" :gutter="20">
                <el-col :span="12">驱动电机转速(r/min)：{{item.driveMotorSpeed }}</el-col>
                <el-col :span="12">驱动电机转矩(N·m)：{{item.driveMotorTorque }}</el-col>
            </el-row>
            <el-row class="car-row" :gutter="20">
                <el-col :span="12">驱动电机温度(℃)：{{item.driveMotorTemp}}</el-col>
                <el-col :span="12">驱动电机控制温度(℃)：{{item.driveMotorControllerTemp }}</el-col>

            </el-row>
            <el-row class="car-row" :gutter="20">
                <el-col :span="12">电机控制器直流母线电流(A)：{{item.motorControllerCurrent }}</el-col>
                <el-col :span="12">电机控制器输入电压(V)：{{item.motorControllerInputVoltage }}</el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {getData} from "@/utils/validate";
    export default {
        name: "drive-motor-data",
        data() {
            return {
                getData,
                driveMotor:[{
                    driveMotorIndex:'-',
                    driveMotorStatus:'-',
                    driveMotorControllerTemp:'-',
                    driveMotorSpeed:'-',
                    driveMotorTorque:'-',
                    driveMotorTemp:'-',
                    motorControllerInputVoltage:'-',
                    motorControllerCurrent:'-',
                }],
            };
        },
        props:{
            carData:Object,
        },
        watch: {
            // 计算属性的 getter
            carData: function (val,old) {
                if(val.driveMotor){
                    if(val.driveMotor.length>0){
                        this.driveMotor = val.driveMotor;
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