<template>
    <div class="add-car-page">
        <div class="add-car-item">
            <div class="page-text">基本信息</div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-row :gutter="20">
                    <el-col :md="6" :lg="4">
                        <el-form-item  label="VIN:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item label="ICCID:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item label="最高车速:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">KM/H</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="6" :lg="4">
                        <el-form-item  label="车型:">
                            <el-select v-model="value4" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item  label="驱动电机位置:">
                            <el-select v-model="value5" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="6" :lg="4" :offset="1">
                        <el-form-item label="纯电续航里程:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">KM</span>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="add-car-item">
            <div class="page-text">档位传动比</div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-row :gutter="20">
                    <el-col :md="6" :lg="4">
                        <el-form-item  label="档位:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item label="传动比:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">：1</span>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="add-car-item">
            <div class="page-text">可充电储能装置</div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-row :gutter="20">
                    <el-col :md="6" :lg="4">
                        <el-form-item  label="系统编码:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item  label="储能装置类型:">
                            <el-select v-model="value5" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item label="总能量:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">KWH</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col  :md="6" :lg="4" >
                        <el-form-item  label="冷却方式:">
                            <el-select v-model="value5" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="add-car-item">
            <div class="page-text">驱动电机信息</div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-row :gutter="20">
                    <el-col :md="6" :lg="4">
                        <el-form-item  label="序号:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item  label="冷却方式:">
                            <el-select v-model="value5" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item label="额定电压:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">V</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col  :md="6" :lg="4">
                        <el-form-item label="最大工作电流:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">A</span>
                    </el-col>
                    <el-col  :md="6" :lg="4" >
                        <el-form-item label="峰值功率:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">KWH</span>
                    </el-col>
                    <el-col  :md="6" :lg="4" >
                        <el-form-item label="最高转速:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">r/min</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col  :md="6" :lg="4" >
                        <el-form-item label="峰值转矩:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">N-M</span>
                    </el-col>
                    <el-col  :md="6" :lg="4" >
                        <el-form-item label="最大输出转矩:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">N-M</span>
                    </el-col>

                    <el-col  :md="6" :lg="4" >
                        <el-form-item  label="固定型号:">
                            <el-select v-model="value5" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="add-car-item">
            <div class="page-text">燃油信息</div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-row :gutter="20">
                    <el-col :md="6" :lg="4">
                        <el-form-item label-suffix="12" label="发动机编号:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item  label="燃油类型:">
                            <el-select v-model="value5" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item  label="燃油编号:">
                            <el-select v-model="value5" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col  :md="6" :lg="4">
                        <el-form-item  label="最大输出功率:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">KWH</span>
                    </el-col>
                    <el-col  :md="6" :lg="4">
                        <el-form-item  label="最大输出转矩:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="1" :lg="1">
                        <span class="left">N-M</span>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="add-car-item">
            <div class="page-text">燃油信息</div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-row :gutter="20">
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item  label="通用报警类型:">
                            <el-select v-model="value5" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="6" :lg="4" :offset="1">
                        <el-form-item  label="报警阈值:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add-cars",
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',

                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value4: '',
                value5: '',
                value6: '',
                value7: '',
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
    .add-car-page{
        /*background-color: #f6f8f9;*/
        /*padding-top: 5px;*/
        /*background-color: #fdf8f9;*/
         /*box-shadow: 1px 1px 2px #ddd;*/
    }
    .add-car-item{
        background-color: #fdf8f9;
        box-shadow: 1px 1px 2px #ddd;
        margin-top: 15px;
    }
    .el-form-item-box:after{
        content: '';
        display: block;
        clear: both;
    }
    .page-text{
        font-size:16px;
        color:#666;
        padding: 0px 15px 5px 10px;
        margin-bottom: 10px;
    }
    .left{
        float: left;
        height: 36px;
        line-height: 36px;
        color:#666;
        font-size:16px;

    }
    .el-form-item-box .el-form-item:last-child{
        margin-left:2.5rem;
    }
    .el-form-item-box .el-form-item-km:last-child{
        margin-left:0.375rem;
    }

</style>