<template>
  <div class="aside" :style="{background: styleSetting.darkColor}">
    <div class="logoSite">
      <Logo></Logo>
    </div>
    <div class="menuSite">
      <Menu></Menu>
    </div>
  </div>
</template>
<script>
import Logo from "./Logo"
import Menu from "./Menu"
import styleSetting from "@/assets/styles/setting.scss"
export default {
  components: {
    Logo,
    Menu
  },
  computed: {
    styleSetting() {
      return styleSetting
    }
  }
}
</script>
<style lang="scss">
@import '~@/assets/styles/mixin.scss';
.aside {
  height: 100%;
  overflow-x: hidden;
  position: relative;
  padding-top: 60px;
  box-sizing: border-box;
  .logoSite {
    position: absolute;
    top: 0;
    width: 100%;
    height: 60px;
  }
  .menuSite {
    height: 100%;
    overflow-y: auto;
    @include scrollBar;
  }
}
</style>