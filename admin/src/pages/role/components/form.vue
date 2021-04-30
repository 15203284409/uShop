<template>
  <div>
    <!-- :visible.sync="true" -->
    <el-dialog
      :visible.sync="info.show"
      :title="info.formShow ? '添加' : '编辑'"
      @close="cncel"
    >
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="80px">
          <el-input autocomplete="off" v-model="user.rolename"></el-input>
        </el-form-item>
        <!-- 树形结构 -->
        <el-form-item label="角色权限" label-width="80px">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @check-change="change"
            :default-checked-keys="newList"
          >
          </el-tree>
        </el-form-item>
        <!-- 状态滑块 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="cncel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-show="info.formShow"
          >添 加</el-button
        >
        <el-button type="primary" @click="editInfo()" v-show="!info.formShow"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuList, roleInfo, roleEdit } from "../../../utils/ajax-all";
import { errorAlter, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  // 方法
  methods: {
    //封装验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (!this.user.rolename) {
          errorAlter("角色名称不能为空");
          return;
        }
        resolve()
      });
    },
    change() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
    },
    //修改角色
    editInfo() {
      this.checkProps().then(() => {
        roleEdit(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.info.show = false;
            this.empty();
            this.$emit("init");
          }
        });
      });
    },
    // 添加角色
    add() {
      this.checkProps().then(() => {
        this.$emit("add", this.user);
      });
    },
    // 关闭
    cncel() {
      this.info.show = false;
      this.empty();
      this.$refs.tree.setCheckedKeys([]);
    },
    // 清空form
    empty() {
      this.user = this.newUser;
    },
    // 编辑赋值
    edit(id) {
      roleInfo(id).then((res) => {
        this.user = res.data.list;
        // 补id
        this.user.id = id;
        this.newList = JSON.parse(this.user.menus);
      });
    },
  },
  // 变量
  data() {
    return {
      user: {
        rolename: "",
        menus: [],
        status: 1,
      },
      newUser: {
        rolename: "",
        menus: [],
        status: 1,
      },
      newList: [],
      // 单选框动态添加
      data: [],
      defaultProps: { children: "children", label: "title" },
    };
  },
  mounted() {
    // 页面更新完成调用这个方法 获取菜单列表
    getMenuList().then((res) => {
      this.data = res.data.list;
    });
  },
};
</script>

<style>
</style>