<template>
  <div>
    
    <os-table :showTip="false" :topbar="false" :tableHeight="410" :columnData="columnData" :tableData="tableData"
       :operate="true" :columnOperate="columnOperate">
    </os-table>
    
  </div>
</template>
<script>
  export default {
    props: {
      pwid: ''
    },
    data() {
      return {
        // 表头
        columnData: [{
            prop: 'operationState',
            label: '主单状态',
            align: 'center'
          },
          {
            prop: 'operationTimeStr',
            label: '操作时间',
            align: 'center'
          },
          {
            prop: 'operationUserName',
            label: '操作人',
            align: 'center'
          }
        ],
        // 表格操作按钮
        columnOperate: [],
        tableData: []
      }
    },
    created() {
      console.log(this.pwid)
      this.getList()
    },
    methods: {
      getList() {
        let params = {
          code: this.pwid.wmsOrderCode // 子单号
        }
        console.log(params)
        this.$api.xsrwd.getFindLogs(params, (res) => {
          console.log(res, '日志')
          this.tableData = res.result
        })
      }
    },
    computed: {
      wid() {
        return this.pwid
      }
    },
    watch: {
      wid(v) {
        this.getList()
      }
    }
  }
</script>