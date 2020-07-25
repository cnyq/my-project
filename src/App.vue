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
    background-image: linear-gradient(135deg,#8ac007 25%,yellow 25%,yellow 50%,#8ac007 50%,#8ac007 75%,yellow 75%,yellow 100%)!important;
    background-size: 20px 20px!important;
  }
}
</style>