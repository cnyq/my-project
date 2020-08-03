<template>
  <div class="breadcrumb">
    <div class="breadcrumb-label">当前位置：</div>
    <transition name="fade-transformSm" mode="out-in">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item,index) in breadcrumbList"
          :key="index"
          :to="routerState(item.router)"
        >{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["breadcrumbList"])
  },
  methods: {
    routerState(path) {
      return path ? { path: path } : ""
    }
  }
}
</script>
<style lang="scss">
.breadcrumb {
  display: flex;
  align-items: center;
  .breadcrumb-label {
    font-size: 14px;
  }
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #77b9fa;
}
.el-breadcrumb__inner {
  color: #fff;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #fff;
}
</style>