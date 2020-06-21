<template>
  <div>
    <el-dialog class="osDialog" :title="title" :width="width" :height="height" :top="top" :visible="visible" @close="handleClose('close')" :close-on-click-modal="false">
      <el-form :model="dataSource" class="dataForm" label-width="130px">
        <el-row :gutter="20">
          <!--<el-col :span="11" v-for="item in dataSource.formItem" class="osForm">
            <el-form-item :label="r.label+'：'">
              <el-input @change="handleChange(r.value)" v-model="r.value" :disabled="disabled" style="width:100%;"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col v-for="(item) in dataSource.formItem" :span="12">
            <div @click="clickItem(item.key, item)">
              <el-form-item :label="item.label+'：'" :required="item.required">
                <template v-if="item.type == 'select'">
                  <el-select v-if="item.value === null || item.value === 'undefined' || item.value === ''" v-model="item.value" filterable clearable @change="handleChange(item.key, item.value)" :placeholder="item.placeholder"  :style="{ width: item.width + 'px'}">
                    <el-option v-for="r in item.option" :label="r.dicValue" :value="r.dicKey"></el-option>
                  </el-select>
                  <el-select v-else v-model="item.value" filterable clearable @change="handleChange(item.key, item.value)" :placeholder="item.placeholder"  :style="{ width: item.width + 'px'}">
                    <el-option v-for="r in item.option" :label="r.dicValue" :value="r.dicKey"></el-option>
                  </el-select>
                </template>
                <template v-else-if="item.type == 'time'">
                  <el-time-picker is-range v-model="item.value" @change="handleChange(item.key, item.value)" :placeholder="item.placeholder" :style="{ width: item.width + 'px'}">
                  </el-time-picker>
                </template>
                <template v-else-if="item.type == 'date'">
                  <el-date-picker v-model="item.value" type="date" @change="handleChange(item.key, item.value)" :editable="false" :placeholder="item.placeholder"  :style="{ width: item.width + 'px'}" :picker-options="item.options">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type == 'month'">
                  <el-date-picker v-model="item.value" type="month" @change="handleChange(item.key, item.value)" :editable="false" :placeholder="item.placeholder"  :style="{ width: item.width + 'px'}" :picker-options="item.options">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type == 'daterange'">
                  <el-date-picker v-model="item.value" type="daterange" @change="handleChange(item.key, item.value)" :start-placeholder="item.placeholder" :end-placeholder="item.placeholder"  :style="{ width: item.width + 'px'}" :picker-options="item.options">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type == 'datetimerange'">
                  <el-date-picker v-model="item.value" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" @change="changeItem" :start-placeholder="item.placeholder" :end-placeholder="item.placeholder" :style="{ width: item.width + 'px'}" :picker-options="item.options">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type == 'textarea'">
                    <el-input v-model="item.value" @change="handleChange(item.value)" :placeholder="item.placeholder"  type="textarea" :style="{ width: item.width + 'px'}"></el-input>
                </template>
                <template v-else>
                  <el-input v-model="item.value" @change="handleChange(item.key, item.value)" :placeholder="item.placeholder"  :style="{ width: item.width + 'px'}" :readonly="item.readonly" :disabled="item.disabled" :show-password="item.showPassword"></el-input>
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
      height: {
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
    watch: {
      'dataSource.formData': {
        handler(v1) {
          // 初始化值 反显用
          if (this.dataSource.formData !== undefined && this.dataSource.formData !== '') {
            let arr = this.dataSource.formItem
            arr.forEach((item, index) => {
                item.value = this.dataSource.formData[item.key]
            })
          }
        },
        deep: true,
        immediate: true
      }
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
        this.dataSource.formDate = {}
        this.$emit('handle-button', v, obj)
      },
      // 监听表单内容
      changeItem(v) {
        // this.$emit('change-item', v, this.item)
      },
      handleClose() {
        this.dataSource.formDate = {}
        this.$parent.visible = false
      },
      handleChange(key, value) {
        this.change = true
        this.$emit('handle-change', this.change, key, value)
      },
      setFormData() {
        console.log(this.dataSource.formData)
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
