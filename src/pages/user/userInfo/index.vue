<template>
  <div>
    <os-table :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @click-operate="handleOperate">
    </os-table>
    <os-pag :pageTotal="pageDataTotal"></os-pag>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formTitle: '更新日志',
        // 表格操作按钮
        columnOperate: [
          {
            label: '个人详情',
            width: '120px',
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
            label: '用户ID',
            width: '',
            align: 'center'
          },
          {
            prop: 'username',
            label: '用户账号',
            width: '',
            align: 'center'
          },
          {
            prop: 'userType',
            label: '用户类型',
            width: '',
            formatter: true,
            columnKey: 'user.userType',
            align: 'center'
          },
          {
            prop: 'userState',
            label: '用户状态',
            width: '',
            formatter: true,
            columnKey: 'user.userState',
            align: 'center'
          },
          {
            prop: 'refName',
            label: '用户昵称',
            width: '',
            align: 'center'
          },
          {
            prop: 'mobile',
            label: '手机号',
            width: '',
            align: 'center'
          },
          {
            prop: 'isVerified',
            label: '是否已验证身份',
            width: '',
            formatter: true,
            columnKey: 'com.yes',
            align: 'center'
          },
          {
            prop: 'isAccount',
            label: '是否已绑定MT',
            width: '',
            formatter: true,
            columnKey: 'com.yes',
            align: 'center'
          },
          {
            prop: 'introducer',
            label: '推荐码',
            width: '',
            align: 'center'
          },
          {
            prop: 'recommend',
            label: '推荐人数',
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
        LogWid: ''
      }
    },
    created() {
      this.getQuery()
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
      // 搜索获取表格数据
      getQuery() {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        let params = {
          operUserId: userInfo.userId, // 操作用户id
          userId: userInfo.userId, // 操作用户id
          pageSize: this.pageDataSize,
          pageNum: this.pageDataNum
        }
        let pageInfoHelper = {
          pageSize: this.pageDataSize,
          pageNo: this.pageDataNum
        }
        let data = {
          params,
          pageInfoHelper
        }
        this.$api.queryUserList(data, (res) => {
          this.tableData = res.content.data
          this.pageDataTotal = res.page.total
        })
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
        if (index === 0 && name === '编辑') {
          this.editAddTabUser(row.id, row.username, row)
        }
        if (index === 0 && name === '查看') {
          this.viewAddTabUser(row.id, row.username, row)
        }
      },
      // 新建编辑
      editAddTabUser(v, n, row) {
        // if (row.isAccount > 0) {
        //   this.$message.warning('账户已绑定，不允许编辑！')
        //   return
        // }
        if (row.userState === 2) {
          this.$message.warning('待审核状态，不允许编辑！')
          return
        }
        this.$store.dispatch('delTab', {id: 'm1_edit'})
        let _data = {
          id: 'm1_edit',
          name: '编辑基础信息',
          url: 'userDetail',
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
          url: 'userDetail',
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
    watch: {
      list_state (v) {
        this.getQuery()
      }
    }
  }
</script>
