<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="130">
      </el-table-column>

      <el-table-column prop="title" label="菜单名称" sortable width="130">
      </el-table-column>

      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column label="菜单地址">
        <template slot-scope="scope">
          <i>{{ scope.row.url }}</i>
        </template>
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
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    // 点击编辑 让form显示
    edit(id) {
      this.$emit("edit", id);
      // this.$emit('xiugai')
    },
    // 点击删除
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

<style scoped>
</style>