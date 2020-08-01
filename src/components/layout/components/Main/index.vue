<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive :include="visitedViews">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>
<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.fullPath
    },
    visitedViews() {
      let visitedViews = []
      return  []
    }
  }
}
</script>