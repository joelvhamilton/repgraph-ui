<template>
  <div>
    <h3 v-if="propertyCheckWorked===false"> There is no graph with id '{{properties.id}}'.</h3>
  </div>
</template>

<script>

import {longestPath} from "../../longestpath.js"

export default {

  props: ["properties", "elementId"],

  watch: {
    properties(val) {
      if (this.properties.status !== "Failed"){
        longestPath(this.properties, this.elementId);
        this.propertyCheckWorked = true;
      }
      else {
        this.propertyCheckWorked = false;
      }
    }
  },
  mounted() {
    if (this.properties.status !== "Failed"){
      longestPath(this.properties, this.elementId);
      this.propertyCheckWorked = true;
    }
    else {
      this.propertyCheckWorked = false;
    }
  },
  
  data() {
    return {
      propertyCheckWorked: true
    }
  }
}

</script>