<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App"
}
</script>
<style lang="scss">
#nprogress {
  .bar {
    // height: 3px!important;
    border-radius: 5px;
    background-color: skyblue!important;
    background-image: linear-gradient(135deg,#b3c0d1 25%,#e9eef3 25%,#e9eef3 50%,#b3c0d1 50%,#b3c0d1 75%,#e9eef3 75%,#e9eef3 100%)!important;
    background-size: 20px 20px!important;
  }
}
</style>