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
        roleLevel: this.$api.getDicValues('role.roleLevel'),
        roleSign: this.$api.getDicValues('role.roleSign'),
        formData: {
          formData: {},
          formItem: [{
            key: 'id',
            label: 'ID',
            placeholder: '自动填充',
            value: '',
            readonly: true
            },
            {
              key: 'roleCode',
              label: '角色代码',
              value: ''
            },
            {
              key: 'roleName',
              label: '角色名称',
              value: ''
            },
            {
              key: 'roleLevel',
              label: '角色级别',
              type: 'select',
              option: this.roleLevel,
              value: ''
            },
            {
              key: 'roleSign',
              label: '角色标识',
              type: 'select',
              option: this.roleSign,
              value: ''
            },
            {
              key: 'roleDesc',
              label: '角色描述',
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
            id: this.pwid.id // 申请id
          }
          let data = {
            params
          }
          api.queryDetailPermissionRole(data, (res) => {
            console.log(res)
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
        params.projKey = 0
        let data = {
          params
        }
          // 校验数据
        api.savePermissionRole(data, (res) => {
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
          id: this.pwid.id // 申请id
        }
        let data = {
          params
        }
        api.queryDetailPermissionRole(data, (res) => {
          console.log(res)
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content
          } else {
            window.alert('查詢失败！')
          }
        })
      }
      this.formData.formItem[3].option = this.roleLevel
      this.formData.formItem[4].option = this.roleSign
    }
  }
</script>
