<template>
  <div>
    <!-- 引入list -->
    <v-list :info="info" @editInfo="editInfo($event)" ref="list"></v-list>
    <!-- 引入form -->
    <v-form :info="info" ref="form" @init="getList"></v-form>
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
      },
    };
  },
  methods: {
    //获取一条
    editInfo(uid) {
      this.$refs.form.editInfo(uid);
    },
    //重新获取列表
    getList() {
      this.$refs.list.getMemberList();
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