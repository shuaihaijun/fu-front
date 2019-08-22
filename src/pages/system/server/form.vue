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
    data() {
      return {
        visible: false,
        formTitle: '',
        formData: {
          formData: {},
          formItem: [{
            key: 'id',
            label: 'ID',
            value: '',
            readonly: true
            },
            {
              key: 'serverName',
              label: '服务器名称',
              value: ''
            },
            {
              key: 'brokerName',
              label: '代理名称',
              value: ''
            },
            {
              key: 'serverIp',
              label: '服务器IP',
              value: ''
            },
            {
              key: 'serverPort',
              label: '服务器端口',
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
          console.log(params)
          api.getDictionaryById(params, (res) => {
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
        console.log(obj)
        // 校验数据
        api.saveServer(obj, (res) => {
          console.log(res)
          if (res.status === 0 && res.content.data !== '') {
            // 保存成功
            window.alert('操作成功！')
            this.visible = false
          } else {
            window.alert('操作失败！请检查数据')
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
        console.log(params)
        api.findServerById(params, (res) => {
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
