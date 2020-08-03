<template>
  <div>
    <bar-chart :data="data" :axis="axis" :color="barGraph.color" :width="barGraph.width" />
  </div>
</template>
<script>
import BarChart from "../components/d3/BarChart"
export default {
  components: {
    BarChart
  },
  data() {
    return {
      // 总数据
      data: [50, 43, 120, 87, 99, 167, 188, 123, 355],
      axis: {
        // 横坐标参数
        xAxisData: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "华为",
          "中兴",
          "oppo"
        ]
      },
      barGraph: {
        width: 700, // 由于在条形统计图组件中，各项都有默认值，故而只传width，height使用默认值
        color: "#3398DB" // 条形块背景色
      }
    }
  }
}
</script>