<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>
    <os-table  :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData"  @click-operate="handleOperate">
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <forms :_visible="formVisible" v-if="show" :pwid="LogWid" :disabled="disabled" :title="formTitle"></forms>
  </div>
</template>
<script>
  import api from '../../../../api/'

  export default {
    components: {
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
            key: 'roleCode',
            label: '',
            value: null,
            placeholder: '角色代码',
            width: 180,
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
            label: '个人详情',
            width: '110px',
            fixed: 'left',
            isBtn: true,
            children: [{
              iconClass: 'el-icon-view',
              name: '查看',
              show: 'IsBtn2',
              isBtn: true
            },
              {
                iconClass: 'el-icon-edit-outline',
                name: '编辑',
                show: 'IsBtn1',
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
            prop: 'roleCode',
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
            prop: 'roleSign',
            label: '角色标识',
            formatter: true,
            columnKey: 'role.roleSign',
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
            userId: userInfo.userId,
            roleCode: this.queryData.formData.roleCode, // 角色代码
            roleName: this.queryData.formData.roleName // 角色名称
          }
          let pageInfoHelper = {
            pageSize: this.pageDataSize,
            pageNo: this.pageDataNum
          }
          let data = {
            params,
            pageInfoHelper
          }
          api.queryPagePermissionRole(data, (res) => {
            this.tableData = res.content.data
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
      },
      // 分页
      handlePage() {
        this.tableData = []
        this.getQuery()
      },
      // 查看or编辑
      handleOperate(row, index, name) {
        if (index === 0 && name === '编辑') {
          this.editAddTabUser(row.id, row.username, row)
        }
        if (index === 0 && name === '查看') {
          this.viewAddTabUser(row.id, row.username, row)
        }
      },
      // 新建编辑
      editAddTabUser(v, n, row) {
        if (row.isAccount > 0) {
          this.$message.warning('账户已绑定，不允许编辑！')
          return
        }
        if (row.userState > 0) {
          this.$message.warning('该用户状态，不允许编辑！')
          return
        }
        this.$store.dispatch('delTab', {id: 'm1_edit'})
        let _data = {
          id: 'm1_edit',
          name: '编辑基础信息',
          url: 'roleResourceDetail',
          uid: {
            formType: 'edit',
            id: v,
            wname: n
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
      },
      // 查看
      viewAddTabUser(v, n, row) {
        this.$store.dispatch('delTab', {id: 'm1_view'})
        let _data = {
          id: 'm1_view',
          name: '查看基础信息',
          url: 'roleResourceDetail',
          uid: {
            formType: 'view',
            id: v,
            wname: n
          }
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
          this.$store.dispatch('m1_form_state', this.$store.state.m1.m1_form_state + 1)
        }, 10)
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>
