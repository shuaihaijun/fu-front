<template>
  <div>
    <div class="table_topbar">{{title}}</div>
    <el-tree :style="{height: tableHeight + 'px'}" class="os_tree" :data="data" :props="defaultProps" @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>
<script>
  export default {
    name: 'os-tree',
    props: {
      data: {
        default() {
          return [{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }]
        }
      },
      defaultProps: {
        default() {
          return {
            children: 'children',
            label: 'label'
          }
        }
      },
      title: {
        default() {
          return '标题'
        }
      },
      searchHeight: ''
    },
    data() {
      return {
        tableHeight: 0
      }
    },
    created() {
      setTimeout(() => {
        this.tableHeight = document.body.offsetHeight - 153 - this.searchHeight
      }, 0)
    },
    methods: {
      handleNodeClick(data) {
        this.$emit('node-click', data)
      }
    }
  }
</script>

<style>
  .os_tree {
    border: 1px solid #dcdfe6;
  }
  
  .os_tree .node__content {
    padding-left: 15px;
  }
  
  .os_tree .el-tree-node__content>.el-tree-node__expand-icon {
    margin-left: 3px;
  }
</style>