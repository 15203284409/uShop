<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="编号" sortable width="100">
      </el-table-column>

      <el-table-column prop="title" label="轮播图标题" sortable width="180">
      </el-table-column>

      <el-table-column label="图片" width="250">
        <template slot-scope="scope">
          <img :src="$pre + scope.row.img" />
        </template>
      </el-table-column>

      <el-table-column label="状态" width="150" >
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else disabled>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editInfo(scope.row.id)"
            >编辑</el-button
          >
          <del-btn type="danger" @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import { bannerDel } from "../../../utils/ajax-all";
import { successAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      getbannerList: "banner/getBannerList",
    }),
    //删除
    del(id) {
      bannerDel(id).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.getbannerList();
        }
      });
    },
    //获取一条轮播图详情
    editInfo(id) {
      this.$emit("editInfo", id);
    },
  },
  mounted() {
    this.getbannerList();
  },
};
</script>

<style scoped>
img {
  width: 160px;
  height: 100px;
}
</style>
