<template>
  <div>
    <el-col :span="5">
      <el-form-item label="建筑类型:" required>
        <el-select v-model="dataForm.architecturalType" placeholder="请选择" :disabled="disabled">
          <el-option label="钢结构" :value="0"></el-option>
          <el-option label="水泥结构" :value="1"></el-option>
          <el-option label="楼层结构" :value="2"></el-option>
          <el-option label="其他" :value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="结构类型:" required>
        <el-radio-group v-model="dataForm.structureType" :disabled="disabled">
          <el-radio border :label="0">高台</el-radio>
          <el-radio border :label="1">平台</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="库内结构:" required>
        <el-select v-model="dataForm.insideStructureType" placeholder="请选择" :disabled="disabled">
          <el-option label="联体多间" :value="0"></el-option>
          <el-option label="独立单间" :value="1"></el-option>
          <el-option label="其他" :value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="楼层数:" required>
        <el-radio-group v-model="dataForm.floorsType" :disabled="disabled">
          <el-radio border :label="0">单层</el-radio>
          <el-radio border :label="1">双层</el-radio>
          <el-radio border :label="2">多层</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="库门数量:" prop="doorsCount">
        <el-input v-model="dataForm.doorsCount" :disabled="disabled">
          <template slot="append">个</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7" style="display: flex;">
      <el-form-item label="最大库门:" prop="maxDoorWidth" style="width:105px;">
        <el-input v-model="dataForm.maxDoorWidth" style="width:105px;" :disabled="disabled">
          <template slot="prepend">宽</template>
          <template slot="append">m</template>
        </el-input>
      </el-form-item>
      <el-form-item label=":" prop="maxDoorHeight" style="width:85px;">
        <el-input v-model="dataForm.maxDoorHeight" style="width:105px;" :disabled="disabled">
          <template slot="prepend">高</template>
          <template slot="append">m</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="停车位数量:" prop="parkingSpaceCount">
        <el-input v-model="dataForm.parkingSpaceCount" :disabled="disabled">
          <template slot="append">个</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7" style="display: flex;">
      <el-form-item label="停车场:" prop="parkingLength" style="width:105px;">
        <el-input v-model="dataForm.parkingLength" :disabled="disabled" style="width:105px;">
          <template slot="prepend">长</template>
          <template slot="append">m</template>
        </el-input>
      </el-form-item>
      <el-form-item label=":" prop="parkingWidth" style="width:85px;">
        <el-input v-model="dataForm.parkingWidth" :disabled="disabled" style="width:105px;">
          <template slot="prepend">宽</template>
          <template slot="append">m</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6.5">
      <el-form-item label="网络接入商:" prop="_networkAccess">
        <el-checkbox-group v-model="dataForm._networkAccess" :disabled="disabled" :class="disCheck ? 'disabledCheckbox':''">
          <el-checkbox-button label="1">电信</el-checkbox-button>
          <el-checkbox-button label="2">联通</el-checkbox-button>
          <el-checkbox-button label="3">移动</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="网络带宽:" label-width="112px" prop="networkBandWidth">
        <el-input v-model="dataForm.networkBandWidth" :disabled="disabled">
          <template slot="append">M</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="产权:" label-width="92px" required>
        <el-radio-group v-model="dataForm.propertyRight" :disabled="disabled">
          <el-radio border :label="0">转租</el-radio>
          <el-radio border :label="1">所有人权</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="仓库手续:" prop="_warehouseFormalities">
        <el-checkbox-group v-model="dataForm._warehouseFormalities" :disabled="disabled" :class="disCheck ? 'disabledCheckbox':''">
          <el-checkbox-button label="1">土地使用权证</el-checkbox-button>
          <el-checkbox-button label="2">房屋所有权证</el-checkbox-button>
          <el-checkbox-button label="3">消防验收意见书</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
    </el-col>

    <el-col :span="24">
      <el-form-item label="装卸平台有无:" required style="white-space: nowrap;">
        <el-radio-group v-model="dataForm.loadingPlatformIsHas" :disabled="disabled" @change="parkingSpace">
          <el-radio border :label="0">无</el-radio>
          <el-radio border :label="1">有</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <div class="form_box" v-if="dataForm.loadingPlatformIsHas == 1">
      <el-col :span="8">
        <el-form-item label="装卸平台内外置:" label-width="125px" required>
          <el-radio-group v-model="dataForm.loadingEmbryosInOut" :disabled="disabled">
            <el-radio border :label="0">内置</el-radio>
            <el-radio border :label="1">外置</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="装卸平台单双边:" label-width="125px" required>
          <el-radio-group v-model="dataForm.loadingPlatformSingleBilateral" :disabled="disabled">
            <el-radio border :label="0">单边</el-radio>
            <el-radio border :label="1">双边</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="装卸平台类型:" label-width="120px" required>
          <el-select v-model="dataForm.loadingPlatformType" placeholder="请选择" :disabled="disabled">
            <el-option label="仓库高基平台" :value="0"></el-option>
            <el-option label="地挖斜坡平台" :value="1"></el-option>
            <el-option label="可移动平台" :value="2"></el-option>
            <el-option label="地上斜坡平台" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="装卸平台数量:" label-width="120px" prop="loadingPlatformCount">
          <el-input v-model="dataForm.loadingPlatformCount" :disabled="disabled">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="装卸平台宽度:" label-width="120px" prop="loadingPlatformWidth">
          <el-input v-model="dataForm.loadingPlatformWidth" :disabled="disabled">
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="装卸平台长度:" label-width="120px" prop="loadingPlatformLength">
          <el-input v-model="dataForm.loadingPlatformLength" :disabled="disabled">
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
      </el-col>

    </div>

    <div class="form_box_item">
      <label class="el-form-item__label">仓库尺寸:</label>
      <div class="form_box_table">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="操作" width="100" align="center" v-if="formType == 'edit'">
            <template slot-scope="scope">
              <span v-if="scope.$index != tableData.length - 1" @click="delRow(scope.row, scope.$index)">
                      <i class="el-icon-remove-outline" style="font-size: 18px;cursor: pointer;"></i>
                    </span>
              <span @click="addRow(scope.row, scope.$index)" v-else>
                      <i class="el-icon-circle-plus-outline" style="font-size: 18px;cursor: pointer;"></i>
                    </span>
            </template>
          </el-table-column>
          <el-table-column prop="storehouseDivision" label="仓区划分" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.storehouseDivision" placeholder="请选择" v-if="formType == 'edit'">
                <el-option label="区域一" value="区域一"></el-option>
                <el-option label="区域二" value="区域二"></el-option>
                <el-option label="区域三" value="区域三"></el-option>
                <el-option label="区域四" value="区域四"></el-option>
                <el-option label="区域五" value="区域五"></el-option>
                <el-option label="区域六" value="区域六"></el-option>
                <el-option label="区域七" value="区域七"></el-option>
                <el-option label="区域八" value="区域八"></el-option>
              </el-select>
              <span v-if="formType == 'view'">{{ scope.row.storehouseDivision }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="length" label="长(m)" width="150" align="center">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.length" :min="0" :controls="false" v-if="formType == 'edit'"></el-input-number>
              <span v-if="formType == 'view'">{{ scope.row.length }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="width" label="宽(m)" width="150" align="center">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.width" :min="0" :controls="false" v-if="formType == 'edit'"></el-input-number>
              <span v-if="formType == 'view'">{{ scope.row.width }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="height" label="高(m)" width="150" align="center">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.height" :min="0" :controls="false" v-if="formType == 'edit'"></el-input-number>
              <span v-if="formType == 'view'">{{ scope.row.height }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="area" label="面积（m²）" width="150" align="center">
            <template slot-scope="scope">
              <span v-if="!(scope.row.length * scope.row.width)">-</span>
              <span v-else>{{ (scope.row.length * scope.row.width).toFixed(2)}}</span>
            </template>
          </el-table-column>
        </el-table>
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
      return {
        disabled: false,
        disCheck: false
      }
    },
    created() {
      if (this.formType === 'view') {
        this.disabled = true
        this.disCheck = true
      }
      this.tableData[0].wid = this.dataForm.wid
      this.tableData[0].wname = this.dataForm.wname
    },
    methods: {
      delRow(v, index) {
        console.log(v, index)
        this.tableData.splice(index, 1)
      },
      addRow(v, index) {
        this.tableData.push({
          wid: this.dataForm.wid,
          wname: this.dataForm.wname
        })
      },
      parkingSpace(value) {
        console.log('改变之后:', value)
        if (value === 0 || value === '0') {
          this.dataForm.loadingEmbryosInOut = 0
          this.dataForm.loadingPlatformSingleBilateral = 0
          this.dataForm.loadingPlatformType = 0
          this.dataForm.loadingPlatformCount = 1
          this.dataForm.loadingPlatformWidth = 1
          this.dataForm.loadingPlatformLength = 1
        }
      }
    }
  }
</script>
