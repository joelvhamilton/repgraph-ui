<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">RepGraph</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li>
        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
        <button v-on:click="postGraphs()">Submit</button>
      </li>
      <li>
          <form class="form-inline">
              <input v-model="graphId" class="form-control mr-sm-2" type="search" placeholder="e.g. 20001001" aria-label="Search">
              <button class="btn btn-outline-info my-2 my-sm-0" type="submit" @click.prevent="findGraph()">Find graph by ID</button>
          </form>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
    import {Upload, Button} from "element-ui"
    import {mapActions, mapGetters} from "vuex"
    import axios from "axios"

    export default {
        components: {
            [Upload.name]: Upload,
            [Button.name]: Button
        },
        data() {
            return {
                file: null,
                graphId: 0
            }
        },
        methods: {
          postGraphs() {
              let formData = new FormData();
              formData.append('graphs', this.file);
              console.log(formData)
              this.$store.dispatch("uploadGraphs", formData).then(() => {
                this.$store.dispatch("updateGraphsBeingDisplayed");
              })
          },
          ...mapActions ({
            findGraphById: 'updateIndividualGraphToDisplay'
          }),
          handleFileUpload(){
            this.file = this.$refs.file.files[0];
          },
          findGraph(){
            this.findGraphById(this.graphId);
          }
        }
    }


</script>