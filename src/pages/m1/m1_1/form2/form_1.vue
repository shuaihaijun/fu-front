<template>
  <div>
    <h3>货架信息</h3>
    <div class="form_box_table no_margin" style="margin-top: -16px;">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 0">重型货架货位</span>
            <span v-if="scope.row.type == 1">中型货架货位</span>
            <span v-if="scope.row.type == 2">流利货架货位</span>
            <span v-if="scope.row.type == 3">层板货架货位</span>
          </template>
        </el-table-column>
        <el-table-column prop="length" label="长(m)" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 4"></span>
            <template v-else>
              <el-input-number v-model="scope.row.length" :min="0" :controls="false" v-if="formType == 'edit' && scope.$index != 4"></el-input-number>
              <span v-if="formType == 'view'">{{ scope.row.length }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="width" label="宽(m)" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 4"></span>
            <template v-else>
              <el-input-number v-model="scope.row.width" :min="0" :controls="false" v-if="formType == 'edit' && scope.$index != 4"></el-input-number>
              <span v-if="formType == 'view'">{{ scope.row.width }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="high" label="高(m)" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 4"></span>
            <template v-else>
              <el-input-number v-model="scope.row.high" :min="0" :controls="false" v-if="formType == 'edit' && scope.$index != 4"></el-input-number>
              <span v-if="formType == 'view'">{{ scope.row.high }}</span>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row :gutter="15" style="margin: 15px 0 0 0;">
      <el-col :span="5">
        <el-form-item label="货架区面积:">
          <span v-if="formType == 'edit'">
            <el-input-number v-model="dataForm.shelvesArea" :min="0" :max="dataForm.notShelvesArea" :controls="false" style="width: 80px;">
            </el-input-number> m²
          </span>
          <span v-else>{{dataForm.shelvesArea}} m²</span>
        </el-form-item>
      </el-col>
      <el-col :span="0.5">
        <el-tooltip class="item" effect="dark" content="仓库实际使用面积－货架区面积" placement="top">
          <i class="el-icon-question" style="font-size: 18px;text-align: right;line-height: 28px;color: #909399;"></i>
        </el-tooltip>
      </el-col>
      <el-col :span="6">
        <el-form-item label="非货架区面积:">
          <span>{{isNaN(dataForm.notShelvesArea - dataForm.shelvesArea)?'—':dataForm.notShelvesArea - dataForm.shelvesArea}}  m²</span>
        </el-form-item>
      </el-col>
    </el-row>
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
      tableData: {
        default() {
          return []
        }
      },
      dataForm: {
         default() {
          return {}
        }
      }
    },
    data() {
      return {
        disabled: false
      }
    },
    created() {
      console.log(this.dataForm)
      if (this.formType === 'view') {
        this.disabled = true
      }
    },
    methods: {}
  }
</script>
