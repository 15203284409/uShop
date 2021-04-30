<template>
  <div>
    <el-button type="primary" @click="open">添加</el-button>
    <!-- list -->
    <v-list @editInfo="editInfo($event)"></v-list>
    <!-- form -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
export default {
  data() {
    return {
      info: {
        show: false,
        isshow: true,
      },
    };
  },
  methods: {
    //打开
    open() {
      this.info.show = true;
      this.info.isshow = true;
    },
    //获取一条轮播图详情 通知子组件调用某个方法
    editInfo(id) {
      this.info.isshow = false;
      this.$refs.form.editInfo(id);
    },
  },
  components: {
    vList,
    vForm,
  },
};
</script>

<style scoped>
.el-button {
  margin: 10px 0;
}
</style>