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
        brokerType: this.$api.getDicValues('broker.brokerType'),
        formData: {
          formData: {},
          formItem: [{
              key: 'id',
              label: '经纪商ID',
              value: '',
              placeholder: '自动填充',
              readonly: true
            },
            {
              key: 'brokerName',
              label: '经纪商名称',
              placeholder: '填写经纪商名称代码',
              value: '',
              required: true
            },
            {
              key: 'brokerType',
              label: '经纪商类型',
              value: '',
              type: 'select',
              option: this.brokerType,
              required: true
            },
            {
              key: 'comment',
              label: '经纪商说明',
              placeholder: '填写经纪商说明',
              value: '',
              required: true
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
          api.findComBrokerById(data, (res) => {
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
        // 校验数据
        let params = obj
        let data = {
          params
        }
        api.saveComBroker(data, (res) => {
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
        let data = {
          params
        }
        api.findComBrokerById(data, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content
          } else {
            window.alert('查詢失败！')
          }
        })
      }
      this.formData.formItem[2].option = this.brokerType
    }
  }
</script>
