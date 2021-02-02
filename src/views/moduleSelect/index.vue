<template>
  <div class="module_select_container"
    :style="{
      background: `url(${bg}) repeat center`,
      backgroundSize: 'cover'
    }">
    <el-header class="main_header">
      <MainHeader></MainHeader>
    </el-header>
    <div class="main_contain">
      <div @click="canCreate" class="module_item">
        <img :src="teamLogo" alt="">
        <span class="tcl_button">创建队伍</span>
      </div>
      <div @click="$router.push('/teamhall')" class="module_item">
        <img :src="teamLogo" alt="">
        <span class="tcl_button">加入队伍</span>
      </div>
    </div>
    <el-dialog
      @close="dialogVisible = false"
      :visible="dialogVisible"
      title="创建队伍"
      width="30%"
      >
      <el-form
        ref="createForm"
        :rules="rules"
        :model="formData"
        label-width="80px"
        >
        <el-form-item
          prop="teamName"
          label="队名"
          >
          <el-input
            v-model="formData.teamName"
            size="mini"></el-input>
        </el-form-item>
        <el-form-item
          prop="matchZone"
          label="赛区"
          >
          <el-select
            size="mini"
            v-model="formData.matchZone"
            @change="selecZone"
            placeholder="请选择赛区">
            <el-option
              v-for="item in matchArr"
              :key="item.value"
              :label="item.matchZone"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="province"
          label="省份"
          >
          <el-select
            size="mini"
            v-model="formData.province"
            placeholder="请选择">
            <el-option
              v-for="item in provinceArr"
              :key="item.value"
              :label="item.city"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="catagory"
          label="分类"
          v-show="false"
          >
          <el-select
            size="mini"
            v-model="formData.catagory"
            @change="selecClass"
            placeholder="请选择作品方向">
            <el-option
              v-for="item in classArr"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="opusDirection"
          label="作品方向"
          v-show="false"
          >
          <el-select
            size="mini"
            v-model="formData.opusDirection"
            @change="selecDirect"
            placeholder="请选择作品方向">
            <el-option
              v-for="item in directionArr"
              :key="item.value"
              :label="item.directionName"
              :value="item.directionId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="subject"
          label="作品课题"
          >
          <el-select
            size="mini"
            v-model="formData.subject"
            placeholder="请选择作品课题">
            <el-option
              v-for="item in subjectArr"
              :key="item.value"
              :label="item.subjectName"
              :value="item.subjectId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="指导老师"
          >
          <el-input
            v-model="formData.instructor"
            size="mini"></el-input>
        </el-form-item>
        <el-form-item
          label="老师电话"
          >
          <el-input
            v-model="formData.instructorPhone"
            size="mini"></el-input>
        </el-form-item>
        <el-form-item
          prop="recruitmentDemand"
          label="队员招募需求"
          class="line_block"
          >
          <el-input v-model="formData.recruitmentDemand" resize="none" rows="3" size="mini" type="textarea"></el-input>
        </el-form-item>
        <el-form-item
          prop="teamIntroduction"
          label="团队介绍"
          class="line_block"
          >
          <el-input v-model="formData.teamIntroduction" resize="none" rows="3" size="mini" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="danger" @click="createTeam">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import jsonData from '@/config/province.js'
import bg from '@/assets/images/tcl/module_bg.png'
import teamLogo from '@/assets/images/tcl/module_team.png'

import { mapActions } from 'vuex'
export default {
  components: {
    MainHeader
  },
  data () {
    return {
      bg,
      teamLogo,
      dialogVisible: false,
      matchArr: jsonData,
      provinceArr: [],
      classArr: [],
      directionArr: [],
      subjectArr: [],
      formData: {
        teamName: '',
        province: '',
        matchZone: '',
        instructor: '',
        instructorPhone: '',
        catagory: '',
        opusDirection: '',
        subject: '',
        recruitmentDemand: '',
        teamIntroduction: ''
      },
      rules: {
        teamName: [
          { required: true, message: '', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '', trigger: 'blur' }
        ],
        matchZone: [
          { required: true, message: '', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '', trigger: 'blur' }
        ],
        recruitmentDemand: [
          { required: true, message: '', trigger: 'blur' }
        ],
        teamIntroduction: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    await this.getDirection()
    this.selecClass(1)
    this.selecDirect(1)
  },
  methods: {
    ...mapActions(['POST_CREATE_TEAM', 'GET_DIRECTION', 'GET_USER_INFO']),
    async getDirection () {
      const res = await this.GET_DIRECTION()
      this.classArr = res.data
    },
    selecClass (data) {
      this.formData.subject = ''
      this.formData.opusDirection = ''
      const arr = this.classArr.filter((val) => val.categoryId === data)
      this.directionArr = arr[0].directions
    },
    selecDirect (data) {
      this.formData.subject = ''
      const arr = this.directionArr.filter((val) => val.directionId === data)
      this.subjectArr = arr[0].subjects
    },
    selecZone (data) {
      this.formData.province = ''
      const arr = this.matchArr.filter((val) => val.code === data)
      this.provinceArr = arr[0].province
    },
    canCreate () {
      if (this.getUser().captainFlag) {
        this.$message.error('你已有队伍')
      } else {
        this.dialogVisible = true
      }
    },
    createTeam () {
      this.$refs.createForm.validate(async (valid) => {
        if (valid) {
          this.formData.instructorPhone = this.formData.instructorPhone ? Number(this.formData.instructorPhone) : ''
          const params = this.formData
          const res = await this.POST_CREATE_TEAM(params)
          if (res.result === '0' && res.data) {
            const result = await this.GET_USER_INFO()
            if (result.result === '0') sessionStorage.setItem('userInfo', JSON.stringify(result.data))
            this.$router.push('/teamhall')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .module_select_container {
    width: 100%;
    min-height: 100vh;

    background-color: #f4f5f8;
    .main_header {
      background-color: $bg_color;
    }
    .main_contain {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 1024px;
      height: calc(100vh - 60px);
      margin: 0 auto;
      .module_item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        width: 333px;
        height: 333px;

        color: #fff;
        transition: all .2s linear;
        border-radius: 8px;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        background: linear-gradient(0deg, #48B7FF 0%, #0043BD 100%);
        border-radius: 20px;
        img {
          width: 118px;
          height: 93px;
          margin-bottom: 42px;
        }
        &:hover {
          transform: translate3d(0, -3px, 0);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
</style>

<style lang="scss">
.module_select_container {
  .el-dialog {
    width: 577px!important;
    border-radius: 10px;
    margin-top: 5vh!important;
  }
  .el-dialog__body {
    padding-bottom: 0;
    .el-form-item__label {
      width: 115px!important;
    }
    .line_block .el-form-item__content {
      display: inline-block;
      margin-left: 0px!important;
      width: 400px!important;
    }
  }
}
</style>
