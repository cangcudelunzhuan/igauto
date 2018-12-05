<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <span style="font-size:20px;margin-left:40px;">吉利RMS远程监控平台</span>
    <!-- <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="static/img/peoples.png">
        <span class="user-name">
          {{name}}
        </span>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <div class="user-info">
      <img class="user-avatar" src="static/img/peoples.png">
      <span class="user-name" style="margin-right:20px;">
        您好，{{name}}
      </span>
      <div class="change-password">
        <span @click="changePassword">修改密码</span>
      </div>
      <div class="user-logoout">
        <span @click="logout">退出</span>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" class="dialog" :close-on-click-modal="false" @close="close">

      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="原密码:" prop="oldPass" style="width:300px;">
          <el-input type="password" v-model="form.oldPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="pass" style="width:300px;">
          <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码:" prop="checkPass" style="width:300px;">
          <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click=" cancel">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
// import Levelbar from './Levelbar'
// import Hamburger from "@/components/Hamburger";
import { getUserName, getUserId } from "@/utils/auth";
import { updatePassword } from "@/api/system";

export default {
  components: {
    // Levelbar,
    // Hamburger
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (!/^[a-z0-9A-Z,\.;\:"'!]{6,18}$/.test(value)) {
        callback(new Error("密码格式错误"));
      } else if (this.form.oldPass === this.form.pass) {
        callback(new Error("不能与原密码相同"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (!/^[a-z0-9A-Z,\.;\:"'!]{6,18}$/.test(value)) {
        callback(new Error("密码格式错误"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [{ validator: validatePass, trigger: "blur", required: true }],
        pass: [{ validator: validatePass, trigger: "blur", required: true }],
        checkPass: [
          { validator: validatePass2, trigger: "blur", required: true }
        ]
      }
    };
  },
  created() {
    this.name = decodeURIComponent(getUserName());
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    changePassword() {
      this.dialogFormVisible = true;
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        let data = {
          userId: getUserId(),
          oldPassword: this.md5(this.form.oldPass),
          newPassword: this.md5(this.form.pass)
        };
        if (valid) {
          updatePassword(data).then(res => {
            this.$message.success(res.msg);
            this.cancel();
          });
        }
      });
    },
    close() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    &:focus {
      outline: none;
    }
  }
  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .user-info {
    position: absolute;
    height: 50px;
    top: 0;
    right: 80px;
    font-size: 14px;
    .user-avatar {
      width: 40px;
      height: 40px;
      margin-top: 5px;
    }
    .user-name,
    .user-logoout,
    .change-password {
      display: inline-block;
      position: relative;
      top: -30%;
    }
    .user-logoout,
    .change-password {
      cursor: pointer;
      color: #1890ff;
      margin: 0 20px;
    }
    &:focus {
      outline: none;
    }
  }

  // .avatar-container {
  //   height: 50px;
  //   display: inline-block;
  //   position: absolute;
  //   right: 80px;
  //   .avatar-wrapper {
  //     cursor: pointer;
  //     margin-top: 5px;
  //     position: relative;
  //     .user-avatar {
  //       width: 40px;
  //       height: 40px;
  //       border-radius: 10px;
  //     }
  //     .user-name {
  //       position: absolute;
  //       top: 0;
  //       right: -24px;
  //     }
  //     .el-icon-caret-bottom {
  //       position: absolute;
  //       right: -5px;
  //       top: 25px;
  //       font-size: 12px;
  //     }
  //   }
  // }

  .dialog {
    width: 800px;
    margin: 0 auto;
    &:focus {
      outline-style: none;
    }
  }
}
</style>