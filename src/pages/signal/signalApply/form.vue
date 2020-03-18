<template>
  <div>
    <div>
      <os-form :visible="visible" :disabled="disabled" :dataSource="formData" :title="formTitle" v-on:handle-button="affirm" v-on:handle-change="handleChange"></os-form>
    </div>
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
          this.getMTAccount(this.pwid.userId)
        }
      }
    },
    data() {
      return {
        visible: false,
        formTitle: '',
        mtAccountInfo: [],
        formData: {
          formData: {},
          formItem: [{
              key: 'id',
              label: '申请ID',
              value: '',
              placeholder: '自动获取',
              readonly: true
            },
            {
              key: 'userId',
              label: '申请人ID',
              required: true,
              value: ''
            },
            {
              key: 'mtAccountInfo',
              label: 'MT账户信息',
              value: '',
              required: true,
              type: 'select',
              option: [{}]
            },
            {
              key: 'brokerName',
              label: '经纪商名称',
              value: '',
              placeholder: '自动获取',
              readonly: true
            },
            {
              key: 'serverName',
              label: '服务器名称',
              value: '',
              placeholder: '自动获取',
              readonly: true
            },
            {
              key: 'mtAccId',
              label: 'MT平台账号',
              value: '',
              placeholder: '自动获取',
              readonly: true
            },
            {
              key: 'mtPasswordWatch',
              label: '观摩密码',
              value: '',
              required: true,
              placeholder: '自动获取',
              readonly: true
            },
            {
              key: 'signalName',
              label: '信号源名称',
              required: true,
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
              required: true,
              value: ''
            },
            {
              key: 'phone',
              label: '电话号码',
              required: true,
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
              required: true,
              type: 'textarea'
            },
            {
              key: 'signalDesc',
              label: '信号源描述',
              required: true,
              value: '',
              type: 'textarea'
            }
          ]
        }
      }
    },
    methods: {
      handleSave() {
      },
      handleChange(change, key, value) {
        if (key === 'userId') {
          this.getMTAccount(value)
          this.formData.formItem[3].value = ''
          this.formData.formItem[4].value = ''
          this.formData.formItem[5].value = ''
          this.formData.formItem[6].value = ''
        }
        if (key === 'historyWithdraw') {
          if (!this.checkDecimals(value)) {
            window.alert('历史最大回撤为数字 保留两位小数！')
            return
          }
        }
        if (key === 'monthlyAverageIncome') {
          if (!this.checkDecimals(value)) {
            window.alert('月均收益为数字 保留两位小数！')
            return
          }
        }
        if (key === 'annualizedExpectedReturn') {
          if (!this.checkDecimals(value)) {
            window.alert('年化预期收益率为数字 保留两位小数！')
            return
          }
        }
        if (key === 'mtAccountInfo') {
          for (let index = 0; index < this.mtAccountInfo.length; index++) {
            if (value === this.mtAccountInfo[index].accountId) {
              this.formData.formItem[3].value = this.mtAccountInfo[index].brokerName
              this.formData.formItem[4].value = this.mtAccountInfo[index].serverName
              this.formData.formItem[5].value = this.mtAccountInfo[index].mtAccId
              this.formData.formItem[6].value = this.mtAccountInfo[index].mtPasswordWatch
            }
          }
        }
      },
      affirm(v, obj) {
        if (window.localStorage.getItem('nice_user')) {
          // let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          // obj.userId = userInfo.userId // 用户id
          // 校验数据
          api.signalApplySaveOrUpdate(obj, (res) => {
            if (res.status === 0 && res.content !== null && res.content.data !== '') {
              // 保存成功
              window.alert('保存成功！')
              this.visible = false
            } else {
              window.alert('保存失败！请检查数据')
            }
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      getMTAccount(userId) {
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            userId: userId, // 用户id
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          // 初始化账号
          api.getUsersMtAccountByCondition(params, (res) => {
            if (res.content !== null && res.content.data !== null) {
              if (res.content.data.length === 0) {
                this.$message('获取用户账户信息失败！')
              }
              let object = []
              // 重组数据
              for (let index = 0; index < res.content.data.length; index++) {
                let object1 = {}
                object1.dicValue = res.content.data[index].mtAccId
                object1.dicKey = res.content.data[index].accountId
                object[index] = object1
              }
              this.mtAccountInfo = res.content.data
              this.formData.formItem[2].option = object
            } else {
              this.$message('获取用户账户信息失败！')
            }
          })
        }
      },
      checkDecimals: function (value) { // 非空数字验证保留两位小数
        if (!value) {
          return false
        } else {
          if (value === 0 || value === '0') {
            return false
          } else {
            var reg = /^\d+\.?\d{0,2}$/
            if (reg.test(value)) {
              return true
            }
          }
          return false
        }
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
        this.getMTAccount(this.pwid.userId)
      }
    }
  }
</script>
