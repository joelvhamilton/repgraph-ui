<template>
    <div>
        <div v-if="graphsReturned">
            <h3> Graphs of sentences containing "{{stringSearchedFor}}": </h3>
            <div>
                <button class="btn btn-info mt-2 mr-2 mb-1" type="submit" v-for="graph in results" :key="graph.graph_id" @click="displayGraph(graph.graph_id)">
                    <abbr style="text-decoration: none;" :title="graph.sentence"> {{graph.graph_id}}</abbr>
                </button>
            </div>
        </div>
        <div v-else>
            <h3> No graphs containing "{{stringSearchedFor}}" were found. </h3>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {makeGraph} from "../../graph.js"

export default {
    props: ["results"], 
    computed: {
        ...mapGetters({
            stringSearchedFor: 'getStringSearchedFor'
        })
    },
    methods: {
        ...mapActions({
            displayGraph: 'updateIndividualGraphToDisplay'
        })
    },
    data() {
        return {
            graphsReturned: true
        }
    },
    mounted(){
        if (this.results.status === "Failed"){
            this.graphsReturned = false;
        }
    },
    watch: {
        results(val) {
            if (this.results.status === "Failed"){
                this.graphsReturned = false;
            }
        }
    }
}
</script>