<template>
  <div class="box">
    <!-- visible.sync 控制弹框的显示隐藏    -->
    <el-dialog
      :title="info.isshow ? '添加分类' : '编辑分类'"
      :visible.sync="info.show"
      @closed="cncel"
    >
      <!-- {{ user }} -->
      <el-form :model="user">
        <!-- 上级菜单 -->
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option :value="0" label="--顶级菜单--"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            >
            </el-option>
            <!-- 这里还需要数据 -->
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="图片" v-if="user.pid !== 0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="info" @click="cncel()">取消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isshow"
          >添加</el-button
        >
        <el-button type="primary " v-else @click="edit()">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getcateAdd, getCateInfo, editCate } from "../../../utils/ajax-all";
import { errorAlter, successAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  props: ["info"],
  data() {
    return {
      imageUrl: "",
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1, //状态 1正常 2禁用
      },
    };
  },
  // 方法
  methods: {
    //验证封装
    checkProps() {
      return new Promise((resolve, reject) => {
        if (!this.user.pid) {
          errorAlter("上级分类不能为空");
          return;
        }
        if (!this.user.catename) {
          errorAlter("商品分类名称不能为空");
          return;
        }
        if (this.user.pid == 2) {
          if (!this.user.img) {
            errorAlter("商品图片不能为空");
            return;
          }
        }
        resolve()
      });
    },
    ...mapActions({
      getList: "cate/getCateList",
    }),
    //清空数据
    empty() {
      this.user = { pid: "", catename: "", img: null, status: 1 };
      this.imageUrl = "";
    },
    // 上传图片
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    // 关闭弹窗
    cncel() {
      this.info.show = false;
      //如果isshow是false的时候 则清空user
      if (!this.info.isshow) {
        this.empty();
      }
    },
    // 添加
    add() {
      this.checkProps().then(() => {
        getcateAdd(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.getList();
            this.info.show = false;
            this.empty();
          }
        });
      });
    },
    //获取商品一条详情
    editInfo(id) {
      getCateInfo(id).then((res) => {
        this.info.show = true;
        this.user = res.data.list;
        //补id
        this.user.id = id;
        //在获取商品详情的时候 给this.imageUrl赋值时 做一下字符串拼接
        this.imageUrl = this.$pre + res.data.list.img;
      });
    },
    //编辑商品
    edit() {
      this.checkProps().then(() => {
        editCate(this.user).then((res) => {
          this.info.show = false;
          this.getList();
        });
      });
    },
  },
};
</script>

<style scoped lang='stylus'>
.box >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>