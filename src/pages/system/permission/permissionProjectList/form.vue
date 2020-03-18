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
        projectType: this.$api.getDicValues('permission.projectType'),
        formTitle: '',
        formData: {
          formData: {},
          formItem: [{
              key: 'id',
              label: 'ID',
              value: '',
              placeholder: '自动填充',
              readonly: true
            },
            {
              key: 'projType',
              label: '项目团队类型',
              type: 'select',
              option: this.permissionProject,
              value: ''
            },
            {
              key: 'projName',
              label: '项目团队名称',
              value: '',
              required: true
            },
            {
              key: 'projKey',
              label: '项目团队key',
              value: '',
              required: true
            },
            {
              key: 'projSlogan',
              label: '项目团队标语',
              value: ''
            },
            {
              key: 'projDesc',
              label: '项目团队描述',
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
          api.getPermissionProject(data, (res) => {
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
      },
      affirm(v, obj) {
        // 校验数据
        let data = {
          params: obj
        }
        if (this.pwid === '' || this.pwid.id === '') {
          api.savePermissionProject(data, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              // 保存成功
              this.$parent.getQuery()
              window.alert('操作成功！')
              this.visible = false
            } else {
              window.alert(res.message)
            }
          })
        } else {
          api.modifyPermissionProject(data, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              // 保存成功
              this.$parent.getQuery()
              window.alert('操作成功！')
              this.visible = false
            } else {
              window.alert(res.message)
            }
          })
        }
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
        api.getPermissionProject(data, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content
          } else {
            window.alert('查詢失败！')
          }
        })
      }
      this.formData.formItem[1].option = this.projectType
    }
  }
</script>
