<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="title" label="活动名称" sortable width="200">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" disabled v-else>禁用</el-button>
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
import { successAlert } from "../../../utils/alert";
import { speckDel } from "../../../utils/ajax-all";
export default {
  props: ["info"],
  methods: {
    ...mapActions({
      getSpeckList: "speckill/getSpeckList",
    }),
    // 获取一条详情
    editInfo(id) {
      this.$emit("editInfo", id);
    },
    //删除
    del(id) {
      speckDel(id).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.getSpeckList();
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      list: "speckill/list",
    }),
  },
  mounted() {
    this.getSpeckList();
  },
};
</script>

<style>
</style>