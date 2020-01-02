<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>

    <os-table  :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @change-selection="selectionChange" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="dictionaryAdd()"><i class="el-icon-edit-outline"></i> 新增</el-button>
        <el-button @click="dictionaryEdit()"><i class="el-icon"></i> 编辑</el-button>
        <el-button @click="dictionaryDelete()"><i class="el-icon"></i> 删除</el-button>
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
            key: 'dicSign',
            label: '',
            value: null,
            placeholder: '字典标识',
            width: 180,
            type: ''
          },
          {
            key: 'dicName',
            label: '',
            value: null,
            placeholder: '名称',
            width: 200,
            type: ''
          },
          {
            key: 'dicValue',
            label: '',
            value: null,
            placeholder: '字典值',
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
            prop: 'id',
            label: 'ID',
            width: '90',
            align: 'center'
          },
          {
            prop: 'dicSign',
            label: '字典标识',
            value: '',
            align: 'center'
          },
          {
            prop: 'dicName',
            label: '名称',
            value: '',
            align: 'center'
          },
          {
            prop: 'dicKey',
            label: '字典key',
            value: '',
            align: 'center'
          },
          {
            prop: 'dicValue',
            label: '字典值',
            value: '',
            align: 'center'
          },
          {
            prop: 'createDate',
            label: '创建时间',
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
      this.getQuery()
    },
    methods: {
      getQuery() { // 搜索获取表格数据
        if (window.localStorage.getItem('nice_user')) {
          let params = {
            sign: this.queryData.formData.sign, // 申请id
            value: this.queryData.formData.value, // 信号源名称
            name: this.queryData.formData.name, // MT账户
            pageSize: this.pageDataSize,
            pageNum: this.pageDataNum
          }
          api.queryDictionary(params, (res) => {
            this.tableData = res.content.records
            this.pageDataTotal = res.content.total
          })
        } else {
          this.$message('获取用户信息失败！')
        }
        this.$store.dispatch('getDictionary')
        let dicValue = api.getDicValue('user.sex', '1')
        console.log(dicValue)
      },
      // 修改数据
      dictionaryEdit() {
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
      dictionaryDelete() {
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
            api.deleteDictionary(param, (res) => {
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
      dictionaryAdd() {
        this.LogWid = ''
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
