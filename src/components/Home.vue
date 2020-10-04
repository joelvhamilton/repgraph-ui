<template>
  <div>
    <nav-bar/>
    <sub-menu-card/>
    <div class="col align-content-center">
      <graph-visual v-for="(v,i) in data" :key="key" :data="v"></graph-visual>
      <i class="fa fa-arrow-right" style="colour: black" @click="nextPage">Next Page</i>
    </div>
  </div>
</template>

<script>
import {Upload, Button} from "element-ui"
// import mapgetters and get the graphs displaying
import {mapGetters, mapActions} from "vuex"

export default {
  name: 'Home',
  data () {
    return {
      data: [],
      key: 0,
      tempArray: [{num:1}, {num:2}, {num:3}, {num:4}]
    }
  },
  computed: {
    ...mapGetters({
      getGraphsToDisplay: 'getGraphsToDisplayOnPage'
    }),
  },
  methods: {
    ...mapActions({
      nextPage: 'updateGraphsBeingDisplayed'
    })
  },
  watch: {
    getGraphsToDisplay (val) {
      this.data = []
      this.data = val
      this.key += 1
    }
  },
  components: {
    'graph-visual': () => import("./GraphVisual"),
    'nav-bar': () => import("./NavBar"),
    'sub-menu-card': () => import("./SubMenuCard"),
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
