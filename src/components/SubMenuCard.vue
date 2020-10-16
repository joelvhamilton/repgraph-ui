<template>
    <div class=" card card-header text-center col-md-11 mt-4" style="margin: 0 auto; float: none; margin-bottom: 10px;">
        <ul class=" ml-10 nav nav-pills card-header-pills text-center align-items-center" style="margin: 0 auto; float: none">
            <li>
                <form class="form-inline" v-on:submit.prevent="checkProperties()">
                    <button type="button" class="btn btn-info ml-1 mr-2" @click="togglePropertiesButton()">Test Graph Properties</button>
                    <input v-if="this.propertiesButtonClicked" v-model="graphId" class="form-control mr-sm-2" type="search" placeholder="graph id" aria-label="Search">
                    <button v-if="this.propertiesButtonClicked" class="btn btn-outline-info my-2 my-sm-0" type="submit" @click.prevent="checkProperties()"> Compute </button>
                </form>
            </li>
            <li>
                <form class="form-inline" v-on:submit.prevent="searchForNodeLabel()">
                    <button class="btn btn-info my-sm-0 ml-1 mr-2" type="button" @click.prevent="toggleNodeLabelSearchButton()">Search for node labels</button>
                    <input v-if="nodeLabelSearchClicked" class="form-control mr-sm-2" type="search" placeholder="e.g. time_n " aria-label="Search" v-model="nodeLabelsToSearchFor">
                    <button v-if="nodeLabelSearchClicked" class="btn btn-outline-info ml-2 mr-2" @click.prevent="searchForNodeLabel()" type="submit"> Search </button>
                </form>
            </li>
            <li>
                <form class="form-inline" v-on:submit.prevent="searchForSubgraphPattern()">
                    <button class="btn btn-info ml-1 mr-2 my-2 my-sm-0" type="button" @click.prevent="toggleSubgraphSearchButton()">Search for Subgraph</button>
                    <input v-if="subgraphSearchClicked" class="form-control mr-sm-2" type="search" placeholder="node-edge-node, etc " aria-label="Search" v-model="subgraphToSearchFor">
                    <button v-if="subgraphSearchClicked" class="btn btn-outline-info ml-2 mr-2" @click.prevent="searchForSubgraphPattern()" type="submit"> Search </button>
                </form>
            </li>
            <li>
                <form class="form-inline" v-on:submit.prevent="compareGraphs()">
                    <button class="btn btn-info my-2 ml-1 mr-2 my-sm-0" type="button" @click.prevent="toggleGraphComparison()">Compare Graphs</button>
                    <input v-if="graphComparisonClicked" class="form-control my-1 mr-sm-2" type="search" placeholder="id1, id2" aria-label="Search" v-model="graphsToCompare">
                    <button v-if="graphComparisonClicked" class="btn btn-outline-info ml-2 mr-2" @click.prevent="compareGraphs()" type="submit"> Compare </button>
                </form>
            </li>
            <li>
                <input class="mr-1" type="checkbox" id="toDisplayTokens" v-model="mustDisplayTokens">
                Display Tokens
            </li>
        </ul>
    </div>

</template>
<script>
    import axios from "axios"
    import {mapActions, mapGetters} from "vuex"
    export default {
        methods: {
            checkProperties() {
                this.setGraphProperties(this.graphId).then(() => {
                    this.togglePropertiesButton();
                })
            },
            ...mapActions({
                setGraphProperties: 'setNewGraphProperties',
                updateDisplayTokens: 'updateDisplayTokens',
                searchForNode: 'setNewNodeSearchResults',
                searchForSubgraph: 'setNewSubgraphSearchResults',
                compareTwoGraphs: 'makeNewGraphComparison'
            }),

            togglePropertiesButton() {
                this.propertiesButtonClicked = ! this.propertiesButtonClicked;
                this.nodeLabelSearchClicked = false;
                this.subgraphSearchClicked = false;
                this.graphComparisonClicked = false;
            },

            toggleGraphComparison() {
                this.graphComparisonClicked = ! this.graphComparisonClicked;
                this.nodeLabelSearchClicked = false;
                this.subgraphSearchClicked = false;
                this.propertiesButtonClicked = false;
            },
            toggleNodeLabelSearchButton(){
                this.nodeLabelSearchClicked = ! this.nodeLabelSearchClicked;
                this.propertiesButtonClicked = false;
                this.subgraphSearchClicked = false;
                this.graphComparisonClicked = false;
            },
            toggleSubgraphSearchButton(){
                this.subgraphSearchClicked = ! this.subgraphSearchClicked;
                this.propertiesButtonClicked = false;
                this.nodeLabelSearchClicked = false;
                this.graphComparisonClicked = false;
            },
            searchForNodeLabel(){
                let labelsToSearchFor = this.nodeLabelsToSearchFor.split(", ");
                this.searchForNode(labelsToSearchFor).then(() => {
                    this.toggleNodeLabelSearchButton();
                    this.nodeLabelsToSearchFor = "";
                })
            },
            searchForSubgraphPattern(){
                let payload = {
                    links: this.subgraphToSearchFor.split(", ")
                }
                this.searchForSubgraph(payload).then(() => {
                    this.toggleSubgraphSearchButton();
                    this.subgraphToSearchFor = "";
                })
            },
            compareGraphs(){
                let idsToCompare = this.graphsToCompare.split(", ");
                let argumentForComparisonAPICall = `${idsToCompare[0]}_${idsToCompare[1]}`;
                this.compareTwoGraphs(argumentForComparisonAPICall).then(() => {
                    this.toggleGraphComparison();
                    this.graphsToCompare = "";
                });
            }
        },
        computed: {
            ...mapGetters({
                displayTokens: 'displayTokens'
            })
        },
        data() {
            return {
                propertiesButtonClicked: false,
                graphId: 0,
                mustDisplayTokens: true,
                nodeLabelsToSearchFor: "",
                nodeLabelSearchClicked: false,
                subgraphSearchClicked: false,
                subgraphToSearchFor: "",
                graphComparisonClicked: false,
                graphsToCompare: ""
            }
        },
        watch: {
            mustDisplayTokens(val){
                this.updateDisplayTokens(val);
            }
        }
    }
</script>
