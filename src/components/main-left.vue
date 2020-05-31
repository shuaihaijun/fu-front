<template>
  <div class="main_left" :style="{'width': leftWidth}">
    <div class="main_menu">
      <div class="menu_bar">
        <!--<span><small  class="title_shangwu">  商 务 中 心</small></span>-->
        <i class="el-icon-d-arrow-left" v-if="icoShowLeft" @click="collapseLeft"></i>
        <i class="el-icon-d-arrow-right" v-if="icoShowRight" @click="collapseRight" style="right: 25px;"></i>
      </div>
      <template v-if="menuType == 'A'">
        <ul class="menu_list" v-if="acr !== 'no'">
          <li v-for="r in menuData" :class="r.ico" :key="r.id" class="menu_tit">
            <template v-if="r.url === ''">
              <h3><i></i><span v-show="firstTitle">{{r.name}}</span></h3>
            </template>
            <template v-else>
              <h3 @click="addTab(r)"><i></i>{{r.name}}</h3>
            </template>
            <div class="menu_children" :style="{'left': leftLeft}" v-if="r.children !== ''">
              <table>
                <template v-if="r.children.length > 3">
                  <tr>
                    <td v-if="key < 4" v-for="(rc, key) in r.children" :key="rc.id" class="menu_children_td">
                      <h3>{{rc.name}}</h3>
                      <ul>
                        <li v-for="rcc in rc.children" @click="addTab(rcc)" :key="rcc.id">{{rcc.name}}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td v-if="key > 3" v-for="(rc, key) in r.children" :key="rc.id" class="menu_children_td">
                      <h3>{{rc.name}}</h3>
                      <ul>
                        <li v-for="rcc in rc.children" :key="rcc.id" @click="addTab(rcc)">{{rcc.name}}</li>
                      </ul>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td v-for="rc in r.children" :key="rc.id" class="menu_children_td">
                      <h3>{{rc.name}}</h3>
                      <ul>
                        <li v-for="rcc in rc.children" :key="rcc.id" @click="addTab(rcc)">{{rcc.name}}</li>
                      </ul>
                    </td>
                  </tr>
                </template>
              </table>
            </div>
          </li>
        </ul>
      </template>

      <template v-if="menuType == 'C'">
        <el-tree :data="menuData" :props="defaultProps" accordion @node-click="handleNodeClick">
        </el-tree>
      </template>

      <template v-if="menuType == 'B'">
        <el-menu unique-opened :collapse="collapse">
          <template v-for="r in menuData">
            <el-submenu :key="r.id" v-if="r.children.length" :index="r.id">
              <template slot="title">
                <i :class="r.ico"></i>
                <span>{{r.name}}</span>
              </template>
              <el-submenu :key="rc.id" :index="rc.id" v-if="rc.children.length" v-for="rc in r.children">
                <template slot="title">
                  <i :class="rc.ico"></i>
                  <span>{{rc.name}}</span>
                </template>
                <!--<span :key="rcc.id" class="s" @click="handleNodeClick(rcc)" v-for="rcc in rc.children">
                  <el-menu-item :index="rcc.id"><i :class="rcc.ico"></i>{{rcc.name}}</el-menu-item>
                </span>-->
              </el-submenu>
              <!--<el-submenu :key="rc.id" :index="rc.id" v-if="rc.children.length" v-for="rc in r.children">
                <template slot="title"><i class="sub_ico">⊙</i>{{rc.name}}</template>
                <span :key="rcc.id" class="s" @click="handleNodeClick(rcc)" v-for="rcc in rc.children"><el-menu-item :index="rcc.id">{{rcc.name}}</el-menu-item></span>
              </el-submenu>-->
              <span @click="handleNodeClick(rc)" v-else :key="rc.id" >
                <el-menu-item :index="rc.id">
                 <template slot="title">
                   <i :class="rc.ico"></i>
                  <span>{{rc.name}}</span>
                  </template>
                </el-menu-item>
              </span>
            </el-submenu>
            <span @click="handleNodeClick(r)" v-else :key="r.id" >
              <el-menu-item :index="r.id">
                  <i :class="r.ico"></i>
                 <template slot="title">
                  <span>{{r.name}}</span>
                </template>
              </el-menu-item>
            </span>
          </template>
        </el-menu>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'os-left',
    props: {
      collapse: {
        default() {
          return false
        }
      },
      leftWidth: {
        default() {
          return '200px'
        }
      },
      menuType: {
        default() {
          return 'A'
        }
      },
      defaultProps: {
        default() {
          return {
            children: 'children',
            label: 'name'
          }
        }
      }
    },
    data() {
      return {
        firstTitle: true,
        leftLeft: '180px',
        icoShowLeft: true,
        icoShowRight: false
      }
    },
    computed: {
      'menuData' () {
        return this.$store.state.menu.menuData
      },
      'acr' () {
        return this.$store.state.menu.menuNull
      }
    },
    methods: {
      // 树的点击事件触发路由
      handleNodeClick(v) {
        window.sessionStorage.setItem('wtc_menuId', v.id)
        if (v.control && v.control !== 'keyCode') {
          window.open(v.control)
          return
        }
        if (!v.children.length) {
          // 组件验证页面
          if (v.control === 'keyCode') {
            let _data = {
              id: 'keyCode',
              name: '权限校验',
              url: 'keyCode',
              uid: v
            }
            this.$store.dispatch('addTab', _data)
            return
          }
          this.$store.dispatch('addTab', v)
        }
        this.$emit('handleNodeClick', v)
      },
      addTab(r) {
        this.$emit('click-addtab', r)
        if (this.acr === 'no') {
          this.$alert('您无访问权限，联系管理员开通权限！', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          this.$store.dispatch('addTab', r)
        }
      },
      collapseLeft() {
        this.firstTitle = false
        this.leftLeft = '60px'
        this.icoShowLeft = false
        this.icoShowRight = true
        this.$emit('collapse')
      },
      collapseRight() {
        this.firstTitle = true
        this.leftLeft = '180px'
        this.icoShowLeft = true
        this.icoShowRight = false
        this.$emit('collapse')
      }
    }
  }
