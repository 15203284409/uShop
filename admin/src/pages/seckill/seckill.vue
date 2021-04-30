<template>
  <div>
    <el-button type="primary" @click="openForm()">添加</el-button>
    <!-- 引入list -->
    <v-list :info="info" @editInfo="editInfo($event)"></v-list>
    <!-- 引入form -->
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
    // 打开
    openForm() {
      (this.info.show = true), (this.info.isshow = true);
    },
    //获取一条详情
    editInfo(id) {
      this.info.show = true;
      this.info.isshow = false;
      this.$refs.form.editInfo(id)
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
  margin: 15px 0;
}
</style>