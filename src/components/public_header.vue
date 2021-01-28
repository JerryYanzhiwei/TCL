<template>
  <div class="header_container">
    <span>顺丰包装大赛</span>
    <span>{{userInfo.name}}</span>
  </div>
</template>

<script>
export default {
  // #f4f5f8
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = this.getUser()
  }
}
</script>

<style lang="scss" scoped>
  .header_container {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 70px;
    padding: 0 70px;

    background-color: #fff;
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);
    span {
      cursor: pointer;
    }
  }
</style>
