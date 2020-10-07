<template>
    <div>
        <!-- <i class="far fa-times-circle" @click="close()"></i> -->
        howzit awweeeee
        <graph-visual :data="graph"></graph-visual>
    </div>
</template>

<script>

    import {mapGetters} from "vuex"
    export default {

        props: ["graph"],
        data(){
            return {
                graphToDisplay: null
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
            'graph-visual': () => import("../GraphVisualForModal"),
        },

        watch: {
            getIndividualGraphToDisplay(val){
                this.graphToDisplay = val;
            }
        }
    }
    

</script>