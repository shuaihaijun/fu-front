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
        this.$parent.formOrderVisible = v
      },
      pwid: function (v2) {
        if (this.pwid === '' || this.pwid.id === '') {
          this.formData.formData = {}
        } else {
          // 校验数据
          let params = {
            signalId: this.pwid.id // 申请id
          }
          api.findSignalById(params, (res) => {
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
          formItem: [
            {
              key: 'id',
              label: '信号源ID',
              value: '',
              readonly: true
            },
            {
              key: 'signalName',
              label: '信号源名称',
              value: '',
              readonly: true
            },
            {
              key: 'orderCloseDate',
              label: '平仓时间',
              width: 200,
              value: '',
              type: 'datetimerange'
            }
          ]
        }
      }
    },
    methods: {
      affirm(v, obj) {
        // 校验数据
        if (obj.id === null || obj.signalName === null) {
          window.alert('信号源信息错误，请重试！')
          return
        }
        if (obj.orderCloseDate === null || obj.orderCloseDate === '' || obj.orderCloseDate === undefined) {
          window.alert('请输入时间！')
          return
        }
        // let params = obj
        // params.signalId = obj.id
        // let data = {
        //   params
        // }
        // const loading = this.$loading({
        //   lock: true,
        //   text: '需要几分钟  请耐心等待Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)',
        //   target: document.querySelector('.div1')
        // })
        // api.synSignalHistoryOrder(data, (res) => {
        //   loading.close()
        //   if (res.content !== null && res.content.status === 0) {
        //     // 保存成功
        //     this.visible = false
        //     window.alert('成功！')
        //   } else {
        //     window.alert(res.msg)
        //   }
        // })
      },
      applyAdd() {
        // this.visible = true
        this.formTitle = '信号源信息'
      }

    },
    created() {
      // 校验数据
      let params = {
        signalId: this.pwid.id // 申请id
      }
      api.findSignalById(params, (res) => {
        if (res.status === 0 && res.content !== null) {
          this.formData.formData = res.content
        } else {
          window.alert('查詢失败！')
        }
      })
    }
  }
</script>
