<template>
  <div>
    <p> Graph Id: {{getProperties.id}} </p>
    <p> Acyclic: {{getProperties.acyclic}} </p>
    <p> Connected: {{getProperties.connected}} </p>
    <p> Longest Directed Paths: {{getProperties.longest_directed_path.max_paths}} </p>
    <p> Longest Undirected Paths: {{getProperties.longest_undirected_path.max_paths}} </p>
  </div>
</template>

<script>

import {mapGetters} from "vuex"
export default {

  computed: {
    ...mapGetters({
      getProperties: 'getCurrentGraphProperties'
    })
  }
}

</script>