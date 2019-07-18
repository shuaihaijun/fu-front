<template>
  <div>
    <h3>非货架货区信息</h3>
    <div class="form_box_table no_margin" style="margin-top: -16px;">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="c1" label="货区" width="150" align="center">
          <template slot-scope="scope">
            <span>暂存区</span>
          </template>
        </el-table-column>
        <el-table-column prop="temporaryStorageArea" label="占地面积（m²）" width="150" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.temporaryStorageArea" :min="0" :controls="false" v-if="formType == 'edit'"></el-input-number>
            <span v-if="formType == 'view'">{{ scope.row.temporaryStorageArea }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="c3" label="货区" width="150" align="center">
          <template slot-scope="scope">
            <span>收/退货交接区</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiptReturnArea" label="占地面积（m²）" width="150" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.receiptReturnArea" :min="0" :controls="false" v-if="formType == 'edit'"></el-input-number>
            <span v-if="formType == 'view'">{{ scope.row.receiptReturnArea }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="c5" label="货区" width="150" align="center">
          <template slot-scope="scope">
            <span>其他区</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiptReturnArea" label="占地面积（m²）" align="center">
          <template slot-scope="scope">
            <span>{{ dataForm.notShelvesArea - dataForm.shelvesArea - scope.row.temporaryStorageArea - scope.row.receiptReturnArea}}</span>
          </template>
        </el-table-column>
      </el-table>
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
        Type: Object,
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
      return {}
    },
    methods: {}
  }
</script>