<template>
    <div class=" card card-header text-center col-md-7 mt-4" style="margin: 0 auto; float: none; margin-bottom: 10px;">
        <ul class=" ml-10 nav nav-pills card-header-pills text-center align-items-center" style="margin: 0 auto; float: none">
            <button type="button" class="btn btn-info ml-2 mr-2" @click="togglePropertiesButton()">Test Graph Properties</button>
                <form v-if="this.propertiesButtonClicked" class="form-inline">
                    <input v-model="graphId" class="form-control mr-sm-2" type="search" placeholder="graph id" aria-label="Search">
                    <button class="btn btn-outline-info my-2 my-sm-0" type="submit" @click.prevent="checkProperties(graphId)">Check</button>
                </form>
            <button type="button" class="btn btn-info ml-2 mr-3">Compare Graphs</button>
            
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Node label or subgraph" aria-label="Search">
                <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
            </form>
        </ul>
    </div>

</template>

<script>
    import axios from "axios"
    import {mapActions} from "vuex"
    export default {
        methods: {
            checkProperties(graphId) {
                this.setGraphProperties(graphId).then(() => {
                    this.togglePropertiesButton();
                })
            },
            ...mapActions({
                setGraphProperties: 'setNewGraphProperties'
            }),
            togglePropertiesButton() {
                this.propertiesButtonClicked = ! this.propertiesButtonClicked;
            }
        },
        data() {
            return {
                propertiesButtonClicked: false,
                graphId: 0
            }
        }
    }
</script>
