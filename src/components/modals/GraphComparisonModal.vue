<template>
    <div>
        <graph-visual :graph="graphComparisonResults.graphs[0]" :elementId="elementId"/>
        <graph-visual :graph="graphComparisonResults.graphs[1]" :elementId="elementId"/>
        <h3 v-if="this.comparisonFailed"> Sorry, unable to display comparison. This is likely due to one of the following reasons: </h3>
        <ul v-if="this.comparisonFailed" style="text-align:left">
            <li> They are not of the same sentence.</li>
            <li> One of the ids is invalid. </li>
            <li> Input is malformed. (Please enter input in the form: id1, id2) </li>
        </ul>
    </div>
</template>
<script>
import {makeGraphComparison} from "../../graphcomparison.js"
export default {
    props: ["graphComparisonResults", "elementId"],

    watch: {
        graphComparisonResults(val){
            if (val.status == "Failed"){
                this.comparisonFailed = true;
            }
            else {makeGraphComparison(this.graphComparisonResults.comparison, this.elementId);}
        }
    },
    mounted(){
        if (this.graphComparisonResults.status == "Failed"){
            this.comparisonFailed = true;
            }
        else {
            makeGraphComparison(this.graphComparisonResults.comparison, this.elementId);
        }
    },
    data() {
        return {
            comparisonFailed: false,
        }
    },
    components: {
        'graph-visual': () => import("../GraphVisual")
    }
}
</script>