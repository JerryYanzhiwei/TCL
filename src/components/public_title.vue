<template>
  <p class="public_title" :style="{ color }">
    <span>{{title}}</span>
  </p>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    color: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .public_title {
    position: relative;
    height: .78rem;
    display: flex;
    align-items: center;
    padding-left: .24rem;

    font-size: .18rem;
    span {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      padding-bottom: 2px;
      border-bottom: 2px solid #F56C6C;
    }
    // font-weight: bold;
    // &::after {
    //   content: '';
    //   display: block;
    //   clear: both;
    //   position: absolute;
    //   top: 5px;
    //   left: 0;

    //   width: 3px;
    //   height: 15px;
    //   background-color: #dc1e32;
    // }
  }
</style>
