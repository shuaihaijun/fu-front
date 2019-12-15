<template>
  <div class="main_top">
    <div class="logo">
      <b class="logo_text">{{osName}}</b>
    </div>
    <div class="login_user" v-if="login">
      <b>{{UsInfo.refName}}</b>欢迎您！
      <el-dropdown @command="handleCommand" v-if="roleList">
        <span class="el-dropdown-link">
		    	<el-tag>{{userInfo.deptName}}: {{userInfo.roleName}}</el-tag>&nbsp;
		    </span>
        <span></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="r.or_id" :key="r.or_id" v-for="r in roleList">{{r.parOrgName}}：{{r.role_name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tag type="gray">
        <div @click="handleExit"> 退出 </div>
      </el-tag>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'os-header',
    props: {
      osName: {
        default() {
          return '系统名称'
        }
      },
      userInfo: {
        default() {
          return ''
        }
      },
      login: {
        default() {
          return true
        }
      },
      roleList: {
        default() {
          return ''
        }
      }
    },
    methods: {
      handleExit() {
        this.$emit('handleExit')
      },
      handleCommand(command) {
        this.$emit('handleRole', command)
      }
    }
  }
</script>
<style>
  .main_top {
    height: 54px;
    background: #575556;
    color: #fff;
    padding: 0 15px;
  }
  
  .main_top .logo_text {
    font-size: 24px;
    line-height: 38px;
    margin-left: 55px;
    font-family: "Microsoft YaHei";
    float: left;
    font-weight: 100;
  }
  
  .main_top .logo em {
    border: 1px solid #fff;
    border-radius: 3px;
    width: 45px;
    height: 20px;
    line-height: 18px;
    background: none;
    text-align: center;
    color: #fff;
    display: inline-block;
    margin: 10px 0 0 20px;
    float: left;
    cursor: pointer;
  }
  
  .login_user {
    padding: 17px 10px 0 0;
    float: right;
  }
  
  .login_user b {
    margin: 0 5px;
    cursor: pointer;
  }
  
  .login_user .el-tag {
    background: #8391a5;
    color: #fff;
    cursor: pointer;
    height: 21px;
    line-height: 20px;
  }
  
  .el-dropdown {
    color: #fff;
  }
</style>
