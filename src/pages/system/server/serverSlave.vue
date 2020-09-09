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
        this.$parent.slaveVisible = v
      },
      pwid: function (v2) {
        if (this.pwid === '' || this.pwid.id === '') {
          this.formData.formData = {}
          this.formData.formItem = {}
        } else {
          this.formData.formData.serverName = this.pwid.serverName
          this.formData.formItem[0].value = this.pwid.serverName
          // 校验数据
          let params = {
            serverName: this.pwid.serverName // 申请id
          }
          let data = {
            params
          }
          api.getSlaveByServerName(data, (res) => {
            if (res.status === 0 && res.content !== null) {
              this.formData.formData = res.content
              this.formData.formItem[0].value = res.content.serverName
              this.formData.formItem[1].value = res.content.serverSlaveName
            } else {
              this.formData.formItem[1].value = ''
              this.formData.formData.serverSlaveName = ''
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
              key: 'serverName',
              label: '服务器名称',
              value: '',
              readonly: true
            },
            {
              key: 'serverSlaveName',
              label: '从服务器名称',
              value: ''
            }
          ]
        }
      }
    },
    methods: {
      affirm(v, obj) {
        // 校验数据
        if (obj.serverName === null || obj.serverSlaveName === null || obj.serverSlaveName === undefined) {
          window.alert('请填写从服务器名称！')
          return
        }
        obj.id = this.formData.formData.id
        let params = obj
        let data = {
          params
        }
        api.serverSlaveSaveOrUpdate(data, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.visible = false
            window.alert('保存成功！')
          } else {
            window.alert(res.message)
          }
        })
      },
      applyAdd() {
        // this.visible = true
        this.formTitle = '信号源信息'
      }

    },
    created() {
      // 校验数据
      this.formData.formData.serverName = this.pwid.serverName
      let params = {
        serverName: this.pwid.serverName // 申请id
      }
      let data = {
        params
      }
      api.getSlaveByServerName(data, (res) => {
        if (res.status === 0 && res.content !== null) {
          this.formData.formData = res.content
        } else {
          this.formData.formData.serverSlaveName = ''
        }
      })
    }
  }
</script>
