<template>
  <div class="upload_zl">
    <div class="upload_zl_title">{{title}}</div>
    <div class="upload_zl_list">
      <!--<el-upload
        ref="upload"
        :action="uploadUrl"
        name="picture"
        list-type="picture-card"
        :limit="1"
        :file-list="images"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>-->


      <el-upload
        :action="uploadUrl"
        name="picture"
        list-type="picture-card"
        :limit="1"
        :disabled="disabled"
        :file-list="images"
        :on-success="handleSuccess"
        :on-preview="beforeUpload"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: '',
      dataForm: '',
      showType: {
        default() {
          return 'edit'
        }
      },
      images: {
        default() {
          return []
        }
      }
    },
     data() {
      return {
        type: '',
        dialogImageUrl: '',
        dialogVisible: false,
        uploadUrl: '',
        disabled: false
      }
    },
    created() {
        // 照片
        this.type = 0
        this.uploadUrl = this.$api.getPictureUploadUrl()
        if (this.showType === 'edit') {
          this.disabled = true
        }
    },
    methods: {
      // 文件上传成功的钩子函数
      handleSuccess (file, res) {
        this.$message({
          type: 'info',
          message: '图片上传成功',
          duration: 6000
        })
        if (res.response.status === 0) {
          if (this.title === '身份证正面') {
            this.dataForm.idFront = res.response.content.url // 将返回的文件储存路径赋值
          } else {
            this.dataForm.idObverse = res.response.content.url // 将返回的文件储存路径赋值
          }
        }
      },
      // 删除文件之前的钩子函数
      handleRemove (file, images) {
        this.$message({
          type: 'info',
          message: '已删除原有图片',
          duration: 6000
        })
      },
      // 上传的文件个数超出设定时触发的函数
      onExceed(files, images) {
        this.$message({
          type: 'info',
          message: '最多只能上传一个图片',
          duration: 6000
        })
      },
      // 文件上传前的前的钩子函数
      // 参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
      beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isGIF = file.type === 'image/gif'
        const isPNG = file.type === 'image/png'
        const isBMP = file.type === 'image/bmp'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M
      }
    }
  }
</script>

<style>
  .upload_zl{
    padding: 20px 0;
    border-bottom:#F7F7F7 solid 1px;
  }
  .upload_zl_title{
    float: left;
    width: 120px;
    line-height: 145px;
    text-align: center;
  }
  .upload_zl_list{
    margin-left: 120px;
  }
</style>
