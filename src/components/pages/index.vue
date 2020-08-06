<template>
  <div class="home-container">
    <span ref="descStr"></span>
  </div>
</template>

<script>
import VueScript2 from "vue-script2"
export default {
  name: "home",
  data() {
    return {
      typedOptions: [
        '富强、民主、文明、',
        '和谐、自由、平等、',
        '公正、法治、爱国、',
        '敬业、诚信、友善'
      ]
    }
  },
  mounted() {
    VueScript2.load("https://cdn.bootcss.com/typed.js/2.0.5/typed.js").then(
      () => {
        this.typed()
      }
    )
  },
  methods: {
    //打字机typed.js插件
    typed() {
      const greeting = this.$refs.descStr
      const typed = new Typed(greeting, {
        strings: this.typedOptions,
        typeSpeed: 150,
        loop: true,
        backDelay: 2000,
        backSpeed: 60
      })
    }
  }
}
</script>
<style lang="scss">
.home-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  .typed-cursor {
    opacity: 1;
    -webkit-animation: blink 0.7s infinite;
    -moz-animation: blink 0.7s infinite;
    animation: blink 0.7s infinite;
  }
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-moz-keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
