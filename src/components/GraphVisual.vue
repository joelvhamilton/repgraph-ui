<template>
    <div>
        <p> graph {{data.num}} goes here </p>
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