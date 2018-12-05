<template>
  <div class="vehicleManagement">
    <!-- 车辆管理搜索条 -->
    <div class="vehicleManagement-search">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="归属:">
          <el-select v-model="form.affiliation" clearable placeholder="请选择">
            <el-option v-for="item in affiliationItem" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="VIN码:">
          <el-input v-model="form.vin"></el-input>
        </el-form-item>

        <el-form-item label="车牌:">
          <el-input v-model="form.plate"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <!-- 按钮组 -->
    <div style="margin-bottom:20px">
      <el-button type="primary" @click="newManagement">新建车辆管理</el-button>
      <el-button type="primary" @click="cancelManagement">取消管理</el-button>
    </div>

    <!-- 车辆管理表格 -->
    <div class="vehicleManagement-table">
      <el-table :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="type" label="VIN">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="ICCID">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="车牌">
          <template slot-scope="scope">
            <span>{{scope.row.enterpriseName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="车型">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="部门名称">
          <template slot-scope="scope">
            <span>{{scope.row.sysUser.name}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-item" style="text-align: right;">
        <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- dialog -->
    <el-dialog title="新建车辆管理" :visible.sync="dialogFormVisible" class="dialog" :close-on-click-modal="false">
      <el-row :gutter="20">
        <el-col :span="12">
          选择车辆
          <div class="dialog-left">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            </el-input>
            <el-tree style="max-height:300px;overflow: auto;" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" show-checkbox @check="handleCheckChange" ref="tree" node-key="id">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="12">
          已选车辆
          <div class="dialog-right">
            <el-table :data="resultData" max-height="300">
              <el-table-column label="序号" type="index" align="center" width="60">
                <template slot-scope="scope">
                  {{scope.$index +1}}
                </template>
              </el-table-column>
              <el-table-column prop="type" label="车牌">
                <template slot-scope="scope">
                  <span>{{scope.row.label}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "vehicle-management",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        affiliation: "",
        vin: "",
        plate: ""
      },
      affiliationItem: [],
      total: 0,
      pageIndex: 1,
      tableData: [],
      filterText: "",
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      resultData: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    onReset() {
      for (let key in this.form) {
        this.form[key] = "";
      }
    },
    onSubmit() {
      console.log(123);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    handleSelectionChange(selection) {
      console.log(selection);
    },
    newManagement() {
      this.dialogFormVisible = true;
      this.resultData = [];
    },
    cancelManagement() {},
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleCheckChange() {
      let aResults = this.$refs.tree.getCheckedNodes(true);
      this.resultData = aResults;
    },
    cancel() {
      this.$refs.tree.setCheckedNodes([]);
      this.dialogFormVisible = false;
    },
    confirm() {
      this.cancel();
    }
  }
};
</script>

<style lang="scss" scoped>
.vehicleManagement {
  padding: 15px;
  .dialog-left,
  .dialog-right {
    border: 1px solid #ccc;
  }
}
</style>