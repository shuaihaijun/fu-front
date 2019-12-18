<template>
  <div>
    <os-form :visible="visible" :disabled="disabled" :dataSource="formData" :title="formTitle" v-on:handle-button="affirm"></os-form>
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
              key: 'userId',
              label: '用户ID',
              value: '',
              readonly: true
            },
            {
              key: 'roleId',
              label: '角色ID',
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
          // 校验数据
          let params = {
            userId: this.pwid.userId, // 申请id
            roleId: this.pwid.roleId // 申请id
          }
          api.queryPermissionUserRole(params, (res) => {
            if (res.status === 0 && res.content !== null) {
              this.formData.formData = res.content
            } else {
              window.alert('查詢失败！')
            }
          })
        }
      }
    },
    methods: {
      handleSave() {
        console.log(this.dataForm)
      },
      affirm(v, obj) {
        let params = obj
        let roleIds = []
        roleIds[0] = params.roleId
        params.projKey = 0
        params.roleIds = roleIds
        let data = {
          params
        }
          // 校验数据
        api.savePermissionUserRole(data, (res) => {
          if (res.status === 0 && res.content !== null) {
            // 保存成功
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
      }
    },
    created() {
      if (this.pwid === '' || this.pwid.id === '') {
        this.formData.formData = {}
      } else {
        // 校验数据
        let params = {
          userId: this.pwid.userId, // 申请id
          roleId: this.pwid.roleId // 申请id
        }
        api.queryPermissionUserRole(params, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content.data[0]
          } else {
            window.alert('查詢失败！')
          }
        })
      }
    }
  }
</script>
