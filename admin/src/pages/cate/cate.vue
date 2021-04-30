<template>
  <div>
    <el-button type="primary" @click="disPlay()">添加</el-button>
    <!-- list -->
    <v-list @editInfo="editInfo($event)"></v-list>
    <!-- form -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import { getcatelist } from "../../utils/ajax-all";
import { successAlert } from "../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      info: {
        // 弹框的显隐
        show: false,
        // 添加或编辑的显隐
        isshow: true,
      },
    };
  },
  // 方法
  methods: {
    disPlay() {
      this.info.show = true;
      this.info.isshow = true;
    },
    //获取一条商品详情
    editInfo(id) {
      this.$refs.form.editInfo(id);
      this.info.isshow = false;
    },
  },

  mounted() {},

  // 注册组件
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