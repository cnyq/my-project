<template>
  <div>
    <el-container class="containerAll">
      <el-aside width="230px">
        <Aside></Aside>
      </el-aside>
      <el-container class="containerRi">
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <Main></Main>
          <keep-alive :include="visitedViews">
            <router-view :key="key" />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { Header, Aside, Main } from "./components"
export default {
  components: {
    Header,
    Aside,
    Main
  },
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
.containerAll {
  height: 100vh;
}
.el-header {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.el-aside {
  background-color: #fff;
  height: 100%;
  -moz-box-shadow: 2px 0px 6px #ccc;
  -webkit-box-shadow: 2px 0px 6px #ccc;
  box-shadow: 2px 0px 6px #ccc;
  position: fixed;
  left: 0;
}
.containerRi {
  margin-left: 230px;
}
.el-main {
  height: 100%;
}
</style>