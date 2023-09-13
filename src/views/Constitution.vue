<template>
  <!-- <div class="constitution">
    <embed data-v id="embed" src="constitution.pdf" type="application/pdf" width="100%">
  </div> -->
  <!-- <div class="constitution">
   <pdf src="constitution.pdf"></pdf>
  </div> -->
  <div class="constitution">
    <vue-pdf-embed class="embed" source="constitution.pdf" />
  </div>
</template>

<script setup>

import VuePdfEmbed from 'vue-pdf-embed'

// // @ is an alias to /src

// export default {
//   name: 'Constitution',

// }
</script>

<style scoped lang="scss">

.constitution {
  max-width: 1000px;
}


</style>
