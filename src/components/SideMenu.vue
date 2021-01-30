<template>
  <el-menu class="side_menu_container"
    text-color="#80799e"
    background-color="#003C72"
    active-text-color="#fff"
    mode="vertical"
    :router="true"
    :default-active="$route.path">
    <template v-for="(item, index) in menuData">
      <el-menu-item
        v-if="item.flag"
        :key="index"
        :index="item.path"
        :route="item.path">{{item.title}}</el-menu-item>
    </template>
    </el-menu>
</template>

<script>
import menuLogo from '@/assets/images/tcl/menuLogo.png'
export default {
  data () {
    return {
      menuLogo
    }
  },
  computed: {
    menuData () {
      return [
        {
          path: '/main/userInfo',
          title: '我的信息',
          flag: true
        },
        {
          path: '/main/teamCenter',
          title: '队伍中心',
          flag: true
        },
        {
          path: '/main/teamInfo',
          title: '队伍信息',
          flag: this.userInfo.captainFlag
        },
        {
          path: '/main/applyList',
          title: '申请列表',
          flag: this.userInfo.captainFlag
        },
        {
          path: '/main/worksSubmit',
          title: '作品提交',
          flag: this.userInfo.captainFlag
        }
      ]
    },
    userInfo () {
      return this.getUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.side_menu_container {
  padding-top: 20px;
  height: 100%;
  background-color: $bg_color;
  .el-menu-item:hover {
    background-color: unset;
  }
}
</style>
