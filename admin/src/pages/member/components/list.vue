<template>
  <div>
    <!-- {{ list }} -->
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="角色编号" sortable> </el-table-column>

      <el-table-column prop="nickname" label="昵称" sortable> </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable> </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else disabled>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editInfo(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { memberList } from "../../../utils/ajax-all";
export default {
  props: ["info"],
  data() {
    return {
      list: [],
    };
  },
  methods: {
    //获取会员列表
    getMemberList() {
      memberList().then((res) => {
        this.list = res.data.list;
        // let allPhone = this.list.map((item) => {
        //   return (allPhone = item.phone);
        // });
        // console.log(allPhone)
        // let start = allPhone.substring(0, 3);
        // let end = allPhone.substring(allPhone.length - 4);
        // allPhone = start + "****" + end;
        // console.log(allPhone)
      });
    },
    //获取一条会员详情
    editInfo(uid) {
      this.$emit("editInfo", uid);
    },
  },
  mounted() {
    this.getMemberList();
  },
};
</script>

<style scoped>
.el-table {
  margin: 15px 0 0 10px;
}
</style>