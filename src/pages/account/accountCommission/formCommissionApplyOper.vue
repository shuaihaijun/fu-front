<template>
  <div>
    <os-form :visible="visible" :height="'15%'" :disabled="disabled" :dataSource="formData" :title="formTitle" v-on:handle-button="affirm"></os-form>
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
    data() {
      return {
        visible: false,
        editAble: false,
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
              key: 'withdrawAmount',
              label: '提取金额',
              value: ''
            }
          ]
        }
      }
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
          this.formData.formData.userId = this.UsInfo.userId
        } else if ((this.pwid.id === 'undefined' || this.pwid.id === undefined) && this.pwid.userId !== '') {
          this.formData.formData.userId = this.pwid.userId
        } else {
          // 校验数据
          let params = {
            id: this.pwid.id // 申请id
          }
          let data = {
            params
          }
          api.findCommissonWithdrawApplyById(data, (res) => {
            if (res.status === 0 && res.content !== null) {
              this.formData.formData = res.content
            } else {
              window.alert('查詢失败！')
            }
          })
          this.editAble = true
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
          obj['applyUserId'] = userInfo.userId
          if (this.editAble) {
            obj['id'] = this.pwid.id
            // 修改数据
            let data = {
              params: obj
            }
            api.commissonWithdrawApplyUpdate(data, (res) => {
              if (res.status === 0 && res.content.data !== '') {
                // 保存成功
                window.alert('操作成功！')
                this.$parent.getQuery()
                this.visible = false
              } else {
                window.alert(res.message)
              }
            })
          } else {
            // 保存数据
            let data = {
              params: obj
            }
            api.commissonWithdrawApplySave(data, (res) => {
              if (res.status === 0 && res.content.data !== '') {
                // 保存成功
                window.alert('保存成功！')
                this.$parent.getQuery()
                this.visible = false
              } else {
                window.alert(res.message)
              }
            })
          }
        } else {
          this.$message('获取用户信息失败！')
        }
      }
    },
    created() {
      if (this.pwid === '' || this.pwid.id === '') {
        this.formData.formData.userId = this.UsInfo.userId
      } else if ((this.pwid.id === 'undefined' || this.pwid.id === undefined) && this.pwid.userId !== '') {
        this.formData.formData.userId = this.pwid.userId
      } else {
        // 校验数据
        let params = {
          id: this.pwid.id // 申请id
        }
        let data = {
          params
        }
        api.findCommissonWithdrawApplyById(data, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content
          } else {
            window.alert('查詢失败！')
          }
        })
        this.editAble = true
      }
    }
  }
</script>
