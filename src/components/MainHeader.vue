<template>
  <div class="main_header_container">
    <div @click="toModule" class="left_txt">
      <img :src="logo" alt="">
      2021年TCL高校科创节
    </div>
    <div class="right">
      <span class="btn" @click="$router.push('/main')">{{userData.name}}</span>
      <span class="line">|</span>
      <span class="btn" @click="$router.push('/main')">
        <svg t="1587391399416" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16461" width="200" height="200"><path d="M512 512c114.43718281 0 207.12612386-92.68893984 207.12612386-207.12612386s-92.68893984-207.12612386-207.12612386-207.12612265-207.12612386 92.68893984-207.12612386 207.12612265 92.68893984 207.12612386 207.12612386 207.12612386z m0 103.56306132c-138.25668741 0-414.25224651 69.38725095-414.25224651 207.12612386v51.78153127c0 28.47984238 23.30168889 51.78153127 51.78153006 51.78153006h724.9414329c28.47984238 0 51.78153127-23.30168889 51.78153006-51.78153006v-51.78153127c0-137.73887169-275.9955591-207.12612386-414.25224651-207.12612386z" p-id="16462"></path></svg>
        个人中心
      </span>
      <span class="line">|</span>
      <div class="btn exit_btn"
        @click="toModule">返回上级</div>
      <span class="line">|</span>
      <div class="btn exit_btn"
        @click="exitLogin">退出</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userData () {
      return this.getUser() || {}
    }
  },
  data () {
    return {
      logo: require('@/assets/images/tcl/logo.png')
    }
  },
  methods: {
    exitLogin () {
      this.$router.push('/')
    },
    toModule () {
      this.$router.push('/moduleSelect')
    }
  }
}
</script>

<style lang="scss" scoped>
.main_header_container {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 1024px;
  .left_txt {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    img {
      width: 145px;
      height: auto;
      margin-right: 32px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    .line {
      margin: 0 20px;
    }
    .btn {
      cursor: pointer;
    }
    .exit_btn {
    }
  }
}
</style>
