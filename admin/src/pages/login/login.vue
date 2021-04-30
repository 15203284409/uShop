<template>
  <div class="login">
    <div class="con">
      <h1 class="center">登陆</h1>
      <el-form :model="user" :rules="rules">
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            placeholder="请输入账号"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            placeholder="请输入密码"
            clearable
            show-password
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { menageLogin } from "../../utils/ajax-all";
import { successAlert } from "../../utils/alert";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    //登陆
    login() {
      menageLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.changeUser(res.data.list);
          this.$router.push("/");
        }
      });
    },
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      //规则
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.con {
  width: 400px;
  background: #ffffff;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
.ipt {
  margin: 10px;
}
.center {
  text-align: center;
}
</style>