<template>
    <p> {{subset.id}} </p>
</template>

<script>
import {makeSubgraph} from "../../subgraph.js"

export default {

    props: ["subset", "elementId"],
    
    watch: {
        subset(val){
            makeSubgraph(val, this.elementId);
        }
    },
    mounted(){
        makeSubgraph(this.subset, this.elementId);
    }
}

</script>