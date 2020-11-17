<template>
  <div id="ele"></div>
</template>
<script>
import * as d3 from "d3"
export default {
  mounted() {
    this.render()
  },
  methods: {
    render() {
      let e = ["\n %c %c %c Theme GitHub - " + 'yq'+" %c  %c "+'https://github.com'+"  %c \n", "background: #fadfa3; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;", "background: #FCEDC9; padding:5px 0;", "background: #fadfa3; padding:5px 0;"];
      console.log.apply(console, e);
      // d3.csv().then(function(data) {
      //   console.log(data)
      // })
    }
  }
}
</script>