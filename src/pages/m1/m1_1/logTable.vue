<template>
  <div>
    
    <os-table :showTip="false" :topbar="false" :tableHeight="420" :columnData="columnData" :tableData="tableData"
       :operate="true" :columnOperate="columnOperate" @click-operate="handleOperate">
    </os-table>
    
    <os-pag :pageTotal="pageDataTotal"></os-pag>
    
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
            prop: 'wid',
            label: '序号',
            width: '60',
            align: 'center'
          },
          {
            prop: 'modifyPersonName',
            label: '更新人',
            width: '100',
            align: 'center'
          },
          {
            prop: 'modifyTimeStr',
            label: '更新时间',
            width: '180',
            align: 'center'
          },
          {
            prop: 'modifyContext',
            label: '更新内容',
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
        let params = {
          wid: this.wid,
          pageSize: this.pageDataSize,
          pageNum: this.pageDataNum
        }
        this.$api.CKXX.getLog(params, (res) => {
          this.tableData = res.result.list
          this.pageDataTotal = res.result.total
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
