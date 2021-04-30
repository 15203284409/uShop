<template>
  <div>
    <el-button type="primary" @click="(info.show = true), (info.isShow = true)"
      >添加</el-button
    >
    <!-- 引入table表格 -->
    <v-list
      :list="list"
      @edit="getEdit($event)"
      @remove="remove($event)"
    ></v-list>
    <!-- 引入弹出层 -->
    <v-form
      :info="info"
      @cncel="cncel"
      @init="fromadd"
      :list="list"
      ref="form"
    ></v-form>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";

import { getMenuList, removeMenu } from "@/utils/ajax-all.js";
import { successAlert } from "../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      newList: "menu/list",
    }),
  },
  data() {
    return {
      list: this.newList,
      info: {
        show: false,
        isShow: true,
      },
    };
  },
  methods: {
    ...mapActions({
      reqList: "menu/getMenuListAction",
    }),
    //关闭form
    cncel() {
      this.info.show = false;
    },
    //封装方法--- 获取List列表数据
    init() {
      getMenuList().then((res) => {
        this.list = res.data.list;
      });
    },
    // list组件点击添加 通知父组件调用edit方法
    getEdit(id) {
      this.info.show = true;
      this.info.isShow = false;
      this.$refs.form.menuListOne(id);
    },

    // list点击删除通知父组件调用remove方法
    remove(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeMenu(id).then((res) => {
            successAlert(res.data.msg);
            this.init();
            this.reqList();
          });
        })
        .catch(() => {});
    },

    // form表单点击添加数据通知父组件调用获取列表的ajax请求
    fromadd() {
      this.init();
    },
  },
  mounted() {
    this.init();
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