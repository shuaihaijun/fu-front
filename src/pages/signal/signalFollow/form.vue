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
      }
    },
    data() {
      return {
        visible: false,
        formTitle: '',
        ruleType: this.$api.getDicValues('follow.ruleType'),
        formData: {
          formData: {},
          formItem: [
            {
              key: 'signalId',
              label: '跟随信号源ID',
              value: ''
            },
            {
              key: 'ruleType',
              label: '规则类型',
              value: '',
              type: 'select',
              option: this.ruleType
            },
            {
              key: 'amount',
              label: '数量(比例/金额/手数)',
              value: ''
            },
            {
              key: 'limitUpperAmount',
              label: '单笔金额上限',
              value: ''
            },
            {
              key: 'accountEquityAmount',
              label: '账户最低安全净值',
              value: ''
            },
            {
              key: 'accountEquityPercentage',
              label: '安全净值百分比',
              value: ''
            },
            {
              key: 'followAlarmAmount',
              label: '预警金额',
              value: ''
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
        if (window.localStorage.getItem('nice_user')) {
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          obj.userId = userInfo.userId // 用户id
          // 校验数据
          api.signalFollowsSaveOrUpdate(obj, (res) => {
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
      applyAdd() {
        // this.visible = true
        this.formTitle = '信号源信息'
      }
    },
    created() {
      this.formData.formItem[1].option = this.ruleType
    }
  }
</script>
