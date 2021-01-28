<template>
  <div class="teamhall_container"
    :style="{
      background: `url(${bg}) repeat center`,
      backgroundSize: 'cover'
    }">
    <el-header class="main_header">
      <MainHeader></MainHeader>
    </el-header>
    <div class="team_container">
      <div class="fitler_contain">
        <div>
          <span>
            <span class="white">队伍编号:</span>
            <el-input v-model="hallData.teamNo" size="mini"></el-input>
          </span>
          <span>
            <span class="white">省份:</span>
            <el-select
              size="mini"
              v-model="hallData.province"
              placeholder="">
              <el-option
                key="z"
                label="全部"
                value="">
              </el-option>
              <el-option
                v-for="item in provinceData"
                :key="item.code"
                :label="item.city"
                :value="item.code">
              </el-option>
            </el-select>
          </span>
          <span>
            <span class="white">方向:</span>
            <el-select
              size="mini"
              v-model="hallData.directionId"
              placeholder="">
              <el-option
                :key="-1"
                label="全部"
                value="">
              </el-option>
              <el-option
                v-for="item in directList"
                :key="item.directionName"
                :label="item.directionName"
                :value="item.directionId">
              </el-option>
            </el-select>
          </span>
        </div>
        <div>
          <el-button @click="search" size="mini">搜索</el-button>
        </div>
      </div>
      <PublicTitle title="队伍列表" color="#fff" />
      <div class="team_contain">
        <div v-for="(item, index) in teamList" :key="index" class="team_item">
          <div class="team_name">
            <span class="teamNum">{{item.teamNo}}</span>
            <span class="title">{{item.teamName}}</span>
          </div>
          <div class="item_contain">
            <div class="item_detail">
              <div class="title">队长: </div>
              <div class="detail">{{item.captain}}</div>
            </div>
            <div class="item_detail">
              <div class="title">队长电话: </div>
              <div class="detail">{{item.captainPhone}}</div>
            </div>
            <div class="item_detail">
              <div class="title">赛区: </div>
              <div class="detail">{{getZone(item.matchZone)}}</div>
            </div>
            <div class="item_detail">
              <div class="title">省份: </div>
              <div class="detail">{{getProvince(item.matchZone, item.province)}}</div>
            </div>
            <div class="item_detail">
              <div class="title">作品方向: </div>
              <div class="detail">{{item.opusDirection}}</div>
            </div>
            <div class="item_detail">
              <div class="title">作品课题: </div>
              <div class="detail">{{item.subject}}</div>
            </div>
            <div class="item_detail">
              <div class="title">指导老师: </div>
              <div class="detail">{{item.instructor}}</div>
            </div>
            <div class="item_detail">
              <div class="title">队员招募需求: </div>
              <el-tooltip class="item" effect="dark" :content="item.recruitmentDemand" placement="top-start">
                <div class="detail">{{item.recruitmentDemand}}</div>
              </el-tooltip>
            </div>
            <div class="item_detail">
              <div class="title">团队介绍: </div>
              <el-tooltip class="item" effect="dark" :content="item.teamIntroduction" placement="top-start">
                <div class="detail">
                  {{item.teamIntroduction}}
                </div>
              </el-tooltip>
            </div>
          </div>
          <div class="btn_contain">
            <span class="limit_count">{{item.memberNum}}/5</span>
            <el-button :disabled="item.applyState === 1 || item.applyState === 0" @click="joinTeam(item.teamNo)" size="mini">
              {{
                item.applyState === 1 && '已加入' ||
                item.applyState === 0 && '申请中' ||
                '申请加入'
              }}
            </el-button>
          </div>
        </div>
      </div>
      <el-pagination
        v-if="pageData"
        small
        :page-size="pageData.pageSize"
        @current-change="pageChange"
        layout="prev, pager, next"
        :total="pageData.recordNumber">
      </el-pagination>
    </div>
    <el-dialog
      width="30%"
      :visible="dialogVisible"
      :before-close="handleClose"
      title="留言板"
      >
      <el-input
        rows="3"
        resize="none"
        type="textarea"
        v-model="joinData.leaveMesseges"
        ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="submitApply">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PublicTitle from '@/components/public_title.vue'
