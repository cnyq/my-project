<template>
  <div class="hint">
    <el-button type="success" plain @click="clic1k">开发中</el-button>
  </div>
</template>
<script>
import { setTitle } from "@/utils/title-set"
export default {
  name: 'home',
  methods: {
    clic1k() {
      setTitle()
    }
  }
}
</script>
<style lang="scss">

</style>