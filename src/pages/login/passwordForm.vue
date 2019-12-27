<template>
  <div>
    <os-form :visible="visible" :disabled="disabled" :dataSource="formData" :title="formTitle" v-on:handle-button="affirm"></os-form>
  </div>
</template>
<script>
  import api from '../../api/'
  export default {
    props: {
      pwid: '',
      disabled: true,
      formType: {
        default() {
          return 'edit'
        }
      },
      _visible: false
    },
    watch: {
      _visible: function(v1) {
        this.visible = v1
      },
      visible(v) {
        this.$parent.formVisible = v
      },
      pwid: function (v2) {
        if (this.pwid === '' || this.pwid.id === '') {
          this.formData.formData = ''
        } else {
          // 校验数据
          let params = {
            applyId: this.pwid.id // 申请id
          }
          api.getSignalApplyById(params, (res) => {
            if (res.status === 0 && res.content !== null) {
              this.formData.formData = res.content
            } else {
              window.alert('查詢失败！')
            }
          })
        }
      }
    },
    data() {
      return {
        visible: false,
        formTitle: '',
        formData: {
          formData: {},
          formItem: [
            {
              key: 'password',
              label: '源密码',
              value: '',
              showPassword: true,
              required: true
            },
            {
              key: 'passwordNew',
              label: '新密码',
              value: '',
              showPassword: true,
              required: true
            },
            {
              key: 'passwordNew2',
              label: '确认密码',
              value: '',
              showPassword: true,
              required: true
            }
          ]
        }
      }
    },
    methods: {
      handleSave() {
        console.log(this.dataForm)
      },
      affirm(v, obj) {
        console.log(obj)
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          if (obj.passwordNew !== obj.passwordNew2) {
            window.alert('两次输入的密码不一致！')
            return
          }
          obj.userId = userInfo.userId
          obj.username = userInfo.username
          // 校验数据
          api.updatePassword(obj, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              // 保存成功
              window.alert('保存成功！')
              this.visible = false
            } else {
              window.alert(res.message)
            }
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      }
    },
    created() {
      if (this.pwid === '' || this.pwid.id === '') {
        this.formData.formData = ''
      } else {
        // 校验数据
        let params = {
          applyId: this.pwid.id // 申请id
        }
        console.log(params)
        api.getSignalApplyById(params, (res) => {
          console.log(res)
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content
          } else {
            window.alert('查詢失败！')
          }
        })
      }
    }
  }
</script>
