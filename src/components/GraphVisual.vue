<template>
    <div>
        <script src="https://d3js.org/d3.v4.js"></script>
        <h1> graph goes here </h1>
        <h2> stuff</h2>
        <h2> stuff</h2>
        <h2> stuff</h2>
        <h2> stuff</h2>
    </div>
</template>
<!-- all d3 logic will be here -->

<script src="graph.js"></script>
<script>
    import {Progress} from "element-ui"
    export default {
        props: ["data"],
        components: {
            [Progress.name]: Progress
        }
    }
</script>

<style lang="scss" scoped>

</style>