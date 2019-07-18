<template>
	<div class="main_right" :style="{'margin-left': marginLeft}">
    <el-dropdown split-button type="primary" trigger="click" @command="handleCommand" class="tab_bropdown">
       页签
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">关闭全部</el-dropdown-item>
        <el-dropdown-item command="2">关闭当前页</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
		<el-tabs v-model="currentTab" type="border-card" closable @tab-remove="removeTab" class="main_tab">
				<el-tab-pane v-for="item in listTab" :label="item.title" :key="item.title" :name="item.name" id="tab_content">
						<component :is="item.component"></component>
				</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import components from '../config/pages'
	export default {
    name: 'os-right',
    components: components,
    props: {
			marginLeft: {
				default () {
					return '190px'
				}
			}
		},
		computed: {
			'listTab' () {
				return this.$store.state.tab.listData
			},
			'currentTab': {
				get: function() {
					return this.$store.state.tab.currentTab
				},
				set: function (newValue) {
					this.$store.dispatch('currentTab', newValue)
				}
			}
		},
		methods: {
      handleCommand(command) {
        if (command === '1') {
          this.$store.dispatch('delAllTab')
        }
        if (command === '2') {
          if (this.currentTab !== '1') {
            this.$store.dispatch('delTab', this.currentTab)
          }
        }
      },
			// 根据tab的name值删除state.listData
			removeTab (tabItem) {
				this.$emit('click-removetab', tabItem)
				this.$store.dispatch('delTab', tabItem)
			}
		}
	}
</script>
<style>
	.main_right{
		margin-left: 180px;
		width: auto;
		position: relative;
	}
	.tab_bropdown{
	  position: absolute;
	  top: 0;
	  right: 0;
	  z-index: 1999;
	}
	.tab_bropdown .el-button{
    border-radius:0;
     height: 36px;
  }
	.tab_bropdown .el-button:first-child{
	  display: none;
	  border-radius:0;
	}
	.el-dropdown .el-dropdown__caret-button::before{
	  height: 28px;
	}
	.tab_bropdown .el-button-group .el-button--primary:last-child{
	  border-left-color: #ccc;
	  border-bottom: none;
	}
	.el-dropdown-menu{
	  margin: 0px -5px 0 0;
	}
	.main_tab>.el-tabs__header{
	  padding-right: 30px;
	}
	.el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6; 
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04); 
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04); 
    border-bottom: none;
}
.el-tab-pane{
  height: 100%;
}
</style>