</script>

<style>
  .main_menu {
    background: #ffffff;
    /*height: 100%;*/
    border-right: 1px solid #ffffff;
  }
  .menu_list {
    list-style: none;
  }
  .menu_list li {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 5px 20px;
    cursor: pointer;
    position: relative;
    z-index: 98;
    border-bottom: 1px solid #cecece;
  }

  .menu_list li i {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 6px 12px 0 0;
    float: left;
  }

  .menu_tit:hover {
    background: #fff;
  }
  .menu_tit:hover:after {
    content: "";
    position: absolute;
    right: -2px;
    top: 10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 10px solid #fff;
    border-bottom: 10px solid transparent;
    z-index: 100;
  }
  .menu_tit:hover:before {
    content: "";
    position: absolute;
    right: -1px;
    top: 8px;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-right: 12px solid #ccc;
    border-bottom: 12px solid transparent;
    z-index: 100;
  }
  .menu_children {
    content: ".";
    position: absolute;
    top: -80px;
    left: 180px;
    display: none;
    background: #fff;
    border: 2px solid #ccc;
    width: auto;
    z-index: 99;
    padding: 8px 0 0 0;
    min-width: 150px;
    min-height: 150px;
  }

  .menu_children ul {
    padding: 0 0 8px 0;
    width: 170px;
    min-height: 80px;
  }

  .menu_children li {
    width: 150px;
    line-height: 24px;
    height: 24px;
    padding: 0 0 0 20px;
    border-bottom: none;
    font-size: 14px;
    color: #666;
  }

  .menu_children td {
    vertical-align: top;
  }

  .menu_children h3 {
    text-align: center;
    margin: 0 10px;
    color: #333;
  }
  .menu_list li:hover {
    background: #ccc;
  }
