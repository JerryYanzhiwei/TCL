import jsonData from '@/config/province.js'

export default {
  methods: {
    /* 手机 */
    validatePhone (str) {
      const reg = /^[1]{1}[\d]{10}$/
      return reg.test(str)
    },
    /* 邮箱 */
    validateEmail (str) {
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      return reg.test(str)
    },
    getUser () {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      return userInfo
    },
    getZone (code) {
      code = Number(code)
      const arr = jsonData.filter((val) => code === val.code)
      return arr[0].matchZone
    },
    getProvince (zone, code) {
      zone = Number(zone)
      code = Number(code)
      const arr = jsonData.filter((val) => zone === val.code)
      const provinceArr = arr[0].province.filter((val) => val.code === code)
      return provinceArr[0].city
    },
    download (head, type, url, data) {
      let fname = ''
      if (head) {
        try {
          fname = head.split(';')[1].split('=')[1]
          const reg = new RegExp('"', 'g')
          fname = fname.replace(reg, '')
          fname = decodeURI(fname)
        } catch (err) {
          console.log('can not get xlsx name')
        }
      }
      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(new Blob([data], { type: type }), fname)
      } else {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fname)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    }
  }
}
