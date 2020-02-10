<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>
    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="viewAddTabUser">
      <div slot="r">
        <el-button @click="checkPass(1)"><i class="el-icon-check"></i> 审核通过</el-button>
        <el-button @click="checkPass(0)"><i class="el-icon-close"></i> 审核驳回</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>
  </div>
</template>
<script>
  import api from '../../../api/'
  import { MessageBox } from 'element-ui'

  export default {
    data() {
      return {
        show: false,
        LogWid: '',
        dialogVisible: false,
        formTitle: '',
        applyState: this.$api.getDicValues('com.applyState'),
        disabled: true,
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
            key: 'userId',
            label: '',
            value: null,
            placeholder: '用户ID',
            width: 180,
            type: ''
            },
            {
              key: 'applyUserId',
              label: '',
              value: null,
              placeholder: '申请人ID',
              width: 180
            },
            {
              key: 'applyState',
              label: '',
              value: null,
              placeholder: '申请状态',
              width: 180,
              type: 'select',
              option: this.applyState
            },
            {
              key: 'applyDate',
              label: '',
              value: null,
              placeholder: '申请时间',
              width: 200,
              type: 'datetimerange'
            },
            {
              key: 'checkDate',
              label: '',
              value: null,
              placeholder: '审核时间',
              width: 200,
              type: 'datetimerange'
            }]
        },
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '80px',
            fixed: 'left',
            isBtn: true,
            children: [{
                iconClass: 'el-icon-view',
                name: '详情',
                show: 'IsBtn2',
                isBtn: true
              }
            ]
          }
        ],
        // 表头
        columnData: [
          {
            prop: 'userId',
            label: '用户ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'applyUserId',
            label: '申请人ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'username',
            label: '用户账号',
            width: '90',
            align: 'center'
          },
          {
            prop: 'refName',
            label: '用户昵称',
            width: '90',
            align: 'center'
          },
          {
            prop: 'accountId',
            label: '账户ID',
            width: '150',
            align: 'center'
          },
          {
            prop: 'applyState',
            label: '申请状态',
            width: '100',
            formatter: true,
            columnKey: 'com.applyState',
            align: 'center'
          },
          {
            prop: 'withdrawAmount',
            label: '提取金额',
            width: '100',
            align: 'center'
          },
          {
            prop: 'applyDate',
            label: '申请日期',
            width: '',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'checkDate',
            label: '审核日期',
            width: '100',
            dateFormat: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'bankName',
            label: '银行名称',
            width: '100',
            align: 'center'
          },
          {
            prop: 'bankCode',
            label: '银行卡号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'hostName',
            label: '户主',
            width: '100',
            align: 'center'
          },
          {
            prop: 'checkDesc',
            label: '审核说明',
            width: '100',
            align: 'center'
          }
        ],
        // 表格
        tableData: [],
        tableDataTitle: {
          orderCount: 0,
          scatteredCount: 0,
          wholeCount: 0
        }
      }
    },
    created() {
      this.columnOperate.forEach((item, index) => {
        item.children.forEach((Citem, Cindex) => {
          if (Citem.show === 'IsBtn1' && this.IsBtn1) {
            item.isBtn = true
            Citem.isBtn = true
          }
          if (Citem.show === 'IsBtn2' && this.IsBtn2) {
            item.isBtn = true
            Citem.isBtn = true
          }
        })
      })
      this.getQuery()
      this.queryData.formItem[2].option = this.applyState
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          // 判断用户权限
          let params = {
            operUserId: this.UsInfo.userId,
            applyUserId: this.queryData.formData.applyUserId,
            userId: this.queryData.formData.userId, // 操作用户id
            applyState: this.queryData.formData.applyState, //
            applyDate: this.queryData.formData.applyDate, //
            checkDate: this.queryData.formData.checkDate //
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          this.$api.commissonWithdrawApplyQuery(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.page.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getQuery()
        this.pageDataNum = 1 // cur_page 当前页
        this.pageshow = false // 让分页隐藏
        this.$nextTick(() => { // 重新渲染分页
          this.pageshow = true
        })
      },
      // 查看
      viewAddTabUser(row, index, name) {
        this.$store.dispatch('delTab', {id: 'm1_view'})
        let _data = {
          id: 'commission_view',
          name: '佣金详情信息',
          url: 'accountCommission',
          uid: {
            formType: 'view',
            userId: row.userId,
            accountId: row.accountId
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
      },
      checkPass(oper) {
        if (!window.localStorage.getItem('nice_user')) {
          this.$message('获取用户信息失败！')
        }
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定提交吗？', '审核提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let params = {
            operUserId: this.UsInfo.userId,
            id: this.selectionRows[0].id,
            oper: oper
          }
          let data = {
            params
          }
          // 审核流程
          api.commissonWithdrawApplyCheck(data, (res) => {
            if (res.status === 0 && res.content !== null) {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      selectionChange(rows) {
        this.selectionRows = rows
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>
