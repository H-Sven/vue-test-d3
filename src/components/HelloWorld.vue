<template>
  <div class="hello">
   <svg id="test_svg" width='1200' height='600'></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'; //引入d3
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data(){
    return {
      data: [],
      chart:'',
      random:'',
      line:'',
    }
  },
  mounted() {
    console.log(d3);
    this.init()
  },
  methods: {
    init(){
      this.chart = d3.select(document.querySelector('#test_svg'));
      const n = 50;
      const random = d3.randomNormal(0.5, 0.3);
      const data = d3.range(n).map(random);
      const margin = {top: 20, right: 20, bottom: 20, left: 40};
      const width = +this.chart.attr("width") - margin.left - margin.right;
      const height = +this.chart.attr("height") - margin.top - margin.bottom;
      const g = this.chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      const x = d3.scaleLinear()
        .domain([1,n-2])
        .range([0,width]);
      const y = d3.scaleLinear()
        .domain([0,1.8])
        .range([height,0]);
      const line = d3.line()
        .curve(d3.curveBasis)
        .x((d,i) => x(i))
        .y((d,i) => y(d));
      g.append('defs').append('clipPath')
        .attr('id','clip')
        .append('rect')
        .attr('width',width)
        .attr('height',height);
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.axisBottom(x));
      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));
      g.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(data)
        .attr("class", "line")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .on("start", tick);
      function tick() {
        data.push(random());
        d3.select(this)
          .attr("d", line)
          .attr("transform", null);
        d3.active(this)
          .attr("transform", "translate(" + x(0) + ",0)")
          .transition()
          .on("start", tick);
        data.shift();
      }
    },
  }
};
</script>
<style lang="less">
.hello {
  width: 100%;
}
.line {
  fill: none;
  stroke: #000;
  stroke-width: 1.5px;
}
#test_svg {
  width: 1200px;
  height: 600px;
}
</style>
