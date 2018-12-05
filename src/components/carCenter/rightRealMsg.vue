<template>
    <div class="right-real-page">
        <el-tabs type="border-card" v-model="activeName" class="tab-data" @tab-click="handleClick">
            <el-tab-pane label="整车数据" name="1">
                <!--<all-car-data :baseCar="baseCar" ></all-car-data>-->
                <div v-for="item in allCarDataTable"></div>
            </el-tab-pane>
            <el-tab-pane label="驱动电机数据" name="2">驱动电机数据</el-tab-pane>
            <el-tab-pane label="燃料电池数据" name="3">燃料电池数据</el-tab-pane>
            <el-tab-pane label="动力电池数据" name="4">动力电池数据</el-tab-pane>
            <el-tab-pane label="发动机数据" name="5">发动机数据</el-tab-pane>
            <el-tab-pane label="可充电储能电压数据" name="6">可充电储能电压数据</el-tab-pane>
            <el-tab-pane label="可充电储能温度数据" name="7">可充电储能温度数据</el-tab-pane>
            <el-tab-pane label="极值数据" name="8">
                <!--<extreme-data></extreme-data>-->
            </el-tab-pane>
            <el-tab-pane label="报警数据" name="9">报警数据</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import AllCarData from  '@/components/carCenter/allCarData.vue';
    import ExtremeData from  '@/components/carCenter/extremeData.vue';
    import {getStandardDetail} from  '@/api/carCenter';
    import axios from 'axios';
    export default {
        name: "right-real-msg",
        components:{AllCarData,ExtremeData},
        props: {
            vinData: {
                type: String,
            },
            standardData:{
                type: Array,
            }

        },
        data() {
            return {
                baseCar:{},
                CarData:{},
                activeName:'1',
                allCarDataTable:[],
            };
        },
        mounted () {
            this.init();
        },
        methods:{
            handleClick(tab){
                // console.log(tab.name);
                var data={vin:'LB37522Z6HL051252',StandardType:tab.name};
                var param = new URLSearchParams();
                param .append('vin','LB37522Z6HL051252')
                param .append('standardType',tab.name)


                axios.post('http://10.200.179.75:9090/carReal/queryStandardDetail',param,{
                    headers:{
                        'content-Type':'application/json'
                    }})
                    .then(response => {
                        console.log(response)
                        // this.standardData=response.data.results;
                    })
                    .catch(error => console.log(error));

            },
            init(){
                // getStandardDetail(this.vinData,1).then(response => {
                //     this.baseCar = response.results
                // })
                console.log(this.vinData);


            }
        }
    }
</script>

<style scoped>
.right-real-page{
    padding-right:10px;
    box-sizing: border-box;
}
    .tab-data{
        height: 43rem;
    }
</style>