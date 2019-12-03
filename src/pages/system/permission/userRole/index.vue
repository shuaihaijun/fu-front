<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData" @change-selection="selectionChange" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="resourceEdit()"><i class="el-icon"></i> 编辑</el-button>
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
            placeholder: '用户ID',
            width: 180,
            type: ''
          },
          {
            key: 'roleId',
            label: '',
            value: null,
            placeholder: '角色ID',
            width: 200,
            type: ''
          }]
        },
        // 表格操作按钮
        columnOperate: [
          {
            label: '操作',
            width: '110px',
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
            prop: 'resName',
            label: '权限名称',
            value: '',
            align: 'center'
          },
          {
            prop: 'resAction',
            label: '权限事件',
            value: '',
            align: 'center'
          },
          {
            prop: 'resDesc',
            label: '权限描述',
            value: '',
            align: 'center'
          },
          {
            prop: 'resIco',
            label: '响应式图标',
            value: '',
            align: 'center'
          },
          {
            prop: 'resSwitchBut',
            label: '权限类型',
            value: '',
            align: 'center'
          },
          {
            prop: 'resStatus',
            label: '状态',
            value: '',
            align: 'center'
          },
          {
            prop: 'resSort',
            label: '排序',
            value: '',
            align: 'center'
          },
          {
            prop: 'creater',
            label: '创建人',
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
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            userId: this.queryData.formData.userId, // 用户ID
            roleId: this.queryData.formData.roleId, // 角色ID
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          api.queryPagePermissionRole(params, (res) => {
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
        this.formTitle = '数据字典信息'
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
