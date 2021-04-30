<template>
  <div>
    <el-button
      type="primary"
      @click="(info.show = true), (info.formShow = true)"
      >添加</el-button
    >
    <!-- list -->
    <v-list
      :list="list"
      @remove="remove($event)"
      @edit="edit($event)"
      :info="info"
      @cncel="cncel"
    ></v-list>
    <!-- form -->
    <v-form
      :info="info"
      @add="add($event)"
      ref="form"
      :list="list"
      @init="init"
    ></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import { roleList, roleRemove, roleInfo, roleAdd } from "../../utils/ajax-all";
import { successAlert } from "../../utils/alert";
export default {
  data() {
    return {
      list: [],
      info: {
        show: false,
        formShow: true,
      },
    };
  },
  methods: {
    // 封装init方法  此方法用来获取角色列表数据
    init() {
      roleList().then((res) => {
        this.list = res.data.list;
      });
    },
    // 关闭
    cncel() {
      this.info.show = false;
    },
    // 添加角色
    add(user) {
      roleAdd(user).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.init();
        }
      });
    },
    // 删除角色
    remove(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          roleRemove(id).then((res) => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              // console.log(res);
              this.init();
            }
          });
        })
        .catch(() => {});
    },
    // 获取角色（一条）详情
    edit(id) {
      this.$refs.form.edit(id);
      this.info.show = true;
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