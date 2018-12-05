<template>
    <div>
        <div class="driveMotorBox" v-for="(item,index) in alarmDataList">
            <el-row class="car-row" :gutter="20" >
                <el-col :span="12">告警：{{item.alarmName?item.alarmName:'-' }}</el-col>

            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "alarm-datas",
        props:{
            carData:Object,
        },
        data() {
            return {
                alarmDataList:[{
                    id:'-',
                    data:'-',
                }],
            };
        },
        watch: {
            // 计算属性的 getter
            carData: function (val,old) {
                if(val.alarmDataList){
                    if(val.alarmDataList.length>0){
                        this.alarmDataList = val.alarmDataList;
                    }

                }

            },

        },
    }
</script>

<style scoped>
    .car-row{
        line-height: 1.7;
        font-size: 14px;
        color:#666;
        padding-left: 30px;
        /*text-align: center;*/
    }
</style>