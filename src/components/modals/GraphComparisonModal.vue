<template>
    <div>
        Comparison of graphs a and b.
    </div>
</template>
<script>
import {makeGraphComparison} from "../../graphcomparison.js"
export default {
    props: ["graphComparisonResults", "elementId"],

    watch: {
        graphComparisonResults(val){
            makeGraphComparison(this.graphComparisonResults, this.elementId);
        }
    },
    mounted(){
        console.log(this.graphComparisonResults);
        makeGraphComparison(this.graphComparisonResults, this.elementId);
    }
}
</script>