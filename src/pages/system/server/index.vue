<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData"  :columnOperate="columnOperate"  @change-selection="selectionChange" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="serverAdd()"><i class="el-icon-edit-outline"></i> 新增</el-button>
        <el-button @click="serverEdit()"><i class="el-icon"></i> 编辑</el-button>
        <el-button @click="serverDelete()"><i class="el-icon"></i> 删除</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></forms>
    <serverSlave :_visible="slaveVisible" v-if="slaveShow" :pwid="LogWid" :disabled="slaveDisabled"></serverSlave>
  </div>
</template>
<script>
  import api from '../../../api/'
  import forms from './form'
  import serverSlave from './serverSlave'
  import { MessageBox } from 'element-ui'

  export default {
    components: {
      'forms': forms,
      'serverSlave': serverSlave
    },
    data() {
      return {
        slaveShow: false,
        slaveVisible: false,
        slaveDisabled: false,
        show: false,
        LogWid: '',
        dialogVisible: false,
        formVisible: false,
        formTitle: '',
        dialogTitle: '数据字典',
        dialogWidth: '',
        dialogTop: '5%',
        disabled: true,
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
            key: 'serverName',
            label: '',
            value: null,
            placeholder: '服务器名称',
            width: 180,
            type: ''
          },
          {
            key: 'brokerName',
            label: '',
            value: null,
            placeholder: '经纪商名称',
            width: 200,
            type: ''
          },
          {
            key: 'serverIp',
            label: '',
            value: null,
            placeholder: '服务器地址',
            width: 200,
            type: ''
          }]
        },
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '120px',
            fixed: 'left',
            isBtn: true,
            children: [
              {
                iconClass: 'el-icon-view',
                name: '从服务器',
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
            prop: 'serverName',
            label: '服务器名称',
            value: '',
            align: 'center'
          },
          {
            prop: 'serverState',
            label: '服务器状态',
            value: '',
            formatter: true,
            columnKey: 'com.serverState',
            align: 'center'
          },
          {
            prop: 'brokerName',
            label: '经纪商名称',
            value: '',
            align: 'center'
          },
          {
            prop: 'serverIp',
            label: '服务器IP',
            value: '',
            align: 'center'
          },
          {
            prop: 'serverPort',
            label: '服务器端口',
            value: '',
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
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            serverName: this.queryData.formData.serverName, // 申请id
            brokerName: this.queryData.formData.brokerName, // 信号源名称
            serverIp: this.queryData.formData.serverIp, // MT账户
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          api.queryServer(params, (res) => {
            this.tableData = res.content.records
            this.pageDataTotal = res.page.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 修改数据
      serverEdit() {
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
      serverDelete() {
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
          let param = {
            id: this.selectionRows[0].id
          }
          // 审核流程
          api.deleteServer(param, (res) => {
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
      serverAdd() {
        this.LogWid = ''
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '服务器信息'
        this.show = 'forms'
        this.disabled = false
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
      // 查看or编辑
      handleOperate(row, index, name) {
        this.LogWid = row
        if (name === '从服务器') {
          setTimeout(() => {
            this.slaveVisible = true
          }, 0)
          this.dialogTitle = '从服务器 '
          // this.show = 'forms'
          this.slaveShow = true
          this.slaveDisabled = false
          this.dialogWidth = 500
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
