<template>
  <div>
      <os-table :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData" @this-refs="setThisRefs" @change-selection="selectionChange">
        <div slot="r">
          <div class="form_topBar_r" v-if="formType == 'edit'">
            <el-button @click="handleSave()"><i class="el-icon-check"></i> 保&nbsp;&nbsp;存</el-button>&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </os-table>
      <os-pag :pageTotal="pageDataTotal"></os-pag>
  </div>
</template>
<script>
  import api from '../../../api/'
  import {MessageBox} from 'element-ui'
  export default {
    props: {
      pwid: '',
      disabled: true,
      formType: {
        default() {
          return 'edit'
        }
      },
      _visible: false
    },
    watch: {
      _visible: function(v1) {
        this.visible = v1
      },
      visible(v) {
        this.$parent.formVisible = v
        this.$parent.dialogVisible = v
      },
      pwid: function (v2) {
        this.getQuery()
      }
    },
    data() {
      return {
        visible: false,
        formTitle: '',
        activeName: '1',
        selectionRows: '',
        tableSelectiveIds: [],
        tableSelectiveRows: [],
        thisRefs: '',
        dataForm: {
          modifyPersonName: '',
          wname: ''
        },
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
          }
        ],
        // 表格
        tableData: []
      }
    },
    methods: {
      getQuery() {
        let userInfo = JSON.parse(window.localStorage.getItem('nice_user'))
        let params = {
          operUserId: userInfo.userId, // 操作用户id
          signalId: this.pwid.id //
        }
        let pageInfoHelper = {
          pageSize: 1000,
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
        params = {
          signalId: this.pwid.id //
        }
        data = {
          params,
          pageInfoHelper
        }
        // 查询已授权信息 ids List<String>
        api.querySignalPermit(data, (res) => {
          if (res.content !== null && res.content.data !== null && res.content.data.length > 0) {
            setTimeout(() => {
              this.tableSelective(this.thisRefs.table.data, res.content.data)
            }, 0)
          }
        })
      },
      handleSave() {
        // 判断数据
        if (this.selectionRows === '' || this.selectionRows.length === 0) {
          window.alert('请选择需要操作的数据！')
          return
        }
        let resIds = []
        for (let index = 0; index < this.selectionRows.length; index++) {
          resIds[index] = this.selectionRows[index].projKey
        }
        MessageBox.confirm('确定提交吗？', '确认提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let params = {
            signalId: this.pwid.id,
            projKeys: resIds
          }
          let data = {
            params
          }
          // 保存流程
          this.$api.saveSignalPermit(data, (res) => {
            if (res.status === 0 && res.content !== null) {
              // 保存成功
              window.alert('操作成功！')
              this.getQuery()
            } else {
              window.alert(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      tableSelective(rows, ids) {
        for (let row = 0; row < rows.length; row++) {
          for (let index = 0; index < ids.length; index++) {
            if (rows[row].projKey === ids[index].projKey) {
              this.thisRefs.table.toggleRowSelection(rows[row])
            }
          }
        }
      },
      setThisRefs(refs) {
        this.thisRefs = refs
      },
      selectionChange(rows) {
        this.selectionRows = rows
      }
    },
    created() {
      this.getQuery()
    }
  }
</script>
