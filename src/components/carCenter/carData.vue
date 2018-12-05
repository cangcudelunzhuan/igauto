<template>
    <div class="table-page">
        <table class="alert-table" border="1">
            <tr>
                <td class="table-title">电源模式</td>
                <td></td>
                <td class="table-title">充电状态</td>
                <td></td>
                <td class="table-title">运行模式</td>
                <td></td>

            </tr>
            <tr>
                <td class="table-title">车速</td>
                <td></td>
                <td class="table-title">累计里程</td>
                <td></td>
                <td class="table-title">总电压</td>
                <td></td>
            </tr>
            <tr>
                <td class="table-title">总电流</td>
                <td></td>
                <td class="table-title">电池电量</td>
                <td></td>
                <td class="table-title">dadc状态</td>
                <td></td>
            </tr>
            <tr>
                <td class="table-title">档位</td>
                <td></td>
                <td class="table-title">绝缘电阻</td>
                <td></td>
                <td class="table-title">加速踏板行程值</td>
                <td></td>
            </tr>
            <tr>
                <td class="table-title">制动踏板状态</td>
                <td></td>
                <td class="table-title">可续航里程</td>
                <td></td>
                <td class="table-title">剩余电量</td>
                <td></td>
            </tr>
            <tr>
                <td class="table-title">中控锁状态</td>
                <td></td>
                <td class="table-title">左前车门</td>
                <td></td>
                <td class="table-title">右前车门</td>
                <td></td>
            </tr>
            <tr>
                <td class="table-title">左后车门</td>
                <td></td>
                <td class="table-title">右后车门</td>
                <td></td>
                <td class="table-title">手刹状态</td>
                <td></td>
            </tr>
            <tr>
                <td class="table-title">车头方向</td>
                <td></td>
                <td class="table-title">高度</td>
                <td></td>
                <td class="table-title">GNSS状态</td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            };
        },
        name: "car-data"
    }
</script>

<style scoped>
    .table-page{
        padding: 0 15px;
    }
    .alert-table {
        border-collapse: collapse;
        width: 100%;
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
        font-size: 15px;
        color: #333;
        padding: 0.4em 0.4em;
        box-sizing: border-box;
        width:16.66%;
        text-align: center;
    }

</style>