<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <keep-alive :include="visitedViews">
            <router-view :key="key" />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  computed: {
    key() {
      return this.$route.fullPath
    },
    visitedViews() {
      return []
    }
  }
}
</script>
<style lang="scss">
.el-header{
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>