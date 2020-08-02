<template>
  <div class="logo">
    <router-link to="/">
      <template v-if="isCollapse">
        <span>YQ</span>
      </template>
      <template v-else>
        <img src="@/assets/images/logo.png" alt />
      </template>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters(["isCollapse"])
  }
}
</script>