<template>
  <div v-if="joinedData.length || applyList.length" class="team_cener_container">
    <PublicTitle title="已加入" color="#fff" />
    <div class="team_contain added_contain">
      <div v-if="!joinedData.length" class="no_data">
        暂无数据
      </div>
      <div
        @click="toDetail(item)"
        v-for="(item, index) in joinedData" :key="index"
        class="team_item">
        <div class="team_name">
          <div class="nubmer_box">
            {{item.teamNo}}
          </div>
          <div class="name_box">
            {{item.teamName}}
          </div>
        </div>
        <div class="item_contain">
          <div class="item_detail">
            <div class="title">队长：</div>
            <div class="detail">{{item.captain}}</div>
          </div>
          <div class="item_detail">
            <div class="title">电话：</div>
            <div class="detail">{{item.captainPhone}}</div>
          </div>
          <div class="item_detail">
            <div class="title">赛区：</div>
            <div class="detail">{{getZone(item.matchZone)}}</div>
          </div>
          <div class="item_detail">
            <div class="title">省份：</div>
            <div class="detail">{{getProvince(item.matchZone, item.province)}}</div>
          </div>
          <div class="item_detail">
            <div class="title">方向：</div>
            <div class="detail">{{item.opusDirection}}</div>
          </div>
          <div class="item_detail">
            <div class="title">课题：</div>
            <div class="detail">{{item.subject}}</div>
          </div>
          <div class="item_detail">
            <div class="title">队员招募需求：</div>
            <div class="detail">{{item.recruitmentDemand}}</div>
          </div>
          <div class="item_detail">
            <div class="title">团队介绍：</div>
            <el-tooltip class="item" effect="dark" :content="item.teamIntroduction" placement="top-start">
              <div class="detail">
                {{item.teamIntroduction}}
              </div>
            </el-tooltip>
          </div>
          <div class="footer_box">
            <img :src="xiaoren" alt="">
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      small
      :page-size="joinPage.pageSize"
      @current-change="joinPageChange"
      layout="prev, pager, next"
      :total="joinPage.recordNumber">
    </el-pagination>
    <PublicTitle title="申请列表" color="#fff" />
    <div class="team_contain">
      <div v-if="!applyList.length" class="no_data">
        暂无数据
      </div>
      <div
        v-for="(item, index) in applyList" :key="index"
        class="team_item apply_contain">
        <div class="team_name">
          <div class="nubmer_box">
            {{item.teamNo}}
          </div>
          <div class="name_box">
            {{item.teamName}}
          </div>
        </div>
        <div class="item_contain">
          <div class="item_detail">
            <div class="title">队长：</div>
            <div class="detail">{{item.captain}}</div>
          </div>
          <div class="item_detail">
            <div class="title">电话：</div>
            <div class="detail">{{item.captainPhone}}</div>
          </div>
          <div class="item_detail">
            <div class="title">赛区：</div>
            <div class="detail">{{getZone(item.matchZone)}}</div>
          </div>
          <div class="item_detail">
            <div class="title">省份：</div>
            <div class="detail">{{getProvince(item.matchZone, item.province)}}</div>
          </div>
          <div class="item_detail">
            <div class="title">方向：</div>
            <div class="detail">{{item.opusDirection}}</div>
          </div>
          <div class="item_detail">
            <div class="title">课题：</div>
            <div class="detail">{{item.subject}}</div>
          </div>
          <div class="item_detail">
            <div class="title">队员招募需求：</div>
            <div class="detail">{{item.recruitmentDemand}}</div>
          </div>
          <div class="item_detail">
            <div class="title">团队介绍：</div>
            <el-tooltip class="item" effect="dark" :content="item.teamIntroduction" placement="top-start">
              <div class="detail">
                {{item.teamIntroduction}}
              </div>
            </el-tooltip>
          </div>
          <div class="footer_box">
            <img :src="xiaoren" alt="">
          </div>
          <div class="btn_contain" v-if="item.applyState === 0">
            <p v-if="item.applyState === 0" class="apply_state">申请中</p>
          </div>
          <div v-if="item.applyState === 2" class="btn_contain">
            <p v-if="item.applyState === 2" class="apply_state">已拒绝</p>
            <el-button @click="reJoin(item)" class="apply_btn" size="mini">重新申请</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      small
      :page-size="applyPage.pageSize"
      @current-change="applyPageChange"
      layout="prev, pager, next"
      :total="applyPage.recordNumber">
    </el-pagination>
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
import PublicTitle from '@/components/public_title.vue'
import xiaoren from '@/assets/images/newPicture/xiaoren.png'
import { mapActions } from 'vuex'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      xiaoren,
      joinedData: [],
      applyList: [],
      joinPage: {},
      applyPage: {},
      dialogVisible: false,
      joinedForm: {
        pageNo: 1,
        pageSize: 12,
        teamApplys: [1]
      },
      applyedForm: {
        pageNo: 1,
        pageSize: 12,
        teamApplys: [0, 2]
      },
      joinData: {
        leaveMesseges: '',
        teamNo: ''
      }
    }
  },
  created () {
    this.getApplyList(this.joinedForm, 1)
    this.getApplyList(this.applyedForm, 2)
  },
  methods: {
    ...mapActions(['GET_TEMP_CENTER', 'POST_APPLY_TEAM']),
    // 弹框关闭
    handleClose (done) {
      this.dialogVisible = false
    },
    async submitApply () {
      const params = this.joinedData
      const res = await this.POST_APPLY_TEAM(params)
      if (res.result === '0' && res.data) {
        this.$message.success('申请成功')
        this.getApplyList(this.joinedForm, 1)
        this.getApplyList(this.applyedForm, 2)
        this.dialogVisible = false
      }
    },
    reJoin (data) {
      this.joinedData.teamNo = data.teamNo
      this.dialogVisible = true
    },
    joinPageChange (data) {
      this.joinedForm.pageNo = data
      this.getApplyList(this.joinedForm, 1)
    },
    applyPageChange (data) {
      this.applyedForm.pageNo = data
      this.getApplyList(this.applyedForm, 2)
    },
    // 查询申请列表 type 1: 已加入 2: 拒绝/申请中
    async getApplyList (params, type) {
      const res = await this.GET_TEMP_CENTER(params)
      if (type === 1) {
        this.joinedData = res.data.records
        this.joinPage = res.data
      }
      if (type === 2) {
        this.applyList = res.data.records
        this.applyPage = res.data
      }
      console.log(res)
    },
    // 跳转队伍详情
    toDetail (data) {
      this.$router.push({
        path: 'teamDetail',
        query: {
          id: data.teamNo
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .team_cener_container {
    width: 15.29rem;
    border-radius: .1rem;
    background-color: #fff;
    .no_data {
      width: 100%;
      text-align: center;
      padding: .2rem 0;
      font-size: .16rem;
    }
    .iconfont {
      font-size: 18px;
    }
    .team_contain {
      display: flex;
      flex-wrap: wrap;
      padding: 0 .24rem;
      margin-top: -.2rem;
      &.added_contain {
        margin-bottom: 30px;
      }
      .team_item {
        position: relative;
        width:4.01rem;
        margin-bottom: .3rem;
        overflow: hidden;
        margin-left: .38rem;

        background: radial-gradient(circle, rgba(0, 80, 213, 1) 20%, rgba(1, 68, 190, .7) 100%, rgba(0, 80, 213, 1) 100%);
        border-radius: .2rem;
        border-top-left-radius: 0;
        transition: all .2s linear;
        border: 1px solid #0050D5;
        cursor: pointer;
        &.apply_contain {
          position: relative;
          cursor: default;

          .apply_state {
            color: #fff;
          }
        }
        transition: all .2s linear;
        &:nth-child(4n + 1) {
          margin-left: 0;
        }
        &:hover {
          box-shadow: 0 .15rem .3rem rgba(0,0,0,.1);
          transform: translate3d(0,-2px,0);
        }
        .team_name {
          display: flex;
          height: .35rem;
          font-size: 0.14rem;
          font-weight: 400;
          color: #FFFFFF;
          margin-bottom: .13rem;
          .nubmer_box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.02rem;
            border-right: 1px solid #0064DD;
            font-size: 0.16rem;
            font-weight: bold;
            color: #0050D5;
            background: #fff;
          }
          .name_box {
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle, rgba(1, 68, 190, 0), rgba(71, 182, 254, 0));
            font-size: 0.16rem;
            font-weight: bold;
            color: #FFFFFF;
            background: #48B7FF;
            width: 3.03rem;
          }
          .name {
            color: $border_color;
          }
        }
        .item_contain {
          .item_detail {
            display: flex;
            padding: 0 .22rem;
            padding-bottom: .12rem;
            font-size: .14rem;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .title {
              padding-right: 5px;

              text-align: right;

              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .detail {
              width: 78%;

              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }

          .footer_box {
            display: flex;
            align-items: center;
            margin-top: .11rem;
            height: .5rem;
            padding: 0 .22rem;
            border-top: 1px solid #FFFFFF;
            img {
              width: .11rem;
              height: .31rem;
            }
          }

          .btn_contain {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 .22rem;
            padding-bottom: .1rem;
            p {
              margin-right: .1rem;
              font-size: 0.16rem;
            }
            .apply_btn {
              background: #48B7FF;
              color: #fff;
              font-size: 0.16rem;
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
