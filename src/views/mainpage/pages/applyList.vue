<template>
  <div class="apply_list_container">
    <PublicTitle title="申请列表" color="#fff" />
    <div class="apply_contain">
      <div v-if="!applyList.length" class="no_data">
        暂无数据
      </div>
      <!-- 队伍成员 -->
      <div class="member_item" v-for="(item, index) in applyList" :key="index">
        <div class="member_header">
          <div class="member_name">
            <i class="iconfont icon-shouhuoren"></i>
            <span>{{item.name}}</span>
          </div>
          <div class="item_contain">
            <p class="item_detail">
              <span class="title">手机号：</span>
              <span class="detail">{{item.phone}}</span>
            </p>
            <p class="item_detail">
              <span class="title">邮箱：</span>
              <span class="detail">{{item.email}}</span>
            </p>
            <p class="item_detail">
              <span class="title">学校：</span>
              <span class="detail">{{item.school}}</span>
            </p>
            <p class="item_detail">
              <span class="title">专业：</span>
              <span class="detail">{{item.profession}}</span>
            </p>
            <p class="item_detail">
              <span class="title">年级：</span>
              <span class="detail">{{item.grade}}</span>
            </p>
            <p class="item_detail">
              <span class="title">留言：</span>
              <el-tooltip class="item" effect="dark" :content="item.leaveMessege" placement="top-start">
                <span class="detail">{{item.leaveMessege}}</span>
              </el-tooltip>
            </p>
          </div>
        </div>
        <div class="btn_contain">
          <div class="div_1" @click="greenApply(item, 2)">拒绝</div>
          <div class="div_2" @click="greenApply(item, 1)">同意入队</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PublicTitle from '@/components/public_title.vue'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      applyList: [],
      teamInfo: {}
    }
  },
  async created () {
    await this.getTeamInfo()
    await this.getApplyList()
  },
  methods: {
    ...mapActions(['GET_TEAM_APPLY_LIST', 'GET_MY_TEAM_INFO', 'PUT_TEAM_CHECK']),
    async getApplyList () {
      const res = await this.GET_TEAM_APPLY_LIST()
      if (res.result === '0' && res.data) {
        this.applyList = res.data
      }
      console.log(res)
    },
    // 入队审批
    async greenApply (data, type) {
      const res = await this.PUT_TEAM_CHECK({
        teamApplyEnum: type,
        teamMemberId: data.teamMemberId,
        teamNo: this.teamInfo.teamNo
      })
      if (res.result === '0' && res.data) {
        this.$message.success('成功')
        this.getApplyList()
      }
    },
    async getTeamInfo (data) {
      const res = await this.GET_MY_TEAM_INFO()
      if (res.result === '0' && res.data) {
        this.teamInfo = res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .apply_list_container {
    width: 15.26rem;
    background: #FFFFFF;
    border-radius: .1rem;
    border: 1px solid red;
    .no_data {
      width: 100%;
      text-align: center;
      padding: 40px 0;
    }
    .iconfont {
      font-size: 13px;
    }
    .apply_contain {
      display: flex;
      flex-wrap: wrap;
      padding: 0 .24rem;
      margin-top: -.2rem;
      .member_item {
        position: relative;
        width: 3.39rem;
        margin-bottom: .3rem;
        overflow: hidden;
        margin-left: .38rem;

        background: radial-gradient(circle, rgba(0, 80, 213, 1) 20%, rgba(1, 68, 190, .7) 100%, rgba(0, 80, 213, 1) 100%);
        border-radius: .1rem;
        transition: all .2s linear;
        &:nth-child(4n + 1) {
          margin-left: 0;
        }
        &:hover {
          box-shadow: 0 .15rem .3rem rgba(0,0,0,.1);
          transform: translate3d(0,-2px,0);
        }
        .member_name {
          height: .57rem;
          padding-top: .18rem;
          text-align: center;
          font-size: 0.14rem;
          font-weight: 400;
          color: #FFFFFF;
          i {
            margin-right: .1rem;
            color: #fff;
          }
        }
        .item_contain {
          padding: 0 .2rem;

          .item_detail {
            padding-bottom: .17rem;
            font-size: .14rem;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .btn_contain {
          display: flex;
          justify-content: space-around;

          width: 100%;
          padding-bottom: .1rem;
          padding-top: .1rem;

          color: #fff;
          font-size: 14px;
          div {
            border-radius: .05rem;
            display: flex;
            align-items: center;
            border: 2px solid #FFFFFF;
            padding: .07rem .3rem;
            font-size: 0.18rem;
            font-weight: bold;
            color: #FFFFFF;
            cursor: pointer;
          }
          .div_2 {
            border: 0;
            color: #0056D7;
            background: #FFFFFF;
          }
        }
      }
    }
  }
</style>
