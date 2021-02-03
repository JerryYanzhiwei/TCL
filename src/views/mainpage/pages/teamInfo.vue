<template>
  <div class="team_info_container">
    <PublicTitle title="队伍信息" color="#fff" />
    <div v-if="teamInfo" class="leader_contain">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <div class="items">
              <span class="item_name">编号：</span>
              <el-input disabled size="mini" v-model="teamInfo.teamNo"></el-input>
            </div>
          </td>
          <td>
            <div class="items">
              <span class="item_name">队伍：</span>
              <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.teamName" style="width: 50%;"></el-input>
              <span style="min-width: auto;color: #0043BD; padding-left: 0.2rem;">
                {{ teamInfo.teamState === 1 && '组队完成' || teamInfo.teamState === 0 && '发布中' }}
              </span>
            </div>
          </td>
          <td>
            <div class="items">
              <span class="item_name">队长：</span>
              <el-input disabled size="mini" v-model="teamInfo.captain"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="items">
              <span class="item_name">院校：</span>
              <el-input disabled size="mini" v-model="teamInfo.school"></el-input>
            </div>
          </td>
          <td>
            <div class="items">
              <span class="item_name">赛区：</span>
              <el-input disabled size="mini" :value="getZone(teamInfo.matchZone)"></el-input>
            </div>
          </td>
          <td>
            <div class="items">
              <span class="item_name">省份：</span>
              <el-input disabled size="mini" :value="getProvince(teamInfo.matchZone, teamInfo.province)"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <!-- <td>
            <div class="items">
              <span class="item_name">方向：</span>
              <el-input disabled size="mini" v-model="teamInfo.opusDirection"></el-input>
            </div>
          </td> -->
          <td>
            <div class="items">
              <span class="item_name">课题：</span>
              <el-input disabled size="mini" v-model="teamInfo.subject"></el-input>
            </div>
          </td>
          <td>
            <div class="items">
              <span class="item_name">队长电话：</span>
              <el-input disabled size="mini" v-model="teamInfo.captainPhone"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="items">
              <span class="item_name">指导老师：</span>
                <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.instructor"></el-input>
            </div>
          </td>
          <td>
            <div class="items">
              <span class="item_name">老师电话：</span>
                <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.instructorPhone"></el-input>
            </div>
          </td>
          <td rowspan="3">
            <div class="items">
              <span class="item_name">团队介绍：</span>
                <el-input type="textarea" resize="none" :disabled="!canEdit" size="mini" v-model="teamInfo.teamIntroduction"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td rowspan="3">
            <div class="items">
              <span class="item_name">队员招募需求：</span>
                <el-input :disabled="!canEdit" size="mini" type="textarea" resize="none" v-model="teamInfo.recruitmentDemand"></el-input>
            </div>
          </td>
          <td style="height: .8rem;"></td>
        </tr>
        <tr>
          <td></td>
        </tr>
      </table>

      <!-- 操作按钮 -->
      <div class="leader_bottom">
        <div class="item"></div>
        <div class="item">
          <el-button class="lead_btn" size="mini"
            @click="editTeamStatus(teamInfo.teamState)"
            >{{
            teamInfo.teamState === 1 && '发 布 组 队' ||
            teamInfo.teamState === 0 && '组 队 完 成'
            }}</el-button>
        </div>
        <div class="item" style="justify-content: flex-end;">
          <el-button class="lead_btn" size="mini"
            @click="editTeamInfo(teamInfo.teamNo)"
            >{{
              !canEdit ? '编 辑 信 息' : '保 存'
            }}</el-button>
        </div>
      </div>
    </div>
    <PublicTitle title="队伍成员" color="#fff" />

    <!-- 队伍成员 -->
    <div v-if="teamInfo" class="member_contain">
      <div v-for="(item, index) in teamInfo.teamMembers" :key="index" class="member_item">
        <div class="member_name">
          <i class="iconfont icon-shouhuoren"></i>
          {{item.name}}
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
        </div>
        <div @click="removeMember(item)" class="btn_contain">
          移除队伍
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
      canEdit: false,
      teamInfo: null
    }
  },
  created () {
    this.getTeamInfo()
  },
  methods: {
    ...mapActions(['GET_MY_TEAM_INFO', 'PUT_REMOVE_MEMBER', 'PUT_TEAM_COMPLETE', 'PUT_MY_TEAM_INFO']),
    async getTeamInfo () {
      const res = await this.GET_MY_TEAM_INFO()
      if (res.result === '0' && res.data) {
        this.teamInfo = res.data
      }
    },
    async editTeamInfo (teamNo) {
      if (!this.canEdit) {
        this.canEdit = !this.canEdit
        return
      }
      if (!this.teamInfo.teamName) {
        this.$message.error('请填写队伍名称')
        return
      }
      if (!this.teamInfo.instructor) {
        this.$message.error('请填写指导老师')
        return
      }
      if (!this.teamInfo.instructorPhone) {
        this.$message.error('请填写老师电话')
        return
      }
      if (!this.teamInfo.teamIntroduction) {
        this.$message.error('请填写团队介绍')
        return
      }
      if (!this.teamInfo.recruitmentDemand) {
        this.$message.error('请填写队员招募需求')
        return
      }
      const res = await this.PUT_MY_TEAM_INFO({
        instructor: this.teamInfo.instructor,
        instructorPhone: this.teamInfo.instructorPhone,
        teamNo: this.teamInfo.teamNo,
        teamIntroduction: this.teamInfo.teamIntroduction,
        recruitmentDemand: this.teamInfo.recruitmentDemand,
        teamName: this.teamInfo.teamName
      })
      if (res.result === '0' && res.data) {
        this.$message.success('修改成功')
        this.canEdit = !this.canEdit
        this.getTeamInfo()
      }
    },
    async removeMember (data) {
      const res = await this.PUT_REMOVE_MEMBER({
        teamMemberId: data.teamMemberId,
        teamNo: this.teamInfo.teamNo
      })
      if (res.result === '0' && res.data) {
        this.$message.success('移除成功')
        this.getTeamInfo()
      }
    },
    async editTeamStatus (status) {
      const res = await this.PUT_TEAM_COMPLETE({
        teamNo: this.teamInfo.teamNo,
        teamState: status ? 0 : 1
      })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
  .team_info_container {
    width: 15.29rem;
    border-radius: .1rem;
    background-color: #fff;
    .iconfont {
      font-size: 13px;
    }
    .leader_contain {
      margin: 0 .24rem;
      padding-right: .34rem;
      padding-top: .1rem;
      padding-bottom: .21rem;
      background-color: #fff;
      box-shadow:0px 2px 6px rgba(0,0,0,0.2);
      border-radius: .08rem;
      table {
        width: 100%;
        tr {
          td {
            width: 33.3%;
          }
        }
        .items {
          width: 100%;
          display: flex;
          align-items: baseline;
          margin: .1rem 0;

          span, p {
            text-align: right;
            min-width: 1.1rem;
            margin-right: .08rem;
            font-size: 0.14rem;
          }
        }
      }
      .leader_bottom {
        display: flex;
        justify-content: space-around;
        padding-top: .52rem;
        .item {
          width: 33.3%;
          display: flex;
          align-items: center;
          justify-content: center;
          .lead_btn {
            padding: .12rem .23rem;
            font-size: 0.18rem;
            font-weight: 400;
            color: #FFFFFF;
            background: #48B7FF;
            border-radius: .05rem;
          }
          .item_text {
            font-size: .18rem;
            color: #48B7FF;
          }
          .item_name {
            display: inline-block;

            width: 80px;
            margin-right: 5px;

            color: #fff;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item_detail {
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .member_contain {
      display: flex;
      flex-wrap: wrap;
      padding: 0 .24rem;
      margin-top: -.05rem;
      .member_item {
        position: relative;
        width: 3.39rem;
        margin-bottom: .3rem;
        overflow: hidden;
        margin-left: .38rem;

        background: #fff;
        border-radius: .1rem;
        transition: all .2s linear;
        box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.25);
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
          color: #333;
          i {
            margin-right: .1rem;
            color: #333;
          }
        }
        .item_contain {
          padding: 0 .2rem;

          .item_detail {
            padding-bottom: .17rem;
            font-size: .14rem;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .btn_contain {
          display: flex;
          align-items: center;
          justify-content: center;
          height: .48rem;

          background: #dc1e32;
          font-size: 0.18rem;
          font-weight: bold;
          color: #FFFFFF;
          cursor: pointer;
        }
      }
    }
  }
</style>

<style lang="scss">
.team_info_container {
  .leader_contain {
    table {
      .items {
        .el-textarea {
          &__inner {
            height: 1.08rem;
          }
        }
      }
    }
  }
}
</style>
