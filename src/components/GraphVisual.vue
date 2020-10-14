<template>
    <div>
        Graph Id: {{graph.id}}
    </div>
</template>
<!-- all d3 logic will be here -->



<script src="https://d3js.org/d3.v4.js"></script>
<script>
    import {Progress} from "element-ui"
    import {makeGraph} from "../graph.js"
    import {mapGetters} from "vuex"

    export default {
        props: ["graph", "elementId", "word"],
        components: {
            [Progress.name]: Progress
        },
        watch: {
            graph (val) {
                makeGraph(this.graph, this.displayTokens, this.elementId);
            },
            displayTokens(val){
                makeGraph(this.graph, this.displayTokens, this.elementId);
            },
            elementId (val){
                makeGraph(this.graph, this.displayTokens, this.elementId);
            }
        },
        mounted () {
            if(this.graph !== null && this.graph !== undefined && this.graph.status !== "Failed"){
                makeGraph(this.graph, this.displayTokens, this.elementId);
            }
        },
        computed: {
            ...mapGetters({
                displayTokens: 'displayTokens'
            })
        }
    }
</script>

<style>
#viewSvg {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    border: 3px solid lightgray;
    border-radius: 4px;
    margin-top: 12px;
}
</style>