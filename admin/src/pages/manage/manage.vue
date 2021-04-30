<template>
  <div>
    <el-button type="primary" @click="formShow">添加</el-button>
    <!-- list -->
    <v-list
      :list="list"
      @remove="remove($event)"
      @edit="editInfo($event)"
      ref="list"
      @editint="editint($event)"
    ></v-list>
    <!-- form -->
    <v-form
      :info="info"
      @add="add($event)"
      @init="init"
      :listInfo="listInfo"
      ref="form"
      :roleList="roleList"
    ></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import { mapActions, mapGetters } from "vuex";
import {
  menageAdd,
  menageList,
  menageRemove,
  roleList,
} from "../../utils/ajax-all";
import { successAlert } from "../../utils/alert";
export default {
  methods: {
    // 给show赋值 让表单显示
    formShow() {
      this.info.show = true;
      this.info.infoShow = true;
    },
    // 管理员添加
    add(user) {
      menageAdd(user).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.init();
          this.$refs.list.getCont();
        }
      });
    },
    // 管理员删除
    remove(id) {
      menageRemove(id).then((res) => {
        this.$confirm("你确定要删除吗", "提示", {
          confirmButtonText: "删除",
          cncelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              this.init();
              this.$refs.list.getCont();
            }
          })
          .catch(() => {});
      });
    },
    // list 点击修改 通知父组件 父组件调用 form
    editInfo(uid) {
      this.info.show = true;
      this.info.infoShow = false;
      this.$refs.form.editInfo(uid);
      this.init();
    },
    // 获取角色列表
    getRoleList() {
      roleList().then((res) => {
        this.roleList = res.data.list;
      });
    },

    // 获取管理员列表 通知list子组件调用
    init() {
      this.$refs.list.init();
    },
    //获取一条详情
    editint(res) {
      this.list = res.data.list;
    },
  },
  data() {
    return {
      list: [],
      listInfo: [], //管理员详情
      roleList: [], //角色列表
      info: {
        // 控制form的显隐
        show: false,
        // 判断是点击的是添加还是编辑
        infoShow: true,
      },
    };
  },
  mounted() {
    this.init();
    this.getRoleList();
  },
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