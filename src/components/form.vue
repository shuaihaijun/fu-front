<template>
  <div>
    <el-dialog class="osDialog" :title="title" :width="width" :height="'50%'" :top="top" :visible="visible" @close="handleClose('close')" :close-on-click-modal="false">
      <el-form :model="dataSource" class="dataForm" label-width="130px">
        <el-row :gutter="20">
          <!--<el-col :span="11" v-for="item in dataSource.formItem" class="osForm">
            <el-form-item :label="r.label+'：'">
              <el-input @change="handleChange(r.value)" v-model="r.value" :disabled="disabled" style="width:100%;"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col v-for="(item) in dataSource.formItem" :span="12">
            <div @click="clickItem(item.key, item)">
              <el-form-item :label="item.label+'：'">
                <template v-if="item.type == 'select'">
                  <el-select v-model="item.value" filterable clearable @change="handleChange(item.value)" :placeholder="item.placeholder"  :style="{ width: item.width + 'px'}">
                    <el-option v-for="r in item.option" :label="r.label" :value="r.value"></el-option>
                  </el-select>
                </template>
                <template v-else-if="item.type == 'time'">
                  <el-time-picker is-range v-model="item.value ? item.value : dataSource.formData[item.key]" @change="handleChange(item.value)" :placeholder="item.placeholder" :style="{ width: item.width + 'px'}">
                  </el-time-picker>
                </template>
                <template v-else-if="item.type == 'date'">
                  <el-date-picker v-model="item.value ? item.value : dataSource.formData[item.key]" type="date" @change="handleChange(item.value)" :editable="false" :placeholder="item.placeholder"  :style="{ width: item.width + 'px'}" :picker-options="item.options">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type == 'month'">
                  <el-date-picker v-model="item.value ? item.value : dataSource.formData[item.key]" type="month" @change="handleChange(item.value)" :editable="false" :placeholder="item.placeholder"  :style="{ width: item.width + 'px'}" :picker-options="item.options">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type == 'daterange'">
                  <el-date-picker v-model="item.value ? item.value : dataSource.formData[item.key]" type="daterange" @change="handleChange(item.value)" :start-placeholder="item.placeholder" :end-placeholder="item.placeholder"  :style="{ width: item.width + 'px'}" :picker-options="item.options">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type == 'datetimerange'">
                  <el-date-picker v-model="item.value ? item.value : dataSource.formData[item.key]" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" @change="changeItem" :start-placeholder="item.placeholder" :end-placeholder="item.placeholder" :style="{ width: item.width + 'px'}" :picker-options="item.options">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type == 'textarea'">
                    <el-input v-model="item.value ? item.value : dataSource.formData[item.key]" @change="handleChange(item.value)" :placeholder="item.placeholder"  type="textarea" :style="{ width: item.width + 'px'}"></el-input>
                </template>
                <template v-else>
                  <el-input v-model=" dataSource.formData[item.key] ? dataSource.formData[item.key] : item.value" @change="handleChange(item.value)" :placeholder="item.placeholder"  :style="{ width: item.width + 'px'}" :readonly="item.readonly"></el-input>
                </template>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <template v-if="!disabled">
          <el-button @click="handleClose('cancel')">取 消</el-button>
          <el-button @click="handleButton('affirm')">确 定</el-button>
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
    created() {
      // console.log(this.dataSource.formItem)
    },
    methods: {
      // 获取每项数据
      clickItem(key, item) {
        this.item = item
      },
      handleButton(v) {
        let arr = this.dataSource.formItem
        let obj = {}
        arr.forEach((item, index) => {
          if (item.value !== null && item.value !== '') {
            obj[item.key] = item.value
          } else {
            obj[item.key] = this.dataSource.formData[item.key]
          }
        })
        this.$emit('handle-button', v, obj)
      },
      handleClose() {
        this.dataSource.formDate = ''
        this.$parent.visible = false
      },
      handleChange(v) {
        this.change = true
        this.$emit('handle-change', this.change)
      },
      setFormData() {
        console.log(this.dataSource.formData)
        // 初始化值
        if (this.dataSource.formData) {
          let arr = this.dataSource.formItem
          arr.forEach((item, index) => {
              item.value ? item.value : this.dataSource.formData[item.key]
            })
        }
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
