<template>
  <!-- <el-menu class="side_menu_container"
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
    </el-menu> -->
    <div class="menu_container">
      <div class="menu_top">
        <span>{{userInfo.name}}</span>
      </div>

      <div class="menu_item_contain">
        <div @click="toRouter(item.path)" class="menu_item" v-for="(item, index) in menuData" :key="index">
          <div class="icon_contain">
            <img :src="item.icon" alt="">
          </div>
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import menuLogo from '@/assets/images/tcl/menuLogo.png'
import iconInfo from '@/assets/images/tcl/icon_info.png'
import iconTeam from '@/assets/images/tcl/icon_team.png'
import iconTeamInfo from '@/assets/images/tcl/icon_teamInfo.png'
import iconApply from '@/assets/images/tcl/icon_apply.png'
import iconSubmit from '@/assets/images/tcl/icon_submit.png'
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
          icon: iconInfo,
          flag: true
        },
        {
          path: '/main/teamCenter',
          title: '队伍中心',
          icon: iconTeam,
          flag: true
        },
        {
          path: '/main/teamInfo',
          title: '队伍信息',
          icon: iconTeamInfo,
          flag: this.userInfo.captainFlag
        },
        {
          path: '/main/applyList',
          title: '申请列表',
          icon: iconApply,
          flag: this.userInfo.captainFlag
        },
        {
          path: '/main/worksSubmit',
          title: '作品提交',
          icon: iconSubmit,
          flag: this.userInfo.captainFlag
        }
      ]
    },
    userInfo () {
      return this.getUser()
    }
  },
  methods: {
    toRouter (path) {
      this.$toure.push(path)
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
.menu_container {
  width: 1.58rem;
  height: 7.1rem;
  margin-top: .43rem;
  margin-left: .25rem;
  padding-top: .7rem;

  background-color: #fff;
  box-shadow: 0px 2px 9px 0px #012E98;
  border-radius: .79rem;
  .menu_top {
    padding: 0 .1rem;
    padding-bottom: .15rem;

    text-align: center;
    border-bottom: 1px solid #012E98;
  }
  .menu_item_contain {
    margin-top: 0.43rem;
    .menu_item {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 40px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #bce5ff;
        color: #2f6cce;
      }
      .icon_contain {
        width: .4rem;
        margin-right: 0.1rem;
        img {
          height: .24rem;
          width: auto;
        }
      }
    }
  }
}
</style>
