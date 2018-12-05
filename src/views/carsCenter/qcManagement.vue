<template>
    <div class="qc-management-page">
        <div>
            <el-form class="" ref="form" :model="form" label-width="100px">
                <div class="file-form">
                    <el-row :gutter="20">
                        <el-col :md="6" :lg="4">
                            <el-form-item class="file-item" label="VIN码:">
                                <el-input  v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col  :md="6" :lg="4" >
                            <el-form-item class="file-item" label="ICCID:">
                                <el-input  v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col  :md="12" :lg="8" >
                            <el-form-item label="起止时间:">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="file-form">
                    <el-form-item class="file-item" label="手机号:">
                        <el-input class="files-input" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item class="file-item" label="质检员姓名:">
                        <el-input class="files-input" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item class="file-item" label="质检结果:">
                        <el-select v-model="value4" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="file-item">
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button  @click="exportFile">导出</el-button>
                    </el-form-item >
                </div>

            </el-form>
        </div>
        <div>
            <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    style="width: 100%"
                    v-loading.body="listLoading"
                    element-loading-text="拼命加载中"
                    border fit highlight-current-row
            >
                <el-table-column
                        label="序号"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="质检员姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="手机号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="VIN码"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="ICCID"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="质检时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="质检结果"
                >
                </el-table-column>
            </el-table>
            <div class="pagination-item">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage1"
                        :page-size="100"
                        class="right-pagination"
                        layout="total, prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "qc-management",
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
                    activeIndex: '1',
                    activeIndex2: '1'
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
                fileList: [],
                currentPage1: 5,
                tableData3: [{name:'11'}],
                listLoading:false,
            }
        },
        methods: {
            onSubmit(value){
                console.log(value)
            },
            exportFile(){
                console.log('这是导出按钮')
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
    }
</script>

<style scoped>
    .qc-management-page{
        padding: 15px;
    }

    .file-form:after,pagination-item:after{
        content: '';
        display: block;
        clear: both;
    }
    .file-item{
        float: left;
    }
    .deliver-line{
        color:rgb(200, 200, 200);
        padding: 0 5px;
    }
    .right-pagination{
        float: right;
        padding-top: 15px;
    }
    .files-input{
        width:12.5rem;
    }
</style>