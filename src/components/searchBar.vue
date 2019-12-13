<template>
  <div>
    <el-form :inline="true" :model="dataSource" class="queryForm">
      <el-form-item v-for="(item, index) in dataSource.formItem" :label="item.label">
        <div @click="clickItem(item.key, item)">
          <template v-if="item.type == 'select'">
            <el-select v-model="item.value" filterable clearable @change="changeItem" :placeholder="item.placeholder" :size="dataOption.size" :style="{ width: item.width + 'px'}">
              <el-option v-for="r in item.option" :label="r.dicValue" :value="r.dicKey"></el-option>
            </el-select>
          </template>
          <template v-else-if="item.type == 'time'">
            <el-time-picker is-range v-model="item.value" @change="changeItem" :placeholder="item.placeholder" :size="dataOption.size" :style="{ width: item.width + 'px'}">
            </el-time-picker>
          </template>
          <template v-else-if="item.type == 'date'">
            <el-date-picker v-model="item.value" type="date" @change="changeItem" :editable="false" :placeholder="item.placeholder" :size="dataOption.size" :style="{ width: item.width + 'px'}" :picker-options="item.options">
            </el-date-picker>
          </template>
          <template v-else-if="item.type == 'month'">
            <el-date-picker v-model="item.value" type="month" @change="changeItem" :editable="false" :placeholder="item.placeholder" :size="dataOption.size" :style="{ width: item.width + 'px'}" :picker-options="item.options">
            </el-date-picker>
          </template>
          <template v-else-if="item.type == 'daterange'">
            <el-date-picker v-model="item.value" type="daterange" @change="changeItem" :start-placeholder="item.placeholder" :end-placeholder="item.placeholder" :size="dataOption.size" :style="{ width: item.width + 'px'}" :picker-options="item.options">
            </el-date-picker>
          </template>
          <template v-else-if="item.type == 'datetimerange'">
            <el-date-picker v-model="item.value" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" @change="changeItem" :start-placeholder="item.placeholder" :end-placeholder="item.placeholder" :size="dataOption.size" :style="{ width: item.width + 'px'}" :picker-options="item.options">
            </el-date-picker>
          </template>
          <template v-else>
            <el-input v-model="item.value" @change="changeItem" :placeholder="item.placeholder" :size="dataOption.size" :style="{ width: item.width + 'px'}" v-bind:readonly="item.readonly"></el-input>
          </template>
        </div>
      </el-form-item>
      <slot></slot>
      <el-form-item>
        <el-button @click="submitForm" :size="dataOption.size">查 询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'os-search',
    props: {
      dataSource: {
        default() {
          return {}
        }
      },
      dataOption: {
        default() {
          return {
            size: 'mini'
          }
        }
      }
    },
    data() {
      return {
        item: ''
      }
    },
    methods: {
      // 获取每项数据
      clickItem(key, item) {
        this.item = item
      },
      // 监听表单内容
      changeItem(v) {
        this.$emit('change-item', v, this.item)
      },
      // 按钮事件
      submitForm() {
        let arr = this.dataSource.formItem
        let obj = {}
        arr.forEach((item, index) => {
          obj[item.key] = item.value
        })
        let _obj = this.dataSource.formField
        this.dataSource.formData = Object.assign(obj, _obj)
        this.$emit('click-submit')
      }
    }
  }
</script>
<style>
  .queryForm {
    padding: 0 5px 0 5px;
  }
  
  .queryForm .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
</style>
