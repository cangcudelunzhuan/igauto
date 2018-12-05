<template>
    <div class="control-box">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <alarm-pg></alarm-pg>

                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <watch-car></watch-car>
                </div>
            </el-col>
         </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div><charts-pg></charts-pg></div>
                    <div class="chart-box">
                        <div class="bottom-charts"><left-charts></left-charts></div>
                        <div class="bottom-charts">
                            <right-charts></right-charts>
                        </div>
                    </div>



                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <line-charts></line-charts>
                </div>
            </el-col>
        </el-row>
    </div>
   </template>

<script>
    import AlarmPg  from '@/components/ControlPage/alarm.vue';
    import  WatchCar from '@/components/ControlPage/watchCar.vue';
    import ChartsPg from '@/components/ControlPage/charts.vue';
    import LeftCharts from '@/components/ControlPage/brandCharts.vue';
    import RightCharts from '@/components/ControlPage/rightCharts.vue';
    import LineCharts from '@/components/ControlPage/lineCharts.vue';
    export default {
        name: "index",
        components:{AlarmPg,WatchCar,ChartsPg,LeftCharts,RightCharts,LineCharts}
    }
</script>

<style scoped>
    .control-box{
       padding:20px;

    }
    .bottom-charts{
        float: left;
        width:50%;
    }
    .chart-box:after{
        content: "";
        display: block;
        clear:both;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        /*background: #d3dce6;*/
        border:1px solid #333;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>