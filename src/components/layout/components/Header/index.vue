<template>
  <div class="siteHeader" :style="{background: styleSetting.darkColor}">
    <div class="siteLe">
      <span class="collapseControl" @click="collapseControl">
        <template v-if="!isCollapse">
          <i class="el-icon-s-fold"></i>
        </template>
        <template v-else>
          <i class="el-icon-s-unfold"></i>
        </template>
      </span>
      <div class>
        <Breadcrumb></Breadcrumb>
      </div>
    </div>
    <el-avatar :size="35" :src="circleUrl" shape="square"></el-avatar>
  </div>
</template>
<script>
import Breadcrumb from "./Breadcrumb"
import { mapGetters } from "vuex"
import styleSetting from "@/assets/styles/setting.scss"
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    }
  },
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters(["isCollapse"]),
    styleSetting() {
      return styleSetting
    }
  },
  methods: {
    collapseControl() {
      this.$store.dispatch("app/updateCollapse", !this.isCollapse)
    }
  }
}
</script>
<style lang="scss">
.siteHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  color: #fff;
  .siteLe {
    display: flex;
    align-items: center;
  }
  .collapseControl {
    font-size: 20px;
    color: #fff;
    margin: 0 20px;
  }
  .el-avatar {
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>