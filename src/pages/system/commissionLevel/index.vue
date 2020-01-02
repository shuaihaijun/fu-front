<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData" @change-selection="selectionChange" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="resourceAdd()"><i class="el-icon-edit-outline"></i> 新增</el-button>
        <el-button @click="resourceEdit()"><i class="el-icon"></i> 编辑</el-button>
        <el-button @click="resourceDelete()"><i class="el-icon"></i> 删除</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></forms>
  </div>
</template>
<script>
  import api from '../../../api/'
  import forms from './form'
  import { MessageBox } from 'element-ui'

  export default {
    components: {
      'forms': forms
    },
    data() {
      return {
        show: false,
        LogWid: '',
        dialogVisible: false,
        formVisible: false,
        formTitle: '',
        dialogTitle: '权限资源',
        dialogWidth: '',
        dialogTop: '5%',
        disabled: true,
        commissionType: this.$api.getDicValues('commissionLevel.commissionType'),
        orderType: this.$api.getDicValues('commissionLevel.orderType'),
        commissionUserType: this.$api.getDicValues('user.userType'),
        commissionUserLevel: this.$api.getDicValues('commissionLevel.userLevel'),
        rateType: this.$api.getDicValues('commissionLevel.rateType'),
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
              key: 'levelName',
              label: '',
              value: null,
              placeholder: '佣金规则名称',
              width: 180,
              type: ''
            },
            {
            key: 'commissionType',
            label: '',
            value: null,
            placeholder: '佣金类型',
            width: 180,
            type: 'select',
            option: this.commissionType
          },
          {
            key: 'orderType',
            label: '',
            value: null,
            placeholder: '订单类型',
            width: 200,
            type: 'select',
            option: this.orderType
          },
          {
            key: 'commissionUserType',
            label: '',
            value: null,
            placeholder: '用户类型',
            width: 200,
            type: 'select',
            option: this.commissionUserType
          },
          {
            key: 'commissionUserLevel',
            label: '',
            value: null,
            placeholder: '返佣用户等级',
            width: 200,
            type: 'select',
            option: this.commissionUserLevel
          },
          {
            key: 'rateType',
            label: '',
            value: null,
            placeholder: '比率计算类型',
            width: 200,
            type: 'select',
            option: this.rateType
          }]
        },
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '120px',
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
            prop: 'id',
            label: 'ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'levelName',
            label: '佣金规则名称',
            value: '',
            width: '160',
            align: 'center'
          },
          {
            prop: 'commissionType',
            label: '佣金类型',
            value: '',
            formatter: true,
            columnKey: 'commissionLevel.commissionType',
            align: 'center'
          },
          {
            prop: 'orderType',
            label: '订单类型',
            value: '',
            formatter: true,
            columnKey: 'commissionLevel.orderType',
            align: 'center'
          },
          {
            prop: 'commissionUserType',
            label: '收佣用户类型',
            value: '',
            formatter: true,
            columnKey: 'user.userType',
            align: 'center'
          },
          {
            prop: 'commissionUserLevel',
            label: '返佣等级',
            value: '',
            formatter: true,
            columnKey: 'commissionLevel.userLevel',
            align: 'center'
          },
          {
            prop: 'rateType',
            label: '比率计算类型',
            value: '',
            formatter: true,
            columnKey: 'commissionLevel.rateType',
            align: 'center'
          },
          {
            prop: 'rate',
            label: '返佣比率',
            value: '',
            align: 'center'
          },
          {
            prop: 'createDate',
            label: '创建时间',
            value: '',
            width: '150',
            format: 'yyyy-MM-dd HH:mm:ss',
            align: 'center'
          },
          {
            prop: 'modifyDate',
            label: '修改时间',
            width: '150',
            format: 'yyyy-MM-dd HH:mm:ss',
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
      this.queryData.formItem[1].option = this.commissionType
      this.queryData.formItem[2].option = this.orderType
      this.queryData.formItem[3].option = this.commissionUserType
      this.queryData.formItem[4].option = this.commissionUserLevel
      this.queryData.formItem[5].option = this.rateType
      this.getQuery()
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            levelName: this.queryData.formData.levelName, //
            orderType: this.queryData.formData.orderType, //
            commissionType: this.queryData.formData.commissionType, //
            commissionUserType: this.queryData.formData.commissionUserType, //
            commissionUserLevel: this.queryData.formData.commissionUserLevel, //
            rateType: this.queryData.formData.rateType //
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          api.getPageCommissonLevel(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.content.data.length
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 修改数据
      resourceEdit() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        this.LogWid = this.selectionRows[0]
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '数据字典信息'
        this.show = 'forms'
        this.disabled = false
      },
      // 删除数据
      resourceDelete() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        if (this.selectionRows.length > 1) {
          window.alert('只能选择一条数据操作！')
          return
        }
        MessageBox.confirm('确定删除吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let params = {
            delIds: this.selectionRows[0].id
          }
          let data = {
            params
          }
          // 审核流程
          api.deletePermissionResource(data, (res) => {
            if (res.status === 0 && res.content.data !== '') {
              this.$options.methods.getQuery.bind(this)()
              // 保存成功
              window.alert('操作成功！')
            } else {
              window.alert('操作失败！')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      resourceAdd() {
        this.LogWid = ''
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '权限信息'
        this.show = 'forms'
        this.disabled = false
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getQuery()
      },
      // 查看or编辑
      handleOperate(row, index, name) {
        console.log(row)
        this.LogWid = row
        if (name === '详情') {
          setTimeout(() => {
            this.formVisible = true
          }, 0)
          this.dialogTitle = '信号源：' + row.signalName + ' 详情 '
          // this.show = 'forms'
          this.show = true
          this.disabled = true
          this.dialogWidth = 1000
          this.dialogTop = '10%'
        }
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
