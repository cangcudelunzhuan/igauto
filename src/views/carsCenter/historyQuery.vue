<template>
    <div class="history-query-page">
        <div>
            <el-form  ref="form"  :model="form"  label-width="100px">
                <el-row :gutter="20">
                    <!--<el-col  :md="6" :lg="4" >-->
                    <!--<el-form-item class="file-item" label="车牌号:">-->
                    <!--<el-input  v-model="form.name"></el-input>-->
                    <!--</el-form-item></el-col>-->
                    <el-col :lg="5" :lx="4">
                        <el-form-item class="file-item"
                                      label="车牌/VIN码:"
                                      prop="vin"
                                      :rules="[{ required: true, message: 'VIN码/车牌号不能为空'}]"
                        >
                            <el-input  v-model="form.vin"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :lg="12" :lx="8" >
                        <el-form-item label="起止时间:" prop="carDatetime" :rules="[{ required: true, message: '时间不能为空'}]">
                            <el-date-picker
                                    v-model="form.carDatetime"
                                    style="width:400px"
                                    type="datetimerange"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator="-"
                                    @change = 'dateTimeChange'
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col  :lg="6" :lx="12" class="noleft">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('form')">查询</el-button>
                            <el-button  @click="exportFile(0)">导出报文</el-button>
                            <el-button  @click="exportFile(1)">导出表格</el-button>
                        </el-form-item >
                    </el-col>
                </el-row>

                <!--<el-row :gutter="20">-->
                    <!--<el-col  :md="6" :lg="4" >-->
                        <!--<el-form-item  label="报文类型:">-->
                            <!--<el-select v-model="value4" clearable placeholder="请选择">-->
                                <!--<el-option-->
                                        <!--v-for="item in options"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.value">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :md="6" :lg="4">-->
                        <!--<el-form-item  label="报文校验:">-->
                            <!--<el-select v-model="value4" clearable placeholder="请选择">-->
                                <!--<el-option-->
                                        <!--v-for="item in checkOption"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.value">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :md="6" :lg="4">-->
                        <!--<el-form-item  label="规约类型:">-->
                            <!--<el-select v-model="value4" clearable placeholder="请选择">-->
                                <!--<el-option-->
                                        <!--v-for="item in protocolOption"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.value">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->

                <!--</el-row>-->
            </el-form>
        </div>
        <!--<div class="button-box">-->
            <!--<el-button type="primary" @click="onAnalysisSubmit">国标解析</el-button>-->
            <!--<el-button  @click="exportFile">数据项</el-button>-->
        <div>
            <el-dropdown :hide-on-click="false" class="dropdown-box">
                  <span class="el-dropdown-link">
                    自定义列表
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><el-checkbox v-model="vehicleStatusData">整车数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="driveMotorData">驱动电机数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="fuelBatteryData">燃料电池数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="batteryData">电池数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="engineData">发动机数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="vehiclePositionData">车辆位置数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="chargingDeviceVoltageData">可充电储能装置电压数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="chargingDeviceTempData">可充电储能温度数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="extremeData">极值数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="alarmDatas">报警数据</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox v-model="chargingData">充电数据</el-checkbox></el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!--</div>-->
        <div>
            <el-table
                    :data="tableData"
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
                        label="VIN码"
                >
                    <template slot-scope="scope">
                        {{scope.row.vin}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="车牌号"
                        align="center"
                >
                    <template slot-scope="scope">
                        {{scope.row.plate}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="是否补发"
                >
                    <template slot-scope="scope">
                        {{scope.row.messageType==2?'否':scope.row.messageType==3?'是':'-'}}
                    </template>
                </el-table-column>

                <el-table-column
                        label="采集时间"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.samplingTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="服务器接收时间"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.receiveTime)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='电源模式' >
                    <template slot-scope="scope">
                        {{scope.row.vehicleStatusData.powerMode==0?'发动机熄火':scope.row.vehicleStatusData.powerMode==4?'启动':'-'}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='充电状态' >
                    <template slot-scope="scope">
                        {{
                        scope.row.vehicleStatusData.chargingStatus ==0?'default'
                        :scope.row.vehicleStatusData.chargingStatus ==1?'停车充电（正在充电）':scope.row.vehicleStatusData.chargingStatus ==2?'行驶充电':
                            scope.row.vehicleStatusData.chargingStatus ==3?'未充电':scope.row.vehicleStatusData.chargingStatus ==4?'充电完成（充满电）':
                                scope.row.vehicleStatusData.chargingStatus ==5?'正在加热':scope.row.vehicleStatusData.chargingStatus ==6?'熄灭':'-'
                        }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='累计里程(km)' >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.totalMileage)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='总电压(V)' >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.totalVoltage)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='总电流(A)' >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.totalCurrent)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='电池电量(%)' >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.soc)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='可续航里程(km)' >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.remainingMileage)}}
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="vehicleStatusData"
                    align="center"
                    label='运行模式'
                    width="95"
                >
                    <template slot-scope="scope">
                        {{
                        scope.row.vehicleStatusData.driveMode==1?'纯电':scope.row.vehicleStatusData.driveMode==2?'混动':
                            scope.row.vehicleStatusData.driveMode==3?'燃油':'-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="vehicleStatusData"
                        align="center"
                        label='车速(km/h)'
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.speed)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="vehicleStatusData"
                        align="center"
                        label='dcdc状态'
                        width="95"
                >
                    <template slot-scope="scope">
                        {{scope.row.vehicleStatusData.dcdcStatus==1?'工作':scope.row.vehicleStatusData.dcdcStatus==2?'断开':'-'
                        }}
                            </template>
                </el-table-column>
                <el-table-column
                        v-if="vehicleStatusData"
                        align="center"
                        label='档位'
                        width="60"
                >
                    <template slot-scope="scope">
                        {{scope.row.vehicleStatusData.transmissionMode==0?'空档（N）':scope.row.vehicleStatusData.transmissionMode==1?'1挡':
                        scope.row.vehicleStatusData.transmissionMode==2?'2挡':scope.row.vehicleStatusData.transmissionMode==3?'3挡':
                            scope.row.vehicleStatusData.transmissionMode==4?'4挡':scope.row.vehicleStatusData.transmissionMode==5?'5挡':
                                scope.row.vehicleStatusData.transmissionMode==6?'6挡':scope.row.vehicleStatusData.transmissionMode==7?'7挡':
                                    scope.row.vehicleStatusData.transmissionMode==8?'8挡':scope.row.vehicleStatusData.transmissionMode==9?'9挡':
                                        scope.row.vehicleStatusData.transmissionMode==10?'10挡':scope.row.vehicleStatusData.transmissionMode==11?'11挡':
                                            scope.row.vehicleStatusData.transmissionMode==12?'12挡':scope.row.vehicleStatusData.transmissionMode==13?'倒挡（R）':
                                                scope.row.vehicleStatusData.transmissionMode==14?'自动D挡':scope.row.vehicleStatusData.transmissionMode==15?'停车P挡':'-'
                        }}
                            </template>
                </el-table-column>
                <el-table-column
                        v-if="vehicleStatusData"
                        align="center"
                        label='剩余电量(kWh)'
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.remainingBattery)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="vehicleStatusData"
                        align="center"
                        width="95"
                        label='绝缘电阻(KΩ)'
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.insulation)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="vehicleStatusData"
                        align="center"
                        label='车头方向'
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.gnssDirection)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="vehicleStatusData"
                        align="center"
                        label='高度(m)'
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.altitude)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="vehicleStatusData"
                        align="center"
                        label='GNSS信号强度'
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.vehicleStatusData.gnssSignalStrength)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="vehicleStatusData"
                        align="center"
                        label='车辆行驶状态'
                        width="95"
                >
                    <template slot-scope="scope">
                        {{scope.row.vehicleStatusData.carState==0?'行驶':scope.row.vehicleStatusData.carState==1?'停止':'-' }}
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="driveMotorData"
                    align="center"
                    label="驱动电机个数"
                    width="95"
                >
                    <template slot-scope="scope">
                    {{getData(scope.row.driveMotorData.driveMotroSum)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="driveMotorData"
                        align="center"
                        label="驱动电机数据"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.driveMotorData.driveMotorIndex)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="driveMotorData"
                        align="center"
                        label="驱动电机状态"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{
                        scope.row.driveMotorData.driveMotorStatus==1?'耗电':
                            scope.row.driveMotorData.driveMotorStatus==2?'发电':scope.row.driveMotorData.driveMotorStatus==3?'关闭':
                                scope.row.driveMotorData.driveMotorStatus==4?'准备':'-'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="driveMotorData"
                        align="center"
                        label="驱动电机控制温度(℃)"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.driveMotorData.driveMotorControllerTemp)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="driveMotorData"
                        align="center"
                        label="驱动电机转速(r/min)"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.driveMotorData.driveMotorSpeed)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="driveMotorData"
                        align="center"
                        label="驱动电机转矩(N·m)"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.driveMotorData.driveMotorTorque)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="driveMotorData"
                        align="center"
                        label="驱动电机温度(℃)"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.driveMotorData.driveMotorTemp)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="driveMotorData"
                        align="center"
                        label="电机控制器输入电压(V)"

                >
                    <template slot-scope="scope">
                        {{getData(scope.row.driveMotorData.motorControllerInputVoltage)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="driveMotorData"
                        align="center"
                        label="电机控制器直流母线电流(A)"
                        width="130"
                >
                    <template slot-scope="scope">
                        <el-tooltip placement="top">
                            <div slot="content">{{getData(scope.row.driveMotorData.motorControllerCurrent)}}</div>
                            <span class="hide-txt">{{getData(scope.row.driveMotorData.motorControllerCurrent)}}</span>
                        </el-tooltip>

                    </template>
                </el-table-column>

                <el-table-column
                v-if="fuelBatteryData"
                align="center"
                label="燃料电池电压(V)"
                width="95"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.fuelBatteryData.fuelBatteryVoltage)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="燃料电池电流(A)"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.fuelBatteryData.fuelBatteryCurrent)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="燃料消耗率(L/100km)"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.fuelBatteryData.fuelConsumption)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="燃料电池温度探针总数"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.fuelBatteryData.fuelBatteryTempProbeCount)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="探针温度数(℃)"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{scope.row.fuelBatteryData.probeTempValue.length>0?scope.row.fuelBatteryData.probeTempValue:'-'}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="氢系统中最高温度(℃)"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.fuelBatteryData.hydrogenSysMaxTemp)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="氢系统中最高温度探针序号"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.fuelBatteryData.hydrogenSysMaxTempPropeNum)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="氢气最高浓度(ppm)"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.fuelBatteryData.hydrogenMaxConcentration)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="氢气最高浓度传感器代号"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.fuelBatteryData.hydrogenMaxConcentrationSensorNum)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="氢气最高压力(MPa)"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.fuelBatteryData.hydrogenMaxPressure)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="氢气最高压力传感器代号"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.fuelBatteryData.hydrogenMaxPressureSensorNum)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="fuelBatteryData"
                        align="center"
                        label="高压DC-DC状态"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{scope.row.fuelBatteryData.hydrogenDcdcStatus==0?'工作':scope.row.fuelBatteryData.hydrogenDcdcStatus==2?'断开': '-'}}

                        </template>

                </el-table-column>
                <!--<el-table-column-->
                        <!--v-if="batteryData"-->
                        <!--align="center"-->
                        <!--label="动力电池健康状态"-->
                        <!--width="95"-->
                <!--&gt;-->

                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.batteryData.batteryHealthStatus}}-->
                        <!--</template>-->

                <!--</el-table-column>-->
                <el-table-column
                        v-if="batteryData"
                        align="center"
                        label="动力电池温度(℃)"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.batteryData.batteryTemp)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="engineData"
                        align="center"
                        label="发动机状态"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{scope.row.engineData.engineStatus==1?'启动状态':scope.row.engineData.engineStatus==2?'关闭状态': '-'}}

                        </template>

                </el-table-column>
                <el-table-column
                        v-if="engineData"
                        align="center"
                        label="曲轴转速(rpm)"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.engineData.crankshaftSpeed)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="engineData"
                        align="center"
                        label="发动机燃料消耗率(L/100km)"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.engineData.engineFuelConsumption)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="vehiclePositionData"
                        align="center"
                        label="定位状态"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{scope.row.vehiclePositionData.positionStatus==0?'东经北纬':scope.row.vehiclePositionData.positionStatus==2?'东经南纬':
                            scope.row.vehiclePositionData.positionStatus==4?'西经北纬':scope.row.vehiclePositionData.positionStatus==6?'西经南纬':'-'
                            }}

                        </template>

                </el-table-column>
                <el-table-column
                        v-if="vehiclePositionData"
                        align="center"
                        label="经度"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.vehiclePositionData.longitude)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="vehiclePositionData"
                        align="center"
                        label="纬度"
                        width="95"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.vehiclePositionData.latitude)}}
                        </template>

                </el-table-column>





                <el-table-column
                        v-if="chargingDeviceVoltageData"
                        align="center"
                        label="可充电储能装置个数"
                        width="95"
                >
                        <template slot-scope="scope">
                            {{getData(scope.row.chargingDeviceVoltageData.chargingDeviceVoltageSum)}}
                        </template>
                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceVoltageData"
                        align="center"
                        label="可充电储能装置子系统号"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.chargingDeviceVoltageData.chargingDeviceVoltageNum)}}

                    </template>
                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceVoltageData"
                        align="center"
                        label="可充电储能装置电压(V)"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.chargingDeviceVoltageData.energyStorageDeviceVoltage)}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceVoltageData"
                        align="center"
                        label="可充电储能装置电流(A)"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.chargingDeviceVoltageData.energyStorageDeviceCurrent)}}

                    </template>
                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceVoltageData"
                        align="center"
                        label="单体电池总数"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.chargingDeviceVoltageData.singleCellCount)}}

                    </template>
                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceVoltageData"
                        align="center"
                        label="本帧起始电池序号"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.chargingDeviceVoltageData.frameCellStartNum)}}

                    </template>
                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceVoltageData"
                        align="center"
                        label="本帧单体电池总数"
                        width="95"
                >
                    <template slot-scope="scope">
                        {{getData(scope.row.chargingDeviceVoltageData.frameSingleCellCount)}}

                    </template>
                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceVoltageData"
                        align="center"
                        label="单体电池电压(V)"
                        width="95"
                >
                    <template slot-scope="scope">
                        <el-tooltip placement="top">
                            <div slot="content">{{getData(scope.row.chargingDeviceVoltageData.singleCellVoltage)}}</div>
                            <span class="hide-txt">{{getData(scope.row.chargingDeviceVoltageData.singleCellVoltage)}}</span>
                        </el-tooltip>

                    </template>

                </el-table-column>




                <el-table-column
                        v-if="chargingDeviceTempData"
                        align="center"
                        label="可充电储能子系统个数"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.chargingDeviceTempData.chargingDeviceTempSum)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceTempData"
                        align="center"
                        label="可充电储能子系统号"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.chargingDeviceTempData.chargingDeviceTempNum)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceTempData"
                        align="center"
                        label="可充电储能子系统温度探针个数"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.chargingDeviceTempData.chargingDeviceTempProbeSum)}}

                    </template>

                </el-table-column>
                <el-table-column
                        v-if="chargingDeviceTempData"
                        align="center"
                        label="可充电储能子系统温度各探针检测到的温度值(℃)"
                >

                    <template slot-scope="scope">
                        <el-tooltip placement="top">
                            <div slot="content">{{getData(scope.row.chargingDeviceTempData.chargingTempProbeValue)}}</div>
                            <span class="hide-txt">{{getData(scope.row.chargingDeviceTempData.chargingTempProbeValue)}}</span>
                        </el-tooltip>

                    </template>

                </el-table-column>



                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最高电压电池子系统号"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.extremeData.maxBatteryVoltageNum)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最高电压电池单体代号"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.extremeData.maxBatteryVoltageCellNum)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="电池单体电压最高值(V)"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.extremeData.maxBatteryVoltageCellValue)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最低电压电池子系统号"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.extremeData.minBatteryVoltageNum)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最低电压电池单体代号"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.extremeData.minBatteryVoltageCellNum)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最低电压电池子系统号"
                >

                        <template slot-scope="scope">
                            {{getData(scope.row.extremeData.minBatteryVoltageNum)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="电池单体电压最低值(V)"

                >

                        <template slot-scope="scope">
                            {{getData(scope.row.extremeData.minBatteryVoltageCellValue)}}
                        </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最高温度子系统号"

                >

                    <template slot-scope="scope">
                        {{getData(scope.row.extremeData.maxTempNum)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最高温度探针序号"
                        width="95"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.extremeData.maxTempPropeNum)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最高温度值(℃)"
                        width="95"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.extremeData.maxTempValue)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最低温度子系统号"
                        width="95"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.extremeData.minTempNum)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最低温度探针序号"
                        width="95"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.extremeData.minTempPropeNum)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="extremeData"
                        align="center"
                        label="最低温度值(℃)"
                        width="95"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.extremeData.minTempValue)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="chargingData"
                        align="center"
                        label="已充电时长"
                        width="95"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.chargingData.chargingTotal)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="chargingData"
                        align="center"
                        label="剩余充电时长"
                        width="95"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.chargingData.chargingRemain)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="chargingData"
                        align="center"
                        label="充电状态"
                        width="95"
                >

                    <template slot-scope="scope">
                        {{scope.row.chargingData.chargingStatus==0?'default':scope.row.chargingData.chargingStatus==1?'停车充电（正在充电':
                        scope.row.chargingData.chargingStatus==2?'行驶充电':scope.row.chargingData.chargingStatus==3?'未充电':
                            scope.row.chargingData.chargingStatus==4?'充电完成（充满电）':scope.row.chargingData.chargingStatus==5?'正在加热':
                                scope.row.chargingData.chargingStatus==6?'熄灭': '-'
                        }}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="chargingData"
                        align="center"
                        label="充电内容"
                        width="95"
                >

                    <template slot-scope="scope">
                        {{getData(scope.row.chargingData.onBoardChargerData)}}
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="alarmDatas"
                        align="center"
                        label="告警"
                        width="95"
                >

                    <template slot-scope="scope">
                        <el-tooltip placement="top">
                            <div slot="content">{{getData(scope.row.alarmDatas.alarmName)}}</div>
                            <span class="hide-txt">{{getData(scope.row.alarmDatas.alarmName)}}</span>
                        </el-tooltip>
                        <!--<el-tooltip class="item" effect="dark" :content="scope.row.alarmDatas.alarmName" placement="top-start">-->
                            <!--<el-button>{{scope.row.alarmDatas.alarmName}}</el-button>-->
                            <!--<span class="hide-txt" :title="scope.row.alarmDatas.alarmName">{{scope.row.alarmDatas.alarmName}}</span>-->
                        <!--</el-tooltip>-->

                    </template>

                </el-table-column>
                <!--<el-table-column-->
                        <!--v-if="alarmDatas"-->
                        <!--align="center"-->
                        <!--label="告警具体值"-->
                        <!--width="95"-->
                <!--&gt;-->

                    <!--<template slot-scope="scope">-->
                        <!--{{scope.row.alarmDatas.data}}-->
                    <!--</template>-->

                <!--</el-table-column>-->

            </el-table>
            <div class="pagination-item">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="form.pageIndex"
                        :page-size="form.pageSize"
                        class="right-pagination"
                        layout="total, prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    var table=[];

    const preDate = new Date();
    var start = new Date(preDate.getTime() - 24*60*60*1000);
    function getTaskTime(fmt,date) {
        var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }

    import {getData} from "@/utils/validate";
    import {getHistoryData,getBaseStandardDetail} from  '@/api/carCenter';
    import axios from 'axios';
    import { mapGetters } from 'vuex'
    export default {
        name: "history-query",
        data() {
            return {
                getData,
                form: {
                    vin: '',
                    date:'',
                    startTime:'',
                    endTime:'',
                    carDatetime:[getTaskTime("yyyy-MM-dd hh:mm:ss",start),getTaskTime("yyyy-MM-dd hh:mm:ss",preDate)],
                    pageSize:10,
                    pageIndex:1,
                },

                value4: '',
                fileList: [],
                vinData:'',
                vehicleStatusData: false,
                driveMotorData: false,
                fuelBatteryData: false,
                batteryData: false,
                engineData: false,
                vehiclePositionData: false,
                chargingDeviceVoltageData: false,
                chargingDeviceTempData: false,
                extremeData: false,
                chargingData: false,
                alarmDatas:false,
                tableData:[],
                listLoading:false,
                standardData:[],
                total:0,
                tHeader: [
                'VIN码', '车牌号', '是否补发',
                '采集时间', '服务器接收时间', '电源模式', '充电状态',
                '累计里程(km)', '总电压(v)', '总电流(A)', '电池电量(%)',
                '可续航里程(km)', '运行模式', 'dcdc状态', '档位',
                '剩余电量(kWh)', '绝缘电阻(KΩ)', '车头方向', '高度(m)',
                'GNSS信号强度', '车辆行驶状态',
                '车速(km/h)', '驱动电机个数',
                '驱动电机数据',  '驱动电机状态' , '驱动电机控制温度(℃)', '驱动电机转速(r/min)',
                '驱动电机转矩(N·m)', '驱动电机温度(℃)', '电机控制器输入电压(V)', '电机控制器直流母线电流(A)',
                '燃料电池电压(v)', '燃料电池电流(A)',
                '燃料消耗率(L/100km)', '燃料电池温度探针总数', '探针温度数(℃)',
                '氢系统中最高温度(℃)', '氢系统中最高温度探针序号', '氢气最高浓度(ppm)',
                '氢气最高浓度传感器代号', '氢气最高压力(MPa)', '氢气最高压力传感器代号',
                '高压DC-DC状态', '动力电池温度(℃)', '发动机状态',
                '曲轴转速(rpm)', '发动机燃料消耗率(L/100km)', '定位状态',
                '经度', '纬度', '可充电储能装置个数', '可充电储能装置子系统号',
                '可充电储能装置电压(V)', '可充电储能装置电流(A)', '单体电池总数',
                '本帧起始电池序号', '本帧单体电池总数', '单体电池电压(V)', '可充电储能子系统个数',
                '可充电储能子系统号', '可充电储能子系统温度探针个数', '可充电储能子系统温度各探针检测到的温度值(℃)',
                '最高电压电池子系统号', '最高电压电池单体代号', '电池单体电压最高值(V)', '最低电压电池子系统号',
                '最低电压电池单体代号',  '电池单体电压最低值(V)', '最高温度子系统号', '最高温度探针序号',
                '最高温度值(℃)', '最低温度子系统号', '最低温度探针序号', '最低温度值(℃)',
                '告警', '已充电时长', '剩余充电时长', '充电数据充电状态', '充电内容'
                ],
                filterVal: [
                'vin', 'plate', 'messageType',
                'samplingTime', 'receiveTime', 'powerMode', 'veChargingStatus',
                'totalMileage', 'totalVoltage', 'totalCurrent', 'soc',
                'remainingMileage', 'driveMode', 'dcdcStatus', 'transmissionMode',
                'remainingBattery', 'insulation', 'gnssDirection', 'altitude',
                'gnssSignalStrength', 'carState',
                'speed', 'driveMotroSum',
                'driveMotorIndex', 'driveMotorStatus', 'driveMotorControllerTemp', 'driveMotorSpeed',
                'driveMotorTorque', 'driveMotorTemp', 'motorControllerInputVoltage', 'motorControllerCurrent',
                 'fuelBatteryVoltage', 'fuelBatteryCurrent',
                'fuelConsumption', 'fuelBatteryTempProbeCount', 'probeTempValue',
                'hydrogenSysMaxTemp', 'hydrogenSysMaxTempPropeNum', 'hydrogenMaxConcentration',
                'hydrogenMaxConcentrationSensorNum', 'hydrogenMaxPressure', 'hydrogenMaxPressureSensorNum',
                'hydrogenDcdcStatus', 'batteryTemp', 'engineStatus',
                'crankshaftSpeed', 'engineFuelConsumption', 'positionStatus',
                'longitude', 'latitude', 'chargingDeviceVoltageSum', 'chargingDeviceVoltageSum',
                'energyStorageDeviceVoltage', 'energyStorageDeviceCurrent', 'singleCellCount',
                'frameCellStartNum', 'frameSingleCellCount', 'singleCellVoltage', 'chargingDeviceTempSum',
                'chargingDeviceTempNum', 'chargingDeviceTempProbeSum', 'chargingTempProbeValue',
                'maxBatteryVoltageNum', 'maxBatteryVoltageCellNum', 'maxBatteryVoltageCellValue', 'minBatteryVoltageNum',
                'minBatteryVoltageCellNum', 'minBatteryVoltageCellValue', 'maxTempNum', 'maxTempPropeNum',
                'maxTempValue', 'minTempNum', 'minTempPropeNum', 'minTempValue',
                'alarmName', 'chargingTotal', 'chargingRemain', 'chChargingStatus','onBoardChargerData'
                ]
            }
        },
        computed: {
            ...mapGetters([
                'historyCarVin',
            ])
        },
        mounted () {
            this.vinData = this.historyCarVin;
            this.form.vin = this.historyCarVin;
            if(this.historyCarVin){
                this.getStandardData();
                this.init();
            }

        },
        activated(){
            this.vinData = this.historyCarVin;
            this.form.vin = this.historyCarVin;
        },


        methods: {
            getTimeDataMonth(val,data){
                if(val<=data){
                    return true
                }else {
                    this.form.carDatetime[1] = getTaskTime("yyyy-MM-dd hh:mm:ss",new Date(new Date(this.form.carDatetime[0]).getTime()+(data * 1000 * 60 * 60 * 24)));
                }
            },

            dateTimeChange(){
                var m = parseInt(this.form.carDatetime[0].substr(5,2));

                var startM = new Date(this.form.carDatetime[0]).getTime();
                var endM = new Date(this.form.carDatetime[1]).getTime();
                var range =  parseInt((endM-startM) / (1000 * 60 * 60 * 24));
                if(m == 1||m==3||m==5||m==7||m==8||m==10||m==12){
                    this.getTimeDataMonth(range,31)
                }else if(m == 4||m==6||m==9||m==11){
                    this.getTimeDataMonth(range,30)
                }else {
                    var y =  parseInt(this.form.carDatetime[0].substr(0,4));

                    if (((y% 4)==0) && ((y% 100)!=0) || ((y % 400)==0)) {
                        this.getTimeDataMonth(range,29)
                    } else {
                        this.getTimeDataMonth(range,28)
                    }
                }
            },
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.form.vin.length==17||this.form.vin.length==7){
                            this.vinData = this.form.vin;
                            this.form.startTime = this.form.carDatetime[0];
                            this.form.endTime =this.form.carDatetime[1];

                            this.handleHistoryData(this.form.vin,this.form.startTime,this.form.endTime,this.form.pageSize,this.form.pageIndex)
                        }else {
                            this.$message.error('请填写正确的vin码或车牌号!');
                        }

                    } else {
                        return false;
                    }
                });


            },

            onAnalysisSubmit(){
                this.$router.push('/carsCenter/nationAnalysis')
            },
             getAllData(item,list){
                var arr=[];
                if(list.length>1){
                    for(var i=0;i<list.length;i++){
                        arr.push(list[i][item])
                    }
                    return arr.join(',')
                }else {
                    arr = list[0][item]
                    return arr
                }
            },
            async handleHistoryData(vinData,startTime,endTime,limit,offset){
                this.listLoading=true;
                var that =this;
                try {
                  let response = await getHistoryData(vinData,startTime,endTime,limit,offset)
                  that.resetData(response)
                } catch (e) {
                  this.listLoading=false;
                }
            },
            resetData (response) {
              let that = this
              var arr=[];
              var carData = response.results.datas;
              if(carData.length>0){
                  for(var i=0;i< carData.length;i++){
                      // vehicleStatusData: false,
                      //     driveMotorData: false,
                      //     fuelBatteryData: false,
                      //     batteryData: false,
                      //     engineData: false,
                      //     vehiclePositionData: false,
                      //     chargingDeviceVoltageData: false,
                      //     chargingDeviceTempData: false,
                      //     extremeData: false,
                      //     chargingData: false
                      carData[i].vehicleData.messageType = carData[i].messageType;
                      carData[i].vehicleData.receiveTime = carData[i].receiveTime;
                      carData[i].vehicleData.plate = carData[i].plate;
                      if(!carData[i].vehicleData.vehicleStatusData){
                          carData[i].vehicleData.vehicleStatusData={};
                      }
                      if(!carData[i].vehicleData.driveMotorData){
                          carData[i].vehicleData.driveMotorData  ={};
                      }
                      if(!carData[i].vehicleData.fuelBatteryData){
                          carData[i].vehicleData.fuelBatteryData  ={};
                      }
                      if(!carData[i].vehicleData.engineData){
                          carData[i].vehicleData.engineData  ={};
                      }
                      if(!carData[i].vehicleData.vehiclePositionData){
                          carData[i].vehicleData.vehiclePositionData  ={};
                      }
                      if(!carData[i].vehicleData.extremeData){
                          carData[i].vehicleData.extremeData  ={};
                      }
                      if(!carData[i].vehicleData.chargingData){
                          carData[i].vehicleData.chargingData  ={};
                      }
                      if(!carData[i].vehicleData.batteryData){
                          carData[i].vehicleData.batteryData  ={};
                      }
                      //alarmDataList
                      if(carData[i].vehicleData.alarmDatas){

                          if(carData[i].vehicleData.alarmDatas.alarmDataList.length>0){
                              if(carData[i].vehicleData.alarmDatas.alarmDataList[0].alarmName){
                                  carData[i].vehicleData.alarmDatas.alarmName = that.getAllData('alarmName',carData[i].vehicleData.alarmDatas.alarmDataList);
//                                        carData[i].vehicleData.alarmDatas.alarmName = carData[i].vehicleData.alarmDatas.alarmDataList[0].alarmName
                              }
                          }else {
                              carData[i].vehicleData.alarmDatas.alarmName ='';
                          }
                      }else {
                          carData[i].vehicleData.alarmDatas.alarmName ='';
                      }
                      carData[i].vehicleData.samplingTime=getTaskTime("yyyy-MM-dd hh:mm:ss",(new Date( carData[i].vehicleData.samplingTime )));
                      if(carData[i].vehicleData.chargingDeviceTempData){
                          if(carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage){
                              if(carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage.length>0){
                                  carData[i].vehicleData.chargingDeviceTempData.chargingDeviceVoltageNum=
                                      carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage[0].chargingDeviceVoltageNum?
                                          that.getAllData('chargingDeviceVoltageNum',carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage):'';
                                  carData[i].vehicleData.chargingDeviceTempData.energyStorageDeviceVoltage=
                                      carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage[0].energyStorageDeviceVoltage?
                                          that.getAllData('energyStorageDeviceVoltage',carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage):'';
                                  carData[i].vehicleData.chargingDeviceVoltageData.energyStorageDeviceCurrent=
                                      carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage[0].energyStorageDeviceCurrent?
                                          that.getAllData('energyStorageDeviceCurrent',carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage):'';
                                  carData[i].vehicleData.chargingDeviceVoltageData.singleCellCount=
                                      carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage[0].singleCellCount?
                                          that.getAllData('singleCellCount',carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage):'';
                                  carData[i].vehicleData.chargingDeviceVoltageData.frameCellStartNum=
                                      carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage[0].frameCellStartNum?
                                          that.getAllData('frameCellStartNum',carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage):'';
                                  carData[i].vehicleData.chargingDeviceVoltageData.frameSingleCellCount=
                                      carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage[0].frameSingleCellCount?
                                          that.getAllData('frameSingleCellCount',carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage):'';
                                  if(carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage[0].singleCellVoltage){
                                      carData[i].vehicleData.chargingDeviceVoltageData.singleCellVoltage=carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage[0].singleCellVoltage.length>0?
//                                                carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage[0].singleCellVoltage.join(' ')
                                          that.getAllData('singleCellVoltage',carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltage):'';
                                  }else {
                                      carData[i].vehicleData.chargingDeviceVoltageData.singleCellVoltage ='';
                                  }

                              }else{
                                  carData[i].vehicleData.chargingDeviceVoltageData.chargingDeviceVoltageNum='';
                                  carData[i].vehicleData.chargingDeviceVoltageData.energyStorageDeviceVoltage='';
                                  carData[i].vehicleData.chargingDeviceVoltageData.energyStorageDeviceCurrent='';
                                  carData[i].vehicleData.chargingDeviceVoltageData.singleCellCount='';
                                  carData[i].vehicleData.chargingDeviceVoltageData.frameCellStartNum='';
                                  carData[i].vehicleData.chargingDeviceVoltageData.frameSingleCellCount='';
                                  carData[i].vehicleData.chargingDeviceVoltageData.singleCellVoltage='';
                              }
                          }

                      }
                      if(carData[i].vehicleData.chargingDeviceTempData){
                          if(carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTemp){
                              if(carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTemp.length>0){
                                  carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTempNum=
                                      carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTemp[0].chargingDeviceTempNum?
                                          that.getAllData('chargingDeviceTempNum',carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTemp):'';
                                  carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTempProbeSum=
                                      carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTemp[0].chargingDeviceTempProbeSum?
                                          that.getAllData('chargingDeviceTempProbeSum',carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTemp):'';
                                  carData[i].vehicleData.chargingDeviceTempData.chargingTempProbeValue=
                                      carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTemp[0].chargingTempProbeValue?
                                          that.getAllData('chargingTempProbeValue',carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTemp):'';
                              }else {
                                  carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTempNum='';
                                  carData[i].vehicleData.chargingDeviceTempData.chargingDeviceTempProbeSum='';
                                  carData[i].vehicleData.chargingDeviceTempData.chargingTempProbeValue='';
                              }
                          }


                      }else {
                          carData[i].vehicleData.chargingDeviceTempData={};
                      }
                      if(carData[i].vehicleData.driveMotorData){
                          if(carData[i].vehicleData.driveMotorData.driveMotor){
                              if(carData[i].vehicleData.driveMotorData.driveMotor.length>0){
                                  carData[i].vehicleData.driveMotorData.driveMotorIndex=
                                      carData[i].vehicleData.driveMotorData.driveMotor[0].driveMotorIndex?
                                          that.getAllData('driveMotorIndex',carData[i].vehicleData.driveMotorData.driveMotor):'';
                                  carData[i].vehicleData.driveMotorData.driveMotorStatus=
                                      carData[i].vehicleData.driveMotorData.driveMotor[0].driveMotorStatus?
                                          that.getAllData('driveMotorStatus',carData[i].vehicleData.driveMotorData.driveMotor):'';
                                  carData[i].vehicleData.driveMotorData.driveMotorControllerTemp=
                                      carData[i].vehicleData.driveMotorData.driveMotor[0].driveMotorControllerTemp?
                                          that.getAllData('driveMotorControllerTemp',carData[i].vehicleData.driveMotorData.driveMotor):'';
                                  carData[i].vehicleData.driveMotorData.driveMotorSpeed=
                                      carData[i].vehicleData.driveMotorData.driveMotor[0].driveMotorSpeed?
                                          that.getAllData('driveMotorSpeed',carData[i].vehicleData.driveMotorData.driveMotor):'';
                                  carData[i].vehicleData.driveMotorData.driveMotorTorque=
                                      carData[i].vehicleData.driveMotorData.driveMotor[0].driveMotorTorque?
                                          that.getAllData('driveMotorTorque',carData[i].vehicleData.driveMotorData.driveMotor):'';
                                  carData[i].vehicleData.driveMotorData.driveMotorTemp=
                                      carData[i].vehicleData.driveMotorData.driveMotor[0].driveMotorTemp?
                                          that.getAllData('driveMotorTemp',carData[i].vehicleData.driveMotorData.driveMotor):'';
                                  carData[i].vehicleData.driveMotorData.motorControllerInputVoltage=
                                      carData[i].vehicleData.driveMotorData.driveMotor[0].motorControllerInputVoltage?
                                          that.getAllData('motorControllerInputVoltage',carData[i].vehicleData.driveMotorData.driveMotor):'';
                                  carData[i].vehicleData.driveMotorData.motorControllerCurrent=
                                      carData[i].vehicleData.driveMotorData.driveMotor[0].motorControllerCurrent?
                                          that.getAllData('motorControllerCurrent',carData[i].vehicleData.driveMotorData.driveMotor):'';
                              }else {
                                  carData[i].vehicleData.driveMotorData.driveMotorIndex='';
                                  carData[i].vehicleData.driveMotorData.driveMotorStatus=''
                                  carData[i].vehicleData.driveMotorData.driveMotorControllerTemp=''
                                  carData[i].vehicleData.driveMotorData.driveMotorSpeed=''
                                  carData[i].vehicleData.driveMotorData.driveMotorTorque=''
                                  carData[i].vehicleData.driveMotorData.driveMotorTemp=''
                                  carData[i].vehicleData.driveMotorData.motorControllerInputVoltage=''
                                  carData[i].vehicleData.driveMotorData.motorControllerCurrent=''

                              }
                          }


                      }else {
                          carData[i].vehicleData.driveMotorData={};
                      }
                      arr.push(carData[i].vehicleData)
                  }
              }
              this.total = response.results.totalRecords;
              this.tableData=arr;
              this.listLoading=false;
              return arr
            },

            //重置
            resetBtn(){
                this.form={
                    vin: this.$route.query.vinId,
                    date:'',
                    startTime:start,
                    endTime:preDate,
                    pageSize:10,
                    pageIndex:1,
                };
                this.form.startTime = this.form.carDatetime[0];
                this.form.endTime =this.form.carDatetime[1];
                this.handleHistoryData(this.form.vin,this.form.startTime,this.form.endTime,this.form.pageSize,this.form.pageIndex);
            },
            //导出
            exportFile(type){
              let vm = this
              if (vm.tableData.length <= 0) {
                this.$message.error("数据为空无法导出")
                return
              }
              Date.prototype.toLocaleString = function() {
                return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
              }
              var sTime = Date.parse(new Date(vm.form.carDatetime[0].replace(new RegExp(/-/gm) ,"/")))
              var eTime = Date.parse(new Date(vm.form.carDatetime[1].replace(new RegExp(/-/gm) ,"/")))
              if (type === 1) {
                vm.excel()
                return
              }
              if(eTime-sTime <= 1000*60*60*24){
                window.location =process.env.BASE_API+'/excelTemplate/exportExcel?excelTemplateId=2';
                window.location =process.env.BASE_API+'/excelTemplate/exportExcel?excelTemplateId=2&plateOrVinValue='+this.vinData+'&startTime='+this.form.carDatetime[0]+'&endTime='+this.form.carDatetime[1];

               } else {
                //起止时间跨度超过24小时，不可导出
                this.$message.error("起止时间跨度超过24小时，不可导出");
              }
            },
            formatJson(filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => v[j]))
            },
            async excel(){
              this.listLoading=true;
              let vm = this
              let total = vm.total
              let tableDataSum = []
              let response = await getHistoryData(vm.form.vin,vm.form.startTime,vm.form.endTime,vm.total,1)
              tableDataSum = vm.resetData(response)
              require.ensure([], () => {
                const { export_json_to_excel } = require('@/excel/Export2Excel')
                let list = []
                tableDataSum.map((item, i) => {
                  let veChargingStatus = item.vehicleStatusData.chargingStatus
                  let chChargingStatus = item.chargingData.chargingStatus
                  let add = Object.assign(
                    item,
                    {...item.vehicleStatusData},
                    {...item.driveMotorData},
                    {...item.fuelBatteryData},
                    {...item.batteryData},
                    {...item.engineData},
                    {...item.vehiclePositionData},
                    {...item.chargingDeviceVoltageData},
                    {...item.chargingDeviceTempData},
                    {...item.extremeData},
                    {...item.alarmDatas},
                    {...item.chargingData}
                  )
                  add.veChargingStatus = veChargingStatus
                  add.chChargingStatus = chChargingStatus
                  // 可续航里程
                  add.remainingMileage = getData(add.remainingMileage)
                  // 剩余电量
                  add.remainingBattery = getData(add.remainingBattery)
                  // 车头方向
                  add.gnssDirection = getData(add.gnssDirection)
                  // 高度
                  add.altitude = getData(add.altitude)
                  // GNSS信号强度
                  add.gnssSignalStrength = getData(add.gnssSignalStrength)
                  // 驱动电机控制温度(℃)
                  add.driveMotorControllerTemp = getData(add.driveMotorControllerTemp)
                  // 驱动电机转速(r/min)
                  add.driveMotorSpeed = getData(add.driveMotorSpeed)
                  // 驱动电机转矩(N·m)
                  add.driveMotorTorque = getData(add.driveMotorTorque)
                  // 驱动电机温度(℃)
                  add.driveMotorTemp = getData(add.driveMotorTemp)
                  // 电机控制器输入电压(V)
                  add.motorControllerInputVoltage = getData(add.motorControllerInputVoltage)
                  // 电机控制器直流母线电流(A)
                  add.motorControllerCurrent = getData(add.motorControllerCurrent)
                  // 燃料电池电压(v)
                  add.fuelBatteryVoltage = getData(add.fuelBatteryVoltage)
                  // 燃料电池电流(A)
                  add.fuelBatteryCurrent = getData(add.fuelBatteryCurrent)
                  // 燃料消耗率(L/100km)
                  add.fuelConsumption = getData(add.fuelConsumption)
                  // 燃料电池温度探针总数
                  add.fuelBatteryTempProbeCount = getData(add.fuelBatteryTempProbeCount)
                  // 氢系统中最高温度(℃)
                  add.hydrogenSysMaxTemp = getData(add.hydrogenSysMaxTemp)
                  // 氢系统中最高温度探针序号
                  add.hydrogenSysMaxTempPropeNum = getData(add.hydrogenSysMaxTempPropeNum)
                  // 氢气最高浓度(ppm)
                  add.hydrogenMaxConcentration = getData(add.hydrogenMaxConcentration)
                  // 氢气最高浓度传感器代号
                  add.hydrogenMaxConcentrationSensorNum = getData(add.hydrogenMaxConcentrationSensorNum)
                  // 氢气最高压力(MPa)
                  add.hydrogenMaxPressure = getData(add.hydrogenMaxPressure)
                  // 氢气最高压力传感器代号
                  add.hydrogenMaxPressureSensorNum = getData(add.hydrogenMaxPressureSensorNum)
                  // 动力电池温度(℃)
                  add.batteryTemp = getData(add.batteryTemp)
                  // 曲轴转速(rpm)
                  add.crankshaftSpeed = getData(add.crankshaftSpeed)
                  // 发动机燃料消耗率(L/100km)
                  add.engineFuelConsumption = getData(add.engineFuelConsumption)
                  // 可充电储能装置个数
                  add.chargingDeviceVoltageSum = getData(add.chargingDeviceVoltageSum)
                  // 可充电储能装置子系统号
                  add.chargingDeviceVoltageNum = getData(add.chargingDeviceVoltageNum)
                  // 可充电储能装置电流(A)
                  add.energyStorageDeviceCurrent = getData(add.energyStorageDeviceCurrent)
                  // 可充电储能装置电压(V)
                  add.energyStorageDeviceVoltage = getData(add.energyStorageDeviceVoltage)
                  // 单体电池总数
                  add.singleCellCount = getData(add.singleCellCount)
                  // 本帧起始电池序号
                  add.frameCellStartNum = getData(add.frameCellStartNum)
                  // 本帧单体电池总数
                  add.frameSingleCellCount = getData(add.frameSingleCellCount)
                  // 单体电池电压(V)
                  add.singleCellVoltage = getData(add.singleCellVoltage)
                  // 可充电储能子系统个数
                  add.chargingDeviceTempSum = getData(add.chargingDeviceTempSum)
                  // 可充电储能子系统号
                  add.chargingDeviceTempNum = getData(add.chargingDeviceTempNum)
                  // 可充电储能子系统温度探针个数
                  add.chargingDeviceTempProbeSum = getData(add.chargingDeviceTempProbeSum)
                  // 可充电储能子系统温度各探针检测到的温度值(℃)
                  add.chargingTempProbeValue = getData(add.chargingTempProbeValue)
                  // 最高电压电池子系统号
                  add.maxBatteryVoltageNum = getData(add.maxBatteryVoltageNum)
                  // 最高电压电池单体代号
                  add.maxBatteryVoltageCellNum = getData(add.maxBatteryVoltageCellNum)
                  // 电池单体电压最高值(V)
                  add.maxBatteryVoltageCellValue = getData(add.maxBatteryVoltageCellValue)
                  // 最低电压电池子系统号
                  add.minBatteryVoltageNum = getData(add.minBatteryVoltageNum)
                  // 最低电压电池单体代号
                  add.minBatteryVoltageCellNum = getData(add.minBatteryVoltageCellNum)
                  // 电池单体电压最低值(V)
                  add.minBatteryVoltageCellValue = getData(add.minBatteryVoltageCellValue)
                  // 最高温度子系统号
                  add.maxTempNum = getData(add.maxTempNum)
                  // 最高温度探针序号
                  add.maxTempPropeNum = getData(add.maxTempPropeNum)
                  // 最高温度值(℃)
                  add.maxTempValue = getData(add.maxTempValue)
                  // 最低温度子系统号
                  add.minTempNum = getData(add.minTempNum)
                  // 最低温度探针序号
                  add.minTempPropeNum = getData(add.minTempPropeNum)
                  // 最低温度值(℃)
                  add.minTempValue = getData(add.minTempValue)
                  // 告警
                  add.alarmName = getData(add.alarmName)
                  // 已充电时长
                  add.chargingTotal = getData(add.chargingTotal)
                  // 剩余充电时长
                  add.chargingRemain = getData(add.chargingRemain)
                  // 充电内容
                  add.onBoardChargerData = getData(add.onBoardChargerData)
                  let copyAdd = vm.deepClone(add)
                  // 是否补发
                  if (add.messageType === '2') {
                    copyAdd.messageType = '否'
                  } else if (add.messageType === '3') {
                    copyAdd.messageType = '是'
                  } else {
                    copyAdd.messageType = '-'
                  }
                  // 定位状态
                  if (add.positionStatus === 0) {
                    copyAdd.positionStatus = '东经北纬'
                  } else if (add.positionStatus === 2) {
                    copyAdd.positionStatus = '东经南纬'
                  } else if (add.positionStatus === 4) {
                    copyAdd.positionStatus = '西经北纬'
                  } else if (add.positionStatus === 6) {
                    copyAdd.positionStatus = '西经南纬'
                  } else {
                    copyAdd.positionStatus = '-'
                  }
                  // 发动机状态
                  if (add.engineStatus === 1) {
                    copyAdd.engineStatus = '启动状态'
                  } else if (add.engineStatus === 2) {
                    copyAdd.engineStatus = '关闭状态'
                  } else {
                    copyAdd.engineStatus = '-'
                  }
                  // 高压DC-DC状态
                  if (add.hydrogenDcdcStatus === 0) {
                    copyAdd.hydrogenDcdcStatus = '工作'
                  } else if (add.hydrogenDcdcStatus === 2) {
                    copyAdd.hydrogenDcdcStatus = '断开'
                  } else {
                    copyAdd.hydrogenDcdcStatus = '-'
                  }
                  // 探针温度数(℃)
                  if (add.probeTempValue.length <= 0) {
                    copyAdd.probeTempValue = '-'
                  }
                  // 驱动电机状态
                  if (add.driveMotorStatus === 1) {
                    copyAdd.driveMotorStatus = '耗电'
                  } else if (add.driveMotorStatus === 2) {
                    copyAdd.driveMotorStatus = '发电'
                  } else if (add.driveMotorStatus === 3) {
                    copyAdd.driveMotorStatus = '关闭'
                  } else if (add.driveMotorStatus === 4) {
                    copyAdd.driveMotorStatus = '准备'
                  } else {
                    copyAdd.driveMotorStatus = '-'
                  }
                  // 电源模式
                  if (add.powerMode === 0) {
                    copyAdd.powerMode = '发动机熄火'
                  } else if (add.powerMode === 4) {
                    copyAdd.powerMode = '启动'
                  } else {
                    copyAdd.powerMode = '-'
                  }
                  // 充电状态
                  if (add.veChargingStatus === 0) {
                    copyAdd.veChargingStatus = 'default'
                  } else if (add.veChargingStatus === 1) {
                    copyAdd.veChargingStatus = '停车充电（正在充电）'
                  } else if (add.veChargingStatus === 2) {
                    copyAdd.veChargingStatus = '行驶充电'
                  } else if (add.veChargingStatus === 3) {
                    copyAdd.veChargingStatus = '未充电'
                  } else if (add.veChargingStatus === 4) {
                    copyAdd.veChargingStatus = '充电完成（充满电）'
                  } else if (add.veChargingStatus === 5) {
                    copyAdd.veChargingStatus = '正在加热'
                  }  else if (add.veChargingStatus === 6) {
                    copyAdd.veChargingStatus = '熄灭'
                  } else {
                    copyAdd.veChargingStatus = '-'
                  }
                  if (add.chChargingStatus === 0) {
                    copyAdd.chChargingStatus = 'default'
                  } else if (add.chChargingStatus === 1) {
                    copyAdd.chChargingStatus = '停车充电（正在充电）'
                  } else if (add.chChargingStatus === 2) {
                    copyAdd.chChargingStatus = '行驶充电'
                  } else if (add.chChargingStatus === 3) {
                    copyAdd.chChargingStatus = '未充电'
                  } else if (add.chChargingStatus === 4) {
                    copyAdd.chChargingStatus = '充电完成（充满电）'
                  } else if (add.chChargingStatus === 5) {
                    copyAdd.chChargingStatus = '正在加热'
                  }  else if (add.chChargingStatus === 6) {
                    copyAdd.chChargingStatus = '熄灭'
                  } else {
                    copyAdd.chChargingStatus = '-'
                  }
                  // 运行模式
                  if (add.driveMode === 1) {
                    copyAdd.driveMode = '纯电'
                  } else if (add.driveMode === 2) {
                    copyAdd.driveMode = '混动'
                  } else if (add.driveMode === 3) {
                    copyAdd.driveMode = '燃油'
                  } else {
                    copyAdd.driveMode = '-'
                  }
                  // dcd
                  if (add.dcdcStatus === 1) {
                    copyAdd.dcdcStatus = '工作'
                  } else if (add.dcdcStatus === 2) {
                    copyAdd.dcdcStatus = '断开'
                  } else {
                    copyAdd.dcdcStatus = '-'
                  }
                  // 车辆行驶状态
                  if (add.carState === 0) {
                    copyAdd.carState = '行驶'
                  } else if (add.carState === 1) {
                    copyAdd.carState = '停止'
                  } else {
                    copyAdd.carState = '-'
                  }
                  // 档位
                  if (add.transmissionMode === 0) {
                    copyAdd.transmissionMode = '空档（N）'
                  } else if (add.transmissionMode === 1) {
                    copyAdd.transmissionMode = '1挡'
                  } else if (add.transmissionMode === 2) {
                    copyAdd.transmissionMode = '2挡'
                  } else if (add.transmissionMode === 3) {
                    copyAdd.transmissionMode = '3挡'
                  } else if (add.transmissionMode === 4) {
                    copyAdd.transmissionMode = '4挡'
                  } else if (add.transmissionMode === 5) {
                    copyAdd.transmissionMode = '5挡'
                  }  else if (add.transmissionMode === 6) {
                    copyAdd.transmissionMode = '6挡'
                  } else if (add.transmissionMode === 7) {
                    copyAdd.transmissionMode = '7挡'
                  } else if (add.transmissionMode === 8) {
                    copyAdd.transmissionMode = '8挡'
                  } else if (add.transmissionMode === 9) {
                    copyAdd.transmissionMode = '9挡'
                  }  else if (add.transmissionMode === 10) {
                    copyAdd.transmissionMode = '10挡'
                  } else if (add.transmissionMode === 11) {
                    copyAdd.transmissionMode = '11挡'
                  } else if (add.transmissionMode === 12) {
                    copyAdd.transmissionMode = '12挡'
                  } else if (add.transmissionMode === 13) {
                    copyAdd.transmissionMode = '倒挡（R）'
                  } else if (add.transmissionMode === 14) {
                    copyAdd.transmissionMode = '自动D挡'
                  }  else if (add.transmissionMode === 15) {
                    copyAdd.transmissionMode = '停车P挡'
                  } else {
                    copyAdd.transmissionMode = '-'
                  }
                  list.push(copyAdd)
                })
                const data = vm.formatJson(vm.filterVal, list)
                export_json_to_excel(vm.tHeader, data, '列表excel')
                vm.handleHistoryData(vm.form.vin,vm.form.startTime,vm.form.endTime,10,1)
              })
            },
            deepClone (obj) {
              let vm = this
              let objClone = Array.isArray(obj) ? [] : {}
              if (obj && typeof obj === 'object') {
                for (let key in obj) {
                  if (obj.hasOwnProperty(key)) {
                    // 判断ojb子元素是否为对象，如果是，递归复制
                    if (obj[key] && typeof obj[key] === 'object') {
                      objClone[key] = vm.deepClone(obj[key])
                    } else {
                       // 如果不是，简单复制
                      objClone[key] = obj[key]
                    }
                  }
                }
              }
              return objClone
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                this.form.pageIndex = val;
                this.form.startTime = this.form.carDatetime[0];
                this.form.endTime =this.form.carDatetime[1];
                this.handleHistoryData(this.form.vin,this.form.startTime,this.form.endTime,this.form.pageSize,val);
            },
            getStandardData(){
                if(localStorage.getItem('standardData')){
                    this.standardData = JSON.parse(localStorage.getItem('standardData'));
                }else {
                    getBaseStandardDetail().then(response => {
                        if(response.data){
                            localStorage.setItem('standardData',JSON.stringify(response.data.results));
                            this.standardData=response.data.results;
                        }

                    })
                }
            },
            init(){
                this.form.startTime = this.form.carDatetime[0];
                this.form.endTime =this.form.carDatetime[1];
                this.handleHistoryData(this.vinData,this.form.startTime,this.form.endTime,this.form.pageSize,this.form.pageIndex)
            }
        },
    }
</script>
<style media="screen">
  .noleft .el-form-item--medium .el-form-item__content{
    margin-left:0px!important
  }
</style>
<style scoped>

    .history-query-page{
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
    .button-box{
        margin-bottom: 10px;
    }
    .dropdown-box{
        width: 100%;
        text-align: right;
        margin-bottom: 10px;
    }
    .el-dropdown-link{

        color: rgb(64, 158, 255);

    }
    .hide-txt{
        overflow: hidden;
        display: inline-block;
        width: 100%;

        white-space: nowrap;

        text-overflow: ellipsis;
    }


</style>
