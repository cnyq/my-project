<template>
  <div>
    <el-container class="containerAll">
      <el-aside :width="isCollapse?'64px':'230px'">
        <Aside></Aside>
      </el-aside>
      <el-container class="containerRi" :style="{'margin-left':isCollapse?'64px':'230px'}">
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
import { mapGetters } from "vuex"
import { Header, Aside, Main } from "./components"
export default {
  components: {
    Header,
    Aside,
    Main
  },
  computed: {
    ...mapGetters(["isCollapse"])
  }
}
</script>