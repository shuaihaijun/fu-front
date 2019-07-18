<template>
  <div>
    <div class="form_topBar" :style="{'width': topWidth}">
      <div class="form_topBar_l">
        <b>{{dataForm.wname}}</b>
      </div>
      <div class="form_topBar_r">
        <el-button @click="handleSave"><i class="el-icon-check"></i> 保 存</el-button>
      </div>
    </div>
    <el-form :model="dataForm" class="dataForm" label-width="100px">
      <el-row :gutter="15">
        <form-1 :formType="formType" :tableData="tableData1" :dataForm="dataForm"></form-1>
        <form-2 :formType="formType" :tableData="tableData1" :dataForm="dataForm"></form-2>
        <form-3 :formType="formType" :tableData="tableData2" :dataForm="dataForm"></form-3>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import form1 from './form_1.vue'
  import form2 from './form_2.vue'
  import form3 from './form_3.vue'
  export default {
    components: {
      'form-1': form1,
      'form-2': form2,
      'form-3': form3
    },
    props: {
    },
    data() {
      return {
        formType: 'edit',
        width: '',
        activeName: '1',
        dataForm: {},
        tableData1: [],
        tableData2: [],
        disabled: false,
        tempTableData: [{
            type: 0,
            length: 0,
            width: 0,
            high: 0,
            cargoSpaceCount: 0,
            pickCargoSpaceCount: 0,
            noQualifiedSpaceCount: 0,
            collectCargoSpaceCount: 0
        }, {
            type: 1,
            length: 0,
            width: 0,
            high: 0,
            cargoSpaceCount: 0,
            pickCargoSpaceCount: 0,
            noQualifiedSpaceCount: 0,
            collectCargoSpaceCount: 0
        }, {
            type: 2,
            length: 0,
            width: 0,
            high: 0,
            cargoSpaceCount: 0,
            pickCargoSpaceCount: 0,
            noQualifiedSpaceCount: 0,
            collectCargoSpaceCount: 0
        },
        {
            type: 3,
            length: 0,
            width: 0,
            high: 0,
            cargoSpaceCount: 0,
            pickCargoSpaceCount: 0,
            noQualifiedSpaceCount: 0,
            collectCargoSpaceCount: 0
        },
        {
            type: 4,
            length: 0,
            width: 0,
            high: 0,
            cargoSpaceCount: 0,
            pickCargoSpaceCount: 0,
            noQualifiedSpaceCount: 0,
            collectCargoSpaceCount: 0
        }]
      }
    },
    created() {
      this.createdCom()
    },
    methods: {
      createdCom() {
        this.tableData1 = this.tempTableData
        this.formType = this.$store.state.tab.uid.formType
        this.dataForm.wid = this.$store.state.tab.uid.id
         this.dataForm.wname = this.$store.state.tab.uid.wname
        let params = {
          wid: this.dataForm.wid,
          wname: this.dataForm.wname
        }
        this.$api.CKXX.getHWView(params, (res) => {
          this.tableData1 = res.result.length ? res.result : this.tempTableData
          if (this.tableData1.length !== 5) {
            this.tableData1.push({
              type: 4,
              length: 0,
              width: 0,
              high: 0,
              cargoSpaceCount: 0,
              pickCargoSpaceCount: 0,
              noQualifiedSpaceCount: 0,
              collectCargoSpaceCount: 0
            })
          }
        })
        this.$api.CKXX.getHQView(params, (res) => {
          let _arr = []
          _arr.push(res.result !== null || res.result.length ? res.result : {})
          this.dataForm = res.result
          this.tableData2 = _arr
        })
      },
      handleSave() {
        let params = this.dataForm
        params.goodsAllocations = this.tableData1
        params.modifyPersonId = this.UsInfo.user_id
        params.modifyPersonName = this.UsInfo.user_name
        console.log('params', params)
        this.$api.CKXX.getHQSave(params, (res) => {
          if (res.code !== 200) {
            return
          }
          this.$message(res.message)
          this.$store.dispatch('delTab', {id: 'm2_edit'})
        })
      }
    },
    computed: {
      form_state () {
        return this.$store.state.m1.m1_form_state
      }
    },
    watch: {
      form_state (v) {
        this.createdCom()
      }
    }
  }
</script>
