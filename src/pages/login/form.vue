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
              key: 'introducer',
              label: '介绍人ID',
              required: true,
              value: ''
            },
            {
              key: 'username',
              label: '登录名',
              value: '',
              required: true
            },
            {
              key: 'password',
              label: '密码',
              value: '',
              showPassword: true,
              required: true
            },
            {
              key: 'password2',
              label: '确认密码',
              value: '',
              showPassword: true,
              required: true
            },
            {
              key: 'refName',
              label: '昵称',
              value: '',
              required: true
            },
            {
              key: 'mobile',
              label: '手机号',
              value: '',
              required: true
            },
            {
              key: 'sex',
              label: '性别',
              value: '',
              type: 'select',
              required: true,
              option: [{
                dicValue: '女',
                dicKey: 0
              }, {
                dicValue: '男',
                dicKey: 1
              }]
            },
            {
              key: 'email',
              label: '电子邮件',
              value: '',
              required: true
            },
            {
              key: 'province',
              label: '省份',
              value: ''
            },
            {
              key: 'city',
              label: '城市',
              value: ''
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
        // 校验数据
        api.registered(obj, (res) => {
          if (res.status === 0 && res.content.data !== '') {
            // 保存成功
            window.alert('保存成功！')
            this.visible = false
          } else {
            window.alert('保存失败！请检查数据')
          }
        })
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
