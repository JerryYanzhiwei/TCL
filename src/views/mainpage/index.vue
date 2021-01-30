<template>
  <el-container class="works_container">
    <el-header class="main_header">
      <MainHeader></MainHeader>
    </el-header>
    <el-container>
      <img class="menu_logo" :src="menuLogo" alt="">
      <el-aside width="200px">
        <SideMenu />
      </el-aside>
      <el-main
        :style="{
          background: `url(${bg}) repeat center`,
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
import bg from '@/assets/images/tcl/module_bg.png'
import menuLogo from '@/assets/images/tcl/menuLogo.png'
export default {
  components: {
    MainHeader,
    SideMenu
  },
  data () {
    return {
      bg,
      menuLogo
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
  .menu_logo {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 2.07rem;
    height: 2.07rem;
  }
}
</style>

<style lang="scss">
  .el-main {
    display: flex;
    justify-content: center;
    // background-color: #f4f5f8;;
  }
</style>
