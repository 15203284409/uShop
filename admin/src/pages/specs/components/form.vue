<template>
  <div>
    <el-dialog
      :title="info.isshow ? '添加规格' : '编辑规格'"
      :visible.sync="info.show"
      @closed="cncel()"
    >
      <el-form :model="user">
        {{ user }}
        <el-form-item label="规格名称">
          <div class="specsBog">
            <el-input v-model="user.specsname"></el-input>
          </div>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrsArr"
          :key="index"
        >
          <div class="specsBog">
            <el-input v-model="item.value"></el-input>
            <el-button
              type="primary"
              label-width="80px"
              v-if="index == 0"
              @click="addAttr"
              >新增规格属性</el-button
            ><el-button
              type="danger"
              label-width="30px"
              v-else
              @click="delAttr(index)"
              >删除</el-button
            >
          </div>
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
        <el-button type="primary" v-if="info.isshow" @click="add()"
          >添加</el-button
        >
        <el-button type="primary " v-else @click="edit()">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import { specsAdd, specsInfo, specsEdit } from "@/utils/ajax-all";
import { errorAlter, successAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "", //商品规格名称
        attrs: "[]", //商品规格属性值
        status: 1, //状态
      },
      attrsArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "specs/getSpecsList",
      reqTotal: "specs/getSpecsTotal",
    }),
    //封装验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (!this.user.specsname) {
          errorAlter("商品规格名称不能为空");
          return;
        }
        if (this.attrsArr.some((item) => item.vaule === "")) {
          errorAlter("请输入所有的规格属性");
          return;
        }
        resolve();
      });
    },
    //取消
    cncel() {
      this.info.show = false;
      if (!this.info.isshow) {
        this.empty();
      }
    },
    //新增规格属性
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    //删除规格属性
    delAttr(index) {
      this.attrsArr.splice(index, 1);
    },
    //清空
    empty() {
      this.user = {
        specsname: "", //商品规格名称
        attrs: "[]", //商品规格属性值
        status: 1, //状态
      };
      this.attrsArr = [{ value: "" }];
    },
    //添加数据
    add() {
      this.checkProps().then(() => {
        this.user.attrs = JSON.stringify(
          this.attrsArr.map((item) => item.value)
        );
        //   发送ajax请求
        specsAdd(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cncel();
            this.reqList();
            this.empty();
            this.reqTotal();
          }
        });
      });
    },
    //获取一条数据详情
    getOne(id) {
      specsInfo(id).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);
          this.attrsArr = this.user.attrs.map((item) => ({ value: item }));
        }
      });
    },
    // 编辑
    edit() {
      this.checkProps().then(() => {
        this.user.attrs = JSON.stringify(
          this.attrsArr.map((item) => item.value)
        );
        specsEdit(this.user).then((res) => {
          if (res.data.code === 200) {
            this.cncel();
            successAlert(res.data.msg);
            this.reqList();
          }
        });
      });
    },
  },
  mounted() {},
};
</script>

  <style scoped>
.specsBog {
  display: flex;
}
.specsBog .el-input {
  flex: 1;
}
</style>