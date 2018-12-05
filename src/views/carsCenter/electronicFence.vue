<template>
  <div class="fencing">
    <div id="map-container" class="fencing-top"></div>
    <div class="fencing-bottom">
      <el-table :data="list" height="100%" border highlight-current-row>
        <el-table-column align="center" label='ID' fixed>
          <template slot-scope="scope">
            {{scope.$index}}
          </template>
        </el-table-column>
        <el-table-column label="Title">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column label="Author"  align="center">
          <template slot-scope="scope">
            <span>{{scope.row.author}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Pageviews" align="center">
          <template slot-scope="scope">
            {{scope.row.pageviews}}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="Status"  align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="Display_time" >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{scope.row.display_time}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fencing-search">
      <el-input
        placeholder="请输入内容"
        v-model="input">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
      </el-input>
    </div>
    <div class="fencing-add">
      <el-button type="primary" @click.native="dialogFormVisible = true">新智电子围栏</el-button>
    </div>
    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="400px" :modal="false">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" class="size"></el-input>
        </el-form-item>
        <el-form-item label="报警类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择" class="size">
            <el-option label="进电子围栏" value="1"></el-option>
            <el-option label="出电子围栏" value="2"></el-option>
            <el-option label="进出电子围栏" value="3"></el-option>            
          </el-select>
        </el-form-item>
        <el-form-item label="形状" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择" class="size">
            <el-option label="圆形" value="1"></el-option>
            <el-option label="三角形" value="2"></el-option>
            <el-option label="矩形" value="3"></el-option>
            <el-option label="多边形" value="4"></el-option>
            <el-option label="行政区域" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
export default{
  name: 'electronicFence',
  data(){
    return{
      list:null,
      input:"",
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        type: ''
      },
      formLabelWidth: '90px'
    }
  },
  created() {
    this.fetchData()
  },
  mounted(){ 
    this.init()  
  },
  methods:{
    init(){
      const map = new AMap.Map('map-container', {
        zoom: 10
      })
      this.map = map;
    },
    fetchData(){
      getList(this.listQuery).then(response => {
        this.list = response.data.items
      })
    },
    search(){
      alert(123)
    },
    save(){
      console.log(this.form)
      this.dialogFormVisible = false
      if(this.form.region){
        switch (this.form.region) {
          case "1":
            this.circleEditor()
            break;
          case "3":
            this.editRectangle()
            break;
          case "2":
            this.polygon()
            break;
          case "4":
            this.polygon()
            break;  
          case "5":
            this.district()
            break;        
        }
        
      }
    },
    circleEditor(){
      let circle = new AMap.Circle({
        center: this.map.getCenter(),
        radius: 1000, //半径
        strokeColor: "#F33", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线粗细度
        fillColor: "#ee2200", //填充颜色
        fillOpacity: 0.35//填充透明度
      });
      circle.setMap(this.map);     
      let circleEditor = new AMap.CircleEditor(this.map,circle); 
      circleEditor.open(); 
      circle.on("dblclick",(event) => {
        circle.setMap(null)
        circleEditor.close(); 
      })
    },
    editRectangle(){
      let rectangle = new AMap.Rectangle({
        map: this.map,
        bounds: this.map.getBounds(),
        strokeColor:'#F33',
        strokeWeight:3,
        strokeOpacity:1,
        fillColor:"#ee2200",
        fillOpacity:0.35,
      })
      let rectangleEditor = new AMap.RectangleEditor(this.map, rectangle)
      rectangleEditor.open();
      rectangle.on("dblclick",() => {
        rectangle.setMap(null)
        rectangleEditor.close()
      })
    },
    polygon(){
      let lng = this.map.getCenter().lng
      let lat = this.map.getCenter().lat
      console.log(lng,lat)
      let arr = [[lng-0.037076,lat-0.176531],[lng+0.127716,lat+0.134092],[lng-0.223847,lat+0.134092]]
      let polygon = new AMap.Polygon({
        map: this.map,
        path: arr,
        strokeColor: "#F33",
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: "#ee2200",
        fillOpacity: 0.35,
        draggable:true
      })
      let editorPolygon = new AMap.PolyEditor(this.map, polygon);
      editorPolygon.open();
      polygon.on("dblclick",() => {
        polygon.setMap(null);
        editorPolygon.close();
      })
    },
    district(){
      console.log(12);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.fencing{
  position: relative;
  height: 100%;
  #map-container{
    height: 70%;
  }
  &-bottom{
    height: 30%;
  }
  &-search,&-add{
    position: absolute;
    top: 20px;
  }
  &-search{
    left: 20px;    
  }
  &-add{
    right: 20px;
  }
  .size{
    width: 200px;
  }
}
</style>