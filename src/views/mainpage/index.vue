<template>
  <el-container class="works_container">
    <el-header class="main_header">
      <MainHeader></MainHeader>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideMenu />
      </el-aside>
      <el-main
        :style="{
          background: $route.path === '/main/userInfo' ? '' : `url(${bg}) repeat center`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import SideMenu from '@/components/SideMenu.vue'
import bg from '@/assets/bg.png'
export default {
  components: {
    MainHeader,
    SideMenu
  },
  data () {
    return {
      bg
    }
  },
  created () {
    const isLogin = '1'
    // 未登录跳转至登录页
    if (!isLogin) this.$router.replace('/')
  }
}
</script>

<style lang="scss" scoped>
.works_container {
  height: 100vh;
  .main_header {
    background-color: $bg_color;
  }
}
</style>

<style lang="scss">
  .el-main {
    // background-color: #f4f5f8;;
  }
</style>
