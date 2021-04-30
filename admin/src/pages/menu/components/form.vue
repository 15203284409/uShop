<template>
  <div>
    <el-dialog
      :title="info.isShow ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.show"
      @closed="cncel"
    >
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @change="changepid">
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.title"
            >
            </el-option>
            <!-- 这里还需要数据 -->
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="user.type" :label="1" disabled>菜单</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>目录</el-radio>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" label-width="100px">
          <el-select v-model="user.icon">
            <el-option v-for="item in iCon" :key="item" :value="item">
              <i :class="item"> {{ "  " + item }}</i>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单地址 -->
        <el-form-item label="菜单地址" label-width="100px">
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexRouter"
              :key="item.path"
              :value="'/' + item.path"
              :label="item.name + '-/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态滑块 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <!-- 关闭 添加 编辑 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="cncel">取消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isShow"
          >添加</el-button
        >
        <el-button type="primary" @click="edit" v-else>编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入正确的弹框信息
import { errorAlter, successAlert } from "../../../utils/alert";
// 引入二级路由
import { indexRouter } from "../../../router/index";
// 引入ajax请求
import { getMenuAdd, getMenuOne, editMenu } from "../../../utils/ajax-all.js";
import { mapActions } from "vuex";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        pid: "",
        title: "",
        icon: "",
        // 类型 1目录 2菜单
        type: 1,
        url: "", //菜单地址
        status: 1, //状态 1正常 2禁用
      },
      //
      // icon图标集合
      iCon: [
        "el-icon-s-management",
        "el-icon-s-promotion",
        "el-icon-coin",
        "el-icon-office-building",
        "el-icon-coordinate",
        "el-icon-brush",
      ],
      indexRouter,
    };
  },
  methods: {
    //封装验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (!this.user.title) {
          errorAlter("菜单名称不能为空");
          return
        }
        if (!this.user.pid) {
          errorAlter("请选择上级菜单");
          return
        }
        resolve()
      });
    },
    ...mapActions({
      reqList: "getMenuListAction",
    }),
    //如果原了顶级菜单就显示菜单 如果不是就选择目录
    changepid() {
      if (this.user.pid === 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    //  点击取消通知父组件调用cncel方法
    cncel() {
      this.$emit("cncel");
      this.empty();
    },
    // 点击添加
    add() {
      this.checkProps().then(() => {
        getMenuAdd(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cncel();
            this.$emit("init");
            this.reqList();
            this.empty();
          }
        });
      });
    },
    // list点击修改通知父组件调用获取列表详情（一条）
    menuListOne(id) {
      getMenuOne(id).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
      });
    },
    // 修改数据
    edit() {
      this.checkProps().then(() => {
        editMenu(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cncel();
            // this.$emit("init");
            this.reqList();
          }
        });
      });
    },
    empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        // 类型 1目录 2菜单
        type: 1,
        url: "", //菜单地址
        status: 1, //状态 1正常 2禁用
      };
    },
  },
};
</script>

<style scoped>
</style>