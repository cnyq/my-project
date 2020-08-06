<template>
  <div id="ele"></div>
</template>
<script>
import * as d3 from "d3"
import { d3BarList as myData } from "@/assets/constant/d3"
export default {
  mounted() {
    this.render()
  },
  methods: {
    render() {
      const margin = {
        top: 30,
        bottom: 30,
        left: 60,
        right: 30
      }
      const svg = d3
        .select("#ele")
        .append("svg")
        .attr("id", "my")
        .attr("width", 1000)
        .attr("height", 600)
      const width = +svg.attr("width")
      const height = +svg.attr("height")
      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(myData, d => d.value)])
        .range([0, innerWidth])
      const yScale = d3
        .scaleBand()
        .domain(myData.map(d => d.name))
        .range([0, innerHeight])
        .padding(0.1)
      const g = svg
        .append("g")
        .attr("id", "myG")
        .attr("transform", `translate(${margin.left},${margin.top})`)

      const yAxis = d3.axisLeft(yScale)
      g.append("g").call(yAxis)

      const xAxis = d3.axisBottom(xScale)
      g.append("g")
        .call(xAxis)
        .attr("transform", `translate(0,${innerHeight})`)

      myData.forEach(it => {
        g.append("rect")
          .attr("width", xScale(it.value))
          .attr("height", yScale.bandwidth())
          .attr("fill", "yellow")
          .attr("y", yScale(it.name))
      })
      d3.selectAll(".tick text").attr("font-size", "14px")
      g.append("text")
        .text("图表")
        .attr("id", "myChart")
        .attr("font-size", "20px")
        .attr("color", "blue")
        .attr("transform", `translate(${innerWidth / 2},0)`)
        .attr('text-anchor','middle')
    }
  }
}
</script>