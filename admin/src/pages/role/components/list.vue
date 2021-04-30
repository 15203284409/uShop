<template>
  <div>
    <!-- :data="list" -->
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="角色编号" sortable width="120">
      </el-table-column>

      <el-table-column prop="rolename" label="角色名称" sortable width="300">
      </el-table-column>

      <el-table-column label="状态" width="300">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else disabled>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="remove(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["list", "info"],
  methods: {
    // 点击删除 通知父组件点击删除
    remove(id) {
      this.$emit("remove", id);
    },
    // 点击编辑，通知父组件编辑
    edit(id) {
      this.info.formShow = false;
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
</style>