<template>
  <!-- 作品提交 -->
  <div v-loading="loading" class="works_submit_container">
    <PublicTitle title="作品提交" color="#fff" />
    <div class="submit_container">
      <!-- <div class="submit_item">
        <div class="submit_left flex_center">作品说明书</div>
        <div class="submit_center">
          <div class="center_left">
            <div class="tip_item">队伍介绍</div>
            <div class="tip_item">作品描述</div>
            <div class="tip_item">设计创意说明:明确指出作品的创新关键点</div>
          </div>
          <div class="center_right">
            <div class="file_item"
              v-for="(item, index) in file"
              :key="index">
              <span>{{item.attachmentFileName}}</span>
              <i class="iconfont icon-xiazai1 download_btn"
                @click="download(item.attachmentId)"></i>
            </div>
            <span v-if="!file.length">暂无数据</span>
          </div>
        </div>
        <div class="submit_right flex_center">
          <PublicButton @clickHandle="clickUploadBtn('0')">上传</PublicButton>
          <p>(支持格式PNG/PDF/WORD等)</p>
          <input type="file" v-show="false" :multiple="false" ref="file0" @change="fileChange">
        </div>
      </div> -->
      <!-- <div class="submit_item">
        <div class="submit_left flex_center">作品介绍</div>
        <div class="submit_center">
          <div class="center_left">
            <div class="tip_item title">包含但不限于以下内容:</div>
            <div class="tip_item">该产品的设计背景和市场现状分析（1-2p）</div>
            <div class="tip_item">方案展示</div>
            <div class="tip_item">设计亮点</div>
            <div class="tip_item">方案的可实施性说明</div>
          </div>
          <div class="center_right">
            <div class="file_item"
              v-for="(item, index) in file1"
              :key="index">
              <span>{{item.attachmentFileName}}</span>
              <i class="iconfont icon-xiazai1 download_btn"
                @click="download(item.attachmentId)"></i>
            </div>
            <span v-if="!file1.length">暂无数据</span>
          </div>
        </div>
        <div class="submit_right flex_center">
          <PublicButton @clickHandle="clickUploadBtn('1')">上传</PublicButton>
          <p>(支持格式PNG/PDF/WORD等)</p>
          <input type="file" v-show="false" :multiple="false" ref="file1" @change="fileChange1">
        </div>
      </div> -->
      <div class="submit_item">
        <div class="submit_left flex_center">作品要求</div>
        <div class="submit_center">
          <div class="center_left">
            <div class="tip_item">须至少提交《项目计划书》word文档，各团队可在此基础上自行添加内容。《项目计划书》word文档应包括如下内容：</div>
            <div class="tip_item">① 项目背景：本项目的简要概述，包括背景，选择原因；</div>
            <div class="tip_item">② 项目价值：项目对现状的改进，创新点，可行性分析等</div>
            <div class="tip_item">③ 项目实现方案：项目的设计思路、开发规划、人员分工等；</div>
            <div class="tip_item">④ 预期成果：此项目的最终呈现形式；</div>
            <div class="tip_item">⑤ 成员简介：团队成员背景介绍等。</div>

          </div>
          <!-- <div class="center_right">
            <div class="file_item"
              v-for="(item, index) in file2"
              :key="index">
              <span>{{item.attachmentFileName}}</span>
              <i class="iconfont icon-xiazai1 download_btn"
                @click="download(item.attachmentId)"></i>
            </div>
            <span v-if="!file2.length">暂无数据</span>
          </div> -->
        </div>
        <div class="submit_right flex_center">
          <!-- <PublicButton @clickHandle="clickUploadBtn('2')">上传</PublicButton> -->
          <template v-if="file2.length">
            <div class="file_item"
              v-for="(item, index) in file2"
              :key="index">
              <span>{{item.attachmentFileName}}</span>
              <span class="clickable" @click="download(item.attachmentId)">下载</span>
              <span class="clickable" @click="clickUploadBtn('2')">重新上传</span>
            </div>
          </template>
          <template v-if="!file2.length">
            <button disabled class="btn" @click="clickUploadBtn('2')">上传</button>
            <p>支持格式：PNG/PDF/WORD等</p>
          </template>
          <input type="file" v-show="false" :multiple="false" ref="file2" @change="fileChange2">
        </div>
      </div>
    </div>
    <PublicTitle title="作品进度" color="#fff" />
    <div class="current_progress">
      <span class="progress">当前进度</span>
      <!-- <span class="bold process">{{processTxt}}</span> -->
      <span class="bold process">评审中</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PublicTitle from '@/components/public_title.vue'
