<template>
  <div>
    111
    <keep-alive :include="visitedViews">
      <router-view :key="key" />
    </keep-alive>
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