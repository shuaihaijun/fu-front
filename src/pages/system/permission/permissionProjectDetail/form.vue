<template>
  <div>
    <os-form :visible="visible" :disabled="disabled" :dataSource="formData" :title="formTitle" v-on:handle-button="affirm" v-on:handle-change="handleChange"></os-form>
  </div>
</template>
<script>
  import api from '../../../../api/'
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
    data() {
      return {
        visible: false,
        formTitle: '',
        formData: {
          formData: {},
          formItem: [{
              key: 'projKey',
              label: '项目工程key',
              placeholder: '自动填充',
              value: '',
              readonly: true
            },
            {
              key: 'userId',
              label: '用户ID',
              value: ''
            },
            {
              key: 'refName',
              label: '用户昵称',
              value: ''
            },
            {
              key: 'email',
              label: '电子邮件',
              value: ''
            }
          ]
        }
      }
    },
    watch: {
      _visible: function(v1) {
        this.visible = v1
        // 手动置空参数
        if (this.pwid === '' || this.pwid.id === '') {
          this.formData.formData = {}
          for (let a = 0; a < this.formData.formItem.length; a++) {
            this.formData.formItem[a].value = ''
          }
        }
      },
      visible(v) {
        this.$parent.formVisible = v
      },
      pwid: function (v2) {
        if (this.pwid === '' || this.pwid.id === '') {
          this.formData.formData = {}
        } else {
          setTimeout(() => {
            this.formData.formItem[0].value = this.pwid.projKey
          }, 0)
        }
      }
    },
    methods: {
      handleSave() {
      },
      affirm(v, obj) {
        let params = obj
        let data = {
          params
        }
          // 校验数据
        api.addPermissionAdmin(data, (res) => {
          if (res.status === 0 && res.content !== null) {
            // 保存成功
            this.$parent.getQuery()
            window.alert('操作成功！')
            this.visible = false
          } else {
            if (res.message) {
              window.alert(res.message)
            } else {
              window.alert('操作失败！请检查数据')
            }
          }
        })
      },
      handleChange(change, key, value) {
        if (key === 'userId') {
          if (!this.nonempty(value)) {
            window.alert('请输入正确的用户ID！')
            return
          }
          this.getRefName(value)
        }
      },
      nonempty: function (value) { // 非空数字验证
        if (!value) {
          return false
        } else {
          var reg = /(^[1-9]\d*$)/
          if (reg.test(value)) {
            return true
          }
          return false
        }
      },
      getRefName(userId) {
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            id: userId // 用户id
          }
          // 初始化账号
          api.getUserByIdOrName(params, (res) => {
            if (res.content !== null) {
              this.formData.formItem[2].value = res.content.refName
            } else {
              this.$message('获取用户信息失败！')
            }
          })
        }
      }
    },
    created() {
      if (this.pwid === '' || this.pwid.id === '') {
        this.formData.formData = {}
      } else {
        setTimeout(() => {
          this.formData.formItem[0].value = this.pwid.projKey
        }, 0)
      }
    }
  }
</script>
