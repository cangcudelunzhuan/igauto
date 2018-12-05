<template>
    <div>
        <el-row>
            <el-col :span="12">
                <ul>
                    <li>可充电储能装置个数 : {{realData.extremeData.chargingDeviceVoltageSum}}</li>
                    <li>可充电储能装置数据集合 : {{realData.extremeData.chargingDeviceVoltage}}</li>
                    <li>可充电储能装置子系统号 : {{realData.extremeData.chargingDeviceVoltageNum}}</li>
                    <li>可充电储能装置电压(V) : {{realData.extremeData.energyStorageDeviceVoltage}}</li>
                    <li>可充电储能装置电流(A) : {{realData.extremeData.energyStorageDeviceCurrent}}</li>

                </ul>
            </el-col>
            <el-col :span="12">
                <ul>
                    <li>单体电池总数 : {{realData.extremeData.singleCellCount}}</li>
                    <li>本帧起始电池序号 : {{realData.extremeData.frameCellStartNum}}</li>
                    <li>本帧单体电池总数 : {{realData.extremeData.frameSingleCellCount}}</li>
                    <li>单体电池电压(V) : {{realData.extremeData.singleCellVoltage}}</li>
                </ul>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    export default {
        name: "extreme-data",
        computed: {
            ...mapGetters([
                'realData',
                'name',
                'roles'
            ])
        },
        mounted () {
            console.log('這是個數據：',this.realData);
        },
    }
</script>

<style scoped>

</style>