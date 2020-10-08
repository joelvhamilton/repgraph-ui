<template>
    <div>
        <!-- <i class="far fa-times-circle" @click="close()"></i> -->
        <graph-visual :graph="graph" :elementId="individualDisplayModal"></graph-visual>
    </div>
</template>

<script>

    import {mapGetters} from "vuex"
    export default {

        props: ["graph"],
        data(){
            return {
                graphToDisplay: null,
                individualDisplayModal: "individualDisplayModal"
            }
        },

        computed: {
            ...mapGetters({
                getIndividualGraphToDisplay: 'getIndividualGraphToDisplay'
            })
            // ,
            // close(){
            //     this.$emit('notify')
            // }
        },

        components: {
            'graph-visual': () => import("../GraphVisual"),
        },

        watch: {
            getIndividualGraphToDisplay(val){
                this.graphToDisplay = val;
            }
        }
    }
    

</script>