<template>
    <div>
        <h1> graph goes here </h1>
        <h2> stuff</h2>
        <h2> stuff</h2>
        <h2> stuff</h2>
        <h2> stuff</h2>
    </div>
</template>
<!-- all d3 logic will be here -->

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