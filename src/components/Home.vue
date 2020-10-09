<template>
  <div>
    <nav-bar/>
    <sub-menu-card/>
    <div>
      <modal name="individualGraph" height="auto" >
        <graph-modal :graph="graphToDisplayIndividually" id="individualDisplayModal"></graph-modal>
      </modal>
    </div>
    <modal name="nodeLabelSearchModal" height="auto">
      <node-search-results-modal :nodeLabel="getNodeSearchedFor" :results="getNodeSearchResults"></node-search-results-modal>
    </modal>
    <modal name="propertiesModal" height="auto">
      <properties-modal/>
    </modal>
    <modal name="subsetModal" height="auto">
      <subset-modal id="subsetModalId" :subset="getSubset" :elementId="subsetModalId"/>
    </modal>
    <modal name="subgraphSearchModal" height="auto">
      <subgraph-modal :results="getSubgraphResults"/>
    </modal>
    <paging-bar/>
    <div class="col align-content-center">
      <graph-visual v-for="(v,i) in data" :key="i" :graph="v" :elementId="body"></graph-visual>
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
      tempArray: [{num:1}, {num:2}, {num:3}, {num:4}],
      graphToDisplayIndividually: null,
      body: "body",
      subsetModalId: "subsetModalId",
    }
  },
  computed: {
    ...mapGetters({
      getGraphsToDisplay: 'getGraphsToDisplayOnPage',
      getCurrentPage: 'getCurrentPageOfGraphs',
      getIndividualGraphToDisplay: 'getIndividualGraphToDisplay',
      getCurrentGraphProperties: 'getCurrentGraphProperties',
      getNodeSearchResults: 'getNodeSearchResults',
      getNodeSearchedFor: 'getNodeLabelToSearchFor',
      getSubset: 'getSubsetToDisplay',
      getSubgraphResults: 'getSubgraphSearchResults'
    })
  },
  watch: {
    getGraphsToDisplay (val) {
      this.data = val
      this.key += 1
  },
    getIndividualGraphToDisplay(val){
      this.graphToDisplayIndividually = val;
      this.$modal.show('individualGraph');
    },
    getCurrentGraphProperties(val){
      this.$modal.show('propertiesModal');
    },
    getNodeSearchResults(val){
      this.$modal.show('nodeLabelSearchModal');
    },
    getSubset(val){
      this.$modal.show('subsetModal');
    },
    getSubgraphResults(val){
      this.$modal.show('subgraphSearchModal')
    }

  },
  components: {
    'graph-visual': () => import("./GraphVisual"),
    'nav-bar': () => import("./NavBar"),
    'sub-menu-card': () => import("./SubMenuCard"),
    'paging-bar': () => import("./PagingBar"),
    'graph-modal': () => import("./modals/IndividualGraphDisplayModal"),
    'properties-modal': () => import("./modals/GraphPropertiesModal"),
    'node-search-results-modal': () => import("./modals/NodeLabelSearchResultsModal"),
    'subset-modal': () => import("./modals/GraphSubsetModal"),
    'subgraph-modal': () => import("./modals/SubgraphSearchResultsModal"),
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
