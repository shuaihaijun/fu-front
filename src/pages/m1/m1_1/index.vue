<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>
    
    <os-table :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @click-operate="handleOperate">
    </os-table>
    
    <os-pag :pageTotal="pageDataTotal"></os-pag>

    <os-dialog :visible="dialogVisible" :title="formTitle" :visibleButton="false" width="960px" top="4.5%">
      <log-table :pwid="LogWid" @click-operate="handleOperate1"></log-table>
    </os-dialog>
    
  </div>
</template>
<script>
  import logTable from './logTable'
  export default {
    components: {
      'log-table': logTable
    },
    data() {
      return {
        dialogVisible: false,
        formTitle: '更新日志',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [{
            key: 'wid',
            label: '仓库名称',
            value: null,
            placeholder: '仓库名称',
            width: 200,
            type: 'select',
            option: [{
              label: 'ssss',
              value: 'aaaaaaa'
            }]
          }]
        },
        // 表格操作按钮
        columnOperate: [{
            label: '日志',
            fixed: 'left',
            width: '100px',
            isBtn: true,
            children: [{
              iconClass: 'el-icon-view',
              name: '查看日志',
              isBtn: true
            }]
          },
          {
            label: '仓库信息操作',
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
          },
          {
            label: '货区操作',
            width: '110px',
            fixed: 'left',
            isBtn: true,
            children: [{
                iconClass: 'el-icon-view',
                name: '查看',
                show: 'IsBtn4',
                isBtn: true
              },
              {
                iconClass: 'el-icon-edit-outline',
                name: '编辑',
                show: 'IsBtn3',
                isBtn: true
              }
            ]
          }
        ],
        // 表头
        columnData: [{
            prop: 'branchName',
            label: '分公司',
            width: '100'
          },
          {
            prop: 'wid',
            label: '仓库编号',
            width: '90'
          },
          {
            prop: 'wname',
            label: '仓库名称',
            width: '90'
          },
          {
            prop: 'contactsName',
            label: '联系人',
            width: '80',
            align: 'center'
          },
          {
            prop: 'contactsTelephone',
            label: '联系电话',
            width: '100',
            align: 'center'
          },
          {
            prop: 'storeAddress',
            label: '仓库地址',
            width: '',
            align: 'center'
          },
          {
            prop: 'modifyPersonName',
            label: '最后更新人',
            width: '90',
            align: 'center'
          },
          {
            prop: 'modifyTimeStr',
            label: '更新时间',
            width: '150',
            align: 'center'
          }
        ],
        // 表格
        tableData: [],
        LogWid: ''
      }
    },
    created() {
      this.tableData = [{
        branchName: '北京分公司',
        wid: 'BJD01',
        wname: '北京D01',
        contactsName: '张XX',
        contactsTelephone: '13202183832',
        storeAddress: '北京市朝阳区东窑艺术区108号院',
        modifyPersonName: '王先生',
        modifyTimeStr: '2017-12-15 18:12:21'
      }]
      this.getWList()
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
          if (Citem.show === 'IsBtn3' && this.IsBtn3) {
            item.isBtn = true
            Citem.isBtn = true
          }
          if (Citem.show === 'IsBtn4' && this.IsBtn4) {
            item.isBtn = true
            Citem.isBtn = true
          }
        })
      })
    },
    methods: {
      getWList() {
        let params = {
        }
        this.$api.CKXX.getWList(params, (res) => {
          let _arr = res.result.list.map(item => {
            return {
              label: item.wname,
              value: item.wid
            }
          })
          this.queryData.formItem[0].option = _arr
        })
      },
      // 搜索获取表格数据
      getQuery() {
        let params = {
          wid: this.queryData.formData.wid,
          pageSize: this.pageDataSize,
          pageNum: this.pageDataNum
        }
        this.$api.CKXX.getList(params, (res) => {
          this.tableData = res.result.list
          this.pageDataTotal = res.result.total
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
        if (index === 0) {
          this.dialogVisible = true
          this.LogWid = row.wid
        }
        if (index === 1 && name === '编辑') {
          this.editAddTabCK(row.wid, row.wname)
        }
        if (index === 1 && name === '查看') {
          this.viewAddTabCK(row.wid, row.wname)
        }
        if (index === 2 && name === '编辑') {
          this.editAddTabHQ(row.wid, row.wname)
        }
        if (index === 2 && name === '查看') {
          this.viewAddTabHQ(row.wid, row.wname)
        }
      },
      // 新建编辑仓库基础信息页签
      editAddTabCK(v, n) {
        this.$store.dispatch('delTab', {id: 'm1_view'})
        let _data = {
          id: 'm1_edit',
          name: '编辑基础信息',
          url: 'm1_1_form1',
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
      // 查看仓库基础信息页签
      viewAddTabCK(v, n) {
        this.$store.dispatch('delTab', {id: 'm1_edit'})
        let _data = {
          id: 'm1_view',
          name: '查看基础信息',
          url: 'm1_1_form1',
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
      },
      // 编辑货区信息页签
      editAddTabHQ(v, n) {
        this.$store.dispatch('delTab', {id: 'm2_view'})
        let _data = {
          id: 'm2_edit',
          name: '编辑货区信息',
          url: 'm1_1_form2',
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
      // 新建货区信息页签
      viewAddTabHQ(v, n) {
        this.$store.dispatch('delTab', {id: 'm2_edit'})
        let _data = {
          id: 'm2_view',
          name: '货区信息',
          url: 'm1_1_form2',
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
      },
      // 对话框表格查看详情
      handleOperate1(v) {
        this.dialogVisible = false
        let _data = {
          id: 'm1_view',
          name: '查看基础信息',
          url: 'm1_1_form1',
          uid: {
            formType: 'view',
            id: v
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
    },
    computed: {
      list_state () {
        return this.$store.state.m1.m1_list_state
      }
    },
    watch: {
      list_state (v) {
        this.getQuery()
      }
    }
  }
</script>
