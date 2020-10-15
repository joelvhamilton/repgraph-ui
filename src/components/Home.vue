<template>
  <div>
    <nav-bar/>
    <sub-menu-card/>
    <modal name="nodeLabelSearchModal" :height="auto" :scrollable="true" :width="1000">
      <node-search-results-modal :nodeLabels="getNodesSearchedFor" :results="getNodeSearchResults"></node-search-results-modal>
    </modal>
    <modal name="subgraphSearchModal" :height="auto" :scrollable="true" :width="1000">
      <subgraph-modal :results="getSubgraphResults"/>
    </modal>
    <modal name="tokenSearchResultsModal" :height="auto" :scrollable="true">
      <token-modal :results="getGraphsMatchingWords" id="tokenModal"></token-modal>
    </modal>
    <modal name="individualGraph" :height="auto" :scrollable="true" :width="1200">
      <graph-modal :graph="graphToDisplayIndividually" id="individualDisplayModal"></graph-modal>
    </modal>
    <modal name="propertiesModal" :height="auto" :scrollable="true" :width="1000">
      <properties-modal id="propModal" :properties="propertiesToDisplay" :elementId="propModal"></properties-modal>
    </modal>
    <modal name="comparisonModal" :height="auto" :scrollable="true" :width="1200">
      <comparison-modal id="comparison" :graphComparisonResults="getComparisonResults" :elementId="comparison"/>
    </modal>
    <modal name="subsetModal" :height="auto" :scrollable="true" :width="1000">
      <subset-modal id="subsetModalId" :subset="getSubset" :elementId="subsetModalId"/>
    </modal>
    <paging-bar/>
    <div class="col align-content-center">
      <graph-visual v-for="(v,i) in graphs" :key="i" :graph="v" :elementId="body"></graph-visual>
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
      graphs: [],
      key: 0,
      tempArray: [{num:1}, {num:2}, {num:3}, {num:4}],
      graphToDisplayIndividually: null,
      body: "body",
      subsetModalId: "subsetModalId",
      comparison: "comparison",
      auto: "auto",
      propModal: "propModal",
      propertiesToDisplay: {}
    }
  },
  computed: {
    ...mapGetters({
      getGraphsToDisplay: 'getGraphsToDisplayOnPage',
      getCurrentPage: 'getCurrentPageOfGraphs',
      getIndividualGraphToDisplay: 'getIndividualGraphToDisplay',
      getCurrentGraphProperties: 'getCurrentGraphProperties',
      getNodeSearchResults: 'getNodeSearchResults',
      getNodesSearchedFor: 'getNodeLabelsToSearchFor',
      getSubset: 'getSubsetToDisplay',
      getSubgraphResults: 'getSubgraphSearchResults',
      getComparisonResults: 'getResultsOfGraphComparison',
      getProperties: 'getCurrentGraphProperties',
      getGraphsMatchingWords:'getGraphsToDisplayIndividually'
    })
  },
  watch: {
    getGraphsToDisplay (val) {
      this.graphs = val
      this.key += 1
  },
    getGraphsMatchingWords(val){
      this.$modal.show('tokenSearchResultsModal')
    },
    getIndividualGraphToDisplay(val){
      this.graphToDisplayIndividually = val;
      this.$modal.show('individualGraph');
    },
    getProperties(val){
      this.propertiesToDisplay = val;
      this.$modal.show('propertiesModal');
    },
    getNodeSearchResults(val){
      this.$modal.show('nodeLabelSearchModal');
    },
    getSubset(val){
      this.$modal.show('subsetModal');
    },
    getSubgraphResults(val){
      this.$modal.show('subgraphSearchModal');
    },
    getComparisonResults(val){
      this.$modal.show('comparisonModal');
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
    'comparison-modal': () => import("./modals/GraphComparisonModal"),
    'token-modal': () => import("./modals/GraphsByWordsModal"),
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
