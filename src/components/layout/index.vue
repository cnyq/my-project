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