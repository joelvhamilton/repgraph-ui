<template>
    
</template>

<script>
import {makeSubgraph} from "../../subgraph.js"

export default {

    props: ["subset", "elementId"],
    
    watch: {
        subset(val){
            this.makeSubgraph(val, this.elementId);
        }
    },
    mounted(){
        this.makeSubgraph(val, this.elementId);
    }
}

</script>