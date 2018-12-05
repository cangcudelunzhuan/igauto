<template>
    <div class="device-page">
        <div class="export-box">
            <el-button type="primary" size="small" @click="handleExport">导出</el-button>
        </div>
        <div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="设备名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="设备类型"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="终端版本号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="软件版本号"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="厂家"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="更新日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
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
        <div>
            <el-dialog :visible.sync="dialogTableVisible">
                <div>
                    <table class="alert-table" border="1">
                        <tr>
                            <td rowspan="3" class="row-tr">出厂信息</td>
                            <td class="table-title">设备ID</td>
                            <td>1234562</td>
                            <td class="table-title">设备型号</td>
                            <td>erdai</td>
                        </tr>
                        <tr>
                            <td class="table-title">设备类型</td>
                            <td>车载终端</td>
                            <td class="table-title">设备序列号</td>
                            <td>1231231232</td>
                        </tr>
                        <tr>
                            <td class="table-title">设备生产商</td>
                            <td>恒全</td>
                            <td class="table-title"></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td rowspan="3" class="row-tr">设备参数</td>
                            <td class="table-title">网络类型</td>
                            <td>GSM</td>
                            <td class="table-title">网络服务商</td>
                            <td>中国移动</td>
                        </tr>
                        <tr>
                            <td class="table-title">定位方法</td>
                            <td>GPS+AGPS</td>
                            <td class="table-title">动态属性采集</td>
                            <td>支持</td>
                        </tr>
                        <tr>
                            <td class="table-title">设备IMEI</td>
                            <td>1235663345522</td>
                            <td class="table-title"></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td rowspan="2" class="row-tr">运营信息</td>
                            <td class="table-title">授权点</td>
                            <td>江苏分部</td>
                            <td class="table-title">用户类型</td>
                            <td>车企</td>
                        </tr>
                        <tr>
                            <td class="table-title">区域</td>
                            <td>江苏</td>
                            <td class="table-title"></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td rowspan="2" class="row-tr">状态信息</td>
                            <td class="table-title">出库时间</td>
                            <td>2017-02-02</td>
                            <td class="table-title">合作服务商</td>
                            <td>吉利</td>
                        </tr>
                        <tr>
                            <td class="table-title">设备状态</td>
                            <td>正常</td>
                            <td class="table-title">绑定时间</td>
                            <td>2018-02-16</td>
                        </tr>
                    </table>
                </div>
                <div class="close-box">
                    <el-button type="primary" size="small" @click="closeDialog">关闭</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick(row) {
                this.dialogTableVisible = true;
                console.log(row);
            },
            closeDialog(){
                this.dialogTableVisible = false;
            },
            handleExport(){

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        name: "device-management",
        data() {
            return {
                dialogTableVisible:false,
                currentPage1: 1,
                tableData: []
            }
        }
    }
</script>

<style scoped>
    .device-page{
        padding: 15px;
    }
    .export-box{
        text-align: right;
        margin-bottom: 10px;
    }
    .close-box{
        padding: 20px;
        text-align: center;
    }
   .alert-table {
        border-collapse: collapse;
        width: 50em;
        margin:0 auto;
        border: 1px solid #666;
    }
   .alert-table .row-tr{
      background-color: #ddd;
   }
   .alert-table .table-title{
    background-color: #ABCDEF;
   }
   .alert-table th,.alert-table td {
        padding: 0.1em 1em;
       text-align: center;
    }
    .right-pagination{
        float: right;
        padding-top: 15px;
    }

</style>