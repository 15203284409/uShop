<template>
  <div class="box">
    <el-dialog
      :title="info.isshow ? '添加商品' : '编辑商品'"
      :visible.sync="info.show"
      @closed="cncel"
      @opened="opened"
    >
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>

        <!-- 上传图片 -->
        <el-form-item label="图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpecsList">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="(item, index) in showSpecsAtttr"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="editor"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="cncel()">取 消</el-button>
        <el-button type="primary" v-if="info.isshow" @click="add()"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="edit()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import {
  getcatelist,
  goodsAdd,
  goodsInfo,
  goodsEdit,
} from "../../../utils/ajax-all";
import { errorAlter, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        id: "",
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: null, //商品价格
        market_price: null, //市场价格
        img: null,
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //1正常 2禁用
      },
      imageUrl: "",
      //二级分类的列表
      secondCateList: [],
      //规格属性展示的所有选项的列表
      showSpecsAtttr: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    // 封装验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (!this.user.first_cateid) {
          errorAlter("一级分类不能为空");
          return;
        }
        if (!this.user.second_cateid) {
          errorAlter("二级分类不能为空");
          return;
        }
        if (!this.user.goodsname) {
          errorAlter("商品名称不能为空");
          return;
        }
        if (!this.user.price) {
          errorAlter("商品价格不能为空");
          return;
        }
        if (!this.user.market_price) {
          errorAlter("市场价格不能为空");
          return;
        }
        if (!this.user.img) {
          errorAlter("图片不能为空");
          return;
        }
        if (!this.user.description) {
          errorAlter("商品描述不能为空");
          return;
        }
        if (!this.user.specsid) {
          errorAlter("商品规格不能为空");
          return;
        }
        if (!this.user.specsattr) {
          errorAlter("商品规格属性不能为空");
          return;
        }
        resolve()
      });
    },
    //清空
    ...mapActions({
      getCateList: "cate/getCateList",
      getSpecsList: "specs/getSpecsList",
      // 获取goods商品列表
      getGoodsList: "goods/getGoodsList",
      getTotal: "goods/getTotal",
      changePage: "goods/changePage",
    }),
    empty() {
      this.user = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: null, //商品价格
        market_price: null, //市场价格
        img: null,
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //1正常 2禁用
      };
      (this.imageUrl = ""),
        //二级分类的列表
        (this.secondCateList = []),
        //规格属性展示的所有选项的列表
        (this.showSpecsAtttr = []);
    },
    //关闭
    cncel() {
      this.info.show = false;
      if (!this.info.isshow) {
        this.empty();
      }
    },
    //修改了一级分类
    changeFirstid() {
      this.user.second_cateid = "";
      this.getsecondList();
    },
    getsecondList() {
      getcatelist({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    // 修改了规格规格
    changeSpecsList() {
      this.user.specsattr = [];
      this.getSpecssAttrsArr();
    },
    getSpecssAttrsArr() {
      let obj = this.specsList.find((item) => item.id == this.user.specsid);
      console.log(obj);
      this.showSpecsAtttr = obj ? obj.attrs : [];
    },

    // 上传图片
    changeImg(n) {
      let file = n.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    //添加
    add() {
      this.checkProps().then(() => {
        //把富文本中的内容赋值给this.user.description中
        this.user.description = this.editor.txt.html();
        let newUser = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        goodsAdd(newUser).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cncel();
            this.empty();
            this.getGoodsList();
            this.getTotal();
          }
        });
      });
    },
    //获取一条详情
    editInfo(id) {
      this.info.show = true;
      goodsInfo(id).then((res) => {
        if (res.data.code === 200) {
          this.imageUrl = this.$pre + res.data.list.img;
          // 重新获取规格属性的List
          this.getsecondList();
          // 规格属性选中的list
          this.getSpecssAttrsArr();
          //规格属性选中的list
          let stringArr = res.data.list.specsattr;
          this.user = res.data.list;
          this.user.specsattr = JSON.parse(stringArr);
          this.user.id = id;
          this.showSpecsAtttr = this.user.specsattr;
        }
      });
    },
    //编辑
    edit() {
      this.checkProps().then(() => {
        this.user.description = this.editor.txt.html();
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        goodsEdit(data).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cncel();
            this.empty();
            this.getGoodsList();
          }
        });
      });
    },
    // 创建富文本编辑器
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      // 赋值
      this.editor.txt.html(this.user.description);
    },
  },

  mounted() {
    if (this.cateList.length === 0) {
      this.getCateList();
    }
    this.getSpecsList(true);
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