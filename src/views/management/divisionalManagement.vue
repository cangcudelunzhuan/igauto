<template>
  <div class="mechanism-page">

    <!-- 机构管理搜索条 -->
    <div class="mechanism-page-search">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="部门名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onAddSubmit">新建</el-button>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <!-- 机构管理表格 -->
    <div class="mechanism-page-table">
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" align="center" width="60">
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="部门名称">
          <template slot-scope="scope">
            <span>{{scope.row.organizationNameDto.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="机构名称">
          <template slot-scope="scope">
            <span>{{scope.row.organizationRootName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="归属">
          <template slot-scope="scope">
            <span>{{scope.row.parentName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="部门地址">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
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
                <el-input v-model="newInstitution.type" placeholder="请输入内容" disabled></el-input>
              </td>
              <td class="table-title">部门名称</td>
              <td>
                <el-input v-model="newInstitution.name" placeholder="请输入内容"></el-input>
              </td>
            </tr>
            <tr>
              <td class="table-title">部门联系人</td>
              <td>
                <el-input v-model="newInstitution.people" placeholder="请输入内容"></el-input>
              </td>
              <td class="table-title">联系人电话</td>
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
              <td class="table-title">部门电话</td>
              <td>
                <el-input v-model="newInstitution.dPhone" placeholder="请输入内容"></el-input>
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
    addOrganization,
    updateOrganization,
    deleteOrganization,
    getRegion,
    getRegionByCode,
    getOrganizationList,
    getOrganizationByUserId
  } from "@/api/system";
  import { getUserId } from "@/utils/auth";

  export default {
    name: "divisional-management",
    data() {
      return {
        dialogTableVisible: false,
        form: {
          name: ""
        },
        total: 0,
        tableData: [],
        isopen: true,
        newInstitution: {
          type: "", //机构类型
          name: "", //部门名称
          province: "", //省份
          city: "", //城市
          people: "", //部门联系人
          phone: "", //联系人电话
          status: 1, //是否启用
          add: "", //地址
          email: "", //邮箱
          dPhone: "" //部门电话
        },
        desc: "", //企业简介
        iseditor: false,
        oProvince: [], //省份
        oCity: [], //市
        nationwide: [], //全国的省市区
        rowRegionCode: "", //存从编辑获取过来的code值
        isNew: false, //辨识是注册还是编辑
        title: "新建部门",
        pageIndex: 1, //当前页
        level: "", //存组织等级
        organizationCode: "", //存组织编码
        id: "", //存放编辑id
        parentId: "" //存放父节点id
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
        let data = {
          userId: getUserId()
        };
        getOrganizationByUserId(data).then(res => {
          this.datafilter();
          this.title = "新建部门";
          this.isNew = true;
          this.newInstitution.type = res.results.name;
          this.level = Number(res.results.level) + 1;
          this.organizationCode = res.results.organizationCode;
          this.parentId = res.results.id;
          this.dialogTableVisible = true;
        });
      },
      determine() {
        if (this.newInstitution.name == "") {
          this.$message.error("部门名称不能为空");
        } else if (this.newInstitution.people == "") {
          this.$message.error("部门联系人不能为空");
        } else if (this.newInstitution.phone == "") {
          this.$message.error("联系人电话不能为空");
        } else if (this.newInstitution.add == "") {
          this.$message.error("地址不能为空");
        } else {
          let data = {
            email: this.newInstitution.email,
            departmentPerson: this.newInstitution.people,
            telephone: this.newInstitution.phone,
            name: this.newInstitution.name,
            address: this.newInstitution.add,
            used: this.newInstitution.status || "1",
            description: this.desc,
            regionCode: this.filterRegionCode(this.newInstitution.city),
            departmentPhone: this.newInstitution.dPhone,
            level: this.level ? this.level : 1,
            organizationCode: this.organizationCode,
            id: this.id,
            parentId: this.parentId
          };
          if (this.isNew) {
            addOrganization(data).then(res => {
              this.$message.success(res.msg);
              this.isNew = false;
              this.getData();
            });
          } else {
            updateOrganization(data).then(res => {
              this.$message.success(res.msg);
              this.getData();
            });
          }

          this.dialogTableVisible = false;
        }
      },
      editorClick(row) {
        let data = {
          id: row.regionCode
        };

        getRegionByCode(data).then(res => {
          this.rowRegionCode = row.regionCode;

          //回显编辑区数据
          this.newInstitution.add = row.address;
          this.newInstitution.email = row.email;
          this.newInstitution.people = row.departmentPerson;
          this.newInstitution.phone = row.telephone;
          this.newInstitution.name = row.organizationNameDto.name;
          this.desc = row.description;
          this.newInstitution.dPhone = row.departmentPhone;
          this.newInstitution.type = row.parentName;
          this.id = row.organizationNameDto.id;
          this.isopen = row.used == "1" ? true : false;
          this.organizationCode = row.organizationCode;
          this.level = row.organizationNameDto.level;
          this.parentId = row.parentId;
          this.newInstitution.city = res.results ? res.results.city : "";
          this.newInstitution.province = res.results ? res.results.province : "";

          this.title = "编辑部门";
          this.dialogTableVisible = true;
        });
      },
      deleteClick(index, rows) {
        let data = {
          id: rows[index].organizationNameDto.id
        };
        deleteOrganization(data).then(res => {
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
      getData() {
        let data = {
          pageIndex: this.pageIndex,
          pageSize: 10,
          name: this.form.name,
          userId: getUserId()
        };
        getOrganizationList(data).then(res => {
          let list = res.results.datas;
          this.total = res.results.totalRecords;
          this.tableData = list;
        });
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