<template>
    <div>
        <!-- <i class="far fa-times-circle" @click="close()"></i> -->
        <graph-visual :graph="graph" :word="'valid'" v-if="!noGraphToDisplay" :elementId="individualDisplayModal"></graph-visual>
        <h3 v-else> There is no graph with id '{{graph.id}}' </h3>
    </div>
</template>

<script>

    import {mapGetters} from "vuex"
    export default {

        props: ["graph"],
        data(){
            return {
                graphToDisplay: null,
                individualDisplayModal: "individualDisplayModal",
                noGraphToDisplay: true
            }
        },

        // computed: {
        //     ...mapGetters({
        //         getIndividualGraphToDisplay: 'getIndividualGraphToDisplay'
        //     })
        // },

        // beforeDestroy () {
        //     this.noGraphToDisplay = true,
        
        // },

        mounted() {
            if (this.graph.status === "Failed"){
                this.noGraphToDisplay = true;
            }
            else {
                this.noGraphToDisplay = false;
            }
        },

        components: {
            'graph-visual': () => import("../GraphVisual"),
        },

        watch: {
            graph(val){
                if (this.graph.status === "Failed"){
                    this.noGraphToDisplay = true;
                }
                else {
                    this.noGraphToDisplay = false;
                }
            }
        }
    }
    

</script>