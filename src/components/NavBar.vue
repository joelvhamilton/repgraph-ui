<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">RepGraph</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <!-- <li>
          <form>
               <div class="custom-file">
                    <input type="file" class="custom-file-input" id="validatedCustomFile" required>
                    <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                </div>
          </form>
      </li> -->
      <li>
        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
        <button v-on:click="postGraphs()">Submit</button>
        <!-- <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        v-model="file"
        name="graphs"
        :headers="{'Content-Type': 'multipart/form-data'}"
        :auto-upload="false" 
        :multiple="false">
        <el-button slot="trigger" size="small" type="primary">Select File</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="postGraphs()">Upload</el-button>
        </el-upload> -->
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
    import {Upload, Button} from "element-ui"
    import axios from "axios"

    export default {
        components: {
            [Upload.name]: Upload,
            [Button.name]: Button
        },
        methods: {
            postGraphs() {
                let formData = new FormData();
                formData.append('graphs', this.file);
                console.log(formData)
                axios.post( 'http://localhost:8000/load_graphs', 
                  formData,
                  {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                  }
                ).then(() => {
                  axios.get('http://localhost:8000/get_graphs/1');
                  })
            },
          handleFileUpload(){
            this.file = this.$refs.file.files[0];
            console.log(this.file)
          }
        },
        data() {
            return {
                file: null,
                page_one_graphs: null
            }
        }
    }


</script>