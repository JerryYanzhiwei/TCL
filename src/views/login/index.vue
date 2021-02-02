<template>
  <div class="login_container"
    :style="{
      background: `url(${bg}) repeat center`,
      backgroundSize: 'cover'
    }">
    <div class="left_logo">
      <img :src="logo3" alt="">
      <p>2021年TCL高校科创节</p>
    </div>
    <!-- 登录 -->
    <div v-if="isLogin && deviceType === 1" class="login_content">
      <div class="login_txt">
        <img :src="logo3" alt="">
      </div>
      <p class="login_tips">欢迎登录</p>
      <div class="form_item">
        <!-- <span class="label_title">手机号</span> -->
        <el-input type="number" v-model="loginForm.phone" size="mini" placeholder="手机号" prefix-icon="el-icon-mobile-phone"></el-input>
      </div>
      <div v-if="!loginType" class="form_item">
        <!-- <span class="label_title">密码</span> -->
        <el-input type="password" v-model="loginForm.password" size="mini" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div v-else class="form_item msg_input">
        <el-input v-model="loginForm.verificationCode" size="mini" placeholder="验证码" prefix-icon="el-icon-chat-line-square"></el-input>
        <span v-if="!showLoginCode" @click="sendLoginCode" class="send_msg">发送验证码</span>
        <span v-else class="send_msg">{{loginCode}}</span>
      </div>
      <div class="btn_contain">
        <el-button class="btn_box" v-if="!loginType" @click="passwordLogin">登录</el-button>
        <el-button class="btn_box" v-if="loginType" @click="codeLogin">登录</el-button>
        <div class="operation_box">
          <span @click="isLogin = false">注册</span>
          <span @click="changeLoginType">
            {{
              !loginType ? '验证码登录' : '密码登录'
            }}
          </span>
        </div>
      </div>
    </div>
    <!-- 注册 -->
    <div v-else class="registry_content">
      <div class="registry_txt">
        <img :src="logo3" alt="">
      </div>
      <!-- 返回登录 -->
      <p class="back_login" v-if="deviceType === 1" @click="isLogin = true">返回登录</p>
      <p class="registration_title">注册</p>
      <div class="login_form_contain">
        <el-form
          :model="registryForm"
          ref="registryForm"
          :rules="rules"
          label-width="100px"
          >
          <!-- 姓名 -->
          <el-form-item
            prop="name"
            label="姓名">
            <el-input
              v-model="registryForm.name"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 性别 -->
          <el-form-item
            prop="gender"
            label="性别">
            <el-select
              size="mini"
              v-model="registryForm.gender"
              placeholder="">
              <el-option
                v-for="item in sexArr"
                :key="item.code"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item
            prop="phone"
            label="手机号">
            <el-input
              type="number"
              v-model="registryForm.phone"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item
            prop="verificationCode"
            label="验证码">
            <el-input
              v-model="registryForm.verificationCode"
              size="mini"
              >
            </el-input>
            <span v-if="!showCount" @click="getRegistryCode" class="get_code">获取验证码</span>
            <span v-if="showCount" class="get_code">{{count}}</span>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item
            prop="password"
            label="密码">
            <el-input
              type="password"
              v-model="registryForm.password"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item
            prop="email"
            label="邮箱">
            <el-input
              v-model="registryForm.email"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 学校 -->
          <el-form-item
            prop="school"
            label="学校">
            <el-input
              v-model="registryForm.school"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- <el-form-item
            label="学生证"
            >
            <span v-if="fileName">{{fileName}} <i @click="clickUploadBtn(2)" class="reload">重新上传</i></span>
            <el-button v-else size="mini" @click="clickUploadBtn(2)">上传</el-button>
            <input type="file" v-show="false" ref="file2" @change="fileChange">
          </el-form-item> -->
          <!-- 专业 -->
          <el-form-item
            prop="profession"
            label="专业">
            <el-input
              v-model="registryForm.profession"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 学历 -->
          <el-form-item
            prop="educational"
            label="学历">
            <el-select
              size="mini"
              v-model="registryForm.educational"
              placeholder="">
              <el-option
                v-for="item in educationalArr"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 毕业时间 -->
          <el-form-item
            prop="educationalYear"
            label="毕业时间">
            <el-select
              size="mini"
              v-model="registryForm.educationalYear"
              placeholder="">
              <el-option
                v-for="item in educationalYearArr"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn_contain">
        <el-button class="register_btn" @click="submitRegistry" size="mini">注册</el-button>
      </div>
    </div>
    <!-- 抽奖 -->
    <div v-if="drawVisibel" class="prize_contain">
      <p class="luck_draw_txt">点击抽奖</p>
      <div class="prize_items">
        <div @click="touchPrize" class="prize_detail" v-for="(item, index) in [1, 2, 3]" :key="index">
          <img class="prize_cover front" :src="prizeCover" alt="">
          <img class="prize_cover back" :src="prizeBack" alt="">
          <img class="hidden" :src="prizeCover" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import bg from '@/assets/images/newPicture/login.png'
