<template>
  <div>
    <el-dialog class="osDialog" :title="title" :width="width" :top="top" :visible="visible" @close="handleClose('close')" :close-on-click-modal="false">

      <el-form :model="dataSource" class="dataForm" label-width="130px">
        <el-row :gutter="20">
          <el-col :span="11" v-for="r in dataSource.formItem" class="osForm">
            <el-form-item :label="r.label+'：'">
              <el-input @change="handleChange(r.value)" v-model="r.value" :disabled="disabled" style="width:100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <template v-if="!disabled">
          <el-button @click="handleButton('cancel')">取 消</el-button>
          <el-button @click="handleButton('affirm')">确 定</el-button>
        </template>
        <template v-else>
          <el-button @click="handleButton('close')">关 闭</el-button>
        </template>
      </div>
      
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'os-form',
    props: {
      title: {
        default() {
          return '对话框标题'
        }
      },
      visible: {
        default() {
          return false
        }
      },
      width: {
        default() {
          return '50%'
        }
      },
      top: {
        default() {
          return '10%'
        }
      },
      disabled: {
        default() {
          return false
        }
      },
      dataSource: {
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        change: false
      }
    },
    methods: {
      handleButton(v) {
        let arr = this.dataSource.formItem
        let obj = {}
        arr.forEach((item, index) => {
          obj[item.key] = item.value
        })
        this.$emit('handle-button', v, obj)
      },
      handleClose() {
        this.$parent.visible = false
      },
      handleChange(v) {
        console.log(v)
        this.change = true
        this.$emit('handle-change', this.change)
      }
    }
  }
</script>
<style>
  .osDialog .el-dialog__body {
    padding-left: 20px;
    margin-right: 1px;
    overflow-y: auto;
  }
  .osForm .el-input.is-disabled .el-input__inner {
    background-color: #fff; 
    border-color: #fff;
    color: #999;
    cursor:default;
    text-align: left;
  }
  .el-dialog__footer{
    padding: 10px 20px 15px 20px;
  }
</style>