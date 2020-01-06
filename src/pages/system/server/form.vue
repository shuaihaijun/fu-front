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
              placeholder: '自动填充',
              readonly: true
            },
            {
              key: 'brokerName',
              label: '经纪商名称',
              value: '',
              type: 'select',
              option: [{}],
              required: true
            },
            {
              key: 'serverName',
              label: '服务器名称',
              value: '',
              required: true
            },
            {
              key: 'serverIp',
              label: '服务器IP地址',
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
          api.findServerById(params, (res) => {
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
      getBrokerInfo() {
        if (window.localStorage.getItem('nice_user')) {
          let params = {}
          let data = {
            params
          }
          // 初始化账号
          api.queryComBroker(data, (res) => {
            if (res.content !== null && res.content.data !== null) {
              if (res.content.data.length === 0) {
                this.$message('获取经纪商信息失败！')
              }
              let object = []
              // 重组数据
              for (let index = 0; index < res.content.data.length; index++) {
                let object1 = {}
                object1.dicValue = res.content.data[index].brokerName
                object1.dicKey = res.content.data[index].brokerName
                object[index] = object1
              }
              this.mtAccountInfo = res.content.data
              this.formData.formItem[1].option = object
            } else {
              this.$message('获取用户账户信息失败！')
            }
          })
        }
      },
      affirm(v, obj) {
        // 校验数据
        api.saveServer(obj, (res) => {
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
        api.findServerById(params, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content
          } else {
            window.alert('查詢失败！')
          }
        })
      }
      this.getBrokerInfo()
    }
  }
</script>
