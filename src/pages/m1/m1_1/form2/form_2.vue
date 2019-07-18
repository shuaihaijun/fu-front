<template>
  <div>
    <h3>货架货区信息</h3>
    <div class="form_box_table no_margin" style="margin-top: -16px;position: relative;">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="type" label="货位" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 0">重型货架货位</span>
            <span v-if="scope.row.type == 1">中型货架货位</span>
            <span v-if="scope.row.type == 2">流利货架货位</span>
            <span v-if="scope.row.type == 3">层板货架货位</span>
            <span v-if="scope.row.type == 4">货区分摊面积</span>
          </template>
        </el-table-column>
        <el-table-column prop="cargoSpaceCount" label="备货区货位数量（个）" width="150" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.cargoSpaceCount" :min="0" :controls="false" v-if="formType == 'edit' && scope.$index != 4 && scope.row.type != 4"></el-input-number>
            <span v-if="formType == 'view' && scope.row.type != 4">{{ scope.row.cargoSpaceCount }}</span>
            <span v-if="scope.row.type == 4">{{isNaN(
              ((isNaN(tableData[0].cargoSpaceCount/tdH) ? 0 : (tableData[0].cargoSpaceCount/tdH)*tableData[0].areaUnit)+
              (isNaN(tableData[1].cargoSpaceCount/tdI) ? 0 : (tableData[1].cargoSpaceCount/tdI)*tableData[1].areaUnit)+
              (isNaN(tableData[2].cargoSpaceCount/tdJ) ? 0 : (tableData[2].cargoSpaceCount/tdJ)*tableData[2].areaUnit)+
              (isNaN(tableData[3].cargoSpaceCount/tdK) ? 0 : (tableData[3].cargoSpaceCount/tdK)*tableData[3].areaUnit)).toFixed(2)) ? '—': 
              ((isNaN(tableData[0].cargoSpaceCount/tdH) ? 0 : (tableData[0].cargoSpaceCount/tdH)*tableData[0].areaUnit)+
              (isNaN(tableData[1].cargoSpaceCount/tdI) ? 0 : (tableData[1].cargoSpaceCount/tdI)*tableData[1].areaUnit)+
              (isNaN(tableData[2].cargoSpaceCount/tdJ) ? 0 : (tableData[2].cargoSpaceCount/tdJ)*tableData[2].areaUnit)+
              (isNaN(tableData[3].cargoSpaceCount/tdK) ? 0 : (tableData[3].cargoSpaceCount/tdK)*tableData[3].areaUnit)).toFixed(2)
              }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pickCargoSpaceCount" label="拣货区货位数量（个）" width="180" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.pickCargoSpaceCount" :min="0" :controls="false" v-if="formType == 'edit' && scope.$index != 4 && scope.row.type != 4"></el-input-number>
            <span v-if="formType == 'view' && scope.row.type != 4">{{ scope.row.pickCargoSpaceCount }}</span>
            <span v-if="scope.row.type == 4">{{isNaN(
              ((isNaN(tableData[0].pickCargoSpaceCount/tdH) ? 0: (tableData[0].pickCargoSpaceCount/tdH)*tableData[0].areaUnit)+
              (isNaN(tableData[1].pickCargoSpaceCount/tdI) ? 0: (tableData[1].pickCargoSpaceCount/tdI)*tableData[1].areaUnit)+
              (isNaN(tableData[2].pickCargoSpaceCount/tdJ) ? 0: (tableData[2].pickCargoSpaceCount/tdJ)*tableData[2].areaUnit)+
              (isNaN(tableData[3].pickCargoSpaceCount/tdK) ? 0: (tableData[3].pickCargoSpaceCount/tdK)*tableData[3].areaUnit)).toFixed(2)) ? '—': 
              ((isNaN(tableData[0].pickCargoSpaceCount/tdH) ? 0: (tableData[0].pickCargoSpaceCount/tdH)*tableData[0].areaUnit)+
              (isNaN(tableData[1].pickCargoSpaceCount/tdI) ? 0: (tableData[1].pickCargoSpaceCount/tdI)*tableData[1].areaUnit)+
              (isNaN(tableData[2].pickCargoSpaceCount/tdJ) ? 0: (tableData[2].pickCargoSpaceCount/tdJ)*tableData[2].areaUnit)+
              (isNaN(tableData[3].pickCargoSpaceCount/tdK) ? 0: (tableData[3].pickCargoSpaceCount/tdK)*tableData[3].areaUnit)).toFixed(2)
              }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="noQualifiedSpaceCount" label="不合格区货位数量（个）" width="180" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.noQualifiedSpaceCount" :min="0" :controls="false" v-if="formType == 'edit' && scope.$index != 4 && scope.row.type != 4"></el-input-number>
            <span v-if="formType == 'view' && scope.row.type != 4">{{ scope.row.noQualifiedSpaceCount }}</span>
            <span v-if="scope.row.type == 4">{{isNaN(
              ((isNaN(tableData[0].noQualifiedSpaceCount/tdH) ? 0: (tableData[0].noQualifiedSpaceCount/tdH)*tableData[0].areaUnit)+
              (isNaN(tableData[1].noQualifiedSpaceCount/tdI) ? 0: (tableData[1].noQualifiedSpaceCount/tdI)*tableData[1].areaUnit)+
              (isNaN(tableData[2].noQualifiedSpaceCount/tdJ) ? 0: (tableData[2].noQualifiedSpaceCount/tdJ)*tableData[2].areaUnit)+
              (isNaN(tableData[3].noQualifiedSpaceCount/tdK) ? 0: (tableData[3].noQualifiedSpaceCount/tdK)*tableData[3].areaUnit)).toFixed(2)) ? '—': 
              ((isNaN(tableData[0].noQualifiedSpaceCount/tdH) ? 0: (tableData[0].noQualifiedSpaceCount/tdH)*tableData[0].areaUnit)+
              (isNaN(tableData[1].noQualifiedSpaceCount/tdI) ? 0: (tableData[1].noQualifiedSpaceCount/tdI)*tableData[1].areaUnit)+
              (isNaN(tableData[2].noQualifiedSpaceCount/tdJ) ? 0: (tableData[2].noQualifiedSpaceCount/tdJ)*tableData[2].areaUnit)+
              (isNaN(tableData[3].noQualifiedSpaceCount/tdK) ? 0: (tableData[3].noQualifiedSpaceCount/tdK)*tableData[3].areaUnit)).toFixed(2)
              }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="collectCargoSpaceCount" label="集货区货位数量（个）" width="180" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.collectCargoSpaceCount" :min="0" :controls="false" v-if="formType == 'edit' && scope.$index != 4 && scope.row.type != 4"></el-input-number>
            <span v-if="formType == 'view' && scope.row.type != 4">{{ scope.row.collectCargoSpaceCount }}</span>
            <span v-if="scope.row.type == 4">{{isNaN(
              ((isNaN(tableData[0].collectCargoSpaceCount/tdH) ? 0 : (tableData[0].collectCargoSpaceCount/tdH)*tableData[0].areaUnit)+
              (isNaN(tableData[1].collectCargoSpaceCount/tdI) ? 0 : (tableData[1].collectCargoSpaceCount/tdI)*tableData[1].areaUnit)+
              (isNaN(tableData[2].collectCargoSpaceCount/tdJ) ? 0 : (tableData[2].collectCargoSpaceCount/tdJ)*tableData[2].areaUnit)+
              (isNaN(tableData[3].collectCargoSpaceCount/tdK) ? 0 : (tableData[3].collectCargoSpaceCount/tdK)*tableData[3].areaUnit)).toFixed(2)) ? '—': 
              ((isNaN(tableData[0].collectCargoSpaceCount/tdH) ? 0 : (tableData[0].collectCargoSpaceCount/tdH)*tableData[0].areaUnit)+
              (isNaN(tableData[1].collectCargoSpaceCount/tdI) ? 0 : (tableData[1].collectCargoSpaceCount/tdI)*tableData[1].areaUnit)+
              (isNaN(tableData[2].collectCargoSpaceCount/tdJ) ? 0 : (tableData[2].collectCargoSpaceCount/tdJ)*tableData[2].areaUnit)+
              (isNaN(tableData[3].collectCargoSpaceCount/tdK) ? 0 : (tableData[3].collectCargoSpaceCount/tdK)*tableData[3].areaUnit)).toFixed(2)
              }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="areaUnit" label="货位分摊面积（m²）" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type != 4">{{ scope.row.areaUnit = isNaN(((dataForm.shelvesArea/((tdH*tableData[0].volume)+(tdI*tableData[1].volume)+(tdJ*tableData[2].volume)+(tdK*tableData[3].volume)))*((scope.row.cargoSpaceCount+scope.row.pickCargoSpaceCount+scope.row.noQualifiedSpaceCount+scope.row.collectCargoSpaceCount)*(scope.row.volume))).toFixed(2)) ? '—' : ((dataForm.shelvesArea/((tdH*tableData[0].volume)+(tdI*tableData[1].volume)+(tdJ*tableData[2].volume)+(tdK*tableData[3].volume)))*((scope.row.cargoSpaceCount+scope.row.pickCargoSpaceCount+scope.row.noQualifiedSpaceCount+scope.row.collectCargoSpaceCount)*(scope.row.volume))).toFixed(2) }}</span>
            <span v-else>—</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="TB-tooltip2">
        <el-tooltip placement="top">
          <div slot="content">以备货区举例：<br/>
          （重型货架货位数量/重型货架所有货位之和）* 重型货架货位分摊面积 +<br/>
          （中型货架货位数量/重型货架所有货位之和）* 中型货架货位分摊面积 +<br/>
          （层板货架货位数量/重型货架所有货位之和）* 层板货架货位分摊面积 +<br/>
          （流利货架货位数量/重型货架所有货位之和）* 流利货架货位分摊面积<br/></div>
          <i class="el-icon-question" style="font-size: 18px;text-align: right;line-height: 31px;color: #909399;"></i>
        </el-tooltip>
      </div>
      <div class="TB-tooltip">
        <el-tooltip placement="top">
          <div slot="content">货位分摊面积=货位单体积分摊面积*货位体积<br/>货位单体积分摊面积=货架区面积/货架区所有货位体积之和</div>
          <i class="el-icon-question" style="font-size: 18px;text-align: right;line-height: 31px;color: #909399;"></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      formType: {
        default() {
          return 'edit'
        }
      },
      dataForm: {
        default() {
          return {}
        }
      },
      tableData: {
        default() {
          return []
        }
      }
    },
    data() {
      return {
      }
    },
    created() {
      // console.log(this.tableData)
      // console.log('aaaa', 0 / 1) // 0
      // console.log('bbbb', 0 / 0) // NaN
      // console.log('cccc', 1 / 0) // Infinity
    },
    mounted: function () {
    },
    computed: {
      tdH () {
        let n = 0
        n = this.tableData[0].cargoSpaceCount + this.tableData[0].pickCargoSpaceCount + this.tableData[0].noQualifiedSpaceCount + this.tableData[0].collectCargoSpaceCount
        return n
      },
      tdI () {
        let n = 0
        n = this.tableData[1].cargoSpaceCount + this.tableData[1].pickCargoSpaceCount + this.tableData[1].noQualifiedSpaceCount + this.tableData[1].collectCargoSpaceCount
        return n
      },
      tdJ () {
        let n = 0
        n = this.tableData[2].cargoSpaceCount + this.tableData[2].pickCargoSpaceCount + this.tableData[2].noQualifiedSpaceCount + this.tableData[2].collectCargoSpaceCount
        return n
      },
      tdK () {
        let n = 0
        n = this.tableData[3].cargoSpaceCount + this.tableData[3].pickCargoSpaceCount + this.tableData[3].noQualifiedSpaceCount + this.tableData[3].collectCargoSpaceCount
        return n
      },
      // 货位单体积
      volume () {
        let volume = 0
        this.tableData.forEach((item, index) => {
          if (index !== 4) {
            volume = item.length * item.width * item.high
          }
        })
        return volume
      }
    },
    methods: {}
  }
</script>
<style>
.TB-tooltip{
  position: absolute;
  top: 2px;
  right: 30px;
}
.TB-tooltip2{
  position: absolute;
  bottom: 0;
  left: 40px;
}
</style>