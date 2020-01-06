<template>
  <div>
    <div class="form_topBar" style="width: 80%;">
      <div class="form_topBar_l">
        <b>角色资源信息</b>
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm"  :class="{'dataForm_view': formType == 'view'}" label-width="100px">
      <el-row :gutter="15">
        <form-1 :dataForm="dataForm" :formType="formType"></form-1>
        <div>
          <h3>资源信息</h3>
          <os-table :selection="true" :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :tableData="tableData" @this-refs="setThisRefs" @change-selection="selectionChange">
            <div slot="r">
              <div class="form_topBar_r" v-if="formType == 'edit'">
                <el-button @click="handleSave()"><i class="el-icon-check"></i> 保&nbsp;&nbsp;存</el-button>&nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </os-table>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import form1 from './formUserInfo.vue'
  import { MessageBox } from 'element-ui'
  export default {
    components: {
      'form-1': form1
    },
    props: {
    },
    data() {
      return {
        formType: 'edit',
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
            prop: 'resPid',
            label: '父权限ID',
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
            formatter: true,
            columnKey: 'resource.resSwitchBut',
            align: 'center'
          },
          {
            prop: 'resStatus',
            label: '状态',
            formatter: true,
            columnKey: 'com.status',
            value: '',
            align: 'center'
          },
          {
            prop: 'creater',
            label: '创建人',
            value: '',
            align: 'center'
          }
        ],
        // 表格
        tableData: [],
        disabled: false
      }
    },
    created() {
      this.createdCom()
      // setTimeout(() => {
      //   this.tableSelective()
      // }, 0)
    },
    methods: {
      createdCom() {
        this.formType = this.$store.state.tab.uid.formType
        this.dataForm.wid = this.$store.state.tab.uid.id
        this.dataForm.wname = this.$store.state.tab.uid.wname
        let params = {
          id: this.dataForm.wid
        }
        let data = {
          params
        }
        // 查询角色信息
        this.$api.queryDetailPermissionRole(data, (res) => {
          let _dataForm = res.content
          this.dataForm = _dataForm
        })
        // 查询所有资源信息
        this.$api.findResourceTree(data, (res) => {
          if (res.content !== null) {
            let jsonString = res.content.data
            this.tableData = JSON.parse(jsonString)
          } else {
            this.tableData1 = [{}]
          }
        })
        // 查询角色资源信息 ids List<String>
        this.$api.findResIdsByRoleId(params, (res) => {
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
          resIds[index] = this.selectionRows[index].id
        }
        MessageBox.confirm('确定提交吗？', '确认提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning'
        }).then(() => {
          let params = {
            roleId: this.dataForm.id,
            resIds: resIds
          }
          let data = {
            params
          }
          // 审核流程
          this.$api.savePermissionRoleResource(data, (res) => {
            if (res.status === 0 && res.content !== null) {
              // 保存成功
              window.alert('操作成功！')
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
      handleCheck(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = JSON.parse(JSON.stringify(this.dataForm))
            params.userId = this.dataForm.id
            params.mtAccInfo = this.tableData1[0]
            // 校验
            if (params.userType < 4) {
                if (params.mtAccInfo.mtPasswordTrade === undefined || params.mtAccInfo.mtPasswordTrade === null || params.mtAccInfo.mtPasswordTrade === '') {
                  // 用户需要输入交易密码
                  this.$message('请输入交易密码！')
                  return
                }
                if (params.idObverse === undefined || params.idObverse === null || params.idObverse === '') {
                  // 用户需要输入交易密码
                  this.$message('请上传照片信息！')
                  return
                }
                if (params.idFront === undefined || params.idFront === null || params.idFront === '') {
                  // 用户需要输入交易密码
                  this.$message('请上传照片信息！')
                  return
                }
            }
            // 提价申请
            this.$api.submitUserBinding(params, (res) => {
              if (res.status !== 0) {
                window.alert('操作失败！')
                return
              }
              this.$message(res.msg)
              this.formType = 'view'
            })
          } else {
            this.$message('请书写完整')
            return false
          }
        })
      },
      tableSelective(rows, ids) {
        for (let row = 0; row < rows.length; row++) {
          for (let index = 0; index < ids.length; index++) {
            if (rows[row].id === ids[index]) {
              this.thisRefs.table.toggleRowSelection(rows[row])
            }
          }
          if (rows[row].children !== undefined && rows[row].children !== null && rows[row].children.length > 0) {
            this.tableSelective(rows[row].children, ids)
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
    computed: {
      form_state () {
        return this.$store.state.m1.m1_form_state
      }
    },
    watch: {
      form_state (v) {
        // this.createdCom()
      }
    }
  }
</script>
