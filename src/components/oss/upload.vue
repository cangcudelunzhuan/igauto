<template>
  <el-upload :action="action" :data="dataObj" drag :multiple="true" :before-upload="beforeUpload(file)">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>


<script>
import { getToken } from '@/api/upload'


export default{
  data() {
    return {
      dataObj: { token: '', key: '' },
      bucket: 'ig-dev-file',
      accessKeyId:"LTAIivQ2oH7Qtz58",
      accessKeySecret:"UaNY0j0xdKikzEXSNEmscgfZX5BJ2u",
      region:"",
      action:""
    }
  },
  methods: {
    beforeUpload(file) {
      const _this = this
      console.log(file)
      const client = new OSS.Wrapper({
        region: _this.region,
        accessKeyId: _this.accessKeyId,
        accessKeySecret: _this.accessKeySecret,
        stsToken: result.data.data.SecurityToken,
        bucket: _this.bucket
      })

      client.multipartUpload(storeAs, f).then((result) => {
        console.log(result);
        console.log(result.url); 
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }
}
</script>
