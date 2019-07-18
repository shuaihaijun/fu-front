<template>
  <div class="upload_zl">
    <div class="upload_zl_title">{{title}}</div>
    <div class="upload_zl_list">
      <os-upload :images="images" :showType="showType" @add-change="handleAdd" @del-change="handleDel"></os-upload>
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
        type: ''
      }
    },
    created() {
      if (this.title === '资质上传') {
        this.type = 0
      }
      if (this.title === 'CAD上传') {
        this.type = 1
      }
      if (this.title === '合同上传') {
        this.type = 2
      }
      if (this.title === '现场照片') {
        this.type = 3
      }
    },
    methods: {
      handleDel(v) {
        this.$api.CKXX.getUploadDel({id: v.item.id}, (res) => {
          this.$parent.$parent.$parent.$parent.$parent.getUploadList()
        })
      },
      handleAdd(imgList, file) {
        let formData = new window.FormData()
        formData.append('file', file)
        formData.append('wid', this.dataForm.wid)
        formData.append('wname', this.dataForm.wname)
        formData.append('type', this.type)
        formData.append('person', this.UsInfo.user_name)
        this.$api.CKXX.getUploadAdd(formData, (res) => {
          this.$parent.$parent.$parent.$parent.$parent.getUploadList()
        })
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