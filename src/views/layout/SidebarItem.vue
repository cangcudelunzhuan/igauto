<template>
  <div>
    <div class="logo">
      <img src="static/img/logo.png" alt="">
      <span>吉利RMS远程监控平台</span>
    </div>
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden" :key="item.name">
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]' :key="child.path"> </sidebar-item>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              {{child.name}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.logo {
  padding: 22px 0px 16px 0;
  background: #002140;
  box-shadow: 2px 0 6px 0 rgba(0, 21, 41, 0.35);
  text-align: center;
  position: relative;
  span {
    display: inline-block;
    color: #fff;
    font-size: 12px;
    letter-spacing: 3px;
    line-height: 1;
  }
}
.svg-icon {
  margin-right: 30px;
}
.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}
</style>

