<template>
  <div>
    <nav-bar/>
    <sub-menu-card/>
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
