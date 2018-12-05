<template id="child">
    <div>
        <div class="component-choose">
            <el-form class="" ref="addForm" :model="addForm" label-width="80px">
                <el-row :gutter="20">
                    <el-col  :span="10" >
                        <el-form-item  prop="iccid"
                                       :rules="[{ required: true, message: 'ICCID不能为空'},]"
                                       label="ICCID:">
                            <el-input  v-model="addForm.iccid" auto-complete="off"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item
                                :rules="[{ required: true, message: 'VIN码不能为空'},]"
                                prop="vin"
                                label="VIN码:">
                            <el-input v-model="addForm.vin" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col  :span="10" >
                        <el-form-item prop="carTypeName" label="车型名称:">
                            <el-input  v-model="addForm.carTypeName"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item prop="carBand" label="品牌名称:">
                            <el-input  v-model="addForm.carBand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col  :span="10" >
                        <el-form-item prop="carColor" label="颜色名称:">
                            <el-input  v-model="addForm.carColor"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">

                        <el-form-item prop="carStatus"  label="车辆状态:">
                            <el-select v-model="addForm.carStatus" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in carStatusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col  :span="10" >
                        <el-form-item prop="plate"  label="车牌号:">
                            <el-input  v-model="addForm.plate"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item prop="carUsage" label="车辆用途:">
                            <el-select  v-model="addForm.carUsage" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in carUsageOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">

                    <el-col :span="10">
                        <el-form-item prop="certificateNum" label="合格证号:">
                            <el-input  v-model="addForm.certificateNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="10" >
                        <el-form-item prop="plateTime" label="上牌日期:">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.plateTime"
                                            value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                        </el-form-item></el-col>
                </el-row>

            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelForm('addForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
        <!--<button @click="send">send</button>-->
        <!-- <p>{{msgChild}}</p> -->
    </div>
</template>

<script>
    import {carDataList,addCar} from  '@/api/carCenter';
    import axios from 'axios'
    export default {
        name: "add-cars",
        data(){
            return {
                addForm:{
                    vin: '',
                    iccid:'',
                    carBand:'',
                    carTypeName:'',
                    carStatus:'',
                    plate: '',
                    carColor:'',
                    plateTime: '',
                    certificateNum: '',
                    carUsage: '',
                },
                carStatusOptions:[{
                    value:0,
                    label: '待整备'
                }, {
                    value: 1,
                    label: '已整备'
                }, {
                    value:2,
                    label: '运营中'
                }],
                carUsageOptions:[{
                    value:0,
                    label: '乘用车'
                }, {
                    value: 1,
                    label: '商用车'
                }],
                msgChild:'child'
            }
        },
        methods:{
            submitForm(formName){
                this.$emit('child-info',this.addForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.addForm);
                        // axios.post('http://10.200.179.194:8080/carInfo/insert',JSON.stringify(this.addForm),{
                        //     headers:{
                        //         'content-Type':'application/json'
                        //     }})
                        //     .then(response => {this.listLoading = false;
                        //         console.log(response.results.datas);
                        //         this.$refs[formName].resetFields();
                        //         })
                        //     .catch(error => console.log(error));
                        addCar(JSON.stringify(this.addForm)).then(response => {
                            this.$message.success('新增成功');
                        this.$refs[formName].resetFields();

                        }).catch(error=>{
                            this.$message.error('新增失败');
                        this.$refs[formName].resetFields();
                        })
                        //表单清空

                    } else {
                        this.$refs[formName].resetFields();
                        return false;
                    }
                });
            },
            cancelForm(formName){
                this.$emit('child-cancel',this.addForm);
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .dialog-footer{
        text-align: center;
    }

</style>