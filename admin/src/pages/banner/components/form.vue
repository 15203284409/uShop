<template>
  <div class="box">
    <el-dialog
      :title="info.isshow ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="info.show"
      @closed="cncel"
    >
      <el-form :model="user">
        <el-form-item label="标题" label-width="40px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
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
        <el-form-item label="状态" label-width="40px">
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
        <el-button type="primary" v-if="info.isshow" @click="add()"
          >添加</el-button
        >
        <el-button type="primary " v-else @click="edit()">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlter, successAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import { bannerAdd, bannerInfo, bannerEdit } from "../../../utils/ajax-all";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        img: "",
        status: 1,
      },
      imageUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    //封装验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (!this.user.title) {
          errorAlter("轮播图标题不能为空");
          return;
        }
        if (!this.user.img) {
          errorAlter("轮播图图片不能为空");
          return;
        }
        resolve()
      });
    },
    ...mapActions({
      getbannerList: "banner/getBannerList",
    }),
    //清空数据
    empty() {
      (this.user = {
        title: "",
        img: "",
        status: 1,
      }),
        (this.imageUrl = "");
    },
    //关闭
    cncel() {
      this.info.show = false;
      if (!this.info.isshow) {
        this.empty();
      }
    },
    //上传图片
    changeImg(n) {
      let file = n.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    //添加轮播图
    add() {
      this.checkProps().then(() => {
        bannerAdd(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cncel();
            this.empty();
            this.getbannerList();
          }
        });
      });
    },
    //获取一条轮播图详情
    editInfo(id) {
      // this.info.isshow = false;
      bannerInfo(id).then((res) => {
        if (res.data.code === 200) {
          this.info.show = true;
          this.user = res.data.list;
          this.imageUrl = this.$pre + res.data.list.img;
          // 补id
          this.user.id = id;
        }
      });
    },
    //编辑
    edit() {
      this.checkProps().then(() => {
        bannerEdit(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cncel();
            this.getbannerList();
          }
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