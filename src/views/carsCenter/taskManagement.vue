<template>
    <div class="task-management-page">
        <div>
            <el-form class="" ref="form" :model="form" label-width="6.5rem">
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
                    <el-col  :md="6" :lg="4" >
                        <el-form-item  label="执行状态">
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
                    <el-col  :md="3" :lg="6" >
                        <el-form-item>
                            <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col  :md="3" :lg="6" >
                        <el-form-item>
                            <el-upload
                                    class="upload-file"
                                    ref="upload"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :show-file-list="false"
                                    :file-list="fileList"
                                    :auto-upload="true">
                                <el-button slot="trigger" type="primary" size="small" >导入</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

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
                        label="ICCID"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="初始VIN码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="最终VIN码"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="车型"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="执行时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="执行状态"
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
        name: "task-management",
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
                currentPage1: 1,
                tableData3: [{name:'11'}],
                listLoading:false,
            }
        },
        methods: {
            onSubmit(value){
                console.log(value)

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
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
    .task-management-page{
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
    .right-pagination{
        float: right;
        padding-top: 15px;
    }
    .last-file-item{
        width: 20rem;
    }
    .files-input{
        width:12.5rem;
    }
</style>