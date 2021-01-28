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
              <span class="title">手机号: </span>
              <span class="detail">{{item.phone}}</span>
            </p>
            <p class="item_detail">
              <span class="title">邮箱: </span>
              <span class="detail">{{item.email}}</span>
            </p>
            <p class="item_detail">
              <span class="title">学校: </span>
              <span class="detail">{{item.school}}</span>
            </p>
            <p class="item_detail">
              <span class="title">专业: </span>
              <span class="detail">{{item.profession}}</span>
            </p>
            <p class="item_detail">
              <span class="title">年级: </span>
              <span class="detail">{{item.grade}}</span>
            </p>
            <p class="item_detail">
              <span class="title">留言: </span>
              <el-tooltip class="item" effect="dark" :content="item.leaveMessege" placement="top-start">
                <span class="detail">{{item.leaveMessege}}</span>
              </el-tooltip>
            </p>
          </div>
        </div>
        <div class="btn_contain">
          <span @click="greenApply(item, 2)">拒绝</span>
          <span @click="greenApply(item, 1)">同意入队</span>
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
      .member_item {
        position: relative;

        width: 31%;
        margin-top: 30px;
        overflow: hidden;
        margin-left: 3.3%;
        padding-bottom: 50px;

        background-color: $card_bg_color;
        border-radius: 10px;
        transition: all .2s linear;
        border: 2px solid $border_color;
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
        &:hover {
          box-shadow: 0 15px 30px rgba(0,0,0,.1);
          transform: translate3d(0,-2px,0);
        }
        .member_name {
          height: 40px;
          line-height: 40px;

          text-align: center;
          font-size: 16px;
          font-weight: bold;
          i {
            color: #fff;
          }
          span {
            color: $border_color;
          }
        }
        .item_contain {
          padding: 0 20px;

          .item_detail {
            padding-bottom: 10px;
            font-size: 14px;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .btn_contain {
          position: absolute;
          bottom: 0;
          display: flex;

          width: 100%;
          height: 50px;
          line-height: 50px;

          color: #fff;
          font-size: 14px;
          border-top: 1px solid $border_color;
          span {
            width: 50%;
            text-align: center;
            // background: #dc1e32;
            cursor: pointer;
            &:hover {
              background: $border_color;
            }
          }
        }
      }
    }
  }
</style>
