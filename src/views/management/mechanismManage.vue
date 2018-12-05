<template>
  <div class="mechanism-page">

    <!-- 机构管理搜索条 -->
    <div class="mechanism-page-search">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="机构类型:">
          <el-select v-model="form.type" clearable placeholder="请选择">
            <el-option label="的蓝运营" value="1"></el-option>
            <el-option label="研究院" value="2"></el-option>
            <el-option label="生产基地" value="3"></el-option>
            <el-option label="销售体系" value="4"></el-option>
            <el-option label="售后体系" value="5"></el-option>
            <el-option label="服务运营商" value="6"></el-option>
            <el-option label="经销商" value="7"></el-option>
            <el-option label="企业" value="8"></el-option>
            <el-option label="服务站" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="手机号码:">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <!-- 按钮组 -->
    <div style="margin-bottom:20px">
      <el-button type="primary" @click="onAddSubmit">新建</el-button>
      <!-- <el-button type="primary" @click="vehicleManagement">车辆管理</el-button> -->
    </div>

    <!-- 机构管理表格 -->
    <div class="mechanism-page-table">
      <el-table :data="tableData" border highlight-current-row @current-change="affiliationHandle">
        <el-table-column label="序号" type="index" align="center" width="60">
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="机构类型">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="机构名称">
          <template slot-scope="scope">
            <span>{{scope.row.enterpriseName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="地址">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="管理员姓名">
          <template slot-scope="scope">
            <span>{{scope.row.sysUser.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="联系电话">
          <template slot-scope="scope">
            <span>{{scope.row.sysUser.telephone}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editorClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteClick(scope.$index, tableData)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-item" style="text-align: right;">
        <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- 机构管理新建 -->
    <div class="mechanism-page-new">
      <el-dialog :visible.sync="dialogTableVisible" :title="title" top="10vh" width="60%">
        <div>
          <table class="alert-table" border="1">
            <tr>
              <td class="table-title">机构类型</td>
              <td>
                <el-select v-model="newInstitution.type" clearable placeholder="请选择" :disabled="disabled">
                  <el-option label="的蓝运营" value="1"></el-option>
                  <el-option label="研究院" value="2"></el-option>
                  <el-option label="生产基地" value="3"></el-option>
                  <el-option label="销售体系" value="4"></el-option>
                  <el-option label="售后体系" value="5"></el-option>
                  <el-option label="服务运营商" value="6"></el-option>
                  <el-option label="经销商" value="7"></el-option>
                  <el-option label="企业" value="8"></el-option>
                  <el-option label="服务站" value="9"></el-option>
                </el-select>
              </td>
              <td class="table-title">企业名称</td>
              <td>
                <el-input v-model="newInstitution.name" placeholder="请输入内容" :disabled="disabled"></el-input>
              </td>
            </tr>
            <tr>
              <td class="table-title">管理员名称</td>
              <td>
                <el-input v-model="newInstitution.people" placeholder="请输入内容"></el-input>
              </td>
              <td class="table-title">管理员电话</td>
              <td>
                <el-input v-model="newInstitution.phone" placeholder="请输入内容"></el-input>
              </td>
            </tr>
            <tr>
              <td class="table-title">省份</td>
              <td>
                <el-select v-model="newInstitution.province" placeholder="请选择" @change="cityShow">
                  <el-option v-for="item in oProvince" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td class="table-title">城市</td>
              <td>
                <el-select v-model="newInstitution.city" placeholder="请选择">
                  <el-option v-for="item in oCity" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="table-title">地址</td>
              <td>
                <el-input v-model="newInstitution.add" placeholder="请输入内容"></el-input>
              </td>
              <td class="table-title">营业执照图片</td>
              <td>
                <el-upload class="upload-demo" accept="image/*" ref="upload" action="" :on-success="businessLicense">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
              </td>
            </tr>
            <tr>
              <td class="table-title">邮箱</td>
              <td>
                <el-input v-model="newInstitution.email" placeholder="请输入内容"></el-input>
              </td>
              <td class="table-title">启用状态</td>
              <td>
                <el-switch v-model="isopen" active-color="#13ce66" inactive-color="#ff4949" @change="changeStatus">
                </el-switch>
              </td>
            </tr>
          </table>
          <div>
            <el-form>
              <el-form-item label="企业简介">
                <el-input type="textarea" v-model="desc" autosize></el-input>
              </el-form-item>
              <el-form-item label="企业LOGO">
                <el-upload class="upload-demo" accept="image/*" drag action="" :on-success="logo">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或
                    <em>点击上传</em>
                  </div>
                  <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </el-form-item>
            </el-form>

          </div>
        </div>
        <div class="close-box">
          <el-button type="primary" size="small" @click="determine">确定</el-button>
          <el-button type="primary" size="small" @click="dialogTableVisible=false">关闭</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {
    registerEnterpriseUser,
    getRegion,
    updateEnterpriseUser,
    getEnterpriseByPage,
    getRegionByCode
  } from "@/api/system";
  import { validatePhone, validateEmail } from "@/utils/validate";
  export default {
    name: "mechanism-manage",
    data() {
      return {
        dialogTableVisible: false,
        form: {
          name: "",
          phone: "",
          type: ""
        },
        total: 0,
        tableData: [],
        isopen: true,
        newInstitution: {
          type: "", //机构类型
          name: "", //企业名称
          province: "", //省份
          city: "", //城市
          people: "", //管理员名称
          phone: "", //管理员电话
          status: 1, //是否启用
          add: "", //地址
          email: "" //邮箱
        },
        desc: "", //企业简介
        disabled: false,
        iseditor: false,
        oProvince: [], //省份
        oCity: [], //市
        nationwide: [], //全国的省市区
        img: {
          businessLicense: "",
          logo: "" //用来存后台返回的图片URL
        },
        delFlag: 1, //是否删除 1 为默认 0 为删除
        rowRegionCode: "", //存从编辑获取过来的code值
        rowTypeId: "", //存从编辑获取过来的type类型值
        isNew: false, //是新增还是编辑
        pageIndex: 1, //当前页
        id: "", //当前这条的id
        sysUserId: "", //当前这条的id
        title: "新建机构"
      };
    },
    mounted() {
      getRegion().then(res => {
        this.nationwide = res.results;
        this.linkage();
      });
      this.getData();
    },
    methods: {
      onSubmit(value) {
        this.getData();
      },
      onReset() {
        for (let key in this.form) {
          this.form[key] = "";
        }
      },
      onAddSubmit() {
        this.datafilter();
        this.title = "新建机构";
        this.isNew = true;
        this.disabled = false;
        this.dialogTableVisible = true;
      },
      determine() {
        if (this.newInstitution.type == "") {
          this.$message.error("机构类型不能为空");
        } else if (this.newInstitution.name == "") {
          this.$message.error("企业名称不能为空");
        } else if (this.newInstitution.people == "") {
          this.$message.error("管理员名称不能为空");
        } else if (!validatePhone(this.newInstitution.phone)) {
          this.$message.error("管理员电话格式错误");
        } else if (this.newInstitution.add == "") {
          this.$message.error("地址不能为空");
        } else {
          let data = {
            email: this.newInstitution.email,
            sysUser: {
              name: this.newInstitution.people,
              telephone: this.newInstitution.phone,
              status: this.newInstitution.status || "1",
              id: this.sysUserId,
              delFlag: this.delFlag,
              password: "123456",
              account: this.newInstitution.phone
            },
            enterpriseName: this.newInstitution.name,
            address: this.newInstitution.add,
            typeId: this.filterTypeId(this.newInstitution.type),
            userImage: this.img.logo,
            businessLicenseImage: this.img.businessLicense,
            remark: this.desc,
            regionCode: this.filterRegionCode(this.newInstitution.city),
            accountType: 1,
            id: this.id
          };
          if (this.isNew) {
            registerEnterpriseUser(data).then(res => {
              this.$message.success(res.msg);
              this.isNew = false;
              this.getData();
            });
          } else {
            updateEnterpriseUser(data).then(res => {
              this.$message.success(res.msg);
              this.getData();
            });
          }

          this.dialogTableVisible = false;
        }
      },
      editorClick(row) {
        console.log(row);
        let data = {
          id: row.regionCode
        };
        getRegionByCode(data).then(res => {
          this.rowRegionCode = row.regionCode;
          this.rowTypeId = row.typeId;

          //回显编辑区数据
          this.newInstitution.people = row.sysUser.name;
          this.newInstitution.phone = row.sysUser.telephone;
          this.newInstitution.email = row.email;
          this.newInstitution.type = row.type;
          this.newInstitution.add = row.address;
          this.newInstitution.name = row.enterpriseName;
          this.desc = row.remark;
          this.isopen = row.sysUser.status == "1" ? true : false;
          this.newInstitution.city = res.results ? res.results.city : "";
          this.newInstitution.province = res.results ? res.results.province : "";
          this.id = row.id;
          this.sysUserId = row.sysUser.id;

          this.title = "编辑机构";
          this.dialogTableVisible = true;
          this.disabled = true;
        });
      },
      deleteClick(index, rows) {
        let data = {
          id: rows[index].id,
          sysUser: {
            id: rows[index].sysUser.id,
            delFlag: 0
          }
        };
        updateEnterpriseUser(data).then(res => {
          this.$message.success(res.msg);
          this.getData();
        });
      },
      datafilter() {
        for (let i in this.newInstitution) {
          this.newInstitution[i] = "";
        }
        this.isopen = true;
        this.newInstitution.fileList = [];
        this.oCity = [];
        this.desc = "";
        this.id = "";
        this.sysUserId = "";
      },
      exportFile() {
        console.log("这是导出按钮");
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getData();
      },
      changeStatus(val) {
        switch (val) {
          case true:
            this.newInstitution.status = "1";
            break;
          case false:
            this.newInstitution.status = "0";
            break;
        }
      },
      businessLicense(response, file, fileList) {
        console.log(response);
      },
      logo(response, file, fileList) {
        console.log(response);
      },
      linkage() {
        this.oProvince = [];
        this.nationwide.map(item => {
          this.oProvince.push({ label: item.province, value: item.regionCode });
        });
      },
      cityShow(val) {
        this.oCity = [];
        this.newInstitution.city = "";
        this.nationwide.map(item => {
          if (item.regionCode == val) {
            item.citys.map(item => {
              this.oCity.push({ label: item.name, value: item.id });
            });
          }
        });
      },
      filterRegionCode(val) {
        if (Number(val)) {
          return val;
        } else {
          return this.rowRegionCode;
        }
      },
      filterTypeId(val) {
        if (Number(val)) {
          return val;
        } else {
          return this.rowTypeId;
        }
      },
      getData() {
        let data = {
          typeId: this.form.type,
          enterpriseName: this.form.name,
          telephone: this.form.phone,
          pageIndex: this.pageIndex,
          pageSize: 10
        };
        getEnterpriseByPage(data).then(res => {
          let list = res.results.datas;
          this.total = res.results.totalRecords;
          list.map(item => {
            switch (item.typeId) {
              case "1":
                item.type = "的蓝运营";
                break;
              case "2":
                item.type = "研究院";
                break;
              case "3":
                item.type = "生产基地";
                break;
              case "4":
                item.type = "销售体系";
                break;
              case "5":
                item.type = "售后体系";
                break;
              case "6":
                item.type = "服务运营商";
                break;
              case "7":
                item.type = "经销商";
                break;
              case "8":
                item.type = "企业";
                break;
              case "9":
                item.type = "服务站";
                break;
            }
          });
          this.tableData = list;
        });
      },
      affiliationHandle(currentRow, oldCurrentRow) {
        console.log(currentRow, oldCurrentRow);
      },
      vehicleManagement() {
        this.$router.push({ name: "车辆管理" });
      }
    }
  };
</script>

<style scoped>
  .mechanism-page {
    padding: 15px;
  }

  .alert-table {
    border-collapse: collapse;
    width: 50em;
    margin: 0 auto;
    border: 1px solid #666;
  }

  .alert-table .row-tr {
    background-color: #ddd;
  }

  .alert-table .table-title {
    background-color: #abcdef;
  }

  .alert-table th,
  .alert-table td {
    padding: 0.1em 1em;
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .right-pagination {
    float: right;
    padding-top: 15px;
  }

  .el-input {
    width: 200px;
  }

  .el-select {
    width: 200px;
  }

  .close-box {
    text-align: center;
  }
</style>