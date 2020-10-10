<template>
    <div class=" card card-header text-center col-md-7 mt-4" style="margin: 0 auto; float: none; margin-bottom: 10px;">
        <ul class=" ml-10 nav nav-pills card-header-pills text-center align-items-center" style="margin: 0 auto; float: none">
                <i class="fa fa-arrow-left" style="colour: black" @click="previousPage()">Navigate</i>
                <i class="fa fa-arrow-right mr-3" style="colour: black" @click="nextPage()"></i>
            <form class="form-inline">
                <input v-model="newPage" class="form-control mr-sm-2" type="search" placeholder="e.g. 3" aria-label="Search">
                <button class="btn btn-outline-info my-2 mr-2 my-sm-0" type="submit" @click.prevent="goToNewPage()">Go To Specific Page</button>
            </form>
            Page: {{`${getCurrentPage}   `}}
        </ul>
    </div>

</template>

<script>
import {Upload, Button} from "element-ui"
// import mapgetters and get the graphs displaying
import {mapGetters, mapActions} from "vuex"

export default {
  data() {
    return {
        newPage: 1
    }
  },
  computed: {
    ...mapGetters({
        getCurrentPage: 'getCurrentPageOfGraphs'
    })
  },
  methods: {
    ...mapActions({
      goToNewSpecificPage: 'goToSpecificPage',
      nextPage: 'updateGraphsBeingDisplayed'
    }),
    goToNewPage(){
        this.goToNewSpecificPage(this.newPage)
    },
    previousPage() {
        this.goToNewSpecificPage(this.getCurrentPage-1)
    }
  }
}
</script>