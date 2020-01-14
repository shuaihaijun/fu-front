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
        this.$parent.formVisible = v
      },
      pwid: function (v2) {
        if (this.pwid === '' || this.pwid.id === '') {
          this.formData.formData = {}
        } else {
          // 校验数据
          let params = {
            applyId: this.pwid.id // 申请id
          }
          api.getSignalApplyById(params, (res) => {
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
            key: 'userId',
            label: '申请人ID',
            value: ''
            },
            {
              key: 'signalName',
              label: '信号源名称',
              value: ''
            },
            {
              key: 'serverName',
              label: '服务器名称',
              value: ''
            },
            {
              key: 'mtAccId',
              label: 'MT平台账号',
              value: ''
            },
            {
              key: 'mtPasswordWatch',
              label: '观摩密码',
              value: ''
            },
            {
              key: 'signalCurrency',
              label: '主要交易币种',
              value: ''
            },
            {
              key: 'historyWithdraw',
              label: '历史最大回撤',
              value: ''
            },
            {
              key: 'monthlyAverageIncome',
              label: '月均收益',
              value: ''
            },
            {
              key: 'annualizedExpectedReturn',
              label: '年化预期收益率',
              value: ''
            },
            {
              key: 'email',
              label: '电子邮件',
              value: ''
            },
            {
              key: 'phone',
              label: '电话号码',
              value: ''
            },
            {
              key: 'qqNumber',
              label: 'qq号码',
              value: ''
            },
            {
              key: 'signalTem',
              label: '团队描述',
              value: '',
              type: 'textarea'
            },
            {
              key: 'signalDesc',
              label: '信号源描述',
              value: '',
              type: 'textarea'
            }
          ]
        }
      }
    },
    methods: {
      handleSave() {
        console.log(this.dataForm)
      },
      affirm(v, obj) {
        // 校验数据
        api.saveSignalApply(obj, (res) => {
          console.log(res)
          if (res.status === 0 && res.content.data > 0) {
            // 保存成功
            window.alert('保存成功！')
            this.visible = false
          } else {
            window.alert('保存失败！请检查数据')
          }
        })
      },
      applyAdd() {
        // this.visible = true
        this.formTitle = '信号源信息'
      }
    },
    created() {
      if (this.pwid === '' || this.pwid.id === '') {
        this.formData.formData = ''
      } else {
        // 校验数据
        let params = {
          applyId: this.pwid.id // 申请id
        }
        api.getSignalApplyById(params, (res) => {
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
