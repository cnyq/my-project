<template>
  <el-menu
    default-active="0"
    class="aside-menu"
    background-color="#313131"
    text-color="#fff"
    active-text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :unique-opened=true
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item index="1-5">选项1</el-menu-item>
      <el-menu-item index="1-6">选项2</el-menu-item>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航五</span>
      </template>
      <el-menu-item index="5-1">选项1</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss">
.aside-menu {
  border-right: none;
  .el-menu {
    & li {
      background: #4a4a4a !important;
    }
    & div {
      background: #4b3f3f !important;
    }
  }
  .el-menu-item.is-active {
    background: #108ee9 !important;
  }
}
</style>