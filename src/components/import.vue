<template>
  <div>
    <el-dialog class="osDialog" :title="title" :width="width" :top="top" :visible="visible" @close="handleClose('close')" :close-on-click-modal="false">
      <el-upload class="import" ref="upload" accept="application/vnd.ms-excel" action="" :file-list="fileList" :on-change="handleFileChange" :on-remove="handleFileRemove" :auto-upload="false" :limit="1">
        <div class="el-upload__tip">只能上传Excel文件，且不超过20M</div>
        <el-button slot="trigger">选取文件</el-button>
      </el-upload>
      
      <div class="import_text">
        导入的EXCEL中的抬头的顺序和名字请保持一致！否则导入数据不正确 导入之前，请仔细检查数据中不能存在 " ' \ 这些特殊字符 只能导入xls或者xlsx文件，如果导入内容较多，请耐心等待响应。
      </div>

      <div slot="footer" class="dialog-footer">
        <template v-if="!disabled">
          <el-button @click="handleClose('close')">取 消</el-button>
          <el-button @click="handleFileImport('affirm')">确 定</el-button>
        </template>
        <template v-else>
          <el-button @click="handleClose('close')">关 闭</el-button>
        </template>
      </div>

    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'os-import-dialog',
    props: {
      title: {
        default() {
          return '信息导入'
        }
      },
      visible: {
        default() {
          return false
        }
      },
      width: {
        default() {
          return '550px'
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
      },
      success: {
        default() {
          return false
        }
      }
    },
    data() {
      return {
        change: false,
        files: '',
        fileList: []
      }
    },
    computed: {
      fileSuccess() {
        return this.success
      }
    },
    watch: {
      fileSuccess() {
        this.fileList = []
        this.files = ''
      }
    },
    methods: {
      // 删除文件
      handleFileRemove(file, fileList) {
        console.log(file, fileList)
      },
      // 监听文件状态改变
      handleFileChange(file) {
        this.files = file
        const isFile = file.raw.type === 'application/vnd.ms-excel'
        const isFile20M = file.raw.size / 1024 / 1024 < 20
        if (!isFile && !isFile20M) {
          this.fileList = []
          this.files = ''
          this.$message.error('只能上传Excel格式!')
        }
      },
      // 上传文件
      handleFileImport() {
        if (!this.files) {
          this.$message('请选择文件')
          return
        }
        if (this.success) {
          this.fileList = []
          this.files = ''
        }
        var formData = new window.FormData()
        formData.append('file', this.files.raw)
        this.$emit('handle-upload', formData)
      },
      // 关闭对话框
      handleClose() {
        this.fileList = []
        this.files = ''
        this.$parent.visibleImport = false
      }
    }
  }
</script>
<style>
  .import_text {
    padding-top: 10px;
    line-height: 21px;
  }
  .import{
    position: relative;
  }
  .import .el-upload__tip{
    position: absolute;
    left: 100px;
    top: 0;
  }
</style>