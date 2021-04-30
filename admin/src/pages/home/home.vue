<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/getCateList",
    }),
  },
  mounted() {
    this.reqList();
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          let myChart = require("echarts").init(
            document.getElementById("main")
          );

          var option = {
            title: {
              text: "分类数量",
            },
            tooltip: {},
            legend: {
              data: ["分类数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            //数据
            series: [
              {
                name: "分类数量",
                type: "line",
                data: this.list.map((item) =>
                  item.children ? item.children.length : 0
                ),
              },
            ],
          };
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
#main {
  width: 90%;
  height: 500px;
  border: 1px solid orange;
  margin: 20px auto;
}
</style>