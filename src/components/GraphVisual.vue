<template>
    <div class="d-flex">
    <p> Graph: {{data.id}} </p>
    </div>
</template>
<!-- all d3 logic will be here -->



<script src="https://d3js.org/d3.v4.js"></script>
<script>
    import {Progress} from "element-ui"
    import {makeGraph} from "../graph.js"
    import {mapGetters} from "vuex"

    export default {
        props: ["data"],
        components: {
            [Progress.name]: Progress
        },
        watch: {
            data (val) {
                makeGraph(this.data, this.displayTokens);
            },
            displayTokens(val){
                makeGraph(this.data, this.displayTokens);
            }
        },
        mounted () {
            makeGraph(this.data, this.displayTokens);
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
    display: block;
    border: 3px solid lightgray;
    border-radius: 30px;
}
</style>