<template>
  <div>
    <div ref="search">
      <os-search :dataSource='queryData' @click-submit='getQuery'>
      </os-search>
    </div>
    <os-table :searchHeight="queryFormHeight" :operate="true" :columnData="columnData" :columnOperate="columnOperate" :tableData="tableData" @click-operate="handleOperate">
      <div slot="r">
        <el-button @click="handleAdd"><i class="el-icon-circle-plus-outline"></i> 添加</el-button>
        <el-button><i class="el-icon-edit-outline"></i> 编辑</el-button>
        <el-button><i class="el-icon-delete"></i> 删除</el-button>
        <el-button @click="newAddTab"><i class="el-icon-setting"></i> 新页签</el-button>
        <el-button @click="importData"><i class="el-icon-tickets"></i> 导入</el-button>
        <el-button @click="exportData"><i class="el-icon-upload"></i> 导出</el-button>
        <el-dropdown>
          <el-button>
            <i class="el-icon-arrow-down"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="more_button">
            <el-dropdown-item><span @click="exportData"><i class="el-icon-circle-plus-outline"></i> 添加</span></el-dropdown-item>
            <el-dropdown-item><span @click="exportData"><i class="el-icon-upload"></i> 导出</span></el-dropdown-item>
            <el-dropdown-item><span @click="exportData"><i class="el-icon-setting"></i> 设置</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </os-table>
    <os-pag :pageTotal="pageDataTotal" :pageSizes="[100, 200]"></os-pag>

    <os-form :visible="visible" :dataSource="formData" :title="formTitle"></os-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        formTitle: '',
        // 搜索条
        queryData: {
          formData: {},
          formItem: [{
            key: '仓库编号',
            label: '仓库编号',
            value: '',
            placeholder: '仓库编号',
            width: 200,
            type: 'select',
            option: [{
              label: 'ssss',
              value: 'aaaaaaa'
            }]
          }]
        },
        formData: {
          formData: {},
          formItem: [{
              key: '222',
              label: '区域编号',
              value: ''
            },
            {
              key: '111',
              label: '区域名称',
              value: ''
            },
            {
              key: '111',
              label: '父类',
              value: ''
            },
            {
              key: '111',
              label: '显示标志',
              value: ''
            }
          ]
        },
        // 表格操作按钮
        columnOperate: [{
            label: '日志',
            fixed: 'left',
            width: '50px',
            children: [{
              iconClass: 'el-icon-view',
              iconTitle: '查看日志'
            }]
          },
          {
            width: '110px',
            fixed: 'left',
            children: [{
                iconClass: 'el-icon-view',
                name: '查看'
              },
              {
                iconClass: 'el-icon-edit-outline',
                name: '编辑'
              }
            ]
          },
          {
            label: '货区操作',
            width: '110px',
            fixed: 'left',
            children: [{
                iconClass: 'el-icon-view',
                name: '查看'
              },
              {
                iconClass: 'el-icon-edit-outline',
                name: '编辑'
              }
            ]
          }
        ],
        // 表头
        columnData: [{
            prop: 'c1',
            label: '分公司',
            width: '100'
          },
          {
            prop: 'c2',
            label: '仓库编号',
            width: '90'
          },
          {
            prop: 'c3',
            label: '仓库名称',
            width: '90'
          },
          {
            prop: 'c4',
            label: '联系人',
            width: '80',
            align: 'center'
          },
          {
            prop: 'c5',
            label: '联系电话',
            width: '100',
            align: 'center'
          },
          {
            prop: 'c6',
            label: '仓库地址',
            width: '',
            align: 'center'
          },
          {
            prop: 'c7',
            label: '最后更新人',
            width: '90',
            align: 'center'
          },
          {
            prop: 'c8',
            label: '更新时间',
            width: '150',
            align: 'center'
          }
        ],
        // 表格
        tableData: [],
        table: `<tr>
              <th >公司一</th>
              <th>公司二一</th>
              <th>公司三</th>
          </tr>
          <tr>
              <td>A公司</td>
              <td>B公司</td>
              <td>C公司</td>
          </tr>
          <tr>
              <td>A公司</td>
              <td>B公司</td>
              <td>C公司</td>
          </tr>
          <tr>
              <td>A公司</td>
              <td>B公司</td>
              <td>C公司</td>
          </tr>
          <tr>
              <td colspan="3">共计</td>
          </tr>`
      }
    },
    created() {
      this.getQuery()
      this.tableData = [{
        c1: '北京分公司',
        c2: 'BJD01',
        c3: '北京D01',
        c4: '张XX',
        c5: '13202183832',
        c6: '北京市朝阳区东窑艺术区108号院',
        c7: '王先生',
        c8: '2017-12-15 18:12:21'
      }]
    },
    methods: {
      // 添加
      handleAdd() {
        this.visible = true
        this.formTitle = '增加区域'
      },
      // 导入
      importData() {},
      // 导出
      exportData() {
        this.$exportExcel(this.table, '下载文件aasdsd')
      },
      // 搜索获取表格数据
      getQuery() {
        console.log(this.queryData.formData)
      },
      // 分页
      handlePage() {
        console.log('分页')
      },
      // 查看or编辑
      handleOperate(row, index, name) {
        console.log(row, index, name)
      },
      // 新建页签
      newAddTab() {
        let _data = {
          id: 'newtab',
          name: '新创建页签',
          url: ''
        }
        setTimeout(() => {
          this.$store.dispatch('addTab', _data)
        }, 10)
      }
    },
    mounted() {
      this.queryFormHeight = this.$refs.search.offsetHeight
    }
  }
</script>
