<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="130">
      </el-table-column>

      <el-table-column prop="catename" label="分类名称" sortable width="130">
      </el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img v-if="scope.row.pid !== 0" :src="$pre + scope.row.img" />
        </template>
      </el-table-column>

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
import delBtn from "../../../components/delBtn.vue";
import { removeCate } from "../../../utils/ajax-all";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { delBtn },
  computed:{
    ...mapGetters({
      list:'cate/list'
    })
  },
  methods: {
    ...mapActions({
      getList:'cate/getCateList'
    }),
    //删除
    del(id) {
      removeCate(id).then((res) => {
        this.getList()
      });
    },
    //获取一条详情
    editInfo(id) {
      this.$emit("editInfo", id);
    },
  },
  mounted(){
    this.getList()
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