// import PublicButton from '@/components/public_button.vue'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      // 作品说明书
      file: [],
      // 作品介绍
      file1: [],
      // 作品附件
      file2: [],
      processTxt: '',
      loading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ...mapActions(['POST_FILE_UPLOAD', 'GET_TEAM_FILE', 'GET_DOWNLOAD_FILE']),
    clickUploadBtn (type) {
      console.log('上传类型', type)
      const ref = `file${type}`
      const dom = this.$refs[ref]
      dom && dom.click()
    },
    delFile (type, index) {
      const key = `file${type}`
      console.log(key, type)
      type === '2' ? this[key].splice(index, 1) : (this[key] = { name: '', file: null })
    },
    async fileChange (e) {
      const file = e.target.files[0]
      console.log('file:', file)
      try {
        const form = new FormData()
        form.append('attachmentTypeEnum', 'OPUS_INSTRUCTION_BOOK')
        form.append('multipartFile', file)
        this.loading = true
        const res = await this.POST_FILE_UPLOAD(form)
        console.log('res:', res)
        if (res.result === '0' && res.data) {
          this.getData()
          this.loading = false
          this.$message.success('上传成功')
          console.log('作品说明书上传成功:', res.data)
        }
      } catch (e) {
        this.$message.error('上传失败')
        console.log(e)
      }
      const dom = this.$refs.file0
      dom.value = ''
    },
    async fileChange1 (e) {
      const file = e.target.files[0]
      console.log('file1:', file)
      try {
        const form = new FormData()
        form.append('attachmentTypeEnum', 'OPUS_INTRODUCE')
        form.append('multipartFile', file)
        this.loading = true
        const res = await this.POST_FILE_UPLOAD(form)
        console.log('res:', res)
        if (res.result === '0' && res.data) {
          this.getData()
          this.loading = false
          this.$message.success('上传成功')
          console.log('作品介绍上传成功:', res.data)
        }
      } catch (e) {
        this.$message.error('上传失败')
        console.log(e)
      }
      const dom = this.$refs.file1
      dom.value = ''
    },
    async fileChange2 (e) {
      const files = e.target.files
      console.log('file2:', files)
      try {
        const form = new FormData()
        form.append('attachmentTypeEnum', 'OPUS_ATTACHMENT')
        files.forEach(file => {
          form.append('multipartFile', file)
        })
        this.loading = true
        const res = await this.POST_FILE_UPLOAD(form)
        console.log('res:', res)
        this.$message.success('上传成功')
        this.getData()
        this.loading = false
        console.log('作品附件上传成功:', res.data)
      } catch (e) {
        this.$message.error('上传失败')
        console.log(e)
      }
      const dom = this.$refs.file2
      dom.value = ''
    },
    // 下载附件
    async download (attachmentId) {
      this.GET_DOWNLOAD_FILE(attachmentId)
    },
    // 查页面数据
    async getData () {
      try {
        const res = await this.GET_TEAM_FILE()
        if (res.result === '0' && res.data) {
          console.log(res.data)
          const process = res.data.teamProgress
          process === 0 && (this.processTxt = '初选')
          process === 1 && (this.processTxt = '半决赛')
          process === 2 && (this.processTxt = '决赛')
          process === 3 && (this.processTxt = '淘汰')
          const files = res.data.attachments
          this.file = []
          this.file1 = []
          this.file2 = []
          files.forEach(file => {
            const type = file.attachmentType
            const key = `file${type === 0 ? '' : type === 1 ? '1' : '2'}`
            type === 2 ? this[key].push(file) : (this[key] = [file])
          })
          console.log(this.file2, 'file2')
        }
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
  color: #dc1e32;
}
.works_submit_container {
  width: 15.29rem;
  border-radius: .1rem;
  background-color: #fff;
  padding: 0 20px;
  .file_item {
    color: #333;
    cursor: pointer;
  }
  .clickable {
    color: #48b7ff;
    font-size: 12px;
    margin-left: 5px;
    cursor: pointer;
  }
  .flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .submit_container {
    margin-top: 30px;
    margin-bottom: 50px;
    .submit_item {
      display: flex;
      border: 1px solid #333;
      border-radius: 10px;
      min-height: 200px;
      .submit_left,
      .submit_right {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // padding: 0 20px;
        color: #333;
        .btn {
          font-size: 16px;
          color: #fff;
          background-color: #48B7FF;
          padding: 5px 40px;
          border-radius: 5px;
          border: 0;
          margin-bottom: 4px;
          cursor: pointer;
        }
      }
      .submit_right {
        width: 30%;
        font-size: 14px;
      }
      .submit_left {
        border-right: 1px solid #333;
        font-size: 20px;
        font-weight: bold;
        width: 20%;
      }
      .submit_center {
        display: flex;
        width: 50%;
        .tip_item {
          &.title {
            font-weight: bold;
          }
        }
        .center_left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 10px;
          flex-grow: 1;
          color: #333;
          width: 320px;
          font-size: 16px;
        }
        // .center_right {
        //   flex-shrink: 0;
        //   display: flex;
        //   align-items: center;
        //   flex-flow: row wrap;
        //   padding: 20px;
        //   width: 320px;
        //   height: 100%;
        //   border-left: 1px solid #333;
        //   .file_item {
        //     width: 100%;
        //     span {
        //       width: 80%;
        //       overflow: hidden;
        //       display: inline-block;
        //       text-overflow: ellipsis;
        //       white-space: nowrap;
        //       color: #333;
        //     }
        //   }
        //   .del_btn {
        //     margin-left: 20px;
        //     cursor: pointer;
        //     font-size: 24px;
        //     color: red;
        //   }
        //   .download_btn {
        //     margin-left: 20px;
        //     cursor: pointer;
        //     font-size: 20px;
        //     color: #fff;
        //   }
        // }
      }
      .submit_right {
        border-left: 1px solid #333;
        .del_btn {
          user-select: none;
          cursor: pointer;
          margin-left: 20px;
          font-size: 16px;
        }
      }
    }
  }
  .current_progress {
    margin-top: 30px;

    font-size: 16px;
    .progress {
      color: #333;
    }
    .process {
      margin-left: 10%;
    }
  }
}
</style>
