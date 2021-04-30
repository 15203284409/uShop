<template>
  <div>
    <el-button type="primary" @click="addForm()">添加</el-button>
    <!-- 引入list -->
    <v-list @editInfo="editInfo($event)"></v-list>
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
    // 添加 按钮
    addForm() {
      this.info.show = true;
      this.info.isshow = true;
    },
    //获取一条数据详情
    editInfo(id) {
      this.info.isshow = false;
      this.info.show = true;
      this.$refs.form.getOne(id);
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