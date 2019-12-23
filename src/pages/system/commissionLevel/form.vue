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
        commissionType: this.$api.getDicValues('commissionLevel.commissionType'),
        orderType: this.$api.getDicValues('commissionLevel.orderType'),
        commissionUserType: this.$api.getDicValues('user.userType'),
        commissionUserLevel: this.$api.getDicValues('commissionLevel.userLevel'),
        rateType: this.$api.getDicValues('commissionLevel.rateType'),
        formData: {
          formData: {},
          formItem: [{
              key: 'id',
              label: 'ID',
              placeholder: '自动填充',
              value: '',
              readonly: true
            },
            {
              key: 'levelName',
              label: '佣金规则名称',
              value: '',
              type: ''
            },
            {
              key: 'commissionType',
              label: '佣金类型',
              value: '',
              type: 'select',
              option: this.commissionType
            },
            {
              key: 'orderType',
              label: '订单类型',
              value: '',
              type: 'select',
              option: this.orderType
            },
            {
              key: 'commissionUserType',
              label: '收佣用户类型',
              value: '',
              type: 'select',
              option: this.commissionUserType
            },
            {
              key: 'commissionUserLevel',
              label: '返佣等级',
              value: '',
              type: 'select',
              option: this.commissionUserLevel
            },
            {
              key: 'rateType',
              label: '比率计算类型',
              value: '',
              type: 'select',
              option: this.rateType
            },
            {
              key: 'rate',
              label: '返佣比率',
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
          let data = {
            params
          }
          api.getPermissionResource(data, (res) => {
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
        let data = {
          params: obj
        }
        if (obj.id != null) {
          api.upateCommissonLevel(data, (res) => {
            if (res.status === 0) {
              // 保存成功
              window.alert('操作成功！')
              this.visible = false
            } else {
              window.alert('操作失败！请检查数据')
            }
          })
        } else {
          // 校验数据
          api.saveCommissonLevel(data, (res) => {
            if (res.status === 0) {
              // 保存成功
              window.alert('操作成功！')
              this.visible = false
            } else {
              window.alert('操作失败！请检查数据')
            }
          })
        }
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
        api.getCommissonLevelById(data, (res) => {
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content
          } else {
            window.alert('查詢失败！')
          }
        })
      }
      this.formData.formItem[2].option = this.commissionType
      this.formData.formItem[3].option = this.orderType
      this.formData.formItem[4].option = this.commissionUserType
      this.formData.formItem[5].option = this.commissionUserLevel
      this.formData.formItem[6].option = this.rateType
    }
  }
</script>
