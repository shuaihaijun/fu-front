<template>
  <div>
    <div class="form_topBar" style="width: 80%;">
      <div class="form_topBar_l">
        <b>项目工程信息</b>
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm" label-width="100px">
      <el-row :gutter="15">
        <form-1 :dataForm="dataForm"></form-1>
      </el-row>
    </el-form>
    <os-table :selection="true"  :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData" @change-selection="selectionChange" @click-operate="viewAddTabUser">
      <div slot="r">
        <el-button @click="adminAdd()"><i class="el-icon-edit-outline"></i> 添加管理员</el-button>
        <el-button @click="adminRemove()"><i class="el-icon-close"></i> 移除管理员</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <form2 :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></form2>
  </div>
</template>
<script>
  import form1 from './formInfo.vue'
  import form2 from './form.vue'
  import { MessageBox } from 'element-ui'
  import api from '../../../../api/'

  export default {
    components: {
      'form1': form1,
      'form2': form2
    },
    data() {
      return {
        show: false,
        LogWid: '',
        loading: false,
        formVisible: false,
        projKey: 0,
        formTitle: '',
        projectId: 0,
        dataForm: {
          wname: ''
        },
        disabled: true,
        // 表头
        columnData: [
          {
            prop: 'projKey',
            label: '项目KEY',
            width: '',
            align: 'center'
          },
          {
            prop: 'userId',
            label: '管理员ID',
            width: '',
            align: 'center'
          },
          {
            prop: 'adminState',
            label: '状态',
            formatter: true,
            columnKey: 'account.accountState',
            width: '',
            align: 'center'
          },
          {
            prop: 'email',
            label: '电子邮件',
            width: '',
            align: 'center'
          },
          {
            prop: 'regTime',
            label: '注册日期',
            width: '',
            dateFormat: true,
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
      if (this.$store.state.tab.uid !== undefined && this.$store.state.tab.uid.projectId !== undefined) {
        this.projectId = this.$store.state.tab.uid.projectId
        this.projKey = this.$store.state.tab.uid.projKey
        this.getQuery()
      }
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          // 判断用户权限
          let params = {
            id: this.projectId,
            projKey: this.projKey
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          this.$api.getPermissionProject(data, (res) => {
            if (res.content !== null) {
              this.dataForm = res.content
            } else {
              this.$message(res.message)
            }
          })
          params = {
            projKey: this.projKey
          }
          pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          data = {
            params,
            pageInfoHelper
          }
          this.$api.queryPermissionAdmin(data, (res) => {
            if (res.content !== null) {
              this.tableData = res.content.data
            } else {
              this.$message(res.message)
            }
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
      // 查看or编辑
      handleOperate(row, index, name) {
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
      // 查看
      viewAddTabUser(row, index, name) {
        this.$store.dispatch('delTab', {id: 'm1_view'})
        let _data = {
          id: 'm1_view',
          name: '查看账户基础信息',
          url: 'userDetail',
          uid: {
            formType: 'view',
            id: row.id,
            wname: row.username
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
      },
      // 删除数据
      adminRemove() {
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
            id: this.selectionRows[0].id
          }
          let data = {
            params
          }
          // 删除流程
          api.removePermissionAdmin(data, (res) => {
            if (res.status === 0 && res.content !== null) {
              // 保存成功
              window.alert('操作成功！')
              this.$options.methods.getQuery.bind(this)()
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
      adminAdd() {
        this.LogWid = this.dataForm
        setTimeout(() => {
          this.formVisible = true
        }, 0)
        this.formTitle = '团队工程管理员信息'
        this.show = 'forms'
        this.disabled = false
      },
      selectionChange(rows) {
        this.selectionRows = rows
      }
    }
  }
</script>
