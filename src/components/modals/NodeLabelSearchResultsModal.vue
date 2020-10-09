<template>
    <div>
        <h3> Graphs containing a node with label: {{nodeLabel}} :</h3>
        <p> {{this.results}} </p>
    </div>
</template>
<script>

export default {
    
    props: ["nodeLabel", "results"]

}
</script>