<template>
    <div>
        <h3> Graphs containing a node with label: {{nodeLabel}} :</h3>
        <div>
            <button class="btn btn-info mt-2 mr-2" type="submit" v-for="id in results" :key="id" @click="displayGraph(id)"> {{id}} </button>
        </div>
    </div>
</template>
<script>
import {mapActions} from "vuex"

export default {
    
    props: ["nodeLabel", "results"],
    methods: {
        ...mapActions({
            displayGraph: 'updateIndividualGraphToDisplay'
        }),
        triggerGraphDisplay(id){
            this.displayGraph(id);
        }
    }

}
</script>