import MainHeader from '@/components/MainHeader.vue'
import bg from '@/assets/bg.png'

import jsonData from '@/config/province.js'
export default {
  components: {
    PublicTitle,
    MainHeader
  },
  data () {
    return {
      bg,
      // 弹框是否可见
      dialogVisible: false,
      // hall data
      hallData: {
        pageNo: 1,
        pageSize: 12,
        province: null,
        teamNo: null,
        directionId: null
      },
      teamList: [],
      joinData: {
        leaveMesseges: '',
        teamNo: ''
      },
      directList: [],
      pageData: null,
      provinceData: []
    }
  },
  created () {
    this.getHallData()
    this.getProvinces()
    this.getDirect()
  },
  methods: {
    ...mapActions(['GET_HALL_DATA', 'POST_APPLY_TEAM', 'GET_DIRECTION']),

    async getDirect () {
      const res = await this.GET_DIRECTION()
      if (res.result === '0' && res.data) {
        res.data.map((item) => {
          this.directList = this.directList.concat(item.directions)
        })
      }
      console.log(res)
    },

    getProvinces () {
      let arr = []
      jsonData.map(item => {
        arr = arr.concat(item.province)
        console.log(item.province)
      })
      this.provinceData = arr
    },

    pageChange (data) {
      this.hallData.pageNo = data
      this.getHallData()
      console.log(data)
    },
    // 搜索
    async search () {
      this.hallData.pageNo = 1
      this.getHallData()
    },
    // 获取大厅消息
    async getHallData () {
      const params = this.hallData
      const res = await this.GET_HALL_DATA({ params })
      if (res.result === '0' && res.data) {
        res.data.total = parseInt(res.data.total)
        this.pageData = res.data
        this.teamList = res.data.records
      }
    },
    // 弹框关闭
    handleClose (done) {
      this.dialogVisible = false
    },

    // 提交申请
    joinTeam (teamNo) {
      this.joinData.teamNo = teamNo
      this.dialogVisible = true
    },
    async submitApply () {
      const params = this.joinData
      try {
        const res = await this.POST_APPLY_TEAM(params)
        if (res.result === '0' && res.data) {
          this.$message.success('申请成功')
          this.getHallData()
          this.dialogVisible = false
        }
      } catch (err) {
        console.log(err)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .teamhall_container {
    width: 100%;
    min-height: 100vh;

    background-color: #f4f5f8;
    .main_header {
      background-color: $bg_color;
    }
    .team_container {
      width: 1200px;
      margin: 0 auto;
      padding-top: 90px;
      .fitler_contain {
        display: flex;
        justify-content: space-between;

        margin-bottom: 30px;
      }
      .team_contain {
        display: flex;
        flex-wrap: wrap;
        .team_item {
          background-color: $card_bg_color;
          width: 31%;
          margin-top: 30px;
          overflow: hidden;
          margin-left: 3.3%;

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
          .team_name {
            position: relative;

            height: 40px;
            line-height: 40px;
            padding: 0 20px;

            text-align: center;
            font-size: 16px;
            font-weight: bold;
            .teamNum {
              position: absolute;
              left: 20px;

              font-size: 12px;
              font-weight: normal;
              color: #fff;
            }
            .title {
              color: $border_color;
            }
          }
          .item_contain {
            padding: 0 20px;

            .item_detail {
              display: flex;
              margin-bottom: 10px;

              font-size: 14px;
              color: #fff;
              .title {
                width: 20%;
                padding-right: 5px;

                text-align: right;

                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .detail {
                width: 78%;

                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          .btn_contain {
            display: flex;
            align-items: center;
            justify-content: space-between;

            height: 50px;
            padding: 0 30px;

            // background: #dc1e32;
            border-top: 1px solid $border_color;
            color: #fff;
            font-size: 14px;
            span {
              cursor: pointer;
              color: #666;
              &.limit_count {
                font-weight: bold;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .el-tooltip__popper {
    max-width: 300px;
  }
</style>
