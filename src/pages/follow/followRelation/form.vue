<template>
  <div>
    <os-form :visible="visible" :disabled="disabled" :dataSource="formData" :title="formTitle" v-on:handle-button="affirm" v-on:handle-change="handleChange"></os-form>
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
          this.formData.formData = ''
        } else {
          // 校验数据
          let params = {
            id: this.pwid.id // 申请id
          }
          let data = {
            params
          }
          api.getSignalFollowByCondition(data, (res) => {
            if (res.status === 0 && res.content !== null) {
              this.formData.formData = res.content
              setTimeout(() => {
                this.setUserName(res.content.userId)
                this.setSignalName(res.content.signalId)
              }, 0)
            } else {
              window.alert('查詢失败！')
            }
          })
        }
        this.formData.formItem[6].option = this.followDirect
        this.formData.formItem[4].option = this.ruleType
      }
    },
    data() {
      return {
        visible: false,
        formTitle: '',
        ruleType: this.$api.getDicValues('follow.ruleType'),
        followDirect: this.$api.getDicValues('follow.direct'),
        formData: {
          formData: {},
          formItem: [
            {
              key: 'signalId',
              label: '跟随信号源ID',
              required: true,
              value: ''
            },
            {
              key: 'signalName',
              label: '信号源名称',
              value: '',
              placeholder: '自动获取',
              readonly: true
            },
            {
              key: 'userId',
              label: '用户ID',
              required: true,
              value: ''
            },
            {
              key: 'userRefName',
              label: '用户昵称',
              value: '',
              placeholder: '自动获取',
              readonly: true
            },
            {
              key: 'userMtAccId',
              label: '用户Mt账号',
              value: '',
              required: true,
              type: 'select',
              option: [{}]
            },
            {
              key: 'followDirect',
              label: '跟随方向',
              value: '',
              required: true,
              type: 'select',
              option: this.followDirect
            },
            {
              key: 'followType',
              label: '规则类型',
              required: true,
              value: '',
              type: 'select',
              option: this.ruleType
            },
            {
              key: 'followAmount',
              label: '数量/系数',
              placeholder: '比例系数/固定金额/固定手数',
              required: true,
              value: ''
            },
            {
              key: 'followMinHands',
              label: '最小跟单手数',
              placeholder: '默认不设限制',
              value: ''
            },
            {
              key: 'followMaxHands',
              label: '最大跟单手数',
              placeholder: '默认不设限制',
              value: ''
            },
            {
              key: 'followMinAmount',
              label: '最小跟单金额',
              placeholder: '默认不设限制',
              value: ''
            },
            {
              key: 'followMaxAmount',
              label: '最大跟单金额',
              placeholder: '默认不设限制',
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
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          if (userInfo.userType < 8 || userInfo.userType > 10) {
            // 管理者
            this.formData.formItem[2].value = userInfo.userId
            this.formData.formItem[2].readonly = true
          }
          // 校验数据
          if (!this.checkConfirmData()) {
            return
          }
          // 提交请求
          api.signalFollowsSaveOrUpdate(obj, (res) => {
            if (res.status === 0 && res.content !== null) {
              // 保存成功
              window.alert('保存成功！')
              this.visible = false
            } else {
              window.alert(res.message)
            }
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      checkConfirmData: function() {
        let signalId = this.formData.formItem[0].value
        let userId = this.formData.formItem[2].value
        let ruleType = this.formData.formItem[6].value
        let followAmount = this.formData.formItem[7].value
        let followMinHands = this.formData.formItem[8].value
        let followMaxHands = this.formData.formItem[9].value
        let followMinAmount = this.formData.formItem[10].value
        let followMaxAmount = this.formData.formItem[11].value
        if (!this.nonempty(userId)) {
          window.alert('请输入正确的用户ID')
          return false
        }
        if (!this.nonempty(signalId)) {
          window.alert('请输入正确的信号源ID')
          return false
        }
        if (followMinHands) {
          if (!this.checkDecimals(followMinHands)) {
            window.alert('请输入正确的最小跟单手数 需要大于0.01,且保留两位小数')
            return false
          }
          if (followMinHands > 1) {
            window.alert('请输入正确的最小跟单手数 需要小于等于1,且保留两位小数')
            return false
          }
        }
        if (followMaxHands) {
          if (!this.checkDecimals(followMaxHands)) {
            window.alert('请输入正确的最大跟单手数 需要大于0.01,且保留两位小数')
            return false
          }
        }
        if (followMinAmount) {
          if (!this.checkDecimals(followMinAmount)) {
            window.alert('请输入正确的最小跟单金额')
            return false
          }
        }
        if (followMaxAmount) {
          if (!this.checkDecimals(followMaxAmount)) {
            window.alert('请输入正确的最大跟单金额')
            return false
          }
        }
        if (followMinHands && followMaxHands) {
          if (followMinHands > followMaxHands) {
            window.alert('最大跟单手数 需要 大于 最小跟单手数')
            return false
          }
        }
        if (followMinAmount && followMaxAmount) {
          if (followMinAmount > followMaxAmount) {
            window.alert('最大跟单金额 需要 大于 最小跟单金额')
            return false
          }
        }
        if (!this.checkDecimals(followAmount)) {
          window.alert('请输入正确的数量/系数！')
          return false
        }
        if (ruleType === 0) {
          if (followAmount > 1 || followAmount < 0.01) {
            window.alert('请输入正确的数量，按比例跟单 数量不能大于1 或 小于0.01')
            return false
          }
        }
        if (ruleType === 1) {
          if (followAmount < 1) {
            window.alert('请输入正确的数量！按固定金额跟单 数量不能过小')
            return false
          }
        }
        if (ruleType === 2) {
          if (followAmount < 0.01) {
            window.alert('请输入正确的数量！按固定手数跟单 数量不能小于0.01')
            return false
          }
        }
        return true
      },
      handleChange(change, key, value) {
        if (key === 'userId') {
          if (!this.nonempty(value)) {
            window.alert('请输入正确的用户ID！')
            return
          }
          this.getMTAccount(value)
        }
        if (key === 'signalId') {
          if (!this.nonempty(value)) {
            window.alert('请输入正确的信号源ID！')
            return
          }
          this.setSignalName(value)
        }
        if (key === 'followAmount') {
          if (!this.checkDecimals(value)) {
            window.alert('请输入正确的数量/系数！')
            return
          }
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
              this.formData.formItem[3].value = res.content.data[0].refName
              this.formData.formItem[4].option = object
            } else {
              this.$message('获取用户账户信息失败！')
            }
          })
        }
      },
      setUserName(userId) {
        let params = {
          id: userId
        }
        api.getUserByIdOrName(params, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.formData.formItem[3].value = res.content.refName
          } else {
            window.alert('请输入正确的用户ID！')
          }
        })
      },
      setSignalName(signalId) {
        let params = {
          signalId: signalId
        }
        api.findSignalById(params, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.formData.formItem[1].value = res.content.signalName
          } else {
            window.alert('请输入正确的信号源ID！')
          }
        })
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
      },
      nonempty: function (value) { // 非空数字验证
        if (!value) {
          return false
        } else {
          var reg = /(^[1-9]\d*$)/
          if (reg.test(value)) {
            return true
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
          id: this.pwid.id // 申请id
        }
        let data = {
          params
        }
        api.getSignalFollowByCondition(data, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content
            setTimeout(() => {
              this.setUserName(res.content.userId)
              this.setSignalName(res.content.signalId)
            }, 0)
          } else {
            window.alert('查詢失败！')
          }
        })
      }
      this.formData.formItem[6].option = this.ruleType
      this.formData.formItem[5].option = this.followDirect
    }
  }
</script>
