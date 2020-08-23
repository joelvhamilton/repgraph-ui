<template>
  <div>
    <h1 font="Segoe-UI" > Welcome to Repgraph </h1>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">Select File</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Upload</el-button>
    </el-upload>
    <div class="col align-content-center">
    <graph-visual v-for="(v, i) in tempArray" :key="i" :data="v"></graph-visual>
    </div>
  </div>
  
</template>

<script>
import {Upload, Button} from "element-ui"
export default {
  name: 'Home',
  data () {
    return {
      tempArray: [{num:1}, {num:2}, {num:3}, {num:4}]
    }
  },
  components: {
    'graph-visual': () => import("./GraphVisual"),
    [Upload.name]: Upload,
    [Button.name]: Button
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
