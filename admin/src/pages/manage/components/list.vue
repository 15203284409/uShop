<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="120">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" sortable width="120">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="150">
      </el-table-column>

      <el-table-column prop="status" label="状态" width="300">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else disabled>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="remove(scope.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="single.total"
      :page-size="single.pageSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { menageCount, menageList } from "../../../utils/ajax-all";
export default {
  props: ["list"],
  data() {
    return {
      single: {
        //当前页面
        page: 1,
        // 表示总条目
        total: 0,
        //每一页的数量
        pageSize: 2,
      },
    };
  },
  methods: {
    // 修改页码
    changePage(n) {
      this.single.page = n;
      this.init();
    },
    // 获取list
    init() {
      menageList({ page: this.single.page, size: this.single.pageSize }).then(
        (res) => {
          if (res.data.code === 200) {
            if (res.data.list.length == 0 && this.single.page > 1) {
              this.single.page--;
              this.init();
              return;
            }
          }
          this.$emit("editint", res);
        }
      );
    },
    // 获取管理员总数
    getCont() {
      menageCount().then((res) => {
        if (res.data.code === 200) {
          this.single.total = res.data.list[0].total;
        }
      });
    },

    //删除
    remove(uid) {
      this.$emit("remove", uid);
    },

    // 编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
  },

  mounted() {
    this.getCont();
  },
};
</script>

<style scoped>
.el-pagination {
  text-align: center;
}
</style>