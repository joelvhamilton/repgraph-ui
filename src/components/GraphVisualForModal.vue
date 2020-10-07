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
    export default {
        props: ["data"],
        components: {
            [Progress.name]: Progress
        },
        mounted () {
            makeGraph(this.data)
        },
        watch: {
            data (val) {
                makeGraph(this.data)
            }
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