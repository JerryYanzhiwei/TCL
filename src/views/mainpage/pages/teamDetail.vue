<template>
  <div v-if="teamInfo" class="team_info_container">
    <PublicTitle color="#fff" title="队伍信息" />
    <div class="leader_contain">
      <div class="leader_top">
        <div class="item">
          <span class="item_name">编号: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.teamNo" placement="top-start">
            <span class="item_detail">{{teamInfo.teamNo}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">队伍: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.teamName" placement="top-start">
            <span class="item_detail">{{teamInfo.teamName}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">队长: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captain" placement="top-start">
            <span class="item_detail">{{teamInfo.captain}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">赛区: </span>
          <el-tooltip class="item" effect="dark" :content="getZone(teamInfo.matchZone)" placement="top-start">
            <span class="item_detail">{{getZone(teamInfo.matchZone)}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">省份: </span>
          <el-tooltip class="item" effect="dark" :content="getProvince(teamInfo.matchZone, teamInfo.province)" placement="top-start">
            <span class="item_detail">{{getProvince(teamInfo.matchZone, teamInfo.province)}}</span>
          </el-tooltip>
        </div>
        <!-- <div class="item">
          <span class="item_name">方向: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.opusDirection" placement="top-start">
            <span class="item_detail">{{teamInfo.opusDirection}}</span>
          </el-tooltip>
        </div> -->
        <div class="item">
          <span class="item_name">课题: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.subject" placement="top-start">
            <span class="item_detail">{{teamInfo.subject}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">队长电话: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captainPhone" placement="top-start">
            <span class="item_detail">{{teamInfo.captainPhone}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">指导老师: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.instructor" placement="top-start">
            <span class="item_detail">{{teamInfo.instructor}}</span>
          </el-tooltip>
        </div>
      </div>
      <!-- <div class="leader_bottom">
        <div class="item">
          <span class="item_name">组队中</span>
        </div>
        <div class="item">
          <el-button size="mini">完成组队</el-button>
        </div>
      </div> -->
    </div>
    <PublicTitle color="#fff" title="队伍成员" />
    <div class="member_contain">
      <!-- 队伍成员 -->
      <div v-for="(item, index) in teamInfo.teamMembers" :key="index" class="member_item">
        <div class="member_name">
          <i class="iconfont icon-shouhuoren"></i>
          {{item.name}}
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
        </div>
      </div>
    </div>
    <PublicTitle color="#fff" title="作品列表" />
    <div class="work_list">
      <div v-for="(item, index) in teamInfo.attachments" :key="index">
        {{
          item.attachmentFileName
        }}
        <i @click="downLoad(item)" class="iconfont icon-xiazai1"></i>
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
      teamInfo: null
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    ...mapActions(['GET_JOIN_DETAIL', 'GET_FILE_DOWNLOAD']),
    async getDetail () {
      const params = {
        teamNo: this.$route.query.id
      }
      const res = await this.GET_JOIN_DETAIL({ params })
      if (res.result === '0' && res.data) {
        this.teamInfo = res.data
      }
      console.log(res)
    },
    async downLoad (file) {
      window.open(`http://47.103.28.48:8080/match-service/user/teamInfo/dowload/attachment?attachmentId=${file.attachmentId}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .team_info_container {
    .iconfont {
      font-size: 13px;
    }
    .leader_contain {
      margin-top: 20px;
      margin-bottom: 50px;
      padding: 20px 0;

      background: white;
      box-shadow: 1px 2px 5px 1px $border_color;
      border: 2px solid $border_color;
      background-color: $card_bg_color;
      color: #fff;
      .leader_top {
        display: flex;
        flex-wrap: wrap;

        padding: 0 30px;

        .item {
          width: 33%;
          margin-top: 10px;
          font-size: 16px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-child(n > 3) {
          }
          .item_name {
            display: inline-block;

            width: 120px;
            margin-right: 5px;

            color: #fff;
            text-align: right;
          }
          .item_detail {
            color: #fff;
          }
        }
      }
      .leader_bottom {
        display: flex;
        justify-content: space-around;

        padding: 20px 30px;
        padding-bottom: 0;
        .item {
          font-size: 16px;
          .item_name {
            display: inline-block;

            width: 80px;
            margin-right: 5px;

            color: #dc1e32;
            text-align: right;
          }
          .item_detail {
            color: rgb(51, 51, 51);
          }
        }
      }
    }
    .member_contain {
      display: flex;
      flex-wrap: wrap;

      margin-bottom: 50px;
      .member_item {
        width: 31%;
        margin-top: 30px;
        overflow: hidden;
        margin-left: 3.3%;

        background-color: $card_bg_color;
        border: 2px solid $border_color;
        border-radius: 10px;
        transition: all .2s linear;
        color: #fff;
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
        }
        .item_contain {
          padding: 0 20px;

          .item_detail {
            margin-bottom: 10px;

            font-size: 14px;
            color: #fff;
          }
        }
        .btn_contain {
          height: 40px;
          line-height: 40px;
          text-align: center;

          background: #dc1e32;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .work_list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      padding-top: 30px;
      div {
        width: 33%;
        margin-top: 10px;

        text-align: center;
        color: #dc1e32;
        font-weight: bold;
        .icon-xiazai1 {
          cursor: pointer;
        }
      }
    }
  }
</style>
