<template>
  <div class="role-page">

    <!-- 账号搜索 -->
    <div class="role-page-search">
      <el-form :inline="true" ref="form" :model="form">
        <el-form-item label="姓名:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="手机号码:">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="用户角色:">
          <el-select v-model="form.role" clearable placeholder="请选择">
            <el-option v-for="item in sRole" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="归属部门:">
          <el-select v-model="form.department" clearable placeholder="请选择">
            <el-option v-for="item in sDepartment" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onAddSubmit">新建</el-button>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <!-- 账号表格 -->
    <div class="role-page-table">
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" align="center" width="60">
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="账号名称">
          <template slot-scope="scope">
            <span>{{scope.row.account}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="归属部门">
          <template slot-scope="scope">
            <span>{{scope.row.organizationName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="post" label="用户职别">
          <template slot-scope="scope">
            <span>{{scope.row.userType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="用户姓名">
          <template slot-scope="scope">
            <span>{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="手机号码">
          <template slot-scope="scope">
            <span>{{scope.row.userTel}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="用户角色">
          <template slot-scope="scope">
            <span>{{scope.row.roleName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="启用状态">
          <template slot-scope="scope">
            <el-button type="text" @click="sevStop(scope.$index, tableData)">{{scope.row.statusCode}}</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delect(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-item" style="text-align: right;">
        <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- 新建账号 -->
    <div class="role-page-newAccount">
      <el-dialog :visible.sync="dialogFormVisible" title="新建账号" width="500px" @close="closeDialog">
        <div class="dialog-box">
          <el-form ref="newForm" :model="newForm" label-width="100px" :rules="rules">
            <el-form-item label="归属部门:" prop="department">
              <el-select v-model="newForm.department" clearable placeholder="请选择" style="width:300px;" @change="showRole">
                <el-option v-for="item in oDepartment" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="用户角色:" prop="role">
              <el-select v-model="newForm.role" clearable placeholder="请选择" style="width:300px;">
                <el-option v-for="item in oRole" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="用户职别:" prop="post">
              <el-select v-model="newForm.post" clearable placeholder="请选择" style="width:300px;">
                <el-option label="员工" value="1"></el-option>
                <el-option label="领导" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="账号名称:" prop="name">
              <el-input v-model="newForm.name" style="width:300px;"></el-input>
            </el-form-item>

            <el-form-item label="密码:" prop="password">
              <el-input type="password" v-model="newForm.password" style="width:300px;"></el-input>
            </el-form-item>

            <el-form-item label="联系电话:" prop="phone">
              <el-input v-model="newForm.phone" style="width:300px;"></el-input>
            </el-form-item>

          </el-form>
        </div>
        <div class="close-box">
          <el-button type="primary" size="small" @click="addAccount('newForm')">确定</el-button>
          <el-button type="primary" size="small" @click="dialogFormVisible=false">关闭</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {
    subUserRegisterAndModify,
    getAccountByPage,
    getOrganizationNameListByUserId,
    selectOrganizationRoleMap,
    getRoleByKeyName,
    getOrganizationByKeyName,
    update,
    stopUsed
  } from "@/api/system";
  import { getUserId } from "@/utils/auth";
  import { validatePhone } from "@/utils/validate";
  export default {
    name: "role-manage",
    data() {
      const isPhone = (rule, value, callback) => {
        if (!validatePhone(value)) {
          callback(new Error("手机号不正确"));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        form: {
          name: "",
          phone: "",
          department: "",
          role: ""
        },
        tableData: [],
        newForm: {
          department: "",
          role: "",
          name: "",
          password: "",
          phone: "",
          post: ""
        },
        rules: {
          department: [
          {
            required: true,
            message: "归属部门不能为空",
            trigger: "change"
          }],
          role: [
          {
            required: true,
            message: "用户角色不能为空",
            trigger: "change"
          }],
          post: [
          {
            required: true,
            message: "用户职别不能为空",
            trigger: "change"
          }],
          name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" }
          ],
          phone: [{ required: true, trigger: "blur", validator: isPhone }]
        },
        total: 0,
        pageIndex: 1,
        oDepartment: [], //存储归属部门
        oRole: [], //存储角色
        sRole: [], //存储搜索的角色名称
        sDepartment: [] //存储搜索的归属名称
      };
    },
    mounted() {
      this.oDepartment = [];
      let data = {
        userId: getUserId()
      };
      getOrganizationNameListByUserId(data).then(res => {
        res.results.map(item => {
          this.sDepartment.push({ value: item.id, label: item.name });
          if (item.level != "1") {
            this.oDepartment.push({
              label: item.name,
              value: item.id
            });
          }
        });
      });
      this.getdata();
      this.querySearchRole();
      // this.querySearchDepartment();
    },
    methods: {
      onSubmit(value) {
        this.getdata();
      },
      onReset() {
        for (let key in this.form) {
          this.form[key] = "";
        }
      },
      onAddSubmit() {
        this.dialogFormVisible = true;
      },
      addAccount(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data = {
              parentUserId: getUserId(),
              operateType: 1,
              sysUser: {
                name: this.newForm.name,
                password: this.newForm.password,
                telephone: this.newForm.phone,
                type: 1,
                account: this.newForm.phone
              },
              PersonalDedail: {
                mobile: this.newForm.phone,
                typeId: this.newForm.post
              },
              EnterpriseDetail: {
                legalPerson: this.newForm.name,
                legalPersonTel: this.newForm.phone
              },
              organizationId: this.newForm.department,
              roleId: this.newForm.role
            };
            subUserRegisterAndModify(data).then(res => {
              this.getdata();
              this.$message.success(res.msg);
              this.dialogFormVisible = false;
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      getdata() {
        let data = {
          organizationId: this.form.department,
          roleId: this.form.role,
          userTel: this.form.phone,
          userName: this.form.name,
          userPId: getUserId(),
          pageIndex: this.pageIndex,
          pageSize: 10
        };
        getAccountByPage(data).then(res => {
          this.total = res.results.totalRecords;
          this.tableData = res.results.datas;
          this.tableData.map(item => {
            switch (item.userType) {
              case "1":
                item.userType = "员工";
                break;
              case "2":
                item.userType = "领导";
                break;
            }
            switch (item.status) {
              case "0":
                item.statusCode = "启用";
                break;
              case "1":
                item.statusCode = "禁用";
                break;
            }
          });
        });
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getdata();
      },
      showRole(val) {
        this.oRole = [];
        let data = {
          organizationId: val
        };
        selectOrganizationRoleMap(data).then(res => {
          res.results.map(item => {
            this.oRole.push({ label: item.roleName, value: item.roleId });
          });
        });
      },
      querySearchRole() {
        let data = {
          keyName: ""
        };
        getRoleByKeyName(data).then(res => {
          res.results.map(item => {
            this.sRole.push({ value: item.id, label: item.name });
          });
        });
      },
      // querySearchDepartment() {
      //   let data = {
      //     keyName: ""
      //   };
      //   getOrganizationByKeyName(data).then(res => {
      //     res.results.map(item => {
      //       this.sDepartment.push({ value: item.id, label: item.name });
      //     });
      //   });
      // },
      delect(index, rows) {
        let data = {
          sysUser: {
            delFlag: "0",
            id: rows[index].sysUserId
          },
          personalDedail: {
            delFlag: "0"
          }
        };
        update(data).then(res => {
          this.$message.success(res.msg);
          this.getdata();
        });
      },
      closeDialog() {
        this.$refs["newForm"].resetFields();
      },
      sevStop(index, rows) {
        let data = {
          status: rows[index].status == "1" ? 0 : 1,
          id: rows[index].sysUserId
        };
        stopUsed(data).then(res => {
          this.$message.success(res.msg);
          this.getdata();
        });
      }
    }
  };
</script>

<style scoped>
  .role-page {
    padding: 15px;
  }

  .close-box {
    text-align: center;
  }

  .right-pagination {
    float: right;
    padding-top: 15px;
  }
</style>