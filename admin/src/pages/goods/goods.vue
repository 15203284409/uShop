<template>
  <div>
    <add-btn @click.native="open()"></add-btn>
    <!-- 引入list -->
    <v-list @editInfo="editInfo($event)"></v-list>
    <!-- 引入form -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import addBtn from "../../components";
import vList from "./components/lsit";
import vForm from "./components/form";
import AddBtn from "../../components/addBtn.vue";
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
    //获取一条详情
    editInfo(id) {
      this.info.isshow = false;
      this.$refs.form.editInfo(id);
    },
  },
  components: {
    vForm,
    vList,
  },
};
AddBtn;
</script>

<style>
</style>