<template>
  <div>
    
    <os-table :showTip="false" :topbar="false" :tableHeight="410" :columnData="columnData" :tableData="tableData"
       :operate="true" :columnOperate="columnOperate" @click-operate="handleOperate">
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
            prop: 'rowNumber',
            label: '序号',
            width: '60',
            align: 'center'
          },
          {
            prop: 'modifyTimeStr',
            label: '时间',
            align: 'center'
          },
          {
            prop: 'modifyPersonName',
            label: '操作人',
            width: '180',
            align: 'center'
          },
          {
            prop: 'stateStr',
            label: '状态',
            align: '',
            width: '100'
          },
          {
            prop: 'modifyContext',
            label: '内容',
            width: '',
            align: ''
          }
        ],
        // 表格操作按钮
        columnOperate: [{
          label: '操作',
          fixed: 'right',
          width: '100px',
          children: [{
            iconClass: 'el-icon-view',
            name: '查看详情'
          }]
        }],
        tableData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        console.log(this.pwid)
        let params = {
          modifyIdentification: this.pwid.wmsOrderCode,
          modifyType: 2
        }
        console.log(params)
        this.$api.ycddjk.getLogList(params, (res) => {
          this.tableData = res.result
          console.log(res)
        })
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getList()
      },
      // 查看详情
      handleOperate(row, index, name) {
        this.$emit('click-operate', row.wid)
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