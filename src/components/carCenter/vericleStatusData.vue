<template>
    <div>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">电源模式：{{carData.powerMode==0?'发动机熄火':carData.powerMode==4?'启动':'-'}} </el-col>
            <el-col :span="12">充电状态：{{carData.chargingStatus ==0?'default'
                :carData.chargingStatus ==1?'停车充电（正在充电）':carData.chargingStatus ==2?'行驶充电':
                carData.chargingStatus ==3?'未充电':carData.chargingStatus ==4?'充电完成（充满电）':
                carData.chargingStatus ==5?'正在加热':carData.chargingStatus ==6?'熄灭':'-'
                }}
            </el-col>

        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">运行模式：{{carData.driveMode==1?'纯电':carData.driveMode==2?'混动':
                carData.driveMode==3?'燃油':'-'
                }}
            </el-col>
            <el-col :span="12">车速(km/h)：{{getData(carData.speed)}} </el-col>
        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">累积里程(km)：{{getData(carData.totalMileage) }}</el-col>
            <el-col :span="12">总电压(V)：{{getData(carData.totalVoltage)}}</el-col>
        </el-row>
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">总电流(A)：{{getData(carData.totalCurrent)}} </el-col>
            <el-col :span="12">电池电量(%)：{{getData(carData.soc) }}</el-col>

        </el-row>
        <!--<el-row class="car-row" :gutter="20">-->
            <!--<el-col :span="12">总电流:{{carData.totalCurrent}} </el-col>-->
            <!--<el-col :span="12">电池电量：{{carData.soc }}</el-col>-->

        <!--</el-row>-->
        <el-row class="car-row" :gutter="20">
            <el-col :span="12">dcdc状态：{{carData.dcdcStatus==1?'工作':carData.dcdcStatus==2?'断开': '-'
                }}</el-col>
            <el-col :span="12">绝缘电阻(KΩ)：{{getData(carData.insulation)}} </el-col>

        </el-row>
        <el-row class="car-row" :gutter="20">

            <el-col :span="12">剩余电量(kWh)：{{getData(carData.remainingBattery) }}</el-col>
            <el-col :span="12">档位：{{carData.transmissionMode==0?'空档（N）':carData.transmissionMode==1?'1挡':
                carData.transmissionMode==2?'2挡':carData.transmissionMode==3?'3挡':
                carData.transmissionMode==4?'4挡':carData.transmissionMode==5?'5挡':
                carData.transmissionMode==6?'6挡':carData.transmissionMode==7?'7挡':
                carData.transmissionMode==8?'8挡':carData.transmissionMode==9?'9挡':
                carData.transmissionMode==10?'10挡':carData.transmissionMode==11?'11挡':
                carData.transmissionMode==12?'12挡':carData.transmissionMode==13?'倒挡（R）':
                carData.transmissionMode==14?'自动D挡':carData.transmissionMode==15?'停车P挡':'-'
                }}</el-col>
        </el-row>
        <el-row class="car-row" :gutter="20">

            <el-col :span="12">高度(m)：{{getData(carData.altitude) }}</el-col>
            <el-col :span="12">GNSS信号强度：{{getData(carData.gnssSignalStrength)}}</el-col>
        </el-row>
        <el-row class="car-row"  :gutter="12">
            <el-col :span="12">车头方向：{{getData(carData.gnssDirection) }}</el-col>
            <el-col :span="12">车辆行驶状态：{{carData.carState==0?'行驶':carData.carState==1?'停止':'-' }}</el-col>
        </el-row>

    </div>
</template>

<script>
    import {getData} from "@/utils/validate";
    export default {
        name: "vericle-status-data",
        data(){
           return {
               getData
           }
        },
        props:{
            carData:Object,
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