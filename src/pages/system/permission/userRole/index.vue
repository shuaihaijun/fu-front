<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData" @change-selection="selectionChange" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="userRoleEdit()"><i class="el-icon"></i> 编辑关系</el-button>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></forms>
  </div>
</template>
<script>
  import api from '../../../../api/'
  import forms from './form'
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
        selectionRows: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [
            {
            key: 'userId',
            label: '',
            value: null,
            placeholder: '用戶ID',
            width: 180,
            type: ''
          },
          {
            key: 'username',
            label: '',
            value: null,
            placeholder: '用户登录ID',
            width: 200,
            type: ''
          },
            {
              key: 'refName',
              label: '',
              value: null,
              placeholder: '用户昵称',
              width: 200,
              type: ''
            },
            {
              key: 'roleId',
              label: '',
              value: null,
              placeholder: '角色ID',
              width: 200,
              type: ''
            },
            {
              key: 'roleName',
              label: '',
              value: null,
              placeholder: '角色名称',
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
            width: '111',
            align: 'center'
          },
          {
            prop: 'username',
            label: '用户登录号',
            width: '111',
            align: 'center'
          },
          {
            prop: 'refName',
            label: '用户昵称',
            width: '111',
            align: 'center'
          },
          {
            prop: 'userType',
            label: '用户类型',
            width: '90',
            formatter: true,
            columnKey: 'user.userType',
            align: 'center'
          },
          {
            prop: 'roleId',
            label: '角色代码',
            value: '',
            align: 'center'
          },
          {
            prop: 'roleName',
            label: '角色名称',
            value: '',
            align: 'center'
          },
          {
            prop: 'roleCode',
            label: '角色代码',
            value: '',
            align: 'center'
          },
          {
            prop: 'roleLevel',
            label: '角色级别',
            value: '',
            formatter: true,
            columnKey: 'role.roleLevel',
            align: 'center'
          },
          {
            prop: 'roleDesc',
            label: '角色描述',
            value: '',
            align: 'center'
          },
          {
            prop: 'createDate',
            label: '创建时间',
            value: '',
            width: '150',
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
          let params = {
            userId: this.queryData.formData.userId, // 用户ID
            username: this.queryData.formData.username, // 用户名称
            refName: this.queryData.formData.refName, // 用户昵称
            roleId: this.queryData.formData.roleId, // 角色ID
            roleName: this.queryData.formData.roleName, // 角色名称
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          api.queryPermissionUserRole(params, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 修改数据
      userRoleEdit() {
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
        this.formTitle = '用户角色关系信息'
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
