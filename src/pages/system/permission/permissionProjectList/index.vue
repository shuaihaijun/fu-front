<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>
    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="viewAddTabUser">
      <div slot="r">
        <el-button @click="projectAdd()"><i class="el-icon-edit-outline"></i> 新增</el-button>
        <el-button @click="projectEdit()"><i class="el-icon"></i> 编辑</el-button>
        <el-button @click="projectDelete()"><i class="el-icon"></i> 删除</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>
    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></forms>
  </div>
</template>
<script>
  import api from '../../../../api/'
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
        formVisible: false,
        disabled: true,
        formTitle: '',
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
            key: 'projName',
            label: '',
            value: null,
            placeholder: '项目团队名称',
            width: 180,
            type: ''
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
                name: '管理',
                show: 'IsBtn2',
                isBtn: true
              }
            ]
          }
        ],
        // 表头
        columnData: [
          {
            prop: 'projKey',
            label: '项目团队key',
            width: '',
            align: 'center'
          },
          {
            prop: 'projName',
            label: '项目团队名称',
            width: '150',
            align: 'center'
          },
          {
            prop: 'projAdmin',
            label: '项目团队管理员',
            width: '',
            align: 'center'
          },
          {
            prop: 'projType',
            label: '项目团队类型',
            width: '',
            formatter: true,
            columnKey: 'permission.projectType',
            align: 'center'
          },
          {
            prop: 'projSlogan',
            label: '项目团队标语',
            width: '100',
            align: 'center'
          },
          {
            prop: 'projDesc',
            label: '项目团队描述',
            width: '100',
            align: 'center'
          },
          {
            prop: 'projStatus',
            label: '项目团队状态',
            width: '80',
            formatter: true,
            columnKey: 'com.status',
            align: 'center'
          },
          {
            prop: 'creater',
            label: '创建人',
            width: '',
            align: 'center'
          },
          {
            prop: 'createDate',
            label: '创建时间',
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
          let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
          let params = {
            operUserId: userInfo.userId, // 操作用户id
            projName: this.queryData.formData.projName
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          api.queryPermissionProject(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.page.total
          })
        } else {
          this.$message('获取信息失败！')
        }
      },
      // 修改数据
      projectEdit() {
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
      projectDelete() {
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
          api.deletePermissionProject(data, (res) => {
            if (res.status === 0 && res.content.data !== '') {
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
      projectAdd() {
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
      // 查看
      viewAddTabUser(row, index, name) {
        this.$store.dispatch('delTab', {id: 'm1_view'})
        let _data = {
          id: 'permission_project_view',
          name: '团队项目信息',
          url: 'permissionProjectDetail',
          uid: {
            formType: 'view',
            projectId: row.id,
            projKey: row.projKey
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
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
