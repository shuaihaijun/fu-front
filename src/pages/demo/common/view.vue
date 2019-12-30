<template>
  <div>
    <el-dialog class="osDialog" :title="title" width="80%" top="5vh" :visible="visible" @close="handleButton('close')" :close-on-click-modal="false">
      <el-form :model="dataSource" class="dataForm" label-width="240px">
        <el-row :gutter="20" v-for="r in dataSource.formItem" class="osForm">
          <h3 class="dataForm_title">{{r.label}}</h3>
          <el-col :span="8" v-for="rc in r.children">
            <el-form-item :label="rc.label+'：'" class="is-required">
              <el-input @change="handleChange(rc.value)" v-model="rc.value" :disabled="disabled" style="width:85px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="!disabled">
          <el-button @click="handleButton('cancel')">取 消</el-button>
          <el-button type="primary" @click="handleButton('affirm')">确 定</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="handleButton('close')">关 闭</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
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
      disabled: {
        default() {
          return false
        }
      },
      dataSource: {
        Type: Object,
        default() {
          return {}
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
          item.children.forEach((itemC, indexC) => {
            obj[itemC.key] = itemC.value
          })
        })
        this.$emit('handle-button', v, obj)
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
  .dataForm_title {
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 15px;
    padding: 0 0 10px 10px;
    color: #999;
  }
  
  .osDialog .el-dialog__body {
    height: 400px;
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
</style>
