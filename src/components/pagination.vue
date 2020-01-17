<template>
  <div class="os_pag" v-if="pageshow">
    <el-pagination
      @size-change="handleSizeChage"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'os-pag',
  	props: {
			currentPage: {
				default () {
					return 1
				}
			},
			pageSizes: {
				default () {
					return [30, 50, 100, 200]
				}
			},
			pageSize: {
				default () {
					return 30
				}
			},
			pageTotal: {
				default () {
					return 0
				}
			}
		},
    methods: {
      handleSizeChage(val) {
        this.$parent.pageDataSize = val
        this.$parent.handlePage()
        this.$emit('size-change', val)
      },
      handleCurrentChange(val) {
        this.$parent.pageDataNum = val
        this.$parent.handlePage()
        this.$emit('current-change', val)
      }
    }
  }
</script>
<style>
  .os_pag{
    text-align: right;
  }
  .el-pagination{
    border: 1px solid #dcdfe6;
    border-width: 0 1px 1px 1px;
    border-bottom: 1px solid #ccc;
  }
  .el-pager li{
    font-weight: 100;
    font-size: 12px;
  }
  .el-pager li.active {
    background: #666;
    min-width: 30px;
    color: #fff;
  }
</style>
