<template>
  <div>
    <os-form :visible="visible" :disabled="disabled" :dataSource="formData" :title="formTitle" v-on:handle-button="affirm"></os-form>
  </div>
</template>
<script>
  import api from '../../../api/'
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
            id: this.pwid.id // 申请id
          }
          api.getUserByIdOrName(params, (res) => {
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
          formItem: [{
              key: 'id',
              label: '用户ID',
              value: '',
              readonly: true
            },
            {
              key: 'username',
              label: '用户账号',
              value: '',
              readonly: true
            },
            {
              key: 'refName',
              label: '用户昵称',
              value: ''
            },
            {
              key: 'userType',
              label: '用户类型',
              value: ''
            },
            {
              key: 'email',
              label: '用户邮件',
              value: ''
            },
            {
              key: 'mobile',
              label: '手机号',
              value: ''
            },
            {
              key: 'isVerified',
              label: '是否已验证身份',
              value: ''
            },
            {
              key: 'isAccount',
              label: '是否已绑定MT账号',
              value: ''
            },
            {
              key: 'introducer',
              label: '推荐码',
              value: ''
            },
            {
              key: 'recommend',
              label: '推荐人数',
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
        if (window.localStorage.getItem('nice_user')) {
          // 添加默认用户
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          obj['userId'] = userInfo.userId
        }
        // 校验数据
        api.getUserByIdOrName(obj, (res) => {
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
          id: this.pwid.id // 申请id
        }
        api.getUserByIdOrName(params, (res) => {
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
