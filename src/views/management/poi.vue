<template>
	<div class="poi">

		<!-- poi搜索条 -->
		<div class="poi-search">
			<el-form ref="form" :model="form" :inline="true">
				<el-form-item label="公司名称:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>

				<el-form-item label="类型名称:">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option label="服务点" value="1"></el-option>
						<el-option label="报警点" value="2"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="primary" @click="onReset">重置</el-button>
					<!-- <el-button type="primary" @click="exportFile">导出</el-button> -->
				</el-form-item>

			</el-form>
		</div>

		<!-- poi表格 -->
		<div class="poi-table">
			<el-table :data="tableData" border fit>
				<el-table-column label="序号" align="center" width="100">
					<template slot-scope="scope">
						{{scope.$index +1}}
					</template>
				</el-table-column>
				<el-table-column label="公司名称">
					<template slot-scope="scope">
						{{scope.row.companyName}}
					</template>
				</el-table-column>
				<el-table-column label="类型">
					<template slot-scope="scope">
						{{scope.row.stationType}}
					</template>
				</el-table-column>
				<el-table-column label="服务站代码">
					<template slot-scope="scope">
						{{scope.row.stationCode}}
					</template>
				</el-table-column>
				<el-table-column label="营业状态">
					<template slot-scope="scope">
						{{scope.row.stationStatus}}
					</template>
				</el-table-column>
				<el-table-column label="地址">
					<template slot-scope="scope">
						{{scope.row.stationAdrress}}
					</template>
				</el-table-column>
				<el-table-column label="站长名称">
					<template slot-scope="scope">
						{{scope.row.founderName}}
					</template>
				</el-table-column>
				<el-table-column label="站长手机号">
					<template slot-scope="scope">
						{{scope.row.founderPhone}}
					</template>
				</el-table-column>
				<el-table-column label="服务经理名称">
					<template slot-scope="scope">
						{{scope.row.managerName}}
					</template>
				</el-table-column>
				<el-table-column label="服务经理手机号">
					<template slot-scope="scope">
						{{scope.row.managerPhone}}
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- poi分页 -->
		<div class="poi-page">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="total">
			</el-pagination>
		</div>

	</div>
</template>

<script>
import { getServerStationByPage } from "@/api/system";
export default {
  name: "poi",
  data() {
    return {
      form: {
        name: "",
        type: ""
      },
      total: 0,
      tableData: null,
      page: 1
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onSubmit(value) {
      this.getData();
    },
    onReset() {
      this.form.name = "";
      this.form.type = "";
      this.form.phone = "";
    },
    handleClick(row) {
      this.editeData = row;
      this.editDialogFormVisible = true;
    },
    // exportFile() {
    //   console.log("这是导出按钮");
    // },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    getData() {
      let data = {
        id: "",
        companyName: this.form.name,
        stationType: this.form.type,
        limitStart: 1,
        limitNum: 10,
        page: this.page
      };
      getServerStationByPage(data).then(res => {
        let data = res.results;

        data.datas.forEach(value => {
          //过滤营业状态
          if (value.stationStatus === "1") {
            value.stationStatus = "营业";
          } else {
            value.stationStatus = "未营业";
          }
          //过滤服务类型
          if (value.stationType === "1" || value.stationType === "") {
            value.stationType = "服务点";
          } else {
            value.stationType = "报警点";
          }
        });

        this.total = data.totalRecords;
        this.tableData = data.datas;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.poi {
  &-search {
    padding: 20px;
  }
  &-page {
    text-align: right;
  }
}
</style>