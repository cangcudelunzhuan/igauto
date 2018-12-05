<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <sidebar class="sidebar-container"></sidebar>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>


<script>
  import { Navbar, Sidebar, AppMain, TagsView } from "@/views/layout";

  export default {
    name: "layout",
    components: {
      Navbar,
      Sidebar,
      AppMain,
      TagsView
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
      .sidebar-wrapper {
        transform: translate(-140px, 0);
        .sidebar-container {
          transform: translate(140px, 0);
        }
        &:hover {
          transform: translate(0, 0);
          .sidebar-container {
            transform: translate(0, 0);
          }
        }
      }
      .main-container {
        margin-left: 60px;
      }
    }
    .sidebar-wrapper {
      width: 200px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-x: hidden;
      transition: all 0.28s ease-out;
    }
    .sidebar-container {
      transition: all 0.28s ease-out;
      border: 0;
    }
    .main-container {
      min-height: 100%;
      transition: all 0.28s ease-out;
      margin-left: 200px;
    }
  }
</style>