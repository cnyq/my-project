<template>
  <div class="app-aside" :style="{background: styleSetting.darkColor}">
    <div class="logoSite">
      <Logo></Logo>
    </div>
    <div class="menuSite">
      <transition name="fade-transformSm" mode="out-in">
        <Menu></Menu>
      </transition>
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
</style>