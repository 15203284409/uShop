<template>
  <div class="box">
    <el-dialog
      :title="info.isshow ? '添加活动' : '编辑活动'"
      :visible.sync="info.show"
      @closed="cncel"
      width="700px"
    >
      <el-form :model="user">
        <!-- 活动名称 -->
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <!-- 活动期限 -->
        <el-form-item label="活动期限" label-width="100px">
          <el-date-picker
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            v-model="allTime"
            value-format="timestamp"
          >
            <!-- yyyy-MM-dd HH:mm:ss -->
            <!-- :picker-options="pickerOptions" -->
          </el-date-picker>
        </el-form-item>

        <!-- 一级分类 -->
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
        <!-- 二级分类 -->
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changeSecondListBig">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品 -->
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in shopList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="cncel()">取 消</el-button>
        <el-button type="primary" v-if="info.isshow" @click="add()"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import {
  getcatelist,
  goodsList,
  speckAdd,
  speckInfo,
  speckEdit,
} from "../../../utils/ajax-all";
import { errorAlter, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      list: "goods/list",
    }),
  },
  data() {
    return {
      user: {
        title: "", //显示秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1,
      },
      //二级分类
      secondCateList: [],
      // 二级分类下的商品
      shopList: [],
      //事件
      allTime: [],
    };
  },
  methods: {
    //验证封装
    chekcProps() {
      return new Promise((resolve, reject) => {
        if (!this.user.title) {
          errorAlter("活动名称不能为空");
          return;
        }
        if (!this.user.first_cateid) {
          errorAlter("一级分类不能为空");
          return;
        }
        if (!this.user.second_cateid) {
          errorAlter("二级分类不能为空");
          return;
        }
        if (!this.user.goodsid) {
          errorAlter("商品不能为空");
          return;
        }
        if (!this.user.first_cateid) {
          errorAlter("一级分类不能为空");
          return;
        }
        if (!this.user.begintime) {
          errorAlter("活动开始时间不能为空");
          return;
        }
        if (!this.user.endtime) {
          errorAlter("活动结束时间不能为空");
          return;
        }
        resolve();
      });
    },
    ...mapActions({
      getCateList: "cate/getCateList",
      getGoodsList: "goods/getGoodsList",
      getSpeckList: "speckill/getSpeckList",
    }),
    // 清空样式
    empty() {
      (this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      }),
        (this.secondCateList = []),
        (this.shopList = []);
    },
    // 关闭
    cncel() {
      this.info.show = false;
      if (!this.info.isshow) {
        this.empty();
      }
    },
    // 修改一级分类
    changeFirstid(id) {
      this.user.second_cateid = "";
      // 调用下方的方法
      this.getsecondList();
      // 把商品置为空
      this.user.goodsid = "";
    },

    // 获取二级分类
    getsecondList() {
      getcatelist({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    // change改变二级分类的时候
    changeSecondListBig() {
      // 把商品置为空
      this.user.goodsid = "";
      this.changeSecondList();
    },
    //获取商品分类
    changeSecondList() {
      goodsList(true).then((res) => {
        let obj = res.data.list.filter((item) => {
          return item.second_cateid == this.user.second_cateid;
        });
        this.shopList = obj;
      });
    },
    //添加
    add() {
      this.user.begintime = this.allTime[0];
      this.user.endtime = this.allTime[1];
      this.chekcProps().then(() => {
        speckAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cncel();
            this.empty();
            this.getSpeckList();
          }
        });
      });
    },
    //获取一条详情
    editInfo(id) {
      this.allTime = [];
      speckInfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.allTime.push(this.user.begintime, this.user.endtime);
        }
      });
    },
    //编辑
    edit() {
      this.user.begintime = this.allTime[0];
      this.user.endtime = this.allTime[1];
      this.chekcProps().then(() => {
        speckEdit(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.res);
            this.empty();
            this.cncel();
            this.getSpeckList();
          }
        });
      });
    },
  },
  mounted() {
    this.getCateList();
  },
};
</script>

<style scoped>
</style>