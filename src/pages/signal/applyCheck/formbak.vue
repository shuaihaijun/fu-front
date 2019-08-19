<template>
  <div>
    <el-form :model="dataForm" class="dataForm dialogForm detailsForm" ref="ruleForm" :class="{'dataForm_view': formType == 'view'}" label-width="100px">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="申请人ID:">
            {{dataForm.userId }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信号源名称:">
            {{dataForm.signalName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务器名称:">
            {{dataForm.serverName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="MT平台账号:">
            {{dataForm.mtAccId}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="观摩密码:">
            {{dataForm.mtPasswordWatch}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主要交易币种:">
            {{dataForm.signalCurrency}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="历史最大回撤:">
            {{dataForm.historyWithdraw}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="月均收益:">
            {{dataForm.monthlyAverageIncome}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年化预期收益率:">
            {{dataForm.annualizedExpectedReturn}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电子邮件:">
            {{dataForm.email}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话号码:">
            {{dataForm.phone}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="qq号码:">
            {{dataForm.qqNumber}}
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <div>afasdfasdf:</div>
        <div>{{dataForm.signalTem}}</div>
      </div>
      <div style="margin-bottom: 20px;">
        <div>fasfasffds:</div>
        <div>{{dataForm.signalDesc}}</div>
      </div>
    </el-form>
  </div>
</template>
<script>
  import api from '../../../api/'
  export default {
    props: {
      pwid: '',
      formType: {
        default() {
          return 'view'
        }
      }
    },
    data() {
      return {
        formTitle: '',
        dataForm: ''
      }
    },
    created() {
      console.log(this.pwid.id)
      // 校验数据
      let params = {
        applyId: this.pwid.id // 申请id
      }
      api.getSignalApplyById(params, (res) => {
        console.log(res)
        if (res.status === 0 && res.content !== null) {
          // 保存成功
          this.dataForm = res.content
        } else {
          window.alert('查詢失败！')
        }
      })
    }
  }
</script>
