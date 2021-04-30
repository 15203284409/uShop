<template>
  <div>
    <el-dialog :visible.sync="info.show" title="会员编辑" @closed="cncel()">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="80px">
          <el-input autocomplete="off" v-model="user.phone"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="80px">
          <el-input autocomplete="off" v-model="user.nickname"></el-input>
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
        <el-button type="primary" @click="edit()">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlter, successAlert } from "../../../utils/alert";
import { memberInfo, memberRedit } from "../../../utils/ajax-all";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        nickname: "",
        phone: "",
        password: "",
        status: "",
      },
    };
  },
  methods: {
    //封装验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (!this.user.nickname) {
          errorAlter("昵称不能为空");
          return;
        }
        if (!this.user.phone) {
          errorAlter("手机号不能为空");
          return;
        }
        if (!this.user.password) {
          errorAlter("密码不能为空");
          return;
        }
        resolve()
      });
    },
    //关闭
    cncel() {
      this.info.show = false;
    },
    //获取一条详情
    editInfo(uid) {
      this.info.show = true;
      memberInfo(uid).then((res) => {
        this.user = res.data.list;
        let start = this.user.phone.substring(0, 3);
        let end = this.user.phone.substring(this.user.phone.length - 4);
        this.user.phone = start + "****" + end;
        this.user.password = "********";
        this.user.uid = res.data.list.uid;
      });
    },
    //编辑
    edit() {
      this.checkProps().then(() => {
        memberRedit(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cncel();
            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>

<style>
</style>