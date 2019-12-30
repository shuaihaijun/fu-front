<template>
  <div>
    <el-dialog class="osDialog" :title="title" width="50%" top="5vh" :visible="visible" @close="handleButton('close')"
                :close-on-click-modal="false" :modal-append-to-body="false">
      <el-form class="dataForm" label-width="240px">
        <el-row :gutter="20"  class="osForm">
          <li class="jm880-a">
            壹道守十官网及其下属网页(以下简称“平台”)上的任何信息，旨在为公众提供网站交易员和跟随者的交易动态以及资讯服务。
            本网站不提供任何形式的投资建议。本网站已采取谨慎的措施对信息进行核实，但并不保证所含信息全部准确。
            请您理解我们的信息可能会不全面，或有疏漏或滞后。
            本网站或独立信息提供者均不会对任何因信息错误、不完整、迟延、不精确或基于对本网站信息的依赖而采取的任何措施负责。
            所有预测或观点，仅代表第三方的个人观点和行为，并不代表本网站的立场。请不要直接或者间接地效仿。
            您必须进行独立分析以做出投资判断，同时，您基于本网站提供的交易策略和信号，运用个人配置交易系统所做出的投资行为是您自己决定的结果，需自行承担所有风险。
            本网站明确表明，外汇、差价合约、衍生产品及其他金融工具交易带来的不仅是收益，同时还伴随相当大的风险。
            本网站的交易跟随系统仅适用于对高风险投资有一定了解的跟随者。您可以使用闲散的资金进行投资，不要影响到到您的日常生活开支。
            任何交易策略在过去取得的业绩均不能代表其将来的表现。一般未来汇率变动是不可预测的，所以对待投资预测一定要经过自己的分析作出判断，切忌盲从。
            您必须理解并同意基于提供的信息，而使用个人配置交易系统和交易跟随系统所产生的所有风险需由您自行承担。
            除此之外，壹道守十作为跟随交易系统的开发者，不会对任何由于第三方(如作为这项服务的提供者公司或者合作经纪商)延误、疏忽而导致的客户损失承担责任。
            除了以上，壹道守十明确表明不会对交易员提供的策略和交易信号承担任何责任。壹道守十公司注册所在地法律、法规应规范本声明以及本声明各方之间引起的争议，
            除非存在法律指定适用其他管辖法律。在合约一方寻求实现本声明下的权利，或寻求宣告本声明下的任何权利或义务的任何民事诉讼或其他诉讼过程中，
            各合约方应承担其代理律师的费用和支出。合约方认可专属管辖和法院审判地。
          </li>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleButton('close')">关 闭</el-button>
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
    watch: {
      visible(v) {
        this.$parent.dialogVisible = v
      }
    },
    data() {
      return {
        change: false}
    },
    methods: {
      handleButton(v) {
        this.visible = false
      },
      handleChange(v) {
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
  .inf_dataForm_title {
    margin-bottom: 15px;
    padding: 0 0 10px 10px;
    color: #999;
  }
  .jm880-a{ line-height:22px}
  .jm880-b{ line-height:40px}
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
