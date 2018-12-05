<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">吉利RMS</h3>
      <el-form-item prop="username">
        <el-input style="width:100%;" name="username" type="text" v-model="loginForm.username" placeholder="请输入账号" autoComplete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:60px;">
        <el-button type="primary" style="width:100%;border-radius:0;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
$dark_gray: #333333;

.login-container {
  @include relative;
  height: 100vh;
  background: url(../../../static/img/loginbg.jpg) no-repeat;
  background-size: 100% 100%;
  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px #fff inset !important;
    -webkit-text-fill-color: $dark_gray !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $dark_gray;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 36px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #fff;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 390px;
    padding: 35px 35px 15px 35px;
    margin: 12% auto 0;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 8px 0 rgba(32, 60, 102, 0.3);
  }
  .el-form-item {
    background: #fff;
    border-radius: 2px;
    color: $dark_gray;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
