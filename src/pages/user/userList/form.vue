<template>
  <div>
    <os-form :visible="visible" :disabled="disabled" :height="'15%'" :dataSource="formData" :title="formTitle" v-on:handle-button="affirm"></os-form>
  </div>
</template>
<script>
  import api from '../../../api/'
  export default {
    props: {
      pwid: '',
      disabled: true,
      height: '15%',
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
            id: this.pwid.id // 用户
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
              disabled: true
            },
            {
              key: 'refName',
              label: '用户昵称',
              value: '',
              disabled: true
            },
            {
              key: 'realName',
              label: '用户姓名',
              value: '',
              disabled: true
            },
            {
              key: 'introducer',
              label: '推荐码',
              value: ''
            }
          ]
        }
      }
    },
    methods: {
      handleSave() {
      },
      affirm(v, obj) {
        // 校验数据
        let params = obj
        let data = {
          params
        }
        api.updateUserIntroducer(data, (res) => {
          if (res.status === 0 && res.content !== null) {
            // 保存成功
            window.alert('修改成功！')
            this.visible = false
          } else {
            window.alert(res.message)
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
