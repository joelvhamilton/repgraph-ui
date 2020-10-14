<template>
    <div>
        <h3 v-if="resultsPresent === true"> Graphs containing nodes with the following labels: {{nodeLabels}} </h3>
        <h3 v-if="resultsPresent === false"> No graphs contain the labels: {{nodeLabels}} </h3>
        <div v-if="resultsPresent === true">
            <button class="btn btn-info mt-2 mr-2 mb-1" type="submit" v-for="graph in results" :key="graph.graph_id" @click="displayGraph(graph.graph_id)">
                <abbr style="text-decoration: none;" :title="graph.sentence"> {{graph.graph_id}}</abbr>
            </button>
        </div>
    </div>
</template>
<script>
import {mapActions} from "vuex"

export default {
    
    props: ["nodeLabels", "results"],
    methods: {
        ...mapActions({
            displayGraph: 'updateIndividualGraphToDisplay'
        }),
        triggerGraphDisplay(id){
            this.displayGraph(id);
        }
    },
    mounted() {
        this.resultsPresent = true;
        if (this.results.status === "Failed"){
            this.resultsPresent = false;
        }
    },
    data() {
        return {
            resultsPresent: true
        }
    }

}
</script>