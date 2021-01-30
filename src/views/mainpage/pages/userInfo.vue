<template>
  <div class="userInfo_container">
    <PublicTitle title="个人信息"/>
    <div class="user_contain">
      <div class="user_top">
        <div>
          <span>姓名: </span>
          <el-input v-model="userForm.name" size="mini"></el-input>
        </div>
        <div>
          <span>性别: </span>
          <el-input disabled v-model="gender" size="mini"></el-input>
        </div>
        <div>
          <span>手机: </span>
          <el-input disabled="" v-model="userForm.phone" size="mini"></el-input>
        </div>
        <div>
          <span>邮箱: </span>
          <el-input v-model="userForm.email" size="mini"></el-input>
        </div>
        <div>
          <span>学校: </span>
          <el-input v-model="userForm.school" size="mini"></el-input>
        </div>
        <div>
          <span>专业: </span>
          <el-input v-model="userForm.profession" size="mini"></el-input>
        </div>
        <div>
          <span>年级: </span>
          <el-input v-model="userForm.grade" size="mini"></el-input>
        </div>
        <div class="files">
          <template v-if="!this.fileName">
            <span>简历:</span>
            <PublicButton @clickHandle="clickUploadBtn">上传</PublicButton>
            <p>文件格式: WORD/PDF/PNG等</p>
            <input type="file" v-show="false" :multiple="false" ref="file0" @change="fileChange">
          </template>
          <template v-else>
            <span>简历:</span>
            <b class="file_name">{{this.fileName}}</b>
            <i @click="fileName = ''" class="del_btn">x</i>
            <!-- <i class="iconfont icon-xiazai1 download_btn"
              @click="download(item.attachmentId)"></i> -->
          </template>
        </div>
        <div class="">
          <span>备注:</span>
          <el-input v-model="userForm.described" rows="3" resize="none" type="textarea"></el-input>
        </div>
      </div>
      <div class="btn_contain">
        <el-button @click="editUserInfo" size="mini">修改</el-button>
      </div>
    </div>
    <PublicTitle title="赛题详情下载"/>
    <div class="user_contain ops_contain">
      <!-- <p>
        包装类课题介绍
        <i class="iconfont icon-xiazai1 download_btn"
                @click="download(0)"></i>
      </p>
      <p>
        物流类课题介绍
        <i class="iconfont icon-xiazai1 download_btn"
                @click="download(1)"></i>
      </p> -->
    </div>
    <PublicTitle title="相关赛事文件下载"/>
    <div class="user_contain ops_contain">
      <!-- <p>
        2021大赛大咖公开课内容提纲-包装
        <i class="iconfont icon-xiazai1 download_btn"
                @click="openModel(2)"></i>
      </p>
      <p>
        2021TCL创新大赛大咖公开课内容提纲-仓储
        <i class="iconfont icon-xiazai1 download_btn"
                @click="openModel(3)"></i>
      </p>
      <p>
        2021TCL创新大赛大咖公开课内容提纲-营运
        <i class="iconfont icon-xiazai1 download_btn"
                @click="openModel(4)"></i>
      </p>
      <p>
        2021TCL创新大赛赛事资料——航空
        <i class="iconfont icon-xiazai1 download_btn"
                @click="openModel(5)"></i>
      </p> -->
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <p class="tip_txt">该资料仅适用于2020“TCL”创新大赛，未经主办方允许，资料内容不得向任何第三方披露，如不严谨保密，一经发现，主办方将保留法律诉讼权利！</p>
      <el-checkbox v-model="checked">我已阅读并同意以上条款</el-checkbox>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modelDown">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PublicTitle from '@/components/public_title.vue'
import PublicButton from '@/components/public_button.vue'

import { mapActions } from 'vuex'
export default {
  components: {
    PublicTitle,
    PublicButton
  },
  data () {
    return {
      // userForm: {
      //   accountId: '',
      //   name: '',
      //   phone: '',
      //   email: '',
      //   school: '',
      //   profession: '',
      //   grade: '',
      //   described: ''
      // },
      userForm: {
        accountId: 2037,
        captainFlag: true,
        described: '',
        email: 'fdsf@fds.com',
        gender: 1,
        grade: '大二',
        name: 'Jerry',
        phone: '13428722221',
        profession: '物流',
        school: '深大'
      },
      gender: '',
      dialogVisible: false,
      attachmentId: null,
      checked: false,
      fileName: ''
    }
  },
  created () {
    // this.getUserInfo()
  },
  methods: {
    ...mapActions(['GET_USER_INFO', 'PUT_USER_INFO', 'GET_DOWNLOAD_TEMPLATE']),
    clickUploadBtn () {
      const dom = this.$refs.file0
      dom && dom.click()
    },
    fileChange (e) {
      const file = e.target.files[0]
      this.fileName = file.name
    },
    modelDown () {
      if (!this.checked) {
        this.$message.error('请勾选同意条款')
        return
      }
      this.download(this.attachmentId)
      this.dialogVisible = false
    },
    // 打开弹框
    openModel (attachmentId) {
      this.checked = false
      this.attachmentId = attachmentId
      this.dialogVisible = true
    },
    // 下载附件
    async download (attachmentId) {
      this.GET_DOWNLOAD_TEMPLATE(attachmentId)
    },
    async editUserInfo () {
      const params = this.userForm
      const res = await this.PUT_USER_INFO(params)
      if (res.result === '0' && res.data) {
        this.$message.success('修改成功')
      }
      console.log(res)
    },
    async getUserInfo () {
      const res = await this.GET_USER_INFO()
      if (res.result === '0' && res.data) {
        this.userForm = res.data
        this.userForm.gender === 0 && (this.gender = '未知')
        this.userForm.gender === 1 && (this.gender = '男')
        this.userForm.gender === 2 && (this.gender = '女')
      }
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo_container {
  width: 1526px;
  min-height: 100vh;

  // background-color: #f4f5f8;
  .del_btn {
    margin-left: 20px;
    cursor: pointer;
    font-size: 24px;
    color: red;
  }
  .user_contain {
    margin-top: 30px;
    margin-bottom: 40px;
    padding: 20px 30px;

    background-color: #fff;
    box-shadow:0px 2px 6px rgba(0,0,0,0.2);
    border-radius: 8px;
    &.ops_contain {
      display: flex;
      p {
        margin-right: 20px;
        color: #dc1e32;
        .download_btn {
          margin-left: 5px;
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
    .user_top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      div {
        width: 50%;
        margin: 10px 0;

        text-align: center;
        span {
          display: inline-block;

          width: 85px;
          margin-right: 10px;

          text-align: right;
        }
      }
      .files {
        position: relative;
        .file_name {
          display: inline-block;
          width: 50%;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .del_btn {
          position: absolute;
          top: -6px;
        }
      }
    }
    .btn_contain {
      margin-top: 10px;

      text-align: center;
    }
  }
}
</style>

<style lang="scss">
  .userInfo_container .user_contain .user_top div.el-textarea {
    vertical-align: top;
    margin: 0;
  }
  .el-dialog__body {
    padding: 0 20px;
  }
  .tip_txt {
    margin-bottom: 10px;
  }
</style>
