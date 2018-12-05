<template>
  <div class="vehicle-allocation">
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>车辆档案</el-breadcrumb-item>
        <el-breadcrumb-item>车辆调拨</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="text" class="return" @click="goBack">
        < 返回</el-button>
    </div>
    <div class="container" style="margin-top:20px">
      <el-table :data="vehicleList" element-loading-text="拼命加载中" border fit v-if="isshow">

        <el-table-column align="center" label='序号' width="100">
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>

        <el-table-column label="VIN码">
          <template slot-scope="scope">
            <span>{{scope.row.vin}}</span>
          </template>
        </el-table-column>

        <el-table-column label="ICCID">
          <template slot-scope="scope">
            <span>{{scope.row.iccid}}</span>
          </template>
        </el-table-column>

        <el-table-column label="车牌">
          <template slot-scope="scope">
            <span>{{scope.row.plate}}</span>
          </template>
        </el-table-column>

        <el-table-column label="归属">
          <template slot-scope="scope">
            <span>{{scope.row.motorcadeName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="电话">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" @click="delect(scope.$index, vehicleList)" style="color:#66b1ff;">删除</a>
          </template>
        </el-table-column>

      </el-table>

      <el-table :data="attributionList" element-loading-text="拼命加载中" border highlight-current-row @current-change="handleCurrentChange" v-else>

        <el-table-column label="账号名称">
          <template slot-scope="scope">
            <span>{{scope.row.userName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="部门名称">
          <template slot-scope="scope">
            <span>{{scope.row.organizationName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="职别">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>

        <el-table-column label="电话号码">
          <template slot-scope="scope">
            <span>{{scope.row.userPhone}}</span>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <div class="foot" style="text-align:right;margin-top:20px;">
      <div v-if="isshow">
        <el-button @click="goBack">取消</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
      <div v-else>
        <el-button @click="lastStep">上一步</el-button>
        <el-button type="primary" @click="transfers">确认调拨</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCarOrganizationUserList, carAllot } from "@/api/vehicleAllocation";
import { getUserId } from "@/utils/auth";

export default {
  name: "vehicle-allocation",
  computed: {
    ...mapGetters(["vehicleInformation"])
  },
  mounted() {
    this.vehicleList = this.vehicleInformation;
  },
  data() {
    return {
      vehicleList: [],
      attributionList: [],
      isshow: true,
      selectType: "",
      userId: ""
    };
  },
  methods: {
    delect(index, rows) {
      rows.splice(index, 1);
      this.$store.dispatch("storageVehicleInformation", rows);
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      if (currentRow) {
        this.selectType = currentRow.typeId;
        this.userId = currentRow.userId;
      }
    },
    nextStep() {
      let data = {
        userId: getUserId()
      };
      getCarOrganizationUserList(data).then(res => {
        this.attributionList = res.results;
        if(this.attributionList.length > 0){
          this.attributionList.map(item => {
            switch (item.typeId) {
              case "1":
                item.type = "普通员工";
                break;
              case "2":
                item.type = "领导";
                break;
            }
          });
          this.isshow = false;
        }else{
          this.$message.error('缺失机构或者部门');
        }
      });
    },
    lastStep() {
      this.isshow = true;
    },
    goBack() {
      this.$router.push({ name: "车辆档案" });
    },
    transfers() {
      let data = [];
      this.vehicleInformation.map(item => {
        data.push({
          userId: this.userId,
          leader: this.selectType,
          vin: item.vin,
          carId: item.id
        });
      });
      carAllot(data).then(res => {
        this.$message.success(res.msg);
        this.$router.push({ name: "车辆档案" });
        this.$store.dispatch("storageVehicleInformation", []);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.vehicle-allocation {
  padding: 20px;
  .title {
    position: relative;
    .return {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>