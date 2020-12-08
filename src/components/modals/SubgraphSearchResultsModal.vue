<template>
    <div>
        <h3 v-if="resultsPresent"> Graphs containing the specified subgraph:</h3>
        <div v-if="resultsPresent">
            <button class="btn btn-info mt-1 mr-2 mb-1" type="submit" v-for="sentence in results" :key="sentence.graph_id" @click="displayGraph(sentence.graph_id)">
                <abbr style="text-decoration: none;" :title="sentence.sentence"> {{sentence.graph_id}}</abbr>
            </button>
        </div>
        <div v-if="resultsPresent === false">
            <h3>Could not display search results. This is likely due to one of the following reasons: </h3>
            <ul style="text-align: left">
                <li> No graphs contain the specified subgraph. </li> 
                <li> The input was malformed. Please enter the subgraph comma-separated in the form node-edge-node.</li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapActions} from "vuex"
export default {
    
    props: ["results"],
    data() {
        return {
            resultsPresent: true
        }
    },
    mounted() {
        if (this.results.status === "Failed"){
            this.resultsPresent = false;
        }
    },

    methods: {
        ...mapActions({
            displayGraph: 'updateIndividualGraphToDisplay'
        }),
        triggerGraphDisplay(id){
            this.displayGraph(id);
        }
    },
    watch: {
        results(val) {
            if (this.results.status === "Failed"){
                this.resultsPresent = false;
            }
        }
    }
}
</script>