<template>
  <!-- 作品状态 -->
  <div class="works_status_container">
    <PublicTitle title="作品进度" />
    <div class="filter_container">
      <el-tabs v-model="activeType" @tab-click="handleClick">
        <el-tab-pane label="初筛" name="0"></el-tab-pane>
        <el-tab-pane label="半决赛" name="1"></el-tab-pane>
        <el-tab-pane label="决赛" name="2"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="works_status_tip">
      <span>作品状态:</span>
      <span>进行中</span>
    </div>
    <div class="comment_container">评语</div>
  </div>
</template>

<script>
import PublicTitle from '@/components/public_title.vue'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      activeType: '0'
    }
  },
  methods: {
    handleClick (e) {
      this.activeType = e.name
    }
  }
}
</script>

<style lang="scss" scoped>
.works_status_container {
  .works_status_tip {
    padding: 0 20px 20px;
    color: #999;
  }
  .comment_container {
    padding: 0 40px;
  }
}
</style>
