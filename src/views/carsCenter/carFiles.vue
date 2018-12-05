<template>
  <div class="car-file-page">
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :lg="5" :lx="4">
            <el-form-item class="file-item" label="车牌号:">
              <el-input v-model="form.plate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5" :lx="4">
            <el-form-item class="file-item" label="VIN码:">
              <el-input v-model="form.vin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5" :lx="4">
            <el-form-item label="车辆状态:">
              <el-select v-model="form.carStatus" clearable placeholder="请选择">
                <el-option v-for="item in carStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="5" :lx="4">
            <el-form-item label="车型:">
              <el-select v-model="form.carTypeName" clearable placeholder="请选择">
                <el-option v-for="item in carTypeListOption" :key="item.carTypeName" :label="item.carTypeName" :value="item.carTypeName=='全部'?'':item.carTypeName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :lx="4">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-col>
        </el-row>

      </el-form>

    </div>
    <div>
      <el-button type="primary" size="small" @click="addCarFormVisible=true">车辆新增</el-button>
      <!-- <el-button type="primary" size="small" @click="goVehicleAllocation">车辆调拨</el-button> -->
      <el-button slot="trigger" size="small" type="primary" @click="importDialog = true">车型导入</el-button>
      <el-button slot="trigger" size="small" type="primary" @click="importCar">车辆导入</el-button>
      <!--新增车辆的弹出框-->
      <el-dialog title="车辆新增" :visible.sync="addCarFormVisible" :before-close="cancelAddForm">
        <!--<add-cars @child-info="submitForm" @child-cancel = 'cancelForm'></add-cars>-->
        <div>
          <div class="component-choose">
            <el-form class="" ref="addForm" :model="addForm" label-width="90px" :rules="addRules">
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item prop="iccid" label="ICCID:">
                    <el-input v-model="addForm.iccid" auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="vin" label="VIN码:">
                    <el-input v-model="addForm.vin" auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="品牌名称:">
                    <el-input v-model="addForm.carBand"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="carTypeName" label="车型名称:">
                    <!--<el-input  v-model="addForm.carTypeName"></el-input>-->
                    <el-select v-model="addForm.carTypeName" @change="handleAddChange" clearable placeholder="请选择">
                      <el-option v-for="item in carTypeOptions" :key="item.carTypeName" :label="item.carTypeName" :value="item.carTypeName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="颜色名称:">
                    <el-input v-model="addForm.carColor"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">

                  <el-form-item prop="carStatus" label="车辆状态:">
                    <el-select v-model="addForm.carStatus" clearable placeholder="请选择">
                      <el-option v-for="item in addCarStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item prop="plate" label="车牌号:">
                    <el-input v-model="addForm.plate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="车辆类别:">
                    <el-select v-model="addForm.carUsage" :disabled="true" clearable placeholder="请选择">
                      <el-option v-for="item in carUsageOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">

                <el-col :span="10">
                  <el-form-item label="合格证号:">
                    <el-input v-model="addForm.certificateNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="plateTime" label="上牌日期:">
                    <el-date-picker type="datetime" placeholder="选择日期" :picker-options="pickerOptionsDetail" v-model="addForm.plateTime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddForm('addForm')">取 消</el-button>
            <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
          </div>
          <!--<button @click="send">send</button>-->
          <!-- <p>{{msgChild}}</p> -->
        </div>
      </el-dialog>
      <el-dialog title="车辆编辑" :visible.sync="editCarFormVisible" :before-close="cancelEditForm">
        <!--<edit-cars @child-edit="editSubmitForm" :editData="editData" @child-editCancel = 'editCancelForm'></edit-cars>-->
        <div>
          <div class="component-choose">
            <el-form class="" ref="editData" :model="editData" label-width="80px" :rules="editRules">
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="ICCID:">
                    <el-input :disabled="true" v-model="editData.iccid" auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="VIN码:">
                    <el-input :disabled="true" v-model="editData.vin" auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="品牌名称:">
                    <el-input v-model="editData.carBand"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <!--/carTypeListOption-->
                  <el-form-item label="车型名称:">
                    <!--<el-input  v-model="editData.carTypeName"></el-input>-->
                    <el-select v-model="editData.carTypeName" @change='handleEditChange' clearable placeholder="请选择">
                      <el-option v-for="item in carTypeOptions" :key="item.carTypeName" :label="item.carTypeName" :value="item.carTypeName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="颜色名称:">
                    <el-input v-model="editData.carColor"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">

                  <el-form-item label="车辆状态:">
                    <el-select v-model="editData.carStatus" clearable placeholder="请选择">
                      <el-option v-for="item in addCarStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item prop="plate" label="车牌号:">
                    <el-input v-model="editData.plate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="carUsage" label="车辆类别:">
                    <el-select v-model="editData.carUsage" :disabled="true" clearable placeholder="请选择">
                      <el-option v-for="item in carUsageOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">

                <el-col :span="10">
                  <el-form-item prop="certificateNum" label="合格证号:">
                    <el-input v-model="editData.certificateNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="plateTime" label="上牌日期:">
                    <el-date-picker type="datetime" placeholder="选择日期" :picker-options="pickerOptionsDetail" v-model="editData.plateTime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
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
      </el-dialog>

      <!-- 导入 -->
      <el-dialog :visible.sync="importDialog" @close="close">
        <div slot="title" style="font-size:18px;">
          {{title||"车型导入"}}
        </div>
        <div class="importDialog-container" style="text-align:center">
          <el-upload class="upload-demo" ref="upload" action="" accept=".xls,.xlsx" :on-change="handlePreview" :auto-upload="false" :on-remove="handleRemove" :on-exceed="handleExceed" :limit="1">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">
              注意:请先
              <el-button type="text" @click="download">下载示例表格</el-button> ,按表格示例填写要导入的车辆
            </div>
          </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="importDialog = false">取 消</el-button>
          <el-button type="primary" @click="uploadMotorcycleType">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 导入成功后的dialog-->
      <el-dialog title="车辆导入结果" :visible.sync="importSucceed">
        <div class="importDialog-container" style="text-align:center">
          <p>导入成功:{{successData}}条</p>
          <p>导入失败:{{defeatedData}}条</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exportDefeated">失败数据导出</el-button>
          <el-button type="primary" @click="againImport">再次导入</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="car-file-table">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column align="center" label='序号' width="60">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>

        </el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label='车架号' width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" prop @click="handleTable(scope.$index, scope.row)">{{scope.row.vin}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label='ICCID' width="200">
          <template slot-scope="scope">
            {{scope.row.iccid}}
          </template>
        </el-table-column>
        <el-table-column align="center" label='车辆类别'>
          <template slot-scope="scope">
            {{scope.row.carUsage==0?'乘用车':'商用车'}}
          </template>
        </el-table-column>
        <el-table-column align="center" label='车牌号'>
          <template slot-scope="scope">
            {{scope.row.plate}}
          </template>
        </el-table-column>
        <el-table-column align="center" label='归属'>
          <template slot-scope="scope">
            {{scope.row.motorcadeName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label='能耗类型'>
          <template slot-scope="scope">
            {{scope.row.energyType==1?'电动车':scope.row.energyType==2?'燃油车':scope.row.energyType==3?'油电混合':''}}
          </template>
        </el-table-column>

        <el-table-column align="center" label='车型'>
          <template slot-scope="scope">
            {{scope.row.carTypeName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label='车辆状态'>
          <template slot-scope="scope">
            {{scope.row.carStatus==0?'待整备':scope.row.carStatus==1?'已整备':'运营中'}}
          </template>
        </el-table-column>
        <el-table-column align="center" label='故障状态'>
          <template slot-scope="scope">
            {{scope.row.isBadStatus==0?'正常':'故障'}}
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination-item">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="form.pageIndex" :page-size="form.pageSize" class="right-pagination" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>


<script>
  import { getList } from "@/api/table";
  import {
    carDataList,
    addCar,
    editCar,
    getcarTypeList,
    editCarDataList,
    excelUpload,
    excelCarBaseUpload,
    clearCarImportDataByUserId
  } from "@/api/carCenter";
  import AddCars from "@/components/carCenter/addCars.vue";
  import EditCars from "@/components/carCenter/editCars.vue";
  import axios from "axios";
  import { getUserId } from "@/utils/auth";
  import { mapGetters } from "vuex";

  export default {
    name: "car-files",
    components: { AddCars, EditCars },
    data() {
      const validateVin = (rule, value, callback) => {
        if (value.trim().length == 0) {
          callback(new Error("vin码不能为空"));
        } else if (value.trim().length !== 17) {
          callback(new Error("请输入正确的vin码信息"));
        } else {
          callback();
        }
      };
      function isVehicleNumber(vehicleNumber) {
        var result = false;
        if (vehicleNumber.length == 7){
          var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z0-9]{5}[A-Z0-9挂学警港澳]{1}$/;
          result = express.test(vehicleNumber);
        }
        return result;
      }
      const validateCarStatus = (rule, value, callback) => {
        if (value.trim().length == 0) {
          callback(new Error("ICCID不能为空"));
        } else if (value.trim().length !== 20) {
          callback(new Error("请输入正确的ICCID"));
        } else {
          callback();
        }
      };
      const validatePlate = (rule, value, callback) => {
        if(value.trim().length==0){
          callback();
        }else {
          if (value.trim().length == 7) {
            if(isVehicleNumber(value.trim())){
              callback();
            }else {
              callback(new Error("请输入正确的车牌号"));
            }
          }else {
            callback(new Error("请输入正确的车牌号"));
          }
        }

      };
      return {
        form: {
          vin: "",
          plate: "",
          startTime: "",
          endTime: "",
          userId: getUserId(),
          carTypeName: "",
          carStatus: "",
          pageSize: 10,
          pageIndex: 1
        },
        addRules: {
          iccid: [{ required: true, trigger: "blur", validator: validateCarStatus }],
          vin: [{ required: true, trigger: "blur", validator: validateVin }],
          carTypeName: [{ required: true, message: '车型不能为空' }],
          carStatus: [{ required: true, message: '车辆状态不能为空' }],
          plate: [{ required: false, validator: validatePlate }]
        },
        editRules: {
          plate: [{ required: false, validator: validatePlate }]
        },
        pickerOptionsDetail: {
          disabledDate(time) {
            let preDate = new Date("2000/1/1").getTime();
            return time.getTime() > Date.now() || time.getTime() < preDate;
          }
        },
        carDatetime: "",
        addForm: {
          userId: getUserId(),
          vin: "",
          iccid: "",
          carBand: "吉利",
          carTypeName: "",
          carStatus: "",
          plate: "",
          carColor: "",
          plateTime: "",
          certificateNum: "",
          carUsage: ""
        },
        editData: {
          vin: "",
          iccid: "",
          carBand: "吉利",
          carTypeName: "",
          carStatus: "",
          plate: "",
          carColor: "",
          plateTime: "",
          certificateNum: "",
          carUsage: ""
        },
        carTypeListOption: [],
        carTypeOptions: [],
        carStatusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "待整备"
        },
        {
          value: 1,
          label: "已整备"
        },
        {
          value: 2,
          label: "运营中"
        }],
        addCarStatusOptions: [
        {
          value: 0,
          label: "待整备"
        },
        {
          value: 1,
          label: "已整备"
        },
        {
          value: 2,
          label: "运营中"
        }],
        carUsageOptions: [
        {
          value: 0,
          label: "乘用车"
        },
        {
          value: 1,
          label: "商用车"
        }],
        value4: "",
        fileList: [],
        hideTable: false,
        listLoading: false,
        tableData: [],
        total: 0,
        multipleSelection: [],
        activeIndex: "1",
        activeIndex2: "1",
        dialogFormVisible: false,
        //新增车辆
        addCarFormVisible: false,
        editCarFormVisible: false,
        importDialog: false,
        carsNumber: [],
        msgParent: "hello",
        isImportCar: false,
        importSucceed: false, //是否是车辆导入
        successData: "", //导入成功后的数据条目
        defeatedData: "", //导入失败后的数据条目
        title: null
      };
    },
    computed: {
      ...mapGetters(["vehicleInformation"])
    },
    mounted() {
      this.fetchData();
      this.getCarTypeListOption();
    },
    methods: {
      onReset() {
        this.form.vin = "";
        this.form.plate = "";
        this.form.startTime = "";
        this.carDatetime = "";
        this.form.endTime = "";
        this.form.carTypeName = "";
        this.form.carStatus = 2;
        this.form.pageSize = 10;
        this.form.pageIndex = 1;
        this.fetchData();
      },
      getCarTypeListOption() {
        getcarTypeList()
          .then(response => {
            if (response.results) {
              var val1 = [{
                carTypeName: "全部"
              }]
              var res = response.results;
              var arr = [];
              var typeList = [];
              for (var i = 0; i < res.length; i++) {
                if (arr.indexOf(res[i].carTypeName) == -1) {
                  arr.push(res[i].carTypeName); //如果没有找到就把这个name放到arr里面，以便下次循环时用
                  typeList.push(res[i]);
                }
              }
              this.carTypeOptions = typeList;
              this.carTypeListOption = val1.concat(typeList);
              //                this.carTypeListOption =response.results;

            }
          })
          .catch(error => {});
      },
      submitAddForm(formName) {
        this.$emit("child-info", this.addForm);
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.addForm.carUsage = this.addForm.carUsage == "乘用车" ? 0 : 1;
            addCar(this.addForm).then(response => {
              this.$message.success("新增成功");
              this.addCarFormVisible = false;
              this.fetchData();
              this.$refs[formName].resetFields();
            });
          }
        });
      },

      cancelAddForm(formName) {
        this.addForm = {
          vin: "",
          iccid: "",
          carBand: "吉利",
          carTypeName: "",
          carStatus: "",
          plate: "",
          carColor: "",
          plateTime: "",
          certificateNum: "",
          carUsage: ""
        };

        this.addCarFormVisible = false;
      },
      submitEditForm(formName) {
        this.editData.carStatus =
          this.editData.carStatus == "待整备" ?
          "0" :
          this.editData.carStatus == "已整备" ?
          "1" :
          this.editData.carStatus == "运营中" ?
          "2" :
          this.editData.carStatus;
        this.editData.isBadStatus =
          this.editData.isBadStatus == "正常" ?
          0 :
          this.editData.isBadStatus == "故障" ? 1 : this.editData.isBadStatus;
        this.editData.carUsage =
          this.editData.carUsage == "乘用车" ?
          0 :
          this.editData.carUsage == "商用车" ? 1 : this.editData.carUsage;
        this.editData.carId = this.editData.id;
        this.editCarFormVisible = false;
        //表单清空
        editCar(this.editData)
          .then(response => {
            this.$message.success("编辑成功");
            this.fetchData();
          })
          .catch(error => {});
      },
      cancelEditForm(formName) {
        this.editCarFormVisible = false;
      },
      get(msg) {
        this.msgParent = msg;
      },
      fetchData() {
        if (this.carDatetime == "") {
          this.form.startTime = "";
          this.form.endTime = "";
        } else {
          this.form.startTime = this.carDatetime[0];
          this.form.endTime = this.carDatetime[1];
        }
        this.listLoading = true;
        carDataList(
            this.form.vin,
            this.form.plate,
            this.form.startTime,
            this.form.endTime,
            this.form.carTypeName,
            this.form.carStatus,
            this.form.pageSize,
            this.form.pageIndex,
            this.form.userId
          )
          .then(response => {
            this.listLoading = false;
            if (response.results) {
              this.tableData = response.results.datas;
              this.total = response.results.totalRecords;
            }
          })
          .catch(error => (this.listLoading = false));
      },
      handleAddChange(val) {
        var arr1 = this.carTypeOptions.filter(function(item, index, array) {
          if (item.carTypeName == val) {
            return true;
          }
          return false;
        });
        this.addForm.carUsage = arr1[0].isCommercial == 0 ? "乘用车" : "商用车";


      },
      handleEditChange(val) {
        var arr1 = this.carTypeOptions.filter(function(item, index, array) {
          if (item.carTypeName == val) {
            return true;
          }
          return false;
        });
        this.editData.carUsage = arr1[0].isCommercial == 0 ? "乘用车" : "商用车";
      },
      //新增车辆
      submitForm(formName) {
        this.addCarFormVisible = false;
        this.fetchData();
      },
      cancelForm() {
        this.addCarFormVisible = false;
      },
      //取消按钮
      //編輯
      handleEdit(index, row) {
        editCarDataList(row.id)
          .then(response => {
            if (response.results) {
              var data = response.results;
              data.carStatus =
                data.carStatus == 0 ?
                "待整备" :
                data.carStatus == 1 ? "已整备" : "运营中";
              data.isBadStatus = data.isBadStatus == 0 ? "正常" : "故障";
              data.carUsage = data.carUsage == 0 ? "乘用车" : "商用车";
              this.editData = data;
              this.editCarFormVisible = true;
            }
          })
          .catch(error => console.log(error));
      },
      onSubmit() {
        this.fetchData();
      },
      handleTable(index, row) {
        var vin = row.vin;
        var carId = row.id;
        this.$router.push({ name: "单车监控" });
        this.$store.dispatch("getCarVin", vin);
      },
      handleCar() {
        this.dialogFormVisible = true;
        var array = this.multipleSelection;
        var chooseCar = [];
        for (var i = 0; i < array.length; i++) {
          chooseCar.push(array[i].name);
        }
        this.carsNumber = chooseCar;
      },
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      onControlSubmit() {
        // process.env.BASE_API
        //window.location =  process.env.BASE_API+'/file/exceltemplate/carBatchTemplate.xlsx'
      },
      handleRemove(file, fileList) {
        this.file = "";
      },
      handlePreview(file) {
        this.file = file.raw;
      },
      handleSelectionChange(val) {
        this.$store.dispatch("storageVehicleInformation", val);
        this.multipleSelection = val;
      },
      goVehicleAllocation() {
        if (this.vehicleInformation.length) {
          this.$router.push({ path: "/carsCenter/vehicleAllocation" });
        } else {
          this.$message.warning('请选择需调拨的车辆');
        }
      },
      handleCurrentChange(val) {
        this.form.pageIndex = val;
        this.fetchData();
      },
      //上传文件的逻辑
      uploadMotorcycleType() {
        let fileData = new FormData();
        fileData.append("file", this.file);

        if (this.file) {
          if (this.isImportCar) {
            excelCarBaseUpload(fileData).then(res => {
              this.importDialog = false;
              this.importSucceed = true;
              this.isImportCar = false;
              this.successData = res.results.successNum
              this.defeatedData = res.results.failedNum
              this.fetchData();
            })
          } else {
            excelUpload(fileData).then(res => {
              this.$message.success(res.msg);
              this.importDialog = false;
              this.$refs.upload.clearFiles();
            });
          }
        }
      },
      //下载示例模板
      download() {
        if (this.isImportCar) {

          window.location =
            process.env.BASE_API + `/excelTemplate/exportExcel?excelTemplateId=6&userId=${getUserId()}`;
        } else {
          window.location =
            process.env.BASE_API + "/excelTemplate/exportExcel?excelTemplateId=3";
        }
      },
      //关闭dialog的回调
      close() {
        if (this.isImportCar) {
          this.isImportCar = false
        }
        this.title = null
        this.file = null;
        this.$refs.upload.clearFiles();
      },
      //文件超出限制的回调
      handleExceed(files, fileList) {
        this.$message.warning(`请先删除之前已选择的文件`);
      },
      //车辆导入
      importCar() {
        clearCarImportDataByUserId({ userId: getUserId() }).then(res => {
          this.importDialog = true;
          this.isImportCar = true;
          this.title = "车辆导入"
        })
      },
      //失败数据导出
      exportDefeated() {
        window.location =
          process.env.BASE_API + `/excelTemplate/exportExcel?excelTemplateId=6&userId=${getUserId()}`;
      },
      // 再次导入
      againImport() {
        clearCarImportDataByUserId({ userId: getUserId() }).then(res => {
          this.importDialog = true;
          this.importSucceed = false;
          this.isImportCar = true;
        })
      }
    }
  };
</script>

<style scoped>
  .car-file-page {
    padding: 15px;
  }

  .car-file-table {
    margin-top: 10px;
  }

  .right-component,
  .left-component {
    float: left;
    border: 1px solid #ddd;
    width: 30%;
    margin-left: 10%;
  }

  .right-component {
    margin-left: 10%;
  }

  .component-choose:after,
  pagination-item:after {
    content: "";
    display: block;
    clear: both;
  }

  .file-form:after {
    content: "";
    display: block;
    clear: both;
  }

  .file-item {
    float: left;
  }

  .deliver-line {
    color: rgb(200, 200, 200);
    padding: 0 5px;
  }

  .vin-cell {
    color: red;
  }

  .right-pagination {
    float: right;
    padding-top: 15px;
  }

  .upload-file {
    display: inline-block;
  }
</style>