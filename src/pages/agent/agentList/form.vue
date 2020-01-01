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
          this.formData.formData = ''
        } else {
          // 校验数据
          let params = {
            id: this.pwid.id // 申请id
          }
          api.getAgentApplyById(params, (res) => {
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
    data() {
      return {
        visible: false,
        formTitle: '',
        agentType: this.$api.getDicValues('agent.agentType'),
        formData: {
          formData: {},
          formItem: [{
              key: 'id',
              label: '申请ID',
              value: '',
              readonly: true
            },
            {
              key: 'userId',
              label: '申请人ID',
              value: ''
            },
            {
              key: 'agentName',
              label: '代理名称',
              value: ''
            },
            {
              key: 'agentType',
              label: '代理类型',
              value: '',
              type: 'select',
              option: this.agentType
            },
            {
              key: 'applyDesc',
              label: '代理描述',
              value: '',
              type: 'textarea'
            },
            {
              key: 'applyReason',
              label: '申请原由',
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
        if (window.localStorage.getItem('nice_user')) {
          // 添加默认用户
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          obj['userId'] = userInfo.userId
        }
        console.log(obj)
        // 校验数据
        api.saveAgentApply(obj, (res) => {
          console.log(res)
          if (res.status === 0 && res.content.data !== '') {
            // 保存成功
            window.alert('保存成功！')
            this.visible = false
          } else {
            window.alert('保存失败！请检查数据')
          }
        })
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
        console.log(params)
        api.getAgentApplyById(params, (res) => {
          console.log(res)
          if (res.status === 0 && res.content !== null) {
            this.formData.formData = res.content
          } else {
            window.alert('查詢失败！')
          }
        })
      }
      this.formData.formItem[3].option = this.agentType
    }
  }
</script>
