<template>
  <div>
    <el-container class="box">
      <!-- 左侧部分 -->
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <div v-for="item in userInfo.menus" :key="item.id">

            <!-- 只是菜单 -->
            <el-menu-item v-if="!item.children" :index="item.url">{{
              item.title
            }}</el-menu-item>

            <!-- 有目录有菜单 -->
            <el-submenu :index="'' + item.id" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>

              <el-menu-item-group v-for="i in item.children" :key="i.id">
                <el-menu-item is="router-link" :to="i.url">{{
                  i.title
                }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header>
          <p class="el-icon-user">：{{ userInfo.username }}</p>
          <div class="headerLeft">
            <h2 class="el-icon-setting"></h2>
            <h3 @click="exit()">退出</h3>
          </div>
        </el-header>
        <!-- 中间内容 -->
        <el-main>
          <el-breadcrumb
            separator="/"
            v-if="$route.name"
            separator-class="el-icon-arrow-right"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenuList } from "../../utils/ajax-all";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "menu/getMenuListAction",
      changeUser: "changeUser",
    }),
    // 获取菜单列表
    init() {
      this.reqList();
    },
    //退出
    exit() {
      this.changeUser({});
      this.$router.push("/login");
    },
  },
  mounted() {
    this.reqList();
  },
};
</script>

<style scoped lang='stylus'>
@import '../../stylus/index.styl';

.box {
  height: 100vh;
}

.el-aside {
  background: #545c64;
}

.el-header {
  background: #b3c0d1;
  display: flex;
  justify-content: space-between;
}

.el-header p {
  color: #fff;
  font-size: 24px;
  line-height: 50px;
}

.el-header h2 {
  font-size: 28px;
  color: #fff;
  line-height: 55px;
}

.el-header h3{
  line-height 55px
  text-indent 10px
  color #ff4040
  font-size 16px
}
.el-header div{
  width 70px
  display flex
}

a {
  display: block;
  color: #ffffff;
  font-size: 14px;
  text-indent: 50px;
}
.con {
  padding-top: 20px;
}

.el-menu {
  border: none;
}
</style>