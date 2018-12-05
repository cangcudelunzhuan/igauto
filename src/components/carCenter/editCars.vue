<template id="child">
    <div>
        <div class="component-choose">
            <el-form class="" ref="editData"  label-width="80px">
                <el-row :gutter="20">
                    <el-col  :span="10" >
                        <el-form-item  prop="iccid"
                                       label="ICCID:">
                            <el-input :disabled="true"  v-model="editData.iccid" auto-complete="off"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item
                                prop="vin"
                                label="VIN码:">
                            <el-input :disabled="true" v-model="editData.vin" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col  :span="10" >
                        <el-form-item prop="carTypeName" label="车型名称:">
                            <el-input  v-model="editData.carTypeName"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item prop="carBand" label="品牌名称:">
                            <el-input  v-model="editData.carBand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col  :span="10" >
                        <el-form-item prop="carColor" label="颜色名称:">
                            <el-input  v-model="editData.carColor"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">

                        <el-form-item prop="carStatus"  label="车辆状态:">
                            <el-select v-model="editData.carStatus" clearable placeholder="请选择">
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
                            <el-input  v-model="editData.plate"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="10">
                        <el-form-item prop="carUsage" label="车辆用途:">
                            <el-select  v-model="editData.carUsage" clearable placeholder="请选择">
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
                            <el-input  v-model="editData.certificateNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="10" >
                        <el-form-item prop="plateTime" label="上牌日期:">
                            <el-date-picker type="datetime" placeholder="选择日期" v-model="editData.plateTime"
                                            value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                        </el-form-item></el-col>
                </el-row>

            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEditForm('editForm')">取 消</el-button>
            <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
        </div>
        <!--<button @click="send">send</button>-->
        <!-- <p>{{msgChild}}</p> -->
    </div>
</template>

<script>
    import {editCar} from  '@/api/carCenter';
    import axios from 'axios'
    export default {
        name: "edit-cars",
        props: {
            editData: {
                type: Object,
            },
        },

        data(){
            return {

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
            }
        },

        methods:{
            submitEditForm(formName){
                this.$emit('child-edit',this.editData);
                console.log(this.editData);
                        //表单清空
                        // this.$refs[formName].resetFields();
                        // editCar(JSON.stringify(this.addForm)).then(response => {
                        //     this.$message.success('新增成功');
                        // this.$refs[formName].resetFields();
                        //
                        // }).catch(error=>{
                        //     this.$message.error('新增失败');
                        // this.$refs[formName].resetFields();
                        // })
                        axios.post('http://10.200.179.194:8080/carInfo/edit',JSON.stringify(this.editData),{
                            headers:{
                                'content-Type':'application/json'
                            }})
                            .then(response => {
                                this.listLoading = false;
                            })
                            .catch(error => console.log(error));
            },
            cancelEditForm(formName){

                this.$emit('child-editCancel',this.addForm);
            }
        }
    }
</script>

<style scoped>
    .dialog-footer{
        text-align: center;
    }

</style>