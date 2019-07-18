<template>
  <div>
    <el-dialog :title="title" :width="width" :top="top" :visible="visible" @close="handleClose('close')" :close-on-click-modal="false">
      <div>
        <slot>默认内容</slot>
      </div>
      <div slot="footer" class="dialog-footer" v-if="visibleButton">
        <el-button @click="handleBtn('cancel')">取 消</el-button>
        <el-button type="primary" @click="handleBtn('affirm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'os-dialog',
    props: {
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
      visibleButton: {
        default() {
          return true
        }
      }
    },
    methods: {
      handleClose() {
        this.$parent.dialogVisible = false
      },
      handleBtn(v) {
        this.$parent.dialogVisible = false
        this.$emit('handle-button', v)
      }
    }
  }
</script>
<style>
  .el-dialog__body{
    padding: 20px;
  }
  .el-dialog{
    margin: 0 auto;
  }
</style>