/*  .menu_children_children {
    float: left;
  }
  .menu_list li:hover .menu_children {
    display: block;
  }*/

  .menu_children_td:nth-child(2) {
    border-left: 1px dashed #ccc;
  }

  .menu_children_td:nth-child(3) {
    border-left: 1px dashed #ccc;
  }

  .menu_children_td:nth-child(4) {
    border-left: 1px dashed #ccc;
  }

  .menu_children_td:nth-child(5) {
    border-left: 1px dashed #ccc;
  }

  .menu_bar {
    height: 34px;
    line-height: 34px;
    padding-left: 15px;
    font-size: 14px;
    /*background: url('../assets/images/tab_bg.png') repeat-x;*/
    border-bottom: 1px solid #cccccc;
    /*border: 1px solid #e7e7e7;*/
    background-color: #2b3348;
    border-right-width: 0;
    position: relative;
  }

  .menu_bar i {
    position: absolute;
    right: 15px;
    top: 12px;
    cursor: pointer;
  }
  /*菜单微调*/

  .menu_list li:nth-child(1) .menu_children {
    top: -2px;
  }

  .menu_list li:nth-child(1) .menu_children:after {
    top: 12px;
  }

  .menu_list li:nth-child(1) .menu_children:before {
    top: 10px;
  }

  .menu_list li:nth-child(2) .menu_children {
    top: -43px;
  }

  .menu_list li:nth-child(2) .menu_children:after {
    top: 52px;
  }

  .menu_list li:nth-child(2) .menu_children:before {
    top: 50px;
  }
  /*微调最后的li*/
  /*.menu_list li:nth-last-child(1) .menu_children{
    top: auto;
    bottom: -20px;
  }*/
  /*.menu_list li:nth-last-child(1) .menu_children:after{
    top: auto;
    bottom: 28px;
  }
  .menu_list li:nth-last-child(1) .menu_children:before{
    top: auto;
    bottom: 26px;
  }
  .menu_list li:nth-last-child(2) .menu_children{
    top: auto;
    bottom: -20px;
  }
  .menu_list li:nth-last-child(2) .menu_children:after{
    top: auto;
    bottom: 28px;
  }
  .menu_list li:nth-last-child(2) .menu_children:before{
    top: auto;
    bottom: 26px;
  }*/

  .main_left .el-menu a {
    text-decoration: none;
  }

  .main_left .el-tree {
    background: none;
  }

  .main_left .el-tree-node {
    position: relative;
  }

  .main_left .el-tree-node__expand-icon.is-leaf:before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 3px;
    background: #ccc;
    border-radius: 2px;
  }

  .main_left .el-tree-node__content {
    height: 38px;
    line-height: 40px;
    border-bottom: 1px solid #d0d0d0;
    border-top: 1px solid #fff;
    background: none;
    padding-left: 20px;
  }

  .main_left .el-tree-node__content:before {
    content: '';
    margin-left: 20px;
  }

  .main_left .is-expanded {
    background: #e7e7e7;
  }

  .main_left .is-expanded .el-tree-node__children {
    background: #fafafa;
  }

  .main_left .is-expanded .is-expanded {
    background: #fafafa;
  }

  .main_left .is-current {
    color: #409EFF;
  }

  .main_left .is-expanded.is-current {
    color: #606266;
  }

  .main_left .el-tree-node__expand-icon {
    position: absolute;
    right: 0;
  }

  .main_left .el-tree-node__expand-icon .expanded {
    position: absolute;
    right: 0;
    top: 0;
  }
  .main_left .is-expanded .is-leaf {
    position: absolute;
    left: 13px;
    top: 5px;
    width: 10px;
  }

  .main_left .el-tree-node__children .el-tree-node__children .is-leaf {
    position: absolute;
    left: 28px;
    top: 6px;
    width: 10px;
  }

  .main_left .el-tree-node__expand-icon.expanded {
    background: none;
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .main_left .el-tree-node__expand-icon {
    background: none;
  }

  .main_left .is-expanded .el-icon-caret-right.is-leaf:before {
    background: #ccc;
    margin-left: 0px;
    content: '';
    display: inline-block;
    width: 3px;
    height: 3px;
    background: #ccc;
    border-radius: 2px;
  }

  .main_left .el-icon-caret-right.is-leaf:before {
    margin-left: 4px;
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    background: #ccc;
    border-radius: 5px;
  }
  /*C*/
 .main_left .el-submenu .el-menu-item{
   border-bottom: none;
   min-width: auto;
   margin-left: -5px;
   border-top: 1px solid #cecece;
   background: #4f5977;
 }
  .main_left .el-submenu .el-menu-item:hover{
    border-bottom: none;
    min-width: auto;
    margin-left: -5px;
    border-top: 1px solid #cecece;
    background: #1c2338;
  }
 .main_left .el-menu{
   border: none;
   background: none;
 }
 .main_left .el-menu .el-menu{
   background: #fff;
 }
 .main_left .el-submenu{
   border-bottom: 1px solid #f2f2f2;
   /*border-bottom: 5px solid #e7e7e7;*/
 }
 .main_left .el-submenu .el-submenu{
   border-bottom: none;
   margin-left: -7px;
 }
 .main_left .el-submenu .el-submenu .el-menu-item{
    margin-left: -10px;
 }
 .main_left .el-menu-item{
   border-bottom: 1px solid #f2f2f2;
   /*background-color: #666666;*/
 }
 .main_left .is-opened{
   background: #f2f2f2;
 }
 .main_left .is-opened .is-opened{
   background: #eee;
 }
 .main_left .el-menu-item, .main_left .el-submenu__title{
   font-size: 16px;
   height: 55px;
   line-height: 50px;
   margin-left: -10px;
   color: #ffffff;
   background-color: #2b3348;
 }
  .main_left .el-menu-item, .main_left .el-submenu__title:hover{
    height: 55px;
    line-height: 42px;
    margin-left: -10px;
    color: #ffffff;
    background-color: #1c2338;
  }
 .main_left .el-menu--inline .el-menu-item:after{
   font-family: element-icons!important;
   transform: rotateZ(-90deg);
   font-size: 12px;
   display: inline-block;
   position: absolute;
   left: 28px;
   top:7px;
   width: 20px;
   height: 20px;
   color: #eee;
 }
 .main_left .el-menu--inline .t .el-menu-item:after{
   left: 10px;
 }
 .sub_ico{
    display: inline-block;
    float: left;
    color: #ccc;
    width: 21px;
    height: 21px;
    font-style: normal;
 }
 .el-menu--collapse{
   width: 60px;
 }
  .title_shangwu {
    font-size: 15px;
    font-weight: 200;
    margin-left: 20px;
  }
 .main_left .el-menu{
   overflow-y:auto ;
   height: 100%;
   background-color: #e7e7e7;
 }
</style>