import logo2 from '@/assets/images/newPicture/logo.png'
import logo3 from '@/assets/images/newPicture/logo2.png'
export default {
  data () {
    return {
      logo: require('../../assets/images/title.jpg'),
      prizeCover: require('../../assets/images/cover1.png'),
      prizeBack: require('../../assets/images/cover2.png'),
      bg,
      logo2,
      logo3,
      showCount: false,
      count: 0,
      timer: null,
      loginTimer: null,
      showLoginCode: false,
      loginCode: 0,
      deviceType: null, // 1: PC 2: phone
      // 是否可抽奖
      canDraw: true,
      // 抽奖弹框
      drawVisibel: false,
      // true: 登录  false: 注册
      isLogin: true,
      // false: 密码登录  true: 验证码登录
      loginType: false,
      studentCard: null,
      fileName: '',
      loginForm: {
        phone: '',
        password: '',
        verificationCode: ''
      },
      registryForm: {
        name: '',
        phone: '',
        gender: '',
        verificationCode: '',
        password: '',
        email: '',
        school: '',
        profession: '',
        educational: '',
        educationalYear: ''
      },
      postForm: null,
      sexArr: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],
      educationalArr: [
        '专科', '本科', '硕士', '博士', '其他'
      ],
      educationalYearArr: [
        '2021年', '2022年', '2023年', '2024年', '2024年之后'
      ]
    }
  },
  computed: {
    rules () {
      return {
        name: [
          { required: true, message: '', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '', trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '', trigger: 'blur' }
        ],
        profession: [
          { required: true, message: '', trigger: 'blur' }
        ],
        educational: [
          { required: true, message: '', trigger: 'blur' }
        ],
        educationalYear: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.deviceType = document.body.clientWidth > 500 ? 1 : 2
  },
  methods: {
    ...mapActions(['login', 'POST_GET_CODE', 'POST_REGISTRY', 'LOGIN_CODE', 'CODE_LOGIN']),
    clickUploadBtn (type) {
      console.log('上传类型', type)
      const ref = `file${type}`
      const dom = this.$refs[ref]
      dom && dom.click()
    },
    async fileChange (e) {
      const file = e.target.files[0]
      console.log('file:', file)
      const arr = file.name.split('.')
      const type = arr[arr.length - 1]
      const acceptTypes = ['png', 'jpg', 'jpeg']
      if (type && acceptTypes.indexOf(type) > -1) {
        this.fileName = file.name
        this.studentCard = file
        const dom = this.$refs.file2
        dom.value = ''
      } else {
        this.$message.error('只允许上传jpg,png,jpeg类型文件')
      }
    },
    // 获取登录验证码
    async sendLoginCode () {
      const res = await this.LOGIN_CODE({
        phone: this.loginForm.phone
      })
      if (res.result === '0' && res.data) {
        this.$message.success('发送成功')
        this.loginCode = 60
        this.showLoginCode = true
        this.loginTimer = setInterval(() => {
          this.loginCode--
          if (this.loginCode === 0) {
            clearInterval(this.loginTimer)
            this.loginTimer = null
            this.showLoginCode = false
            this.loginCode = 60
          }
        }, 1000)
      }
    },
    // 抽奖
    touchPrize ($el) {
      if (this.canDraw) {
        $el.target.style.transform = 'rotateY(-180deg)'
        $el.target.nextSibling.style.transform = 'rotateY(-360deg)'
        this.canDraw = false
        setTimeout(() => {
          location.reload()
        }, 3000)
      }
    },
    // 密码登录
    async passwordLogin () {
      if (!this.validatePhone(this.loginForm.phone)) {
        this.$message.error('请输入正确的手机号码')
        return
      }
      const res = await this.login(this.loginForm)
      if (res.result === '0') {
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        this.$router.push('/moduleSelect')
      }
      console.log('密码登录', res)
    },
    async codeLogin () {
      const res = await this.CODE_LOGIN(this.loginForm)
      if (res.result === '0') {
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        this.$router.push('/moduleSelect')
      }
      console.log('验证码登录', res)
    },
    // 切换登录方式
    changeLoginType () {
      this.loginType = !this.loginType
      const dom = this.$refs.file2
      dom.value = ''
      this.studentCard = null
      this.fileName = ''
    },
    // 获取注册验证码
    async getRegistryCode () {
      const res = await this.POST_GET_CODE({
        phone: this.registryForm.phone
      })
      if (res.result === '0' && res.data) {
        this.$message.success('发送成功')
        this.count = 60
        this.showCount = true
        this.timer = setInterval(() => {
          this.count--
          console.log(this.count, 111)
          if (this.count === 0) {
            clearInterval(this.timer)
            this.timer = null
            this.showCount = false
            this.count = 60
          }
        }, 1000)
      }
    },
    // 注册账号
    submitRegistry () {
      const width = document.body.clientWidth
      this.$refs.registryForm.validate(async (valid) => {
        if (valid) {
          if (!this.validatePhone(this.registryForm.phone)) {
            this.$message.error('请输入正确的手机号码')
            return
          }
          if (!this.validateEmail(this.registryForm.email)) {
            this.$message.error('请输入正确的邮箱')
            return
          }
          this.postForm = new FormData()
          this.postForm.append('studentCardFile', this.studentCard)
          for (var key in this.registryForm) {
            this.postForm.append(key, this.registryForm[key])
          }
          const res = await this.POST_REGISTRY(this.postForm)
          if (res.result === '0' && res.data) {
            this.$message.success('注册成功')
            if (width < 500) {
              this.$alert('注册成功, 请在电脑中继续操作', 'TIP', {
                confirmButtonText: '确定',
                callback: action => {
                  setTimeout(() => {
                    location.reload()
                  }, 3000)
                }
              })
            } else {
              this.$message.success('成功')
              setTimeout(() => {
                location.reload()
              }, 3000)
            }
          }
          console.log('通过', res)
        } else {
          console.log(21321)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login_container{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;
    .left_logo {
      position: absolute;
      left: 48px;
      top: 16px;
      display: flex;
      align-items: center;
      img {
        width: 145px;
        height: 30px;
      }
      p {
        margin-left: 32px;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }
    }
    .reload {
      font-size: 12px;
      color: #409EFF;
      cursor: pointer;
    }
    .login_content {
      width: 400px;
      // padding: 20px;

      border-radius: 8px;
      .login_top {
        margin-bottom: 30px;
        text-align: center;
        img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
      }
      background-color: #fff;
      .login_txt {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        background-color: #48B7FF;
        img {
          width: 153px;
          height: 32px;
        }
      }

      .login_tips {
        margin: 22px 0 26px 23px;
        font-size: 24px;
        font-weight: 400;
        color: #48B7FF;
      }
      .form_item {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        margin-top: 20px;
        .label_title {
          width: 80px;
        }
        .send_msg {
          position: absolute;
          bottom: 5px;
          right: 40px;

          font-size: 12px;
          color: #409EFF;
          cursor: pointer;
        }
      }
      .btn_contain {
        margin-top: 30px;
        padding: 0 20px;
        .btn_box {
          width: 360px;
          height: 50px;
          background: #48B7FF;
          border-radius: 6px;

          font-size: 22px;
          font-weight: 400;
          color: #FFFFFF;
        }
        .operation_box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          span {
            font-size: 16px;
            color: #409EFF;
            cursor: pointer;
          }
        }
      }
    }
    .registry_content {
      width: 400px;
      // padding: 20px;

      background-color: #fff;
      border-radius: 8px;
      margin-left: -50%;
      .registry_txt {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        background-color: #48B7FF;
        img {
          width: 153px;
          height: 32px;
        }
      }
      .back_login {
        margin-top: 10px;
        margin-left: 15px;
        font-size: 16px;
        font-weight: 400;
        color: #48B7FF;
        cursor: pointer;
      }
      .registration_title {
        padding: 28px;
        padding-top: 0;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }
    }
    .prize_contain {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      background-color: rgba(0, 0, 0, .8);
      .luck_draw_txt {
        margin-bottom: 10%;

        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
      .prize_items {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        width: 100%;
        .prize_detail {
          position: relative;
          width: 20%;
          perspective: 500;
          img.prize_cover {
            position: absolute;
            top: 0;
            left: 0;
            transition: all 1s;
            backface-visibility: hidden;
            perspective: 1000;
            border-radius: 10px;
            cursor: pointer;
            width: 100%;
            height: auto;
          }
          .hidden {
            width: 100%;
            height: auto;
            margin-bottom: 10%;
            visibility: hidden;
          }
          .back {
            transform: rotateY(-180deg);
          }
          // &:hover .front {
          //   transform: rotateY(-180deg);
          // }
          // &:hover .back {
          //   transform: rotateY(-360deg);
          // }
        }
      }
    }
    .btn_contain {
      margin-top: 15px;
      margin-bottom: 28px;
      text-align: center;
      .register_btn {
        width: 140px;
        height: 40px;
        border: 1px solid #48B7FF;
        background-color: #fff;
        font-size: 20px;
        font-weight: 400;
        color: #000;
        &:hover {
          background-color: #48B7FF;
          color: #FFFFFF;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .login_container .login_content {
      box-shadow: unset;
      width: 100%;
    }
    .login_container .registry_content {
      width: 100%;
      height: 100%;
      box-shadow: unset;
      border-radius: 0;
      margin-left: 0;
    }
    .login_container {
      .left_logo {
        display: none;
      }
      .registration_title {
        padding: 20px !important;
        padding-top: 20px !important;
      }
    }

    .login_form_contain .el-form-item .get_code {
      right: 6%;
    }

    .login_container .prize_contain .prize_items .prize_detail {
      width: 40%;
    }
  }
</style>

<style lang="scss">

  .el-input {
    width: 230px;
  }
  .msg_input {
    .el-input--mini .el-input__inner {
      padding-right: 80px;
    }
  }
  .login_container {
    .login_content {
      .el-input {
        width: 360px;
      }
    }
    .registry_content {
      .el-input {
        width: 240px;
      }
    }
  }
  .login_form_contain {
    .el-form-item__label {
      color: #666666;
    }
    .el-form-item {
      position: relative;

      margin-bottom: 5px;
      .get_code {
        position: absolute;
        right: 65px;
        top: 0;
        width: 60px;
        text-align: center;

        font-size: 12px;
        color: #409EFF;
        cursor: pointer;
      }
    }
  }
  .el-form-item__error {
    display: none;
  }

  @media screen and (max-width: 500px) {
    .login_container {
      .registry_content {
        .el-form-item {
          padding-right: 8%;
          .el-input,.el-select {
            width: 100%;
          }
        }
      }
    }
  }
</style>
