<template>
    <div class=" card card-header text-center col-md-7 mt-4" style="margin: 0 auto; float: none; margin-bottom: 10px;">
        <ul class=" ml-10 nav nav-pills card-header-pills text-center align-items-center" style="margin: 0 auto; float: none">
            <button type="button" class="btn btn-info ml-2 mr-2" @click="togglePropertiesButton()">Test Graph Properties</button>
                <form v-if="this.propertiesButtonClicked" class="form-inline">
                    <input v-model="graphId" class="form-control mr-sm-2" type="search" placeholder="graph id" aria-label="Search">
                    <button class="btn btn-outline-info my-2 my-sm-0" type="submit" @click.prevent="checkProperties(graphId)">Check</button>
                </form>
            <button type="button" class="btn btn-info ml-2 mr-3">Compare Graphs</button>
            
            <form class="form-inline">
                <button class="btn btn-info my-2 my-sm-0" type="submit" @click.prevent="toggleNodeLabelSearchButton()">Search for node label</button>
                <input v-if="nodeLabelSearchClicked" class="form-control mr-sm-2" type="search" placeholder="e.g. time_n " aria-label="Search" v-model="nodeLabelToSearchFor">
                <button v-if="nodeLabelSearchClicked" class="btn btn-outline-info ml-2 mr-2" @click.prevent="searchForNodeLabel()" type="submit"> Search </button>
            </form>
            <form class="form-inline">
                <button class="btn btn-info my-2 my-sm-0" type="submit" @click.prevent="toggleSubgraphSearchButton()">Search for Subgraph</button>
                <input v-if="subgraphSearchClicked" class="form-control mr-sm-2" type="search" placeholder="e.g. time_n " aria-label="Search" v-model="subgraphToSearchFor">
                <button v-if="subgraphSearchClicked" class="btn btn-outline-info ml-2 mr-2" @click.prevent="searchForSubgraphPattern()" type="submit"> Search </button>
            </form>
            <input type="checkbox" id="toDisplayTokens" v-model="mustDisplayTokens">
            <label for="toDisplayTokens"> Display Tokens </label>
        </ul>
    </div>

</template>
<script>
    import axios from "axios"
    import {mapActions, mapGetters} from "vuex"
    export default {
        methods: {
            checkProperties(graphId) {
                this.setGraphProperties(graphId).then(() => {
                    this.togglePropertiesButton();
                })
            },
            ...mapActions({
                setGraphProperties: 'setNewGraphProperties',
                updateDisplayTokens: 'updateDisplayTokens',
                searchForNode: 'setNewNodeSearchResults',
                searchForSubgraph: 'setNewSubgraphSearchResults'
            }),
            togglePropertiesButton() {
                this.propertiesButtonClicked = ! this.propertiesButtonClicked;
                this.nodeLabelSearchClicked = false;
                this.subgraphSearchClicked = false;
            },
            toggleNodeLabelSearchButton(){
                this.nodeLabelSearchClicked = ! this.nodeLabelSearchClicked;
                this.propertiesButtonClicked = false;
                this.subgraphSearchClicked = false;
            },
            toggleSubgraphSearchButton(){
                this.subgraphSearchClicked = ! this.subgraphSearchClicked;
                this.propertiesButtonClicked = false;
                this.nodeLabelSearchClicked = false;
            },
            searchForNodeLabel(){
                this.searchForNode(this.nodeLabelToSearchFor).then(() => {
                    this.toggleNodeLabelSearchButton();
                    this.nodeLabelToSearchFor = "";
                })
            },
            searchForSubgraphPattern(){
                console.log(this.subgraphToSearchFor.split(", "));
                let payload = {
                    links: this.subgraphToSearchFor.split(", ")
                }
                this.searchForSubgraph(payload).then(() => {
                    this.toggleSubgraphSearchButton();
                    this.subgraphToSearchFor = "";
                })
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
                nodeLabelToSearchFor: "",
                nodeLabelSearchClicked: false,
                subgraphSearchClicked: false,
                subgraphToSearchFor: ""
            }
        },
        watch: {
            mustDisplayTokens(val){
                this.updateDisplayTokens(val);
            }
        }
    }
</script>
