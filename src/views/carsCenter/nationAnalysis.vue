<template>
    <div class="nation-page">
        <div class="back" @click="backClick">&lt;&nbsp; 返回</div>
        <div>
            <div class="title">车辆信息</div>
            <div><car-msg></car-msg></div>
        </div>

        <div class="car-data-box">
            <div  class="title">实时车况信息</div>
            <el-tabs class="car-data-tabs" v-model="activeName" type="card" @tab-click="handleClick">
                <!--<el-tab-pane label="车辆基本信息" name="first">-->
                <!--<car-msg></car-msg>-->
                <!--</el-tab-pane>-->
                <el-tab-pane label="整车数据" name="second">
                    <car-data></car-data>
                </el-tab-pane>
                <el-tab-pane label="驱动电机数据" name="third">驱动电机数据</el-tab-pane>
                <el-tab-pane label="燃料电池数据" name="fourth">燃料电池数据</el-tab-pane>
                <el-tab-pane label="发动机数据" name="five">发动机数据</el-tab-pane>
                <el-tab-pane label="车辆位置数据" name="six">车辆位置数据</el-tab-pane>
                <el-tab-pane label="可充电设备数据" name="seven">可充电设备数据</el-tab-pane>
                <el-tab-pane label="临时可充电设备数据" name="eight">临时可充电设备数据</el-tab-pane>
                <el-tab-pane label="极值数据" name="nine">极值数据</el-tab-pane>
                <el-tab-pane label="报警数据" name="ten">报警数据</el-tab-pane>
                <el-tab-pane label="充电数据" name="eleven">充电数据</el-tab-pane>
                <el-tab-pane label="更多" name="more">更多</el-tab-pane>
            </el-tabs>
        </div>
    </div>

</template>

<script>
    import CarMsg from  '@/components/carCenter/carMsg.vue';
    import CarData from  '@/components/carCenter/carData.vue';
    //carsCenter/nationAnalysis
    export default {
        name: "nation-analysis",
        components:{CarMsg,CarData},
        data() {
            return {
                activeName: 'second'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            backClick(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .title{
        margin-bottom:10px;
    }
    .car-data-box{
        margin-top: 50px;
    }
    .back{
        cursor: default;
        text-align: right;
        color:#409EFF ;
        font-size: 14px;
    }
    .nation-page{
        padding: 15px;
    }
    .car-data-tabs .el-tabs__header{
        margin: 0;
    }

</style>