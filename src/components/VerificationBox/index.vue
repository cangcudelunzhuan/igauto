<template>
  <div class="message-box tag-left" :style="{position:'absolute',top:top+ 'px',left:left+ 'px'}">
    <ul>
      <li v-for="(item,index) in ndata" :key="index">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "verification-box",
    props: ['data'],
    computed: {
      ndata: function() {
        if (this.data) {
          this.top = this.data.top;
          this.left = this.data.left;
          return this.user
        }
      }
    },
    data() {
      return {
        top: 0,
        left: 0,
        user: ["6-30个字符，字母或者汉字", "设置后不可更改"],
        password: ["6-30个字符", "只能包含字母、数字、特殊字符（空格除外），至少包含2种"],
        confirmPassword: ["请再次确认登录密码", "必须和已输入密码一致"],
        phone: ["手机号可用于密码找回和登录"]
      }
    }

  }
</script>

<style lang="scss" scoped>
  .message-box {
    box-shadow: 2px 2px 10px #000;
    ul {
      padding: 0px;
      margin: 0px;
      li {
        list-style: none;
        margin: 5px 0;
      }
    }
  }

  .tag-left {
    margin: 20px;
    padding: 5px;
    width: 190px; // height: 60px;
    border: 1px solid #ccc;
    position: relative;
    background-color: #FFF;
    border-radius: 5px;
  }

  .tag-left:before,
  .tag-left:after {
    content: "";
    display: block;
    border-width: 8px;
    position: absolute;
    left: -18px;
    top: 12px;
    border-style: dashed solid solid dashed;
    border-color: transparent #ccc transparent transparent;
    font-size: 0;
    line-height: 0;
  }

  .tag-left:after {
    left: -16px;
    border-color: transparent #FFF transparent transparent;
  }
</style>