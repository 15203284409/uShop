<template>
  <div>
    <el-dialog
      :visible.sync="info.show"
      :title="info.infoShow ? '添加管理员' : '编辑管理员'"
      close="cncel"
    >
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="80px">
          <el-select placeholder="请选择" v-model="user.roleid">
            <el-option value="" label="--请选择--"></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="80px">
          <el-input autocomplete="off" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input autocomplete="off" v-model="user.password"></el-input>
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
        <el-button type="primary" v-show="info.infoShow" @click="add()"
          >添 加</el-button
        >
        <el-button type="primary" v-show="!info.infoShow" @click="update"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { manageInfo, reqManageUpdate } from "../../../utils/ajax-all";
import { errorAlter } from "../../../utils/alert";
export default {
  props: ["info", "listInfo", "roleList"],
  data() {
    return {
      options: [],
      user: {
        roleid: "", //角色编号 number
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态 1正常 2禁用
      },
      //清空样式
      empty: {
        roleid: "", //角色编号 number
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态 1正常 2禁用
      },
    };
  },
  methods: {
    // 封装验证
    checkProps() {
      return new Promise((reslove, reject) => {
        if (!this.user.roleid) {
          errorAlter("所属角色不能为空");
          return;
        }
        if (!this.user.username) {
          errorAlter("用户名不能为空");
          return;
        }
        if (!this.user.password) {
          errorAlter("密码不能为空");
          return;
        }
        resolve()
      });
    },
    // 取消
    cncel() {
      this.info.show = false;
      this.user = this.empty;
    },
    // 添加
    add() {
      this.checkProps().then(() => {
        this.$emit("add", this.user);
        this.cncel();
        this.$emit("init");
      });
    },
    // 管理员获取详情（一条）
    editInfo(uid) {
      manageInfo(uid).then((res) => {
        this.info.show = true;
        this.user = res.data.list;
        this.user.password = "********";
      });
    },
    // 修改
    update() {
      this.checkProps().then(() => {
        reqManageUpdate(this.user).then((res) => {
          console.log(this.user);
          this.info.show = false;
          this.$emit("init");
        });